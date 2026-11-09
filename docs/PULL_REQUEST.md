# CSV-Import und Offline-Formular gegen ungültige und veraltete Daten absichern

Der CSV-Import akzeptierte unmögliche Kalenderdaten, ungeprüfte Folgedaten, leere Prüfpersonen und ungültige Zeichen nach geschlossenen Quotes. Außerdem konnte eine ältere asynchrone Dateiprüfung nach einer Auswahländerung einen veralteten Export freigeben. Strikte Prüfungen und eine Revisionskennung verhindern diese Fälle; Lesefehler sperren den Export mit verständlichem Hinweis.

Das Formular blockiert Pflichtinhalte aus Leerzeichen und ungültige Kalenderdaten. Änderungen und Reset verwerfen CSV und Vorschau. Kleine Bildschirmgrößen werden ohne horizontalen Überlauf dargestellt. Dokumentation beschreibt tatsächliche Architektur, Bedienung und offene Freigabeblocker einschließlich veralteter Office-Beispiele.

Validierung: ursprünglich 13/13 Logiktests; erweiterte Suite gegen ursprünglichen Code 28/40 (12 nachgewiesene Regressionen); nach Korrektur 40/40 Logiktests und 21/21 Chromium-Browserprüfungen. `git diff --check` bestanden. Keine neuen Paketabhängigkeiten.

Q-Gate bleibt geschlossen. Kein echter iPhone-/Safari- oder Excel-Test, keine Datenschutz-/Produktfreigabe. Kein Deployment, keine Kundendaten, keine Kundenkontakte.
