# Risiken und Freigabevoraussetzungen

**Q-GATE GESCHLOSSEN. Kein Produktions-, Verkaufs- oder Datenschutzfreigabenachweis.**

## Behobene technische Fehler

- Hoch: CSV-Export konnte nach Dateiauswahlwechsel durch ein älteres Leseergebnis freigegeben werden. Revision verwirft veraltete Ergebnisse.
- Mittel: Dateilesefehler ohne verständlichen Fehlerzustand. Fehlerbehandlung sperrt Export.
- Mittel: Unmögliche Kalenderdaten, ungeprüfte optionale Folgedaten und leere Prüfperson wurden akzeptiert. Strikte Validierung ergänzt.
- Mittel: Parser akzeptierte Zeichen nach schließenden Quotes und veränderte so ungültige CSV stillschweigend. Wird nun abgelehnt.
- Mittel: Nur Leerzeichen in Formular-Pflichtfeldern und alte Vorschau nach Änderung. Pflichtinhalt geprüft; Vorschau und Reset abgesichert.
- Bedienung: Schmale Displays und Dateieingabe konnten seitlich überlaufen. Größenbegrenzung und kleine Bildschirmabstände ergänzt.

## Offene Blocker vor Auslieferung

1. Echter iPhone-/Safari-Test: lokales Öffnen, Bedienung, Dateiauswahl, Download und Wiederfinden der Datei. Chromium-Viewport ist kein Gerätetest.
2. Tatsächlicher Excel-Import und Öffnen der Word-Vorlagen, einschließlich Formelinjektion, Encoding, Datumsformat, Texttypen und Dropdown-Kompatibilität. XML-Prüfung ersetzt Microsoft Office nicht.
3. Die alte Arbeitsmappe enthält `Offen` statt `OFFEN – manuell prüfen`, einen Terminwunsch `Donnerstag` statt YYYY-MM-DD und abweichende Sicherheitsfall-Statuswerte. Dropdowns und Schema vor Abnahme abstimmen; vorhandene Beispiele sind nicht durchgehend im aktuellen Importformat gültig.
4. Ältere Word-Betriebsanleitung beschreibt Textausgabe/optionales Kopieren statt des tatsächlichen CSV-Downloads. Vor Lieferpaket überarbeiten; aktuelle Markdown-Anleitung nutzen.
5. Datenschutzprüfung, Berechtigungen, Aufbewahrung/Löschung, Datensicherung und Verantwortlichkeiten festlegen. Keine Verschlüsselung oder Anwendungsauthentifizierung vorhanden.
6. Fachlich validiertes Notfallverfahren und menschliche Sicherheitsprüfung. Stichworterkennung erkennt nicht alle Gefahren und darf keine Sicherheit suggerieren. Bei akuter Gefahr zuständige Notfallstelle / 112 von einem sicheren Ort verständigen.
7. Bestehende Excel-IDs werden nicht abgeglichen; gleichzeitige Bearbeitung, manuelle Übernahme und wiederverwendete Test-ID können Duplikate oder Datenverlust erzeugen. Abgleich organisatorisch erforderlich.
8. CSV-Prüfung ist keine fachliche Plausibilitäts-/Authentizitätsprüfung. Zuständigkeit, frei eingetragene Status-/Kontaktdaten und Inhalte müssen Menschen prüfen. Sehr große Dateien haben noch keine Größenbegrenzung und können den Browser blockieren.
9. Praxistest mit geeignetem Nutzer, dokumentierte Produktabnahme und ausdrückliche Eigentümerfreigabe fehlen. Keine Nutzerkontakte im Rahmen dieses Auftrags.
10. 99 € ist eine unvalidierte Preishypothese. Nachfrage, tatsächliche Übergabezeit und Deckungsbeitrag sind offen; keine bestätigten Verkäufe.

## Entwicklungsübergabe

Änderungen liegen auf `fix/offline-validation-and-import`. GitHub-Git-Zugriff funktioniert. Die GitHub-API ist durch den Proxy mit CONNECT-403 blockiert; `gh api` liefert Forbidden. Ein Pull Request kann erst nach erlaubtem Zugriff auf `api.github.com` erstellt werden. Das Speichern einer entsprechenden Netzwerk-Ergänzung wurde vom Konfigurationsdienst mit INVALID_ARGUMENT abgelehnt; Persistenz ist unbestätigt. Keine zusätzlichen Zugangsdaten angefordert.
