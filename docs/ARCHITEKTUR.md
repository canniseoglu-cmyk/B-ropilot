# Architektur und Bestandsaufnahme

Prüfdatum: 9. November 2026. Ausgangscommit: `4362de7b2572366308c5fb683a48ae67c9f5dadb`.

## Vollständiger ursprünglicher Bestand

| Datei | Tatsächlicher Inhalt / Prüfung |
|---|---|
| AGENTS.md | Autonomes Arbeiten am Offline-Prototyp, Q-Gate geschlossen, synthetische Tests, keine Auslieferung |
| README.md | Ursprüngliche Start-/Testhinweise, jetzt aktualisiert |
| package.json | Privates Paket, Node >=18, `npm test` startet TECHNISCHE_TESTS.js; keine Paketabhängigkeiten |
| TECHNISCHE_TESTS.js | Ursprünglich 13 Node-VM-Tests des CSV-Prüfskripts mit simuliertem DOM; erweitert |
| Anfrageformular_OFFLINE.html | Eigenständiges Inline-JS/CSS, HTML-Validierung, Gefahrenschlagwörter, CSV-Erzeugung, Blob-Download |
| CSV_Pruefung_und_Sammelimport_OFFLINE.html | Eigenständiger CSV-Parser, Strukturvalidierung, Dateilesen und konsolidierter Blob-Download |
| Anfrageliste.xlsx | ZIP/XML inspiziert: zwei Tabellen, 16 Spalten, drei fiktive Vorgänge, Dropdowns; keine erkannten Formeln, Makros oder externen Beziehungen |
| Email_Vorlagen.docx | ZIP/XML inspiziert: Eingangsbestätigung, Rückfrage, Bearbeitungsstand; kein automatischer Versand |
| Betriebsanleitung.docx | ZIP/XML inspiziert: älterer manueller Betriebsprozess, Datenschutz und Abnahme; Exportbeschreibung veraltet |
| PRUEFBERICHT_V7.txt | Historischer Prüfbericht mit 13 isolierten Tests, keine Freigabe |
| TESTERGEBNIS_LOKAL.txt | Historisches Protokoll derselben 13 Tests |

Office-Inhalte wurden strukturell und als XML-Text gelesen, nicht in Microsoft Office ausgeführt. Dokumentvorlagen und Arbeitsmappe bleiben unverändert; Abweichungen sind Freigabeblocker.

## Datenfluss

Formular → manuelle Sicherheitsprüfung → CSV mit UTF-8-BOM, Semikolon und CRLF → lokale Datei → optionale Sammelprüfung → weitere CSV → manueller Excel-Import.

Keine API, Datenbank, KI-Anbindung, Telemetrie, Remote-Schrift oder Paket-Laufzeitabhängigkeit. Keine Speicherung in localStorage/IndexedDB. Der Browser hält Eingaben und erzeugte CSV vorübergehend im Speicher; heruntergeladene Dateien bleiben auf dem Gerät. Betriebssystem-/Browser-Datenspuren werden dadurch nicht ausgeschlossen.

Beide HTML-Dateien bleiben separat offline ausführbar. CSV-Escaping und Datumsprüfung sind deshalb in beiden Dateien enthalten; Änderungen müssen beide Pfade berücksichtigen. Kein Framework oder Build nötig.

## Validierung und Nebenläufigkeit

Kalenderdaten müssen exakt als YYYY-MM-DD existieren, inklusive Schaltjahrprüfung. Der Import prüft zusätzlich Folgedaten, 16 Spalten, ID-Format, ausgewählte Pflichtinhalte, Prüfperson, Sicherheitsstatus und unbestätigten Terminstatus. Der Parser verwirft Zeichen nach geschlossenen Quotes. Formeln werden beim Export mit Apostroph entschärft; tatsächliche Tabellenprogramm-Interpretation bleibt zu prüfen.

Jede CSV-Prüfung bekommt eine fortlaufende Revision. Neue Prüfung oder Dateiauswahl macht ältere Leseergebnisse ungültig. Lesefehler sperren den Export. Formularänderungen und Reset löschen Ausgabe und Exportfreigabe.

Das ist keine fachliche Freigabe: Namen können erfunden, Sicherheitsangaben falsch und noch nicht erkannte Gefahrentexte vorhanden sein. Der Import prüft keine Signaturen oder Authentizität.
