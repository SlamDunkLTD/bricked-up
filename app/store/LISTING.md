# BrickedUp: Smash & Collapse App Store listing

Copy and paste each field into App Store Connect. The character limits are Apple's, and every field below fits inside them.

## App information (App Store Connect > your app > App Information)

| Field | Value |
|---|---|
| Name (30 max) | `BrickedUp: Smash & Collapse` (already set in App Store Connect) |
| Name under the icon on the iPhone home screen | `BrickedUp` (set in the Xcode project, so it isn't cut off) |
| Subtitle (30 max) | `Smash bricks. Chain the blast.` |
| Bundle ID | `com.itschefff.brickedup` |
| SKU (private, any text) | `brickedup-ios-1` |
| Primary category | Games, then the subcategory **Puzzle** |
| Secondary category | Games, then the subcategory **Casual** |
| Content rights | "No, it does not contain, show, or access third-party content" |
| Age rating | Answer **None** or **No** to every question. The result is **4+**. |
| Price | Free |
| Privacy Policy URL | `https://brickedup.slamdunk.studio/privacy.html` |
| Support URL | `https://brickedup.slamdunk.studio/privacy.html` (contact email: support@itschefff.com) |
| Marketing URL (optional) | `https://brickedup.slamdunk.studio/` |
| Copyright | `2026 Slam Dunk` (change to your legal or trading name) |

## App Privacy (App Store Connect > your app > App Privacy)

1. Click **Get Started**.
2. "Do you or your third-party partners collect data from this app?" Choose **No, we do not collect data from this app**.
3. Save and **Publish**. The listing will show **Data Not Collected**.

This is true because the app build strips out the GoatCounter analytics that the website uses, blocks all internet access with a Content Security Policy, and only keeps the best score and sound setting on the phone.

## Version page (App Store Connect > your app > iOS App > 1.0)

### Promotional text (170 max, can be changed any time without a new review)

```
Tap, smash, chain. Clear the brick yard, make Sweepers, Drills and Blasts, and chase your best score. Free, offline, and no ads.
```

### Description (4000 max)

```
BrickedUp is a fast, satisfying brick-smashing puzzle game. Tap a group of two or more matching bricks to highlight it, then tap again to smash it. Bigger groups score far more, so plan ahead and set up the big hit.

Every level gives you a set number of swings to clear a brick target. Beat it, bank a bonus for every swing you saved, and move on to a tougher yard.

SMASH BIG, MAKE SPECIALS
• Sweeper: clears its whole row
• Drill: clears its whole column
• Blast brick: blows out a wide diamond around it
• Prism: wipes every brick of the most common color
Set one special off next to another and they chain, multiplying your score.

MORE TO MASTER
• Iron blocks from level 3 that take two hits to break
• New colors that join as you climb
• Column clears for huge bonuses
• Extra bricks past the target give you a head start on the next level
• Unused specials carry over to the next level
• Three hints per level when you're stuck

MADE FOR PHONES
• Plays fully offline, so it's great on the train or a plane
• Satisfying haptic feedback on every smash
• Sound effects that respect your silent switch and play nicely with your own music
• Color-blind friendly: every brick color has its own shape

No ads. No accounts. No data collected. Just bricks.
```

### Keywords (100 max, commas, no spaces)

```
brick,smash,collapse,puzzle,blocks,tap,chain,blast,offline,casual,colors,match,break,demolition,yard
```

### What's New (only for later updates; leave empty on 1.0)

Version 1.1:

```
Game Center leaderboard! Your best score now goes on the Original leaderboard, so you can see how you stack up against friends and everyone else. Tap Leaderboard on the start or game over screen to check your rank.
```

### Screenshots

Upload the five PNGs in `app/store/screenshots/` (also in the project files under `brickedup/app-store/screenshots/`) into the **iPhone 6.9" Display** box, in this order:

1. `1-smash.png`
2. `2-hint.png`
3. `3-levelup.png`
4. `4-howto.png`
5. `5-start.png`

They are 1320 × 2868, which is the size Apple asks for. Apple scales them down for the smaller iPhone sizes, so you don't need other sizes. The app is iPhone only, so no iPad screenshots are needed.

### App Review Information

- Sign-in required: **No** (untick it)
- Contact: your name, phone and email (Apple only uses these to reach you about the review)
- Notes:

```
BrickedUp: Smash & Collapse is an original puzzle game built for iPhone. Its home-screen name is shortened to "BrickedUp". All game code, art and fonts are bundled in the app, and it runs fully offline with no account, ads, analytics or network access.

Native features: haptic feedback (UIKit feedback generators) on every smash, special brick and level-up; an ambient audio session so sound effects follow the Ring/Silent switch and mix with the player's music; portrait-locked layout that respects the notch, Dynamic Island and home indicator safe areas; native launch screen and status bar styling.

How to play: tap a group of two or more matching bricks to highlight it, then tap the same group again to smash it. Clear the brick target shown above the board before you run out of swings to reach the next level. "How To Play" below the board explains special bricks.
```

## Website and app versions

The website at brickedup.slamdunk.studio stays free and keeps working exactly as before. The App Store listing doesn't need to mention it, and the app has no links to it other than the Privacy link.
