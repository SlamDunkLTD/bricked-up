# BrickedUp skinning guide

Everything you see in BrickedUp is currently drawn in code: the bricks, the specials, the effects and the frame. Any of it can be swapped for your own art. This guide lists every visual asset, the size and format to export it at, and how to hand it over.

You don't have to make everything. Replace any subset, and anything you skip keeps its current look. The bricks are the part that changes the feel of the game most, so start there.

## How to hand the files over

1. Export with the exact filenames below, all lowercase.
2. Put them in one folder called `skin/`, with the same subfolders as below (`skin/bricks/`, `skin/specials/` and so on).
3. Zip the folder and upload it in the project chat, or drop it into the repo at `skin/` if you use GitHub.
4. Tell Claude which colors or fonts changed, if any, such as a new accent color or a new display font. Claude will wire the art in, check it on a phone-sized screen and push it live.

## General rules

- **Prefer SVG.** Use it for anything flat or vector: bricks, specials, icons and the logo. In Illustrator, use File > Export > Export As > SVG with Styling set to *Inline style*, Font set to *Convert to outlines* and Images set to *Embed*, and leave Responsive unticked. Keep each file under about 30 KB.
- **Use PNG only for raster art** such as painted textures, photos or soft glows. Export it at **3x** the listed size with a transparent background. A 2x version is optional; Claude can downscale.
- **Use RGB color, not CMYK.** Work in Illustrator's RGB document mode at 72 ppi, so 1 px equals 1 pt.
- **Each artboard is exactly the listed size.** Leave no stray objects outside the artboard. Illustrator's "Use Artboards" export option handles this.
- **Brick aspect ratio:** every board cell is **5 : 4** (width : height). On screen, a cell is about 24 to 58 px wide depending on the device, so art has to read clearly at small sizes. Test it by zooming out until the brick is about 30 px wide.
- **Background behind bricks:** the board behind the bricks is near-black (`#0e131d`), and bricks sit edge to edge with no gap. The current art leaves a 2 px inset inside each cell so bricks look separate. Keep that inset, or a visible edge, in your art.

## 1. Bricks (the core art)

Artboard **160 × 128 px** (5 : 4), SVG.

There are 6 colors. Levels 1 to 3 use the first 4, a 5th arrives at level 4 and a 6th at level 7. Each color also carries a small **shape glyph** so color-blind players can tell them apart. Please keep a distinct shape on each color. You can redesign the shapes, but each color needs one, and no two can look alike.

| File | Color now | Glyph now | Notes |
|---|---|---|---|
| `skin/bricks/brick-1.svg` | Cobalt blue `#2f6fd6` | circle | first 4 colors are on from level 1 |
| `skin/bricks/brick-2.svg` | Tangerine `#f07a1f` | triangle | |
| `skin/bricks/brick-3.svg` | Moss green `#4fa83a` | square | |
| `skin/bricks/brick-4.svg` | Slate grey `#8a929c` | diamond | |
| `skin/bricks/brick-5.svg` | Raspberry `#d23a6e` | plus | appears at level 4 |
| `skin/bricks/brick-6.svg` | Citron yellow `#e0c22a` | star | appears at level 7 |

**Optional variants:** the game currently draws 4 slightly different textures per color so the board doesn't look tiled. If you want that, add `brick-1-b.svg`, `brick-1-c.svg` and `brick-1-d.svg`, and so on for each color. The game picks one at random per brick.

**Tips:** keep the glyph within the middle 50% of the brick. Give the colors contrast against each other in greyscale too, not just in hue.

## 2. Special bricks

Artboard **160 × 128 px**, SVG. These need to stand out clearly from the 6 colored bricks. Right now they share a dark gunmetal body with a bright icon.

| File | What it does | Current look |
|---|---|---|
| `skin/specials/sweeper.svg` | Clears its whole row | cyan double-headed arrow, horizontal |
| `skin/specials/drill.svg` | Clears its whole column | cyan double-headed arrow, vertical |
| `skin/specials/blast.svg` | Blows out a diamond area around it | round black bomb with a lit fuse |
| `skin/specials/prism.svg` | Clears every brick of the most common color | rainbow-gradient diamond gem |

## 3. Iron blocks

Artboard **160 × 128 px**, SVG. They appear from level 3. An iron block takes two hits, so it has two states.

| File | State |
|---|---|
| `skin/iron/iron-full.svg` | Undamaged (currently riveted steel plate) |
| `skin/iron/iron-cracked.svg` | After one hit (same plate with a big crack) |

## 4. Selection and highlight

These are currently drawn in code as outlines and tints, which keeps them crisp at any size. Usually only the **colors** need to change. Just name them:

| Thing | Now |
|---|---|
| Hover outline (mouse over a group) | white at 60% |
| Selected outline (after the first tap) | amber `#ffb547`, pulsing |
| Selected special outline | coral `#ff7a5c` |
| Keyboard cursor | dashed amber box |

If you'd rather draw an overlay that sits on top of each selected brick, make `skin/fx/select-overlay.svg` at 160 × 128 px, mostly transparent.

## 5. Effects

| File | Size | Format | Notes |
|---|---|---|---|
| `skin/fx/chip-1.svg` … `chip-4.svg` | 24 × 24 px | SVG | Debris pieces that fly out when bricks smash. They're currently plain rectangles tinted with the brick's color. Draw them in **white or grey**, because the game tints them to the smashed brick's color. One to four shapes. |
| `skin/fx/beam.png` | 64 × 640 px | PNG 3x | Optional. The streak drawn when a Sweeper or Drill fires, currently a cyan gradient. It's stretched across a row or column, so draw it vertical and soft-edged. |
| `skin/fx/blast.png` | 512 × 512 px | PNG 3x | Optional. The shock ring when a Blast goes off, currently an orange radial glow. It's scaled up from small to large. |

Points pop-ups ("+125") and the "tap again" tag are text, set in the display font. See section 8.

## 6. Board and page

| File | Size | Format | Notes |
|---|---|---|---|
| `skin/board/frame.svg` | 620 × 620 px, 9-slice | SVG | The frame around the board, currently amber and black hazard stripes. It has to stretch to the board's height, so keep the **outer 24 px on each side** as the border and leave the middle plain. Claude slices it at 24 px. |
| `skin/board/board-bg.png` | 600 × 720 px | PNG 3x | Optional texture behind the bricks, currently flat near-black. Keep it dark and low-contrast. |
| `skin/page/page-bg.png` | 1600 × 1200 px | PNG 2x | Optional page background, currently a dark navy radial glow. It's cropped to fill the screen, so keep the interest in the middle third. |

## 7. Logo and wordmark

| File | Size | Format | Notes |
|---|---|---|---|
| `skin/logo/wordmark.svg` | about 360 × 48 px (any width, 48 px high) | SVG, text outlined | The "BrickedUp" title at the top left of the game. It shows at 22 to 32 px tall, so it needs to read when small. |
| `skin/logo/mark.svg` | 60 × 48 px | SVG | The little 4-brick symbol beside the wordmark. Optional if the wordmark includes it. |

## 8. UI: colors, fonts and icons

The buttons, score panels and the How To Play section are styled with code, not images, so the cleanest handover is a palette and fonts rather than artwork.

**Colors to give** (as hex values):

| Role | Now |
|---|---|
| Page background | `#161d2b` |
| Panel / card background | `#1f2839` |
| Panel border | `#33405a` |
| Main text | `#eef1f6` |
| Secondary text | `#93a0b5` |
| Accent (buttons, highlights, "Up" in the logo) | `#ffb547` |
| Hazard stripe dark | `#141414` |

**Fonts:** the display font is currently **Bungee** (titles, numbers, pop-ups) and the body font is **Rubik**. If you choose new ones, they need to be on Google Fonts or come with a web font license; send the `.woff2` files in `skin/fonts/`.

**Icons:** the buttons are text-only today (Sound on/off, Hint, End game). If you want icons instead, make them at **24 × 24 px**, SVG, single color (the game recolors them):

- `skin/icons/sound-on.svg`
- `skin/icons/sound-off.svg`
- `skin/icons/hint.svg`
- `skin/icons/end.svg`
- `skin/icons/how-to-play.svg` (optional, for the collapsed rules bar)

## 9. Icons outside the game

These show up in browser tabs, on the home screen and in link previews.

| File | Size | Format | Notes |
|---|---|---|---|
| `skin/site/favicon.svg` | 32 × 32 px artboard | SVG | Browser tab icon. Make it bold and simple, since it shows at 16 px. Claude makes the `.ico` and PNG versions from it. |
| `skin/site/app-icon.png` | 1024 × 1024 px | PNG, **no transparency** | Home screen icon. iOS and Android round or crop the corners themselves, so fill the square edge to edge and keep the important art inside the **centre 80%** (Android crops to a circle). Claude makes the 512, 192 and 180 px sizes from it. |
| `skin/site/share-preview.png` | 1200 × 630 px | PNG or JPG | The image that shows when the link is shared in iMessage, Slack, X and so on. Keep text and the logo inside the **centre 1080 × 560**, because some apps crop the edges. Some apps also show it as a square crop from the middle. Keep the file under 1 MB. |

## Checklist

- [ ] 6 bricks (plus optional variants)
- [ ] 4 specials
- [ ] 2 iron states
- [ ] Selection colors
- [ ] Debris chips (optional beam and blast)
- [ ] Board frame (optional board and page backgrounds)
- [ ] Wordmark and mark
- [ ] Palette and fonts (optional button icons)
- [ ] Favicon, app icon, share preview
