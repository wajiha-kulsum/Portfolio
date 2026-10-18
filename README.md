# Wajiha Kulsum — Portfolio

[![CI](https://github.com/wajiha-kulsum/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/wajiha-kulsum/Portfolio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Live site:** [wajiha.xyz](https://wajiha.xyz)

My personal portfolio — work, experience, and a live GitHub contributions graph, all on one page.

Built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and **TypeScript**.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

- The contributions graph reads from GitHub's API (cached server-side, refreshed hourly) and works with zero setup.
- Optionally, copy `.env.example` to `.env.local` and add a `GITHUB_TOKEN` for exact per-day contribution counts instead of heat levels.
- Favicon, app manifest, robots, sitemap, 404 and error pages are all built in.
- CI runs lint + build on every push (Node 24, from `.nvmrc`).

## License

[MIT](LICENSE)
