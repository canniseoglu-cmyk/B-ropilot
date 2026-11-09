# Instructions for Codex

Work autonomously on this offline prototype, prioritizing customer safety, data privacy, correctness and maintainability.

1. **Do not** deploy, purchase, send emails, contact customers, access external services, or process real personal data.
2. Keep the Q-Gate **closed**. Do not claim production readiness or a completed Safari/Excel test without running it.
3. Audit CSV injection, CSV parsing, duplicate detection, dangerous inputs, missing data, accessibility, date validation, and spreadsheet import.
4. Write repeatable tests; distinguish mocked unit tests from browser/device integration tests.
5. Avoid new dependencies and network access where possible. No credentials or private data in commits.
6. Make small, verifiable changes, run `npm test`, document any failed tests and remaining blockers.
7. For emergencies, prominently tell users to use appropriate emergency services; do not represent keyword detection as a safety guarantee.
8. Provide a concise German summary with test evidence, changed files, open risks and Q-Gate status.
