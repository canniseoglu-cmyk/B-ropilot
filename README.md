# BüroPilot Starter – Codex-Arbeitsprojekt

**Status: Q-GATE GESCHLOSSEN. Keine echte Kundendatenverarbeitung, keine produktive Nutzung.**

## Inhalt
- `Anfrageformular_OFFLINE.html`: Offline-Erfassung und CSV-Export
- `CSV_Pruefung_und_Sammelimport_OFFLINE.html`: Offline-Sammelprüfung
- `Anfrageliste.xlsx`: Excel-Arbeitsmappe
- `Email_Vorlagen.docx`, `Betriebsanleitung.docx`: Vorlagen und Handbuch
- `TECHNISCHE_TESTS.js`: bisherige isolierte JS-Logiktests

## Tests
`npm test` (Node.js 18+, ohne zusätzliche Pakete)

## Grenzen
Bisher keine vollständigen Safari-/Excel-End-to-End-Tests, kein Datenschutz-Audit, kein validiertes Notfallverfahren. Die Erkennung von Gefahren durch Stichworte ist nicht zuverlässig; niemals als Notfallsystem verwenden. CSV-Import bleibt manuell; bereits in Excel bestehende Vorgangsnummern werden nicht abgeglichen. Kein Hosting und keine Cloud-Anbindung.

## Codex-Ziel
Zuerst unabhängig auditieren und reproduzierbare Tests ausbauen; keine Versionsnummern ohne nachvollziehbare Verbesserungen. Keine Kundenkontakte, keine Kosten, kein Deployment.
