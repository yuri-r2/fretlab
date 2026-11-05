# Fretlab: technical handoff

Read before changing anything. **Keep it current and short:** update this file in the same commit when structure, data shapes, deployment or conventions change.

## What it is
A practice app for an experienced guitarist who writes riffs (rock, alternative, midwest emo, shoegaze). One static page: no build, no dependencies, vanilla JS + Web Audio + SVG/canvas.

## Files
- `index.html`: the whole app (HTML, CSS, one JS IIFE). **Source of truth.**
- `sw.js`, `manifest.webmanifest`, icons: install/offline for GitHub Pages. Bump the cache name in `sw.js` when shipping.
- `tests/*.js` (Playwright: `npm i -D playwright && npx playwright install chromium`). Run all ten before pushing; each prints `OK`:
  `validate` (every exercise in all keys, quizzes) · `smoke` (navigation, main flows, phone/desktop) · `practice` (resume, chord formulas, per-key progress, plans) · `desktop` (wide layouts, search, previews, legacy routes) · `transport` (pause/seek, count-ins, loop timing) · `rhythm` (bar math, click modes, every rhythm step) · `essentials` (curated list surfaced first, focus order) · `chords` (reference pitches, fingering, open/movable classification and filters) · `advanced` (voice leading, modal harmony, skipping, future-key notation and contrast) · `audio` (opening notes in previews, session audio controls, mixer routing, rendered sustain/tails, finger labels and sticky toolbars).

## Deployments
1. **GitHub Pages** `https://yuri-r2.github.io/fretlab/` serves `index.html` from `main`.
2. **claude.ai artifact** `https://claude.ai/artifact/67VitgdwZnZ4gh8X3sJuVv`: publish **only the content between `<body>` and `</body>`**. Capabilities `db`, `user`, `downloads`. Mic and plain downloads don't work there.

## Code map (search for `/* ---------- name ---------- */`)
- **state**: everything persisted is in `S` (`DEF` defaults, `merge`, `save`/`flush`); localStorage `fretlab.v1`; artifact also syncs `data/users/<id>/progress`. New persisted fields go in `DEF`.
- **audio**: `ac()`, gain chain `AU.master` ← `AU.notes` / `AU.click`; `bus()` defaults to `AU.notes`; all pitched sounds use Notes & tones, with explicit `AU.click` for rhythm. Pluck buffers are cached by pitch, reference tuning and duration bucket, and outlast their attack/release envelope. `killBus()`; sounds `pluck`, `strum`, `tone`, `SND.*`, `chuck` (muted strum).
- **exercises**: `EX` array. Exercise `{id, cat, title, lvl, about, tip, keyed?, key0, labels, steps:[{n, d, bpm, goal, bar?, groups?, click?, echo?, swing?, tuning?, drone?, create?, observe?, build(key) → {ev, L}}]}`. Event `{t, d (beats), n:[{s, f, fg, lab}], p:'D'|'U', x:''|'h'|'p'|'/'|'PM'|'~', chord?, strum?, roll?, air?, mute?, acc?, cnt?}`. **String 0 = high e … 5 = low E.** IDs are saved progress: never rename.
- **hosting**: `exHostOf(e)` puts the player in Exercises, Scales (`cat:'Scales'`) or Rhythm (`cat:'Rhythm'`); those cats are hidden from the Exercises list (`EXCATS`).
- **player**: state `P`; `exOpen`, `exStart(preview=false)` (preview mode must be set before scheduling the first note), `exSched` (lookahead; prepares the next loop on the same buses; don't kill buses at loop boundaries), `exPause`/`exStop`/`exSeek`, `exDraw` (canvas tab; previous/current/two upcoming segments), `exNextLoop` (shared audio/visual plan), `exForecast` (cached upcoming data), `exUpcoming` (early key/tempo/opening-note cue), `exFeedback` (progression: 2 clean → +5 bpm, messy −10%, 2 clean at goal = done, then up to 260). `clickLevel()` handles groups, `backbeat`, `gap`; steps with `click` set play no guide notes except in Listen first (you keep the time). Playback/display controls are the always-open `#pCtl` bar (chip-styled checkboxes, `#pLabSeg` drives the hidden `#pLab` select); rating and history are deliberately low-key in the aside. `echoBus()` for dotted-8th echo.
- **progress**: `exStat(id, key?)` is per key (proxy over `contexts[key]`); reviews `REV_IV`; history `S.exlog`; favorites `S.exfav`; custom goals via a getter defined near the end (**all `EX.push` calls must come before it**).
- **featured studies**: `ESSENTIALS` contains 12 stable exercise IDs + short `why` cues, led by five original `ADVANCED_STUDIES` (four steps each: musical problem, variation, creative transfer). Existing foundations stay in search. `essNext`/`focusEx`/`exDueList` honor `S.exskip`; skipping does not mark completion. `skipExercise` toggles the recommendation preference; explicit Make my focus restores inclusion. Quick/Deep routines use the featured material (+ legato warm-up). Automatic plans hear/map a study before its practice step. Research: `ADVANCED_PRACTICE_RESEARCH.md`. The persistent session bar uses `routineOpenCurrent` to reopen its resolved target; `routineRemember` preserves exercise position/settings while browsing. Opening a block must never reset `R.rem` or its paused/waiting state. `routinePause` pauses audio and timer together; `R.resume` resumes the same visible exercise only if its step/key/position are unchanged. End pauses in place; Next stops outgoing audio.
- **content**: scales `SCALES`/`scaleExs`; rhythm `RX`/`strumBar`/`noteRhythm`; Chord Shapes `VOICINGS`/`VFAMILIES`/`vToEx` (moves run low E → high e, `NX` = muted); Learn `UNITS`/`QZ`; plans `ROUTINES`/`autoBlocks`; tuner from KotoLab (MIT).
- **chord reference**: `CHORD_GRIPS`: 12 fixed open-string colors and 12 closed movable forms, eight featured per group. `CHORD_QUALITIES` supplies intervals/roles; a grip's `omit` explicitly permits missing tones. `chordCatalog(group,root)` filters fixed open grips or transposes closed forms while keeping every played fret positive. Groups must be mutually exclusive. Fingerings and barres are authored. Cards show musical cues, sounding roles/omissions, preview audio and a related study (`lesson`). Extra colors use a disclosure. `S.ui.chordRef` stores group/openRoot/genre/labels/extras; `S.ui.voKey` stores movable root. `VO` owns preview buses/results; dispose with `voStop()`. Workouts in `VOICINGS` retain their IDs.
- **finger display**: `S.ui.exopts.fingers` controls smaller annotations on tab/fretboard independently of note labels; `fingerLegend()` gives the shared key. Legacy label value `finger` is presented as None in `#pLabSeg`/`#pLab`; the Show fingers checkbox is the single finger-visibility control. Fretboard markers optionally carry `finger`. `vBox()` mirrors strings and fret rows for left-handed settings.
- **navigation**: `PRIMARY_TABS` (Today, Learn, Library, Progress) + `LIBRARY_TABS`; desktop rail at ≥1100px. Tuner and Metronome are direct header buttons (`.toolbtn`, highlighted via `aria-pressed` in `switchTab`); the header must stay one row from 360px up (checked in `smoke`). Internal ids: `explorer` = Scales, `voicings` = Chord Shapes; `#riffs` redirects to Chord Shapes.

- **appearance**: Inked uses near-white/near-black neutral tokens at the top of the stylesheet, following system appearance. Actions use deep teal in light mode and bright teal in dark mode; harmonic marker hues remain independent. Body/secondary text and marker labels target 7:1; control boundaries remain distinct on each surface. Each colored marker uses its own `--*-ink` foreground; do not assume one foreground works on every light-mode color. Canvas active notes use `--warn-ink`. Browser chrome uses media-specific theme-color meta tags.

## Gotchas
- The IIFE hides internals; tests expose them by replacing the `/* ---------- boot ---------- */` marker.
- Same-URL hash changes don't reload; tests add a query string. `flush()` on page hide overwrites seeded localStorage.
- Verify every new chord note by note from the tuning before adding it.

## Product rules (owner)
- Most useful material only; no bloat. Improve what exists before adding.
- Don't build mic grading of playing or tab/Guitar Pro import (owner declined).
- Every exercise shows exactly what to play, in time, with labels.
- Ship to both deployments: push `main` and republish the artifact.
