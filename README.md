# BrickedUp

A collapse-style brick smashing game. Tap a group of two or more matching bricks to clear them, chain big groups, use special bricks, and hit each level's brick target before you run out of swings.

Play it at https://brickedup.slamdunk.studio/

The whole game is a single self-contained `index.html`, served by GitHub Pages from the `main` branch.

## Shipping changes

Bump `<meta name="build" content="...">` in `index.html` whenever you change the game, for example `2026-11-15.2`. Open copies of the game, including home-screen installs on iPhone, check that stamp when they launch or come back to the foreground, and reload onto the new version when it changes. They never reload in the middle of a game.
