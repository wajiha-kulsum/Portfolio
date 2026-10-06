# Wajiha Kulsum — Portfolio

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
- Add a `GITHUB_TOKEN` in `.env.local` for exact per-day contribution counts instead of heat levels.
- `npm run build` and `npm run lint` both pass clean.
