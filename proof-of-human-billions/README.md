# Proof of Human — The Billions Test

A simple browser game built with React + Vite + TypeScript and TailwindCSS.

You get 10 random pieces of content (text or image). For each, guess whether it’s Human or AI. You have 10 seconds per question. Each correct guess gives +10 points. If you connect a wallet (mocked button), you get a +20% bonus at the end. Share your score!

## Scripts

- `npm run dev` — Start the dev server
- `npm run build` — Production build
- `npm run preview` — Preview the production build
- `npm run typecheck` — Type-check the project

## Getting started

```powershell
# From the project root
cd .\proof-of-human-billions
npm install
npm run dev
```

Then open the shown local URL in your browser.

## Tech
- React (functional components)
- Vite (bundler)
- TypeScript
- TailwindCSS

## Notes
- Content placeholders live in `src/content/data.ts`.
- The "wallet" is a mocked toggle in `WalletConnect.tsx` to apply the +20% bonus.
- The Share button uses the Web Share API if available, otherwise falls back to clipboard or prompt.
