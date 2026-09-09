# Development Status — 2026-09-09

## Target

V0.6 Beta / Classroom Pilot：V3.3 → Gemini extraction → Recording Rule Engine → AI feedback → local learning record → Google Sheet classroom backend.

## Completed in this build

- [x] UI version updated to V0.6 Beta.
- [x] Form target upgraded from V3.0 to V3.3.
- [x] V3.3 C-zone schema: Cover Test, EOM, stereopsis, color vision, 3-reading IOP, Worth 4 Dot, NPC, pupils, VF, Hirschberg/Krimsky/Brückner, NPA/Amp/PH, Maddox/MT, NRA/PRA, anterior segment OD/OS, posterior segment OD/OS, gait.
- [x] V3.3 D-zone schema: distance/near VA, Entering Rx, Final Rx, Prism Base, binocular/monocular PD D/N, final VA, near range.
- [x] V3.3 E-zone additions: further exam and referral urgency.
- [x] Recording Rule Engine upgraded to `V0.6-recording-v3.3`.
- [x] Conservative design: no disease diagnosis or hard-coded clinical referral thresholds.
- [x] Gemini model list locked to `gemini-2.5-flash` for pilot consistency.
- [x] Student class / course metadata.
- [x] Submission ID, attempt, source, system/form/schema/rule/prompt/model version tracking.
- [x] Google Sheet sync settings in UI.
- [x] Browser → Apps Script fire-and-forget sync using text/plain / no-cors for GitHub Pages compatibility.
- [x] Raw images remain local; Google Sheet receives learning data and de-identified JSON only.
- [x] Apps Script auto-creates Submissions / Students / Dashboard / Settings / SyncLog.
- [x] Duplicate submission protection.
- [x] Student longitudinal attempts / last / best / average / review count.
- [x] Basic class Dashboard formulas.
- [x] Formula-injection protection and long-cell truncation in backend.
- [x] Front-end JS syntax check passed.
- [x] Apps Script JS syntax check passed.
- [x] Complete V3.3 mock validation test: 20/20 + 20/20 + 20/20, 0 issues.
- [x] Google Sheet submission row test: 33 headers = 33 row fields.

## Still requires real-world manual test tonight

- [ ] Paste a real Gemini API Key and test 2-page V3.3 extraction.
- [ ] Compare extraction with the actual handwritten form for at least 3–5 samples.
- [ ] Create Google Sheet, configure SPREADSHEET_ID, deploy Apps Script `/exec` URL.
- [ ] Confirm PING appears in SyncLog.
- [ ] Confirm a real submission appears in Submissions and Students.
- [ ] Test camera permission on GitHub Pages HTTPS.
- [ ] Test mobile Safari / Chrome.
- [ ] Test two-page PDF upload.
- [ ] Test intentional errors: missing Axis, only 2 IOP readings, referral without urgency.

## Known V0.6 limitations intentionally retained

1. Gemini API Key is still browser-side. Classroom Pilot should use each user's own API Key. Do not embed a shared teacher key in GitHub.
2. Apps Script POST is fire-and-forget from the browser; due to cross-origin constraints, the front end can report that the request was sent but cannot cryptographically confirm the Sheet row was saved. `SyncLog` is the server-side source of truth.
3. `CLASS_TOKEN` is a lightweight classroom write gate, not full authentication.
4. Clinical disease/referral numeric thresholds are not yet part of Rule Engine.
5. Gold Standard dataset and extraction accuracy metrics are not yet completed.
6. Cloud dashboard is in Google Sheet; the web app's Learning Analytics page still summarizes only the current browser's local records.

## Recommended next development after tonight's pilot works

V0.7: add cloud-read teacher dashboard + correction/re-upload comparison.

V0.8: Gold Standard scoring, field-level extraction accuracy, false positive / false negative analysis.

V1.0: secure backend proxy for Gemini, teacher-managed keys, authentication, finalized Rule Version 1.0.
