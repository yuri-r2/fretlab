# Fretlab: technical handoff

Read this before changing anything. **Keep it current:** when you change structure, data shapes, deployment or conventions, update this file in the same commit.

## What it is
A fretboard practice app for an intermediate guitarist who writes riffs (rock, alternative, midwest emo, shoegaze). It's one static page: no build step, no dependencies, vanilla JS + Web Audio + SVG/canvas.

## Files
- `index.html` is the whole app: HTML, CSS, and one JS IIFE. **This is the source of truth.**
- `sw.js`, `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png`: install and offline support (GitHub Pages only).
- `tests/validate.js` checks every exercise in all 12 keys and the quiz generators. `tests/smoke.js` clicks through navigation and main flows at phone and desktop sizes. `tests/practice.js` checks resume/return behavior, chord formulas and inversions, progress by key, review preparation, plan budgets, and timer transitions. All need Playwright (`npm i -D playwright && npx playwright install chromium`). `tests/desktop.js` checks wide workspaces, searches, favorites, preview audio, appearance changes, keyboard controls, and legacy routes/data. Run all four before pushing; all must print `OK`.
- `README.md` is user-facing: features and the research behind them.

## Two deployments of the same code
1. **GitHub Pages:** `https://yuri-r2.github.io/fretlab/` serves `index.html` as is. The service worker registers only on `*.github.io`. The microphone tuner works only here.
2. **claude.ai artifact:** `https://claude.ai/artifact/67VitgdwZnZ4gh8X3sJuVv`. Publish **only the content between `<body>` and `</body>`** of `index.html`; the artifact host adds its own head. Capabilities: `db`, `user`, `downloads`. The `<head>` in `index.html` holds only Pages extras: manifest, theme color, icons.

## Code map (inside the IIFE; search for `/* ---------- name ---------- */` markers)
- **state + persistence:**
  - All persisted data lives in `S`. `DEF` has the defaults, `merge(DEF, saved)` loads them, and `save()` debounces then calls `flush()`.
  - Storage: localStorage key `fretlab.v1`. In the artifact it also syncs to db doc `data/users/<id>/progress` as `{state, updatedAt}`; `initDb()` keeps whichever copy is newer.
  - To add a persisted field, add it to `DEF`.
  - Catalog preferences are `S.ui.voBrowser` (family, style, query, saved filter, labels) and `S.ui.exQuery`. `S.riffs` retains legacy backup data; there is no Riff Dice view or runtime. Session preferences are `S.ui.planMinutes`, `focusEx` (exercise ID), and `voKey` (root pitch class). Lessons store `lastCard` separately from the furthest reached `card`.
- **audio:**
  - `ac()` creates the context lazily. Gain chain: `AU.master` (volume, mute) ← `AU.notes` (guide notes) and `AU.click` (clicks, count-ins, drums).
  - `bus(parent)` and `killBus()` are disposable sub-buses.
  - Sound sources: `pluck()` (Karplus-Strong guitar), `strum()`, `tone()` (drones), `SND.*` (click, drums).
- **metronome engine:** `M`, a lookahead scheduler (`mSched`, `mBeat`) on `AU.click`.
- **guided exercises:**
  - Exercises live in the `EX` array. Shape: `{id, cat, title, lvl, about, tip, keyed: 'maj'|'min'|'note'|'scale'|undefined, key0, labels, scale?, tuning?, steps:[{n, d, bpm, goal, bar?, swing?, tuning?, drone?, create?, build(keyPc) → {ev, L}}]}`.
  - Events: `{t, d (beats), n:[{s, f, fg, lab}], p:'D'|'U'|'', x:''|'h'|'p'|'/'|'PM'|'~', chord?, roll?, strum?}`.
  - **String index 0 = high e … 5 = low E.** `OPEN` holds the MIDI pitches of the open strings. Helpers: `seq()`, `pad()`, `winNotes()`, `cagedWins()`, `nps()`.
  - Library categories: `EXCATS`. `cat: 'Scales'` exercises are hidden from the library and appear in the Scales tab instead.
- **player:**
  - `P` holds player state. `exOpen(id, step)` hosts the `#exPlayer` node in either the Exercises or the Scales tab (`exHostOf`). Playback: `exStart`, `exSched`, `exStop`, `exLoopEnd`.
  - `exFeedback(kind)` holds the progression rules:
    - 2 clean runs in a row: +5 bpm
    - a messy run: about −10%
    - 2 clean runs at the goal: the step is done and scheduled for review
    - finished steps keep climbing up to 260 bpm
  - Part practice is `P.spot`.
  - `P.origin` holds the return destination. The desktop `.practice-layout` places notation and playback beside the feedback/settings aside. Keep essential playback controls outside disclosures. `renderExSteps()` labels and updates step navigation. The header transport uses `playerVisible()` and `renderMini()` to follow the exercise while its player is visible.
  - `observe` and `create` steps use exploration/creation completion rather than tempo ladders or technical reviews.
- **spacing and review:** intervals `REV_IV`, review data `st.rev[step]` for exercises and `S.learn[unit].rev` for Learn units.
  - `exStat(id, key?)` returns the chosen key's `contexts[key]` fields through a proxy; `key` and custom `goal` remain exercise-level fields. Completion, tempo, last activity, streaks, ratings, preparation dates, and reviews are key-specific. Legacy fields seed only the saved/default key, and remain in the backup. Review entries include `key`.
  - `prepared[step]` records playback/listening/step-through dates. `P.reviewCold` distinguishes the first play from a prepared attempt; a prepared due check returns tomorrow. Ratings are self-reported.
- **exercise history:** `S.exlog` entries look like `{id, s, k, b, r, t}`, written by `logRun()`. Favorites are `S.exfav`.
- **adjustable goal tempo:** near the end, a getter on each step's `goal` reads `S.ex[id].goal[i]`, falling back to `goal0`. **Every `EX.push` must happen before this block.**
- **scale bundles:** `SCALES`, `scaleExs(id)` (generated `sc_<scale>_*` exercises) and `SC_EX` (exercise list per scale).
- **voicings / Chord Shapes:** tunings in `TUNE`, collections in `VOICINGS`, families in `VFAMILIES`. A move's `f` runs **low E to high e**, with `NX` meaning muted. Optional `fingers` and `roles` follow that order; `barre` is `[firstStringIndex,lastStringIndex,fret]`. Contextual `roles` preserve degrees such as #9. Movable studies use `keyed`, `quality`, and optional `bass`; `vCurrent(v, key)` transposes each grip within the fret range. `VPAT` holds patterns and `vToEx()` produces `v_<id>` exercises. Keep IDs stable for saved progress. `voStop()` owns preview audio disposal; `VO.bus` uses `AU.notes`, and navigation stops it. Browser favorites reuse `S.exfav`. `voRemember()` persists catalog preferences. `vBox(..., labels)` renders the selected label mode; the detail fretboard focuses on the grip’s fret range.
- **learn path:** `UNITS` holds the cards, `quiz()` (generator) and practice links. `QZ` is the quiz state; `REVIEW_UNIT` is the mixed review.
- **routines:** `ROUTINES`, plus `autoBlocks()`, which fits Today's plan to its minute budget and chosen focus. `R.waiting` holds a block at zero until `routineNext()`; the timer does not switch tools automatically. Focus and review blocks capture their key.
- **tuner:** a port of KotoLab (MIT): `detectPitch` and `TunerGauge`.
- **tabs:** `PRIMARY_TABS` is Today, Learn, Library, and Progress. Desktop widths of 1100px and above use a vertical navigation rail; smaller windows use a horizontal bar. `LIBRARY_TABS` groups the content tools under Library; `TABS` includes all internal views plus standalone tools. `switchTab()` pushes navigation history. Progress hosts the history node and statistics. `tabFromHash()` maps legacy `#riffs` links to Chord Shapes. Existing tool hashes still work: `explorer` = Scales, `voicings` = Chord Shapes.

## Gotchas
- Everything is inside an IIFE, so tests reach internals by string-replacing the `/* ---------- boot ---------- */` marker to expose them (see `tests/validate.js`).
- Navigating to the same URL with only a different hash doesn't reload the page. Add a query string in tests.
- On page hide, `flush()` writes `S` back to localStorage, which overwrites anything a test seeded.
- The artifact sandbox blocks the microphone and plain downloads. Backups use `claude.use('downloads')` there and a blob link elsewhere.
- Verify any new chord or voicing note by note: compute pitches from the tuning and check the interval labels.

## Product rules (from the owner)
- Focus on the most useful material and avoid bloat. Don't add features or exercises casually; prefer improving what exists.
- Teach concepts well: every exercise shows exactly what to play, in time, with labels.
- Changes ship to both deployments: push to `main` (Pages) **and** republish the artifact.

