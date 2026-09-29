# JoTrip DMC - The Island Reading Room

Clean production rebuild from the owner-approved **28/09/2026** creative direction.

This is deliberately not another visual patch on top of the previous V3/V4 room. The homepage, physical book, responsive composition and room atmosphere now form one maintainable system.

## Creative north star

> Có một chỗ đã được chuẩn bị cho bạn.  
> Phần còn lại, chúng ta cùng viết tiếp.

The homepage is a quiet Phu Quoc reading room prepared for a guest. It is not an OTA, a conventional luxury landing page, a game or a resort brochure.

Core physical objects:
- the Living Island Book - the main narrative object
- a small welcome note
- a welcome drink interaction
- **Những chuyện còn để trên bàn** - real JoTrip documentary memories
- a paper travel brief
- a calm sea/window atmosphere
- small sound and table-of-contents controls

## Visual architecture

`src/room.css` is now the single visual source of truth.

The retired V3 `src/room-image-parts/` artwork is intentionally removed. Do not restore it and do not layer V4.x override blocks back into the stylesheet.

The approved room atmosphere is stored in `src/approved-room-parts/` and built as:

`/assets/room-window-approved.webp`

It is atmosphere only. Documentary people and journey memories continue to use the verified real JoTrip photo archive from `src/assets-packs/`.

Desktop and mobile are separate compositions:
- Desktop centers a thick physical open book inside the room.
- Mobile is not a crop of desktop and does not squeeze a two-page book into a phone-sized frame.

## Product locks

- No Sunset Town, Kiss Bridge / Cầu Hôn or landmark-specific hero view.
- JoTrip master wordmark remains unchanged.
- Brand colors: yellow `#FCBC12`, green `#77944C`.
- Slogan: **Travel, made personal.**
- Quiet luxury comes from attention, materials, restraint and human care - not generic VIP/premium imagery.
- Homepage stays restrained. Do not add feature sections simply because there is empty space.
- Open Phu Quoc remains the destination reference through a small outbound link.
- Bespoke remains a paper-style travel brief. It is not represented as a confirmed booking or server-side CRM submission.
- `/admin/` is JoTrip DMC's lightweight text editor and is separate from Open CMS.
- Preview remains `noindex`; production DNS is unchanged.

## Content sources

Verified JoTrip photography is used for:
- airport
- boat
- resort
- family
- lunch
- evening
- driver

Do not fabricate guest quotes, dates, roles, awards, statistics or detailed memory stories without verified context.

## Build and QA

```bash
npm run build
npm test
```

The tests explicitly reject the retired room artwork and legacy mobile-book/CSS override architecture.

## Cloudflare preview

Worker: `jotrip-dmc-preview`.

A green push to `main` triggers the Cloudflare preview deployment through GitHub Actions when the configured repository secrets are available. Preview deployment and production DNS are separate states.
