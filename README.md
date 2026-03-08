# Volleyball Legends Wiki

Fan-made Next.js wiki and tools hub for Roblox Volleyball Legends.

## Positioning

- Main keyword: `volleyball legends codes`
- Secondary clusters: `styles`, `abilities`, `tier list`, `updates`, `controls`, `ranks`, `discord`, `pity`
- Site model: query-first inner pages rather than a homepage-first portal

## Current MVP

- `/codes`
- `/styles` and `/styles/[slug]`
- `/abilities` and `/abilities/[slug]`
- `/updates` and `/updates/[slug]`
- `/guides/controls`
- `/guides/ranks`
- `/guides/discord`
- `/guides/trello`
- `/guides/pity-system`
- `/tools/style-compare`
- `/tools/update-countdown`
- `/tools/reroll-advisor`
- `/tier-list/styles`
- `/tier-list/abilities`
- `/tier-list/spiker`
- `/tier-list/setter`
- `/tier-list/libero`

## Source policy

- `Official`: Roblox listing, official Discord, clearly published developer info
- `Community`: Fandom pages, player guides, third-party trackers, Rolimon's mirrors
- `Site`: tier grouping, compare scores, reroll heuristics, page summaries

This split is intentional. The site should never present community-maintained odds or tier notes as official game data.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Static data files in `src/data`

## Local development

```bash
npm install
npm run dev
```
