// Builds the iOS app's web bundle (app/www) from the website's index.html.
// The website stays the single source of the game. This script only makes an offline, private copy:
//   - removes GoatCounter analytics (the app collects no data)
//   - swaps Google Fonts for the bundled copies in app/fonts (works with no network)
//   - drops web-only head tags (manifest, social previews, favicons)
//   - adds a Content-Security-Policy so the app cannot load anything from the internet
// Run with `npm run build` (or `npm run sync`, which also copies it into the Xcode project).
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(appDir, '..', 'index.html');
const out = join(appDir, 'www');

let html = readFileSync(src, 'utf8');
const removed = [];
function drop(re, what) {
  const before = html;
  html = html.replace(re, '');
  if (html === before) throw new Error(`build-www: expected to find ${what} in index.html`);
  removed.push(what);
}

drop(/^<script data-goatcounter[^\n]*<\/script>\n/m, 'GoatCounter script');
drop(/^<link rel="preconnect"[^\n]*\n/gm, 'font preconnects');
drop(/^<link rel="manifest"[^\n]*\n/m, 'web manifest');
drop(/^<link rel="(?:icon|apple-touch-icon)"[^\n]*\n/gm, 'favicons');
drop(/^<meta (?:property="og:|name="twitter:)[^\n]*\n/gm, 'social preview tags');
drop(/^<meta name="(?:apple-mobile-web-app|mobile-web-app)[^\n]*\n/gm, 'home-screen web app tags');

const fontCss = `<style>
@font-face{font-family:'Bungee';font-style:normal;font-weight:400;font-display:block;src:url(fonts/bungee-latin.woff2) format('woff2')}
@font-face{font-family:'Rubik';font-style:normal;font-weight:400 700;font-display:block;src:url(fonts/rubik-latin.woff2) format('woff2')}
</style>`;
const fontsLink = /^<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^\n]*$/m;
if (!fontsLink.test(html)) throw new Error('build-www: expected the Google Fonts link in index.html');
html = html.replace(fontsLink, fontCss);

const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; " +
  "font-src 'self'; img-src 'self' data: blob:; media-src 'self' data: blob:; connect-src 'self'";
html = html.replace('<meta charset="utf-8">', `<meta charset="utf-8">\n<meta http-equiv="Content-Security-Policy" content="${csp}">`);

// The Privacy link opens the website's policy in Safari (Capacitor sends outside links to the browser).
if (!html.includes('href="/privacy.html"')) throw new Error('build-www: expected the Privacy link in index.html');
html = html.replace('href="/privacy.html"', 'href="https://brickedup.slamdunk.studio/privacy.html" target="_blank" rel="noopener"');

// Safety net: nothing in the app bundle may point at the internet.
const leftovers = html.match(/(?:src|href)="https?:\/\/(?!brickedup\.slamdunk\.studio\/privacy\.html")[^"]+"|goatcounter\.com|gc\.zgo\.at|fonts\.g(?:oogleapis|static)\.com/g);
if (leftovers) throw new Error('build-www: network references left in the app bundle: ' + leftovers.join(', '));

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'fonts'), { recursive: true });
writeFileSync(join(out, 'index.html'), html);
for (const f of ['bungee-latin.woff2', 'rubik-latin.woff2', 'OFL-Bungee.txt', 'OFL-Rubik.txt']) {
  copyFileSync(join(appDir, 'fonts', f), join(out, 'fonts', f));
}
const build = (html.match(/<meta name="build" content="([^"]+)"/) || [])[1];
console.log(`build-www: wrote www/ from index.html (build ${build}); removed ${removed.join(', ')}.`);
