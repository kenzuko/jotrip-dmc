# JoTrip DMC - The Island Reading Room V3

A clean rebuild of the JoTrip DMC preview around one immersive reading room: a real-photo Living Island Book, small documentary memories, a paper-style bespoke travel brief, subtle opt-out interaction sounds, and a dedicated lightweight owner text editor at `/admin/`.

## Product rules
- No Sunset Town / Kiss Bridge landmark in the room. The atmosphere is intentionally a non-specific Phu Quoc sea view.
- Real JoTrip photography is used for people, groups, meals and journey memories. The room itself is an art-directed illustration.
- Destination reference stays separate: a small link sends visitors to `https://openphuquoc.com/` for island information.
- `/admin/` does not touch Open CMS. It saves local preview overrides and can export/copy `content.json`; global publishing is done by committing `src/content.json`.
- Bespoke is not a booking engine yet. It preserves a local draft and opens an email only after the visitor reviews the structured travel brief.
- Preview remains `noindex`; no production DNS mapping is configured.

## Build
`npm run build && npm test`

## Cloudflare preview
Worker: `jotrip-dmc-preview`. GitHub Actions deploys `main` when repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are available.
