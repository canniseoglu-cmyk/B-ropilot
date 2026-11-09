// Existing Playwright installation required; no production dependency.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'..');
(async()=>{
 const files=['Anfrageformular_OFFLINE.html','CSV_Pruefung_und_Sammelimport_OFFLINE.html'];
 const server=http.createServer((req,res)=>{const name=req.url.slice(1);if(!files.includes(name)){res.writeHead(404).end();return}res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(root,name)))});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser,passed=0;
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
  const page=await browser.newPage(),errors=[],external=[];page.on('pageerror',e=>errors.push(e.message));
  const base='http://127.0.0.1:'+server.address().port+'/';
  await page.route('**/*',r=>{if(r.request().url().startsWith(base))return r.continue();external.push(r.request().url());return r.abort()});
  async function test(name,fn){await fn();passed++;console.log('PASS '+name)}
  await page.goto(base+files[0]);
  for(const [id,value] of Object.entries({received:'2026-11-09',name:'Fiktiver Test',contact:'test@example.invalid',detail:'Wartung Testanlage',reviewer:'Testperson'}))await page.locator('#'+id).fill(value);
  await page.locator('#safety').selectOption({label:'Keine Gefahr erkennbar – manuell geprüft'});await page.locator('#confirmed').check();
  const submit=()=>page.locator('button[type=submit]').click();let csv;
  await test('Formular erzeugt CSV und Download',async()=>{await submit();assert.equal(await page.locator('#download').isEnabled(),true);csv=await page.locator('#preview').textContent();assert.ok(csv.includes('Fiktiver Test'));const p=page.waitForEvent('download');await page.locator('#download').click();assert.match((await p).suggestedFilename(),/^BueroPilot_Anfrage_/)});
  await test('Änderung verwirft Export und Vorschau',async()=>{await page.locator('#detail').fill('Neue Beschreibung');assert.equal(await page.locator('#download').isDisabled(),true);assert.equal(await page.locator('#preview').textContent(),'')});
  await test('Leerzeichen als Pflichtinhalt gesperrt',async()=>{await page.locator('#name').fill('   ');await submit();assert.equal(await page.locator('#download').isDisabled(),true);assert.match(await page.locator('#status').textContent(),/SPERRE/);await page.locator('#name').fill('Fiktiver Test')});
  await test('Rückwirkender Termin gesperrt',async()=>{await page.locator('#date').fill('2026-11-08');await submit();assert.match(await page.locator('#status').textContent(),/Terminwunsch liegt vor/);await page.locator('#date').fill('')});
  await test('Gefahrenhinweis ohne Zuständigkeit gesperrt',async()=>{await page.locator('#detail').fill('Gasgeruch');await submit();assert.match(await page.locator('#status').textContent(),/zuständige Person/) });
  await test('Gefahrenhinweis mit unpassender Freigabe gesperrt',async()=>{await page.locator('#owner').fill('Testrolle');await page.locator('#next').fill('Zuständige Notfallstelle nach Betriebsprozess');await submit();assert.match(await page.locator('#status').textContent(),/Sicherheitsstatus erneut/)});
  await test('Sicherheitsfall ausdrücklich gewarnt',async()=>{await page.locator('#safety').selectOption({label:'Gefahrenhinweis – eskalieren'});await submit();assert.match(await page.locator('#status').textContent(),/Kein regulärer Vorgang/)});
  await test('Reset verwirft Export',async()=>{await page.locator('#f').evaluate(f=>f.reset());assert.equal(await page.locator('#download').isDisabled(),true);assert.equal(await page.locator('#preview').textContent(),'')});
  await page.goto(base+files[1]);const upload=()=>page.locator('#files').setInputFiles({name:'synthetisch.csv',mimeType:'text/csv',buffer:Buffer.from(csv)});
  await test('Leere Dateiauswahl meldet Hinweis',async()=>{await page.locator('#check').click();assert.match(await page.locator('#status').textContent(),/Bitte CSV-Dateien/)});
  await test('CSV-Import und Download',async()=>{await upload();await page.locator('#check').click();await page.waitForFunction(()=>!document.getElementById('download').disabled);assert.match(await page.locator('#report').textContent(),/Gültige Zeilen: 1\nFehler: 0/);const p=page.waitForEvent('download');await page.locator('#download').click();const download=await p;assert.equal(download.suggestedFilename(),'BueroPilot_Sammelimport_GEPRUEFT.csv');const stream=await download.createReadStream();let content='';for await(const chunk of stream)content+=chunk;assert.equal(content,csv)});
  await test('Geänderte Dateiauswahl verwirft laufendes Ergebnis',async()=>{
   await page.evaluate(csv=>{window.originalText=File.prototype.text;File.prototype.text=function(){return new Promise(resolve=>window.finishRead=()=>resolve(this.originalResult))};document.getElementById('files').files[0].originalResult=csv},csv);
   await page.locator('#check').click();await page.waitForFunction(()=>!!window.finishRead);
   await page.locator('#files').setInputFiles([]);await page.evaluate(()=>window.finishRead());
   assert.equal(await page.locator('#download').isDisabled(),true);assert.equal(await page.locator('#report').textContent(),'');assert.match(await page.locator('#status').textContent(),/Dateiauswahl geändert/);
   await page.evaluate(()=>File.prototype.text=window.originalText);
  });
  await test('Neuere Prüfung gewinnt gegen älteren Lesevorgang',async()=>{
   await upload();await page.evaluate(csv=>{File.prototype.text=function(){return new Promise(resolve=>(window.reads||=[]).push(()=>resolve(csv))) }},csv);
   await page.locator('#check').click();await page.waitForFunction(()=>window.reads?.length===1);
   await page.locator('#check').click();await page.waitForFunction(()=>window.reads.length===2);
   await page.evaluate(()=>window.reads[1]());await page.waitForFunction(()=>!document.getElementById('download').disabled);
   const status=await page.locator('#status').textContent();await page.evaluate(()=>window.reads[0]());
   assert.equal(await page.locator('#status').textContent(),status);assert.equal(await page.locator('#download').isEnabled(),true);
   await page.evaluate(()=>File.prototype.text=window.originalText);
  });
  await test('Fehlerhafte CSV verwirft vorherigen gültigen Export',async()=>{
   await page.locator('#files').setInputFiles({name:'ungueltig.csv',mimeType:'text/csv',buffer:Buffer.from('falsche;Kopfzeile\nTest;Test')});
   await page.locator('#check').click();await page.waitForFunction(()=>document.getElementById('status').textContent.includes('SPERRE'));
   assert.equal(await page.locator('#download').isDisabled(),true);
  });
  await test('Lesefehler sperrt Export ohne unbehandelte Ausnahme',async()=>{await upload();await page.evaluate(()=>File.prototype.text=async()=>{throw Error('synthetischer Lesefehler')});await page.locator('#check').click();await page.waitForFunction(()=>document.getElementById('status').textContent.includes('konnte nicht gelesen'));assert.equal(await page.locator('#download').isDisabled(),true);await page.evaluate(()=>File.prototype.text=window.originalText)});
  for(const width of [320,375,390])for(const file of files)await test('Mobile Layout '+width+' '+file,async()=>{await page.setViewportSize({width,height:844});await page.goto(base+file);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true)});
  await test('Keine JS-Fehler oder externen Netzwerkanfragen',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(external,[])});
  console.log(`${passed}/${passed} Browserprüfungen bestanden (Chromium; kein echter iPhone-/Safari-Test).`);
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1});
