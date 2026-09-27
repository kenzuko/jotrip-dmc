# JoTrip DMC - Living Book preview

This is the JoTrip DMC editorial website approved in visual direction on 27/09/2026, independently maintained from `jotrip-quote`, `jotrip-trip` and Open Phu Quoc. No existing production logic or domain is affected.

## What is implemented
- Real responsive editorial book with six chapters, desktop page-turn, mobile swipe/vertical layout, chapter cards and the icon/service ribbon from the approved reference.
- A further heritage chapter, the people behind the trips, an island perspective and an optional Bespoke email brief. The brief **does not** create a quote, booking, or any server-side record.
- Seven original **real-photography** selections, resized and re-encoded as responsive WebP with metadata stripped, supplied as three compact source bundles in `src/assets-packs/`. Original full-resolution photos are kept in the owner's Google Drive (source IDs below), not unnecessarily copied into this public repository. No generated faces, people or fabricated customer testimonials.
- An exact *pixel crop*, not a redraw, of the official JoTrip mother's `FULL LOGO.png` sourced below; the DMC descriptor is typeset alongside. Correct DMC slogan: `Travel, made personal.`
- The locked main navigation: Câu chuyện, Con người, Phú Quốc, Thiết kế chuyến đi, Liên hệ. The six book chapter thumbnails are supplemental editorial navigation.

## Build and QA
```
npm run build
npm test
```
No dependencies or network downloads are required to build the approved image bundles. Output: `dist/` with `index.html` and about 3 MB of optimized static photo assets. HTML is readable in `src/index.html`; the image archives are only a compact transfer format. `src/photos/` local high-resolution originals are optional and are not committed to GitHub. The preview deliberately sets `robots.txt` to `Disallow: /`.

## Cloudflare Preview only
Connect this repository to Cloudflare, use build `npm run build`, deploy `npx wrangler deploy`. Wrangler Worker name is `jotrip-dmc-preview`, assets directory `dist/`, SPA fallback and `workers_dev` enabled. Do not map production DNS, merge another repo or enable unreviewed automatic builds. Cloudflare connection / credentials are not contained in this repo.

## Photo provenance
All selected photo usage rights were confirmed by the owner in this conversation. Actual source files are from the owner's supplied Drive folders, excluding Can Gio, Saigon, Nha Trang and Da Lat. Source file IDs: airport `1tME7P97V1kQ5XGd47yKVT15cAEOIMbOs`; boat `1oCWyKnpNlQMWcAdhSjkX4lTzImrda0Ka`; resort `1HthKc2cvOTGeMrwYPYuYlQI9GDZT-n-f`; family `1fh5T65SUBo2sKSEeelD94mF0BoevAlAp`; lunch `1kJ4cODWfk8kycebRQSe1a2pL7LMBJmuA`; evening `1tLDZiAdjVjtN_EvWtdSAN_sJMejuxFT9`; driver `1lsTttWoC7yxMjnECheokIiAHgdkUQ77s`. Official JoTrip mother logo `1aE5Ywq2taDkSDppjFFXPFNqDOqF47ond`.

Images are used as separate documentary vignettes; the page never implies they all belong to one tour. No unverified historical year, guest quote, satisfaction figure or booked-service state is asserted.
