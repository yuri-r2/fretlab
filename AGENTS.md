# Fretlab: technical handoff

Read before changing anything. **Keep it current and short:** update this file in the same commit when structure, data shapes, deployment or conventions change.

## What it is
A practice app for an intermediate guitarist who writes riffs (rock, alternative, midwest emo, shoegaze). One static page: no build, no dependencies, vanilla JS + Web Audio + SVG/canvas.

## Files
- `index.html`: the whole app (HTML, CSS, one JS IIFE). **Source of truth.**
- `sw.js`, `manifest.webmanifest`, icons: install/offline for GitHub Pages. Bump the cache name in `sw.js` when shipping.
- `tests/*.js` (Playwright: `npm i -D playwright && npx playwright install chromium`). Run all before pushing; each prints `OK`:
  `validate` (every exercise in all keys, quizzes) · `smoke` (navigation, main flows, phone/desktop) · `practice` (resume, chord formulas, per-key progress, plans) · `desktop` (wide layouts, search, previews, legacy routes) · `transport` (pause/seek, count-ins, loop timing) · `rhythm` (bar math, click modes, every rhythm step) · `essentials` (curated list surfaced first, focus order).

## Deployments
1. **GitHub Pages** `https://yuri-r2.github.io/fretlab/` serves `index.html` from `main`.
2. **claude.ai artifact** `https://claude.ai/artifact/67VitgdwZnZ4gh8X3sJuVv`: publish **only the content between `<body>` and `</body>`**. Capabilities `db`, `user`, `downloads`. Mic and plain downloads don't work there.

## Code map (search for `/* ---------- name ---------- */`)
- **state**: everything persisted is in `S` (`DEF` defaults, `merge`, `save`/`flush`); localStorage `fretlab.v1`; artifact also syncs `data/users/<id>/progress`. New persisted fields go in `DEF`.
- **audio**: `ac()`, gain chain `AU.master` ← `AU.notes` / `AU.click`; `bus()`/`killBus()`; sounds `pluck`, `strum`, `tone`, `SND.*`, `chuck` (muted strum).
- **exercises**: `EX` array. Exercise `{id, cat, title, lvl, about, tip, keyed?, key0, labels, steps:[{n, d, bpm, goal, bar?, groups?, click?, echo?, swing?, tuning?, drone?, create?, observe?, build(key) → {ev, L}}]}`. Event `{t, d (beats), n:[{s, f, fg, lab}], p:'D'|'U', x:''|'h'|'p'|'/'|'PM'|'~', chord?, strum?, roll?, air?, mute?, acc?, cnt?}`. **String 0 = high e … 5 = low E.** IDs are saved progress: never rename.
- **hosting**: `exHostOf(e)` puts the player in Exercises, Scales (`cat:'Scales'`) or Rhythm (`cat:'Rhythm'`); those cats are hidden from the Exercises list (`EXCATS`).
- **player**: state `P`; `exOpen`, `exStart`, `exSched` (lookahead; prepares the next loop on the same buses; don't kill buses at loop boundaries), `exPause`/`exStop`/`exSeek`, `exDraw` (canvas tab), `exFeedback` (progression: 2 clean → +5 bpm, messy −10%, 2 clean at goal = done, then up to 260). `clickLevel()` handles groups, `backbeat`, `gap`; steps with `click` set play no guide notes except in Listen first (you keep the time). Playback/display controls are the always-open `#pCtl` bar (chip-styled checkboxes, `#pLabSeg` drives the hidden `#pLab` select); rating and history are deliberately low-key in the aside. `echoBus()` for dotted-8th echo.
- **progress**: `exStat(id, key?)` is per key (proxy over `contexts[key]`); reviews `REV_IV`; history `S.exlog`; favorites `S.exfav`; custom goals via a getter defined near the end (**all `EX.push` calls must come before it**).
- **essentials**: `ESSENTIALS` (12 ids + one-line `why`, in learning order) is the owner-facing priority list. `isEss`/`essList`/`essNext`/`exComplete`. Lists sort essentials first; `focusEx` falls back to `essNext()`; `exDueList` puts essential reviews first; Quick/Deep routines use only essentials (+ legato warm-up, checked in `essentials`). Change the list here, not in each view.
- **content**: scales `SCALES`/`scaleExs`; rhythm `RX`/`strumBar`/`noteRhythm`; Chord Shapes `VOICINGS`/`VFAMILIES`/`vToEx` (moves run low E → high e, `NX` = muted); Learn `UNITS`/`QZ`; plans `ROUTINES`/`autoBlocks`; tuner from KotoLab (MIT).
- **navigation**: `PRIMARY_TABS` (Today, Learn, Library, Progress) + `LIBRARY_TABS`; desktop rail at ≥1100px. Tuner and Metronome are direct header buttons (`.toolbtn`, highlighted via `aria-pressed` in `switchTab`); the header must stay one row from 360px up (checked in `smoke`). Internal ids: `explorer` = Scales, `voicings` = Chord Shapes; `#riffs` redirects to Chord Shapes.

## Gotchas
- The IIFE hides internals; tests expose them by replacing the `/* ---------- boot ---------- */` marker.
- Same-URL hash changes don't reload; tests add a query string. `flush()` on page hide overwrites seeded localStorage.
- Verify every new chord note by note from the tuning before adding it.

## Product rules (owner)
- Most useful material only; no bloat. Improve what exists before adding.
- Don't build mic grading of playing or tab/Guitar Pro import (owner declined).
- Every exercise shows exactly what to play, in time, with labels.
- Ship to both deployments: push `main` and republish the artifact.
