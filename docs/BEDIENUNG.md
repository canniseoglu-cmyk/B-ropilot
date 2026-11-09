# Installation und Bedienung

**Interner Testbetrieb, Q-Gate geschlossen. Nur erfundene Angaben verwenden.**
Diese Anleitung beschreibt den aktuellen Code. Die mitgelieferte ältere Word-Betriebsanleitung beschreibt Teile des Exportverfahrens noch abweichend.

## Lokaler Start

Alle Dateien in einen geschützten lokalen Ordner kopieren und das HTML-Formular in einem Browser öffnen. Keine Cloud, Konten oder Abonnements nötig. Auf dem tatsächlichen Zielgerät muss die Ausführung lokaler HTML-Dateien noch geprüft werden, insbesondere auf iPhones. Ein verwalteter Browser kann lokale Dateien sperren; nicht dessen Sicherheitsrichtlinien abschalten.

## Anfrage erfassen

1. Eindeutige Vorgangs-ID vergeben. Die vorbelegte Test-ID nicht für mehrere Vorgänge wiederverwenden.
2. Eingangsdatum, Name, Kontakt und Anliegen mit synthetischen Angaben ausfüllen.
3. Sicherheitsstatus menschlich prüfen, prüfende Person angeben und Bestätigung setzen. Bei Gefahren zuständige Notfallstelle einschalten; dieses Werkzeug ist kein Notfallkanal.
4. Zuständigkeit, nächsten Schritt und gegebenenfalls Folgedaten dokumentieren. Folgedaten dürfen nicht vor dem Eingang liegen.
5. „CSV-Zeile vorbereiten“ wählen, Vorschau kontrollieren und CSV herunterladen. Das erzeugt eine Datei; es versendet nichts und trägt nichts automatisch in Excel ein.
6. Nach einer Änderung muss die CSV erneut erzeugt werden. Neuladen/Schließen verliert nicht exportierte Eingaben; keine automatische Speicherung.

## Sammelprüfung

1. CSV-Prüfdatei öffnen, eine oder mehrere Formular-CSV-Dateien auswählen und prüfen.
2. Fehler korrigieren; bei Fehlern ist kein Sammel-Export möglich. Warnungen zu offenen Sicherheitsfällen benötigen separate menschliche Bearbeitung.
3. Geprüfte Sammel-CSV herunterladen. Eine neue Auswahl verwirft frühere Ergebnisse, auch während Dateien gelesen werden.

## Excel-Import: noch praktisch abzunehmen

Mit einer Kopie der Arbeitsmappe arbeiten. CSV über die Text-/CSV-Importfunktion mit UTF-8 und Semikolon öffnen; Datentypen explizit prüfen. Erst nach Sichtkontrolle die Datenzeilen ohne Kopfzeile übernehmen. Originaldatei nicht überschreiben. IDs mit bestehenden Einträgen abgleichen; das Werkzeug kennt diese Einträge nicht. Keine parallele Bearbeitung derselben Arbeitsmappe.

Apostroph-Präfixe sollen Formeln beim Export entschärfen. Vor Freigabe in der tatsächlichen Excel-Version prüfen, dass z. B. `=1+1`, `+SUM(A1)`, `@SUM(A1)` und vorangestellte Leerzeichen als Text behandelt werden. Auch Datum, Umlaute, Mehrzeilentext und erhaltene IDs kontrollieren. Ein erfolgreicher Download bestätigt keinen Excel-Import.

Die vorhandene Musterarbeitsmappe enthält alte Statuswerte und einen textuellen Terminwunsch; sie ist kein freigegebenes Importschema. Details: RISIKEN.md.

## Datenschutz und Übergabe

Offline-Dateien sind weder verschlüsselt noch durch die Anwendung zugriffsgeschützt. Exporte können leicht kopiert werden. Zugriffsrechte, Datensicherung, Löschung und Aufbewahrung organisatorisch festlegen. Keine Echtdaten vor Datenschutzprüfung und ausdrücklicher Freigabe. E-Mail-Vorlagen werden ausschließlich manuell geprüft und versendet; dieser Entwicklungsauftrag beinhaltet keinen Versand.
