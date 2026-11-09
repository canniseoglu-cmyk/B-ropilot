# Technischer Testbericht

9. November 2026 — Q-GATE GESCHLOSSEN.

## Ausgeführte Prüfungen

| Prüfung | Ergebnis | Aussagegrenze |
|---|---|---|
| Ursprüngliches `npm test` | 13/13 bestanden, Exit 0 | Importlogik mit simuliertem DOM |
| Erweiterte Tests gegen ursprünglichen HTML-Code | 28/40 bestanden, Exit 1; 12 gezielte Fehler nachgewiesen | Baseline per `git show HEAD:...` in temporären Ordner kopiert; Repository nicht zurückgesetzt |
| `npm test` nach Korrektur | 40/40 bestanden, Exit 0 | Node.js 24.22.1, npm 11.9.0; Logiktests mit simuliertem DOM |
| `node tests/browser-smoke.cjs` | 21/21 bestanden, Exit 0 | Echtes Headless-Chromium 156 mit Playwright und temporärem Loopback-Server; kein Safari/iPhone |
| `git diff --check` | bestanden, Exit 0 | Whitespace-Prüfung |
| ZIP/XML-Prüfung aller drei Office-Dateien | keine erkannten externen Beziehungen, Makros oder Excel-Formeln | Statische Strukturprüfung, keine Office-Ausführung oder vollständige Sicherheitsprüfung |

Die 40 Logiktests prüfen CSV-Roundtrip, Quotes/Trennzeichen/Mehrzeilentext, UTF-8-Zeichen und BOM, Formelpräfixe, Steuerzeichen, Pflichtfelder, Duplikate, Kopfzeile/Spaltenzahl, Sicherheitsstatus, Prüfperson, Kalendertage/Schaltjahr sowie optionale und rückwirkende Folgedaten. Eingabedateien bleiben unverändert.

Die 21 Browserprüfungen decken Formulareingabe, CSV-Erzeugung und Download, verworfene Vorschau/Export nach Änderung und Reset, Leerzeichen-Pflichtangaben, rückwirkenden Termin, beispielhafte Gasgeruch-Sperren und Sicherheitswarnung, leere Dateiauswahl, echten Datei-Upload, CSV-Prüfung und heruntergeladenen Inhalt, veraltete/überlappende Lesevorgänge, ungültige CSV nach erfolgreicher Prüfung sowie simulierte Dateilesefehler ab. Zusätzlich Layout beider Seiten bei 320, 375 und 390 Pixeln, keine JavaScript-Laufzeitfehler oder externen HTTP-Anfragen während dieser Tests.

Asynchrone Dateilesen-Rennen und Lesefehler werden im Browser gezielt durch Ersetzen von File.text simuliert. Der normale Upload/Download verwendet die Browser-Datei-API. Mobile Tests ändern den Chromium-Viewport; sie emulieren weder iOS-Dateiverwaltung noch Safari.

## Nicht ausgeführt / offen

- Tatsächliches Öffnen als lokale Datei auf iPhone und anderen Zielgeräten. In der Cloud liefert Chromium bei file:// ERR_BLOCKED_BY_ADMINISTRATOR; Testserver als dokumentierter Testweg genutzt.
- Microsoft Excel-/Word-Ausführung, LibreOffice-Import und echter Safari-Test.
- Vollständiger Accessibility-Audit mit Screenreader, Tastatur und Zielgerät. Labels und Live-Status sind vorhanden; Layouttests sind kein Barrierefreiheitsnachweis.
- Vollständige Gefahren-/Notfallbewertung, Datenschutzprüfung oder rechtliche Freigabe.
- Nutzer-Praxistest, Nachfrage-/Preisvalidierung, Produktabnahme.

Historische Berichte mit 13 Tests bleiben zur Nachvollziehbarkeit erhalten. Dieser Bericht dokumentiert die aktuelle Entwicklung und erteilt keine Produktfreigabe.
