# JoTrip DMC - Editorial Living Book V2

Status: full working implementation built and tested locally, pending source sync and deployed browser QA. Do not replace the current preview before inspecting this refactor.

## Design correction
The existing site deploy is a long landing page below an approved book cover. The next version preserves **the opening physical-book visual, all six chapter tabs, genuine JoTrip photos, original JoTrip wordmark and lower service icon ribbon**, but makes the cover a navigable entry to an actual editorial website.

## Independent page system
- `/`: existing approved Living Book cover + concise entrances into three editorial pillars
- `/cau-chuyen/`: Phú Quốc Lux → JoTrip heritage, authentic separate photographic vignettes; no invented year or testimonials
- `/con-nguoi/`: collective team, local operating network and verified responsibilities (no unverified employee identity/photo tags)
- `/phu-quoc/`: destination atlas spanning south and north, private resort stays and local experiences, never reducing DMC to An Thới alone
- `/phu-quoc/nam-dao/`, `/phu-quoc/bac-dao/`, `/phu-quoc/nghi-duong/`: small editorial pathways
- `/bespoke/`: an editable anonymous brief, with dynamic client-side summary, reviewable **opt-in mailto**, no server-side intake, price, quote or booking
- `/lien-he/`: real contact information
- `/partners/`: B2B-specific explanation and contact
- `/privacy/`: strictly preview-specific explanation
- Equivalent `/en/` routes for the English editorial edition.

## Keep invariant
- DMC descriptor: Travel, made personal.
- Brand sentence: Đi cùng người bản địa. Hiểu hòn đảo. Rồi yêu cả hành trình.
- JoTrip real photo provenance only, never AI likenesses or non-Phú Quốc archive photos.
- Cloudflare Worker preview only, robots noindex; do not map production DNS prematurely.
- Preserve the separate jotrip-quote repo as the system of record for actual quote/proposal workflows.
- No Open Phu Quoc, Airport, Weather or Transit repository changes.

## QA gates
Build must generate full multipage static HTML with VI and EN editions. Confirm all local links, mobile readability, accessible chapter controls, correctly loaded real photography and logo, no unsupported operating claims, and explicit email consent before merging to preview main. Test desktop, laptop and iPhone viewport widths. 