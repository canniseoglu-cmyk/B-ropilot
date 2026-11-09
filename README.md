# BüroPilot Starter

**Q-GATE GESCHLOSSEN. Nur synthetische Testdaten; keine Kundenauslieferung oder produktive Nutzung.**

Offline-Prototyp zur Erfassung von Handwerkeranfragen und zum manuellen CSV-Import in eine Excel-Anfrageliste. Kein Server, keine KI-Agenten, kein automatischer Versand und keine automatische Speicherung. Der angenommene Preis von 99 € ist nicht marktvalidiert.

## Start und Tests

Paket vollständig lokal ablegen und `Anfrageformular_OFFLINE.html` im Browser öffnen. Für die CSV-Sammelprüfung `CSV_Pruefung_und_Sammelimport_OFFLINE.html` öffnen. Es sind keine Installation, Zugangsdaten oder Internetverbindung erforderlich. Die HTML-Dateien enthalten ihre eigenen Skripte und Styles.

Entwicklung mit Node.js >=18, ohne zusätzliche Pakete:

```sh
npm test
```

Browserprüfung, sofern Playwright und Chromium bereits installiert sind:

```sh
node tests/browser-smoke.cjs
```

Optional `CHROMIUM_PATH` auf die vorhandene Chromium-Datei setzen. Der Browsertest startet und beendet einen lokalen Testserver, nutzt ausschließlich synthetische Daten und blockiert externe Requests. In der Cloud ist `file://` durch eine Verwaltungsrichtlinie blockiert; der Browsertest prüft deshalb über Loopback-HTTP. Das bestätigt keinen lokalen Dateistart auf Zielgeräten. Keine automatische Installation zusätzlicher Browser oder Pakete.

## Bestand und Dokumentation

- HTML-Formular: Pflichtangaben, menschlicher Sicherheitsstatus, CSV-Vorschau und Download; Änderungen und Reset verwerfen die Ausgabe.
- CSV-Prüfung: 16-Spalten-Schema, Pflichtinhalte, Kalenderdaten, Duplikate innerhalb der Auswahl, Sicherheitsstatus und Prüfperson; ein Fehler blockiert den Sammel-Export.
- `Anfrageliste.xlsx`: ältere Musterarbeitsmappe mit drei fiktiven Beispielen; enthält bekannte Inkonsistenzen, siehe Risiken.
- `Email_Vorlagen.docx`, `Betriebsanleitung.docx`: ältere interne Muster, nicht für Auslieferung freigegeben.
- [Aktuelle Bedienungsanleitung](docs/BEDIENUNG.md)
- [Architektur und Bestandsaufnahme](docs/ARCHITEKTUR.md)
- [Testbericht](docs/TESTBERICHT.md)
- [Risiken und Freigabevoraussetzungen](docs/RISIKEN.md)

Die historischen Berichte `PRUEFBERICHT_V7.txt` und `TESTERGEBNIS_LOKAL.txt` dokumentieren den früheren Stand von 13 Tests. Aktuelle Ergebnisse stehen im neuen Testbericht.

Bei akuten Gefahren zuständige Notfallstellen, bei akuter Gefahr 112, von einem sicheren Ort verständigen. Nicht auf dieses Formular warten. Stichworterkennung ist keine zuverlässige Gefahrenbewertung.
