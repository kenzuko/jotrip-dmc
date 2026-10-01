# JoTrip DMC - CLEAN REBUILD

Reset date: 2026-10-01

This branch is intentionally a clean slate.

## Hard rule

Do **not** recover, copy, import, port, or reuse any previous JoTrip DMC page implementation from Git history.

The former room/scene implementation, V3/V4/V5 visual layers, approved-scene composites, mobile crops, Phase 1 overlays, legacy CSS/JS/HTML, old QA, and old visual-lock documents were deliberately removed from the working tree because the site is being rebuilt from scratch.

## Preserved material

Only source material that is not the old page implementation remains:

- `data/content/content.json` - editorial/content source
- `data/source-assets/webp-a.tar.gz`
- `data/source-assets/webp-b.tar.gz`
- `data/source-assets/webp-c.tar.gz`
- `data/source-assets/airport-editorial.webp`

These are inputs for a new implementation, not permission to reconstruct the old page.

## Rebuild rule

Start with a new information architecture, new markup, new styles, new responsive composition, and new QA.

Do not use historical commits as implementation references.

Public/main is not changed by this reset.
