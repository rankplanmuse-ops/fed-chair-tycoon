# Fed Chair Tycoon

One lever. Two ways to fall.

A satirical one-screen balance game. Parliament could not agree on a plan, so it handed the interest-rate lever to someone unelected: you. Hold inflation near 2%, keep the street calm, and survive a 48-month term while the national debt ticker spins.

Play it in the browser: **https://rankplanmuse-ops.github.io/fed-chair-tycoon/**

## How to play

- **The needle.** Green is calm. Slide left into recession and the President replaces you; slide right into inflation and the crowd chooses a strongman instead.
- **The lever.** One interest rate, moved in 0.25 steps with the two big triangles. It works with a lag, like everything in that building.
- **The street.** Gas and eggs are the scoreboard everybody reads. The scene changes with the economy: boom, inflation, recession, disaster, war.
- **Items.** Single-use Washington speak: speeches, blame cards, emergency buttons. They reset the street, briefly.
- **The Serfdom Ladder.** Lose for long enough and the Hill starts helping: price controls, wage controls, revised statistics. Win with the ladder advanced and the victory tastes different.
- **The wire.** The Daily Ledger prints typewriter headlines from both ends of the street. Nobody in it is on your side.
- **Endings.** Survive 48 months, resign by letter from Settings, or get ousted. Every term ends in an official Term Report with a grade, ready to share.

Responsive from the start: phone, tablet and desktop layouts, with the Ledger and the Hall of Chairs as side rails on wide screens.

## Run it locally

No build step, no dependencies. It is plain HTML, CSS and JavaScript.

```sh
git clone https://github.com/rankplanmuse-ops/fed-chair-tycoon.git
cd fed-chair-tycoon
python3 -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` in a browser.

## Tech

- Vanilla HTML/CSS/JS in three files: `index.html`, `styles.css`, `game.js`
- Original art plates and fonts in `assets/` (Baloo 2, Nunito, Courier Prime, all open license)
- Game state and your Hall of Chairs results live in `localStorage`. No accounts, no tracking, no server.
- Deployed to GitHub Pages by the workflow in `.github/workflows/pages.yml`

## License

MIT. See [LICENSE](LICENSE).

A satire. No parties, no politicians, no living figures are named. Any resemblance to a real central bank is entirely the point.
