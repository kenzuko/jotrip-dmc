# JoTrip DMC - The Island Sequence

Clean rebuild from the owner-approved **03/10/2026** direction.

The previous Island Reading Room / physical-book homepage is retired. This repository now treats **The Island Sequence** as the public creative baseline.

## Creative north star

> **PHU QUOC, FROM THE INSIDE.**
>
> Đi cùng người bản địa.  
> Hiểu hòn đảo.  
> Rồi yêu cả hành trình.

JoTrip DMC should not look like a luxury tour catalogue, an OTA, a resort brochure or a UI gimmick. The site should feel like a quiet editorial sequence about the real island, with JoTrip appearing as the local team capable of shaping and operating the journey.

## Public sequence

1. **Phu Quoc, from the inside** - image-led opening, minimal selling.
2. **A living island** - perspective before product.
3. **The people who know this island** - people, craft, rhythm and access.
4. **One Island. Many Ways In.** - Sea / Roots / Wild / Moments.
5. **Our approach** - “We don't begin with an itinerary. We begin with you.”
6. **Quietly capable** - operational proof without logo walls or luxury jargon.
7. **Journey Paper** - a calm, editorial travel brief.

## Visual system

`src/styles/00-foundation.css` is the single public visual source of truth.

- warm ivory / charcoal / neutral natural tones
- editorial serif + restrained system sans
- real photography with light neutral colour treatment where useful
- large image fields, generous whitespace, minimal UI
- no glassmorphism
- no gold-gradient luxury styling
- no carousels
- no page-flip / physical-book interface
- no floating “Book now” CTA
- desktop and mobile are intentionally composed, not merely scaled

## Photography lock

The current public baseline uses only the verified real JoTrip archive packaged in `src/assets-packs/`.

Required photographs include:
- airport
- boat / sea
- resort / stay
- family
- lunch / table
- evening
- driver / local team

No generated image is used in the shipped homepage. If a missing documentary subject is added later from the internet, use a real image with a clearly understood reuse right and keep source/licence evidence in the repository.

## Product language

Quiet luxury comes from judgement, access, timing, relationships and operational care - not from calling everything “premium”, “VIP” or “luxury”.

The homepage deliberately avoids tour-card language. Sea / Roots / Wild / Moments are editorial ways into the island, not package categories.

## Journey Paper

The preview form is intentionally non-transmitting. It allows a guest to review a local journey brief without pretending a CRM or secure intake is already connected. Production intake must be wired deliberately before public release.

## Build and QA

```bash
npm run build
npm test
```

The tests lock the new Island Sequence copy, require real repository photography, reject retired Reading Room architecture and keep the preview noindex.

## Cloudflare preview

Worker: `jotrip-dmc-preview`.

A green push to `main` triggers the Cloudflare preview deployment through GitHub Actions when the configured repository secrets are available. Preview deployment and production DNS remain separate states.
