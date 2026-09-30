# JoTrip DMC - Approved Experience V2 LOCK
Status: USER APPROVED 2026-09-30
Source: exact approved art direction screenshot + final approval of all six interaction cues.
Branch baseline: feat/dmc-exact-approved-scene at 1d2d0eaa2888d87056bc4ed30dab842693cdaffc
Scope: design and engineering requirements only. This document does not authorize merging or automatically replacing the existing preview.

## Immutable visual baseline

Approved scene is the source of truth for camera angle, warm room, light, seaside opening, table, thick open physical book, drink, note, chair, surrounding photos and placement of hero content. Treat it as a pixel-locked reference outside narrowly defined editing regions. Never redraw the room in CSS, recrop it into a different composition, or add SaaS UI cards, fake geographic landmarks, overlays and controls on top of the visual. No AI-generated documentary guests, photos, testimonials or airport images.

Store original reference as unchanged immutable asset. For the functional website, make a working scene derivative only to remove *baked-in visible text* and *replaced-page photo pixels*, while matching surrounding pixels/texture/lighting. Replace removed text with accessible HTML, and embed a real verified JoTrip airport photo *inside* the existing perspective/bend/shadow of book page. Do not simply paste a rectangular crop: match page geometry, paper gutter and foreground edge. Avoid duplicating old photo remnants under the new photo. The visual baseline and original source image remain byte-for-byte safe in repo.

The homepage desktop hero, book text and navigation must be **visible live HTML**, not words in screenshot or hidden-only semantic copy. Localized content keys drive all visible site UI, modals, buttons, form validation, footer, navigation and image captions. Use the approved Vietnamese originals as master: headline 'Đi cùng người bản địa. Hiểu hòn đảo. Rồi yêu cả hành trình.', accepted subcopy, chapter heading 'Hòn đảo trong chúng tôi.' and accepted revised paragraph. Preserve the complete approved Chapter 01 origin text separately inside the book. English layout should have authored line breaks, never machine-translate snippets blindly. Mobile is an art-directed, separately laid out composition, using actual reference crops, but never a zoomed desktop screenshot containing baked text.

## Discoverable interactions (subtle, elegant)

1. Opening: one gentle hint after ~2 seconds, once per session (not an infinite animation): book-corner hint and slight note cue. Small localized tooltip 'Có vài câu chuyện đang chờ bạn khám phá.' disappears; no hijacking keyboard focus.
2. Book: on desktop hover/focus a localized 'Mở sách' tooltip and extremely subtle page edge shadow/lift, drawn from approved paper pixels if an independently isolated page-edge element is available. On tap/click open the living book, keep realistic paper transition. Never animate the whole baked-in book image or cause original pixels to ghost.
3. Note: desktop hover/focus small note-lift and hint 'Đọc lời nhắn'. When selected, reveal a paper surface that visually derives from the note and stays visually connected to the room. On mobile, clear persistent discreet tap cue rather than hover-only discovery.
4. Documentary polaroid photos: on hover/focus subtle lift/tilt, localized hint; selected photo expands from its own position into an editorial viewer with true photo and sourced caption. Do not synthesize guest quotes or events.
5. Journey Paper: a subtle edge-light and small contextual label 'Kể chúng tôi nghe'. On click open tactile itinerary/brief stationery rather than an unrelated modal. Avoid competing initial CTAs on the hero.
6. Table of contents: discreet physical bookmark near book edge; on selection expose an editorial bookmark/slip (not huge blocking panel). Native keyboard and touch accessibility.

Desktop hover and keyboard focus are equivalent; pointer interactions must work with actual focus styles. On touch devices provide clear small persistent signifiers for primary objects, one-tap access. Never rely on hover. Target min 44x44 CSS px for touch. Reduced-motion disables nonessential animations; no looping bounce or glowing pulses. All visual hints must preserve initial calm premium still frame. Check at 1536x864 desktop, at least one laptop viewport, 390x844 iPhone and other sensible mobile size.

## Same design language after first click

Current internal modal design is NOT approved merely because build and browser QA passed. Note, photo viewer, reading book, table of contents and Journey Paper must look made of the same physical materials, typography, light and quiet motion as homepage. Typography hierarchy and negative space must be coherent. Keep source story chapter untouched. Reassess other chapters by actual traveller needs rather than 6 repetitive marketing messages: what can JoTrip organize, what real evidence exists, what support is offered, how a personal journey starts. Keep vetted documentary photography and avoid unverifiable claims. No link saying 'video' unless real authorized video exists.

Journey Paper progressive disclosure: short welcoming stage (travel party, broad dates, travel pace); deeper optional details only as relevant (adults/children age ranges, stays and booking status, interests, transport, food preferences, accommodation, pace, logistics and access needs if volunteered, most important trip priority, and preferred communication). Budget optional and not first. Clearly separate customer-submitted inquiries from locally saved Draft 01. Keep user control of sensitive details; don't send form data to analytics. GitHub Pages has no functional private form backend: do not pretend JoTrip received a draft. Choose compliant delivery infrastructure and provide truthful receipt acknowledgement only once actual delivery is verified.

## Sound design

Use genuine, sourced recordings with licenses independently verified for commercial website use. Prefer far-away sea ambience, soft wind/leaves; sounds for page/note/printed photo short and quiet. No fake music, no autoplay, no unexpected loudness or surprise. Default OFF. Explicit opt-in button; load sound assets only *after* the user enables it; smooth fade in/out; mute on tab hidden if appropriate; persist choice only if safe. CC0 preferred; licensed assets from Freesound/Mixkit/Pixabay considered only after checking each specific file's legal terms, attribution obligations, restrictions and keeping SOURCE/LICENSE/DATE evidence in docs/AUDIO_SOURCES.md. Do not pull arbitrary audio from public URLs or use NC assets for commercial pages. A quiet experience must remain fully usable even if audio fails.

## Validation & rollout gates

Phase 1: exact-scene separation and locale architecture. Compare screenshot against immutable approved art outside agreed dynamic regions; confirm no baked-in visible text, no photo-page rectangle artifact. Approve screenshots BEFORE the next phase.
Phase 2: interaction signals on desktop + mobile; keyboard/touch, reduced motion and no animation ghosting. Show both static and action screenshots.
Phase 3: coherent note/reader/photo/TOC editorial surfaces, aligned to homepage. Screen capture every state.
Phase 4: visitor-first content audit, approved texts immutable until specifically changed; VI & EN layout/translation QA.
Phase 5: progressive Journey Paper and privacy-safe actual send semantics.
Phase 6: licensed sound + Safari/iPhone/Chrome/performance QA.

For each phase use separate clean feature branch and commit, with browser screenshots and asset/network checks, no blanket '5/5 tests = design passed' assertion. Keep main and Cloudflare untouched until explicit go-live approval. DO NOT deploy to existing user-visible GitHub Pages preview merely by pushing a plan branch. A preview replacement requires explicit review when visual changes are involved.

## Key acceptance checklist

- Room pixels outside localized clean-plate zones match approved screenshot.
- Exact approved layout/story/real-photo assets preserved; airport guests are the subject, printed into physical book perspective.
- Visible homepage copy actually switches VI↔EN (not hidden DOM only), and is editable from a single content system.
- Every interactive object is discoverable, including on mobile, but the original still scene remains calm.
- Every subsequent surface belongs to the same tactile world; no giant accidental dialog/overlay.
- Human-readable and accurate purpose/limits of each interaction (no fake 'video' or fake 'sent').
- Progressive form collects useful trip needs without over-collecting, drafts safely and has truthful send status.
- Sound source license evidence is preserved, default off and opt-in.
- QA includes visual/manual review separately from build and network/runtime tests.
