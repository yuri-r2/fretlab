# Fretlab

A fretboard practice app for intermediate and advanced guitarists, in a single HTML file. Open `index.html` in any modern browser, or use the hosted version on GitHub Pages. Developer notes for working on the code are in [AGENTS.md](AGENTS.md).

## Find your way

The desktop web app uses a persistent navigation rail and a wider practice workspace. Playback and notation sit beside feedback and collapsible settings. Smaller windows use the compact navigation layout. Keyboard arrows move through navigation, and settings keep keyboard focus inside the dialog.

Four main destinations keep the learning flow close at hand: **Today**, **Learn**, **Library**, and **Progress**. The Library groups Chord Shapes, Scales, Rhythm, Exercises, Fretboard, and Ear training. **Tuner** and **Metronome** buttons sit in the header on every screen (icons on phones), and the drone lives on the Tuner page. The header transport follows the exercise while its player is open, so its tempo and play controls act on that exercise. Riff writing stays inside the chord practice steps. Older Riff Dice ideas remain in backup data; old links open Chord Shapes. Progress holds practice statistics, the seven-day chart, and the filterable history. Lessons resume at the last visited card, and a workout's Back button returns to its starting context.

Today's plan fits the time you choose, from 5 to 90 minutes. Choose a focus in Today, or make an exercise or chord collection your focus from its own screen. Reviews retain their key, and the final application block uses the session's focus material. Timers wait for Next block so a time limit does not interrupt a phrase. The persistent session bar has an **Open block** button: return to the current exercise from any page with its step, key, tempo and practice position. Opening it keeps the block timer and paused state. Session Pause stops the exercise or metronome along with the timer; Resume continues the same exercise at its paused position. End keeps that position, and Next block stops the outgoing playback.

## Explore & develop

Twelve featured studies lead with advanced alternative, Midwest emo and shoegaze ideas. Five original four-step studies cover open-string changing harmony, one moving inner voice, motifs through changes, three-note cells across 4/4 and fourth stacks over a drone. They join FACGCE, drone/maj9/power-add9 studies, odd meters, delay rhythm and guide tones. Each new study ends with a constrained phrase-writing task; criteria describe voice balance, sustain, rests or pulse as well as clean notes.

Choose any study. Today's automatic plan uses a short listening/map stage when the focus has one, then practice and application. Foundations and technique remain available through Learn and the full exercise search. **Skip** moves an exercise out of normal lists, search, favorites, history and practice plans without marking it complete or deleting its records. Open **Skipped exercises** in the Library and choose **Restore** to bring it back.

The sources, app critique and remaining validation questions are in [Advanced practice research](ADVANCED_PRACTICE_RESEARCH.md).

## Learn path

Nine units that build on each other: notes on the low strings, octave shapes, intervals as shapes, the CAGED system, pentatonic boxes, the major scale (positions, three-notes-per-string patterns and lines along the strings), triads and inversions, chords in a key (diatonic chords, the progressions songs lean on, borrowed iv, bVII and bVI chords, the ii–V–I and guide tones), and voicings for riffs (color tones, open-string drones, alternate tunings). Each unit has short lesson cards with color-coded fretboard diagrams (root, 3rd, 5th, 7th), a 10-question check with an explanation after every answer (8 to pass, new questions each attempt), and links to the drills and exercises that make it automatic. From unit 2 on, each check includes two questions from earlier units. Passed units come back as a mixed 10-question review after 1, 3, 7, 16 and 35 days; a unit you get fully right moves to the next gap, and a miss brings it back the next day. Question types include naming and finding notes, finding every place a note lives, octave shapes, naming and finding intervals, identifying CAGED shapes and roots, scale degrees inside a position, triad inversions and quality, and key harmony.

## Exercises

Play-along workouts that show exactly what to play, note by note, in time. A scrolling tab with a fixed playhead shows pick direction, technique marks and labels (finger, note name or scale degree), while a live fretboard shows the note to play now, the next one, and the rest of the shape. Pause keeps your place, and Resume continues from there with your count-in setting. Scroll the tab horizontally (or use Shift + mouse wheel), click a note, or use the position slider to choose a starting point. Restart returns to the beginning. The Show fingers toggle shows or hides smaller suggested finger numbers beside the fret numbers and selected note labels. Space plays/pauses, Home restarts, and the focused position slider supports arrow keys, Page Up/Down, Home, and End. Automatic +4 bpm and key changes are scheduled ahead at the loop boundary, keeping the first note and click in time. Most exercises work in any key: pick one, roll a random key, or move up a 4th every loop to play through all 12.

Workouts for knowing the neck in any key, connecting it with technique and chord tones, and turning it into riffs:

- **Fretboard fluency**: cycle of fourths on every string, and one note across the whole neck (with octaves, 5ths and power chords)
- **Arpeggios and chords**: CAGED triad and major 7 arpeggios, diatonic 7th arpeggios in one position, ii–V–I arpeggios and guide tones, and triad inversions on every string set with voice-led I–vi–IV–V and I–V–vi–IV
- **Technique**: 3- and 5-string sweep-picked arpeggios
- **Riff building**: hammer-ons, pull-offs and slides between pentatonic boxes (the warm-up), octave riffs through the key, and 3rds and 6ths as two-note riffs, ending with a pedal-tone riff

Each exercise has 3 to 8 steps with a goal tempo. Tap the goal to set your own, for one step or every step of the exercise (Default puts it back). Rate each run (Clean, Almost, Messy): two clean runs in a row raise the tempo by 5 bpm, a messy run lowers it by about 10%, and two clean runs at the goal lock the step in. After that the tempo keeps climbing past the goal (up to 260 bpm) with every two clean runs, and the per-loop speed ladder keeps going too. Tap the tempo to type one, or hold − / + to change it fast. Locked-in steps come back as cold checks on the same 1, 3, 7, 16, 35 day schedule, with a first-play check before rehearsal or listening. New steps suggest a **Listen first** pass, **Practice** loops a single bar or pair of bars a little slower (part practice, then back to the whole step), and each exercise shows one listening cue. With Count-in on, Resume starts at the beginning of the interrupted beat so the count, notes and click stay aligned. Without Count-in, Resume retains the exact paused position. Count-in, looping, guide audio, a click, a step-through mode (arrow keys) and an automatic speed ladder are built in.

**History.** Every run you play or rate is logged with its step, key, tempo and rating. The library opens with *Pick up where you left off* (your last four steps, one tap to resume at the same step and key) and your **Favorites** (star any exercise). The **History** view lists runs day by day, filterable by exercise, and every row jumps straight back to that step. Inside an exercise, *Your history* shows each step's last session, run count, best tempo and a tempo sparkline colored by rating, with a button to jump to any step. Today shows a one-tap *Resume* for your last exercise.

## Scales

Pick a key and one of ten scales (major and minor pentatonic, blues, major, natural minor, Dorian, Mixolydian, Phrygian, Lydian, harmonic minor) and see it on the whole neck or one CAGED position at a time, then practice it with exercises built for that scale. They open right in the Library → Scales, already in your key: five positions linked up the neck, three-notes-per-string patterns (diagonal patterns for pentatonic and blues), sequences in 3s, 4s, 3rds and 4ths, the scale along one string, and *Hear it over a drone*, which plays a held root under the scale and holds its color notes (the 6 in Dorian, the b7 in Mixolydian, the #4 in Lydian, and so on) so you hear what makes each scale sound like itself. Minor pentatonic uses the five-box exercise, and major uses the five positions, three notes per string, sequences and one-string exercises.

## Rhythm

Eight play-along workouts for time and feel, in their own Library section:

- **Subdivision ladder**: quarters, 8ths, triplets and 16ths on one muted note, then all four in one loop, then with the click only on 2 and 4
- **Pendulum strumming**: the hand keeps moving down and up while some strokes miss the strings, from steady 8ths to D DU UDU, accented backbeats, 16ths, and a click that drops out every other bar
- **Muted chucks and the backbeat**: percussive chucks on 2 and 4, pushes, and offbeat upstrokes
- **Palm-muted chugs and gallops**: downpicked 8ths, chugs with chord stabs, gallops, reverse gallops and punk 8ths
- **Syncopation and pushes**: 3-3-2, fills, chord changes that arrive on the "&" of 4, and offbeat accents
- **Odd meters**: 7/8 as 2+2+3 and 3+2+2, 5/4 as 3+2, and a 6/8 arpeggio, with the click accenting each group
- **Dotted-8th echo**: straight notes with a dotted-8th delay that turns 8ths into a 16th-note shimmer; dashed boxes show where the echoes fall
- **Triplets and shuffle**: straight against swung 8ths, triplet strums and a shuffle boogie

On the steps where the click thins out (only on 2 and 4, or dropping out every other bar) the guide notes stay silent, so you keep the time yourself instead of following the playback. Listen first still plays them once.

Counts ("1 e & a") sit under every stroke. A faint dashed arrow is an air strum (move but miss), ✕ is a muted chuck, and > is an accent. Subdividing the beat reduces timing variability, especially at slow tempos ([Repp, 2010](https://labs.sonicfield.org/library/self-generated-interval-subdivision-reduces-variability-of-synchronization-with-)).

## Chord Shapes

A discovery reference in standard tuning: twelve fixed **open-string colors** and twelve fully fretted **movable shapes**, with eight featured grips shown first in each group. Major/minor ninths, 6/9 colors, Lydian sharp-11 voicings, fourth stacks, clusters and selected dominant tensions offer material beyond familiar open and barre chords. Four additional colors in each group stay in an expandable section.

The groups are mutually exclusive. Open strings give a grip a fixed root, so unsupported roots show an honest empty state and a route to movable shapes. Every sounding string in a movable template remains fretted in all twelve keys. Root, Genre and Diagram labels are the only filters. Each card gives an original musical-use cue, sounding degrees, declared omissions, strum/arpeggio previews and a related study. Fingerings and barres are authored rather than enumerated.

Finger numbers sit inside diagram dots, with fret positions on a separate row. Open circles mean open strings, × means skip the string, and a wide bar holds several strings with one finger. Left-handed settings mirror the diagrams. In exercises, Show fingers controls the smaller finger annotations independently of note/degree labels. Suggestions use the conventional index 1, middle 2, ring 3, little finger 4; an open string uses no finger.

The 26 existing shape and genre workouts remain in **Exercises**, retaining their IDs, favorites and progress: movable A- and E-string shapes, triad inversions, shells, and rock, alternative, midwest emo and shoegaze applications. Listening and composing keep their own completion criteria.

Playback and display controls sit open in a bar above the tab, one tap each: Loop, Count-in, Click and Notes (each with its own volume), +4 bpm per loop, a new key per loop, the note labels (none, degrees, chord tones, notes), Show fingers, and the section to loop. Tiny chord boxes appear above the tablature at chord changes when an authored shape or an unambiguous compact grip is available. They follow key changes, seeking and step-through playback. Arpeggios keep their full chord shape; scales and ambiguous melodic runs omit the diagram. Show fingers also controls its finger numbers, and left-handed mode mirrors it. The run rating and your history stay quietly in the side panel. The volume menu’s **Notes & tones** slider also controls chord previews, step-through notes, ear training, tuner references and drones; click and drums remain separate in the shared Volume panel.

With New key / loop or the tempo ladder enabled, **Up next** shows the destination and opening frets before the boundary, with a beat countdown while playing. The tab renders the approaching key's notes in advance and preserves the previous notes as they pass the playhead. Click upcoming notation to pause and prepare that key at the selected note. Audio and visual previews share the next-loop plan.

Completion, best tempos, and review schedules for keyed exercises are stored separately for each key. Existing progress is retained in its saved key (or the exercise's default key when none was saved). Listening or stepping through a due exercise before rating it postpones that review to tomorrow rather than advancing its cold-review interval. Ratings remain self-reported; Fretlab does not assess the guitar performance automatically.

Rubik provides the headings, controls and instructions; IBM Plex Mono keeps tab, frets and changing numbers aligned. Fonts are bundled into the page for offline use. Practice instructions and lessons use larger reading text, while labels use sentence case. Font sources and rationale are in [Typography research](TYPOGRAPHY_RESEARCH.md); license texts are in [licenses](licenses/).

## Practice passages

Use the numbered bar buttons to jump to any bar. The current bar stays visible after a paused seek through a long exercise. Drag across them or Shift-click to select whole bars; on touch devices, hold a bar button to select it. On desktop, drag directly over notes in the tab to select a smaller passage. The selection snaps to note boundaries and catches nearby bar lines; Alt-drag bypasses bar snapping on desktop. On desktop, clicking or dragging the bar-number area under the strings selects whole bars. Touch swipes scroll without selecting or resizing; tap a note to seek, or use the bar buttons. The surrounding exercise stays visible. Drag either edge to resize it; dragging near the viewport edge scrolls through longer exercises. Shift-click or Shift-arrow keys extend a selection, double-click selects a bar, and Ctrl/Cmd+A selects the whole step while the tab is focused. Use Clear selection, click outside the selection, or press Esc to clear it. Clearing retains the current position and tempo.

Play practices the selected passage at your chosen tempo. The existing Loop switch controls whether it repeats. Key and tempo changes appear directly in the tablature, including the actual upcoming-key notes beyond a loop boundary. Today’s Continue practicing restores the position and selection after browsing or reloading, with audio paused. Previously saved spots remain available in Library.

Touch targets are larger, and the tab keeps normal vertical scrolling and browser pinch zoom. Loop boundaries show one readable bar label, without stacked end/start numbers.

This interaction follows [Guitar Pro’s score selection and edge resizing](https://www.guitar-pro.com/docs/gp8/basics/first-steps/click). Sources and design decisions are in [Practice UX research](PRACTICE_UX_RESEARCH.md).

## Checks

Audio checks render the actual sound graph to check note sustain, quiet endings, polyphonic headroom, master mute and separate note/click levels. String checks measure pitch, dynamics, decay and pick variation at 44.1/48 kHz and A4 = 432/440/442 Hz. They also cover opening notes with Notes off or click-only steps, session Pause/Resume/End, independent finger annotations, immediate tempo previews and the desktop chord toolbar.

Advanced checks verify the moving inner voices and modal spellings, creative tasks, reversible skip behavior, early key/tempo previews, future-note selection, light/dark label contrast and responsive layouts.

Practice and transport checks cover bar buttons and snapping in a 120-bar exercise, trusted touch navigation/scrolling without drag selection, mouse and keyboard selection, clean loop-boundary labels, exact straight/swung looping, inline future-key notes, reload resume and legacy spot/skip restoration. Advanced content checks verify the written four-bar starter and its question/answer endings.

Install Playwright and Chromium, then run all ten suites: `node tests/validate.js`, `node tests/smoke.js`, `node tests/practice.js`, `node tests/desktop.js`, `node tests/transport.js`, `node tests/chords.js`, `node tests/rhythm.js`, `node tests/essentials.js`, `node tests/advanced.js`, and `node tests/audio.js`. They cover exercise and quiz content, desktop and narrow-window layouts, reference preferences and previews, navigation, progression and review, pause/seek/count-in behavior, and audio timing across loop changes. Rhythm and featured-study checks verify bar counts, click modes, priority ordering and focus selection. Chord checks verify all 24 discovery voicings, all twelve transpositions of the movable forms, pitches, fingers, barres, exclusive open/movable classification, genre filters and small default sets.

## Other tools

- **Today**: a time-budgeted plan with a chosen focus, due reviews, a lesson when time allows, and an application using the same material; fixed routines (Quick 15, Deep 45 and Riff writer 20); and a reflection that greets you next session. Practice statistics and the 7-day chart are in Progress.
- **Metronome**: click, wood, beep or drum beats, swing, tap tempo, time signatures, accents, speed trainer, gap trainer and tempo log
- **Fretboard trainer**: find the note, name the note, intervals, find them all, and a progress map
- **Ear trainer**: scale degrees in a key, intervals and chord types
- **Tuner**: listens through the microphone with Auto, Manual and Chromatic modes, a needle gauge, a headstock that marks each string green once it's in tune, reference tones, and eight tunings (standard, half and whole step down, Drop D, DADGAD, Open G, Open D and FACGCE). The pitch detector and gauge are adapted from [KotoLab](https://github.com/yuri-r2/kotolab) (MIT, © 2026 yuri-r2). The microphone needs the hosted page (GitHub Pages); embedded previews may block it.
- **Drone**: a sustained reference for scale and chord-tone practice.

Progress is saved in your browser's local storage. Use **Settings → Download backup** to save it to a file, and **Restore from file** to move it to another device or browser.

## Keyboard

In an exercise: **Space** plays or stops, **1** / **2** / **3** rate the run Clean / Almost / Messy, **L** plays a listen-first pass, and **←** **→** step through notes. **M** mutes anywhere. In the tab bar, **←** **→** (and **Home** / **End**) move between tabs. In Learn checks and the ear trainer, number keys pick answers.

## Volume

The speaker button opens **Master** (up to 100%), **Notes & tones** and **Click & drums** (up to 150% each). All three wide sliders live together in the header’s Volume panel, accessible from every page. Settings links to the same panel. Notes and Click switches in exercises only toggle playback; their levels stay in the shared mixer. Levels at 10% or below are explicit in Volume. **Reset levels** restores Master 80%, Notes/Click 100% and unmute, retaining progress and practice options. **M** toggles mute. Escape closes Volume and returns to the speaker button; practice shortcuts stay inactive while the mixer is open.

Guitar notes use a self-contained plucked-string model with fractional tuning, a shaped pick attack, body coloration and progressively softer overtones. Three pick variants keep repeated notes from sounding identical while retaining exact pitch and timing; fuller strums have balanced levels. The synthesis draws on the tuning, excitation and damping methods described in Julius O. Smith's [Physical Audio Signal Processing](https://dsprelated.com/freebooks/pasp/Electric_Guitars.html) and Ben Lynn's [Karplus–Strong explanation](https://theory.stanford.edu/~blynn/sound/karplusstrong.html). No sound downloads are needed, including offline.

## Appearance

Inked uses near-white (`#fafafa`) light mode and near-black (`#08090b`) dark mode, following your system appearance. Neutral panels, spacing and teal accents keep the workspace legible. Actions use deep teal (`#004f52`) in light mode and bright teal (`#2de0de`) in dark mode. Playback highlights use slate blue, and root markers use graphite/slate. Third, fifth and seventh markers retain blue, green and violet, with individually contrasting labels. Normal text and marker-label pairs are checked against a 7:1 target. The direction draws on the neutral schemes in [Figma's color-scheme collection](https://www.figma.com/resource-library/website-color-schemes/) and [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html).

For the palette comparison, measured ratios and sources, see [Color and contrast research](COLOR_THEME_RESEARCH.md).

## Install and offline use

On the GitHub Pages site, Fretlab can be installed like an app (Add to Home Screen on iPhone, Install app on Android or desktop Chrome) and works offline after the first visit, so it's available at rehearsal without Wi‑Fi. The screen stays awake while an exercise or the metronome is playing.

## Inspiration

The Learn path's structure (guided units, "every place" questions, weak-spot review) was inspired by [Fretman](https://github.com/drlholloway/fretboardtrainer/wiki); degree colors and shape-identification drills by Fretonomy and Fretastic; the note-learning order (one string at a time, landmarks, then octaves) by common teaching practice such as [TrueFire's fretboard guide](https://blog.truefire.com/guitar-lessons/learn-guitar-fretboard-notes-master-the-neck-fast-with-proven-strategies/); and the CAGED sequence (roots first, then the C-A-G-E-D order, then shapes as containers) by [Premier Guitar's CAGED guide](https://www.premierguitar.com/lessons/guitarists-guide-to-caged). No code from those projects is included.

## Methods

How the research shaped the app:

- **Clean runs over more runs.** In advanced pianists, total practice time and repetitions didn't predict next-day performance. What did: fixing errors right away, varying tempo on purpose and repeating until a passage stayed right ([Duke, Simmons and Cash, 2009](https://cml.music.utexas.edu/research/music-teaching-and-learning); [summary](https://www.musicmark.org.uk/news/8-things-top-practicers-do-differently/)). Hence the two-clean-runs rule, the 10% slow-down and part practice.
- **Part, then whole.** Chaining and whole–part–whole, plus goal setting and self-evaluation, made practice more effective in the same time ([Miksza](https://bulletproofmusician.com/research-tested-practice-strategies-that-will-help-you-learn-new-&)). Hence Practice loops and the reflection note.
- **Hear a model first.** Musicians who listened to the target before practicing gained more during practice and overnight ([Cash and colleagues](https://scholars.ttu.edu/en/publications/effects-of-model-performances-on-music-skill-acquisition-and-over-5)). Hence Listen first and the "Hear the voicing" steps.
- **Mixed practice for review.** Random or interleaved schedules held up better at a later test with clarinetists ([Stambaugh, 2011](https://digitalcommons.georgiasouthern.edu/music-facpubs/2); [Carter and Grahn, 2016](https://www.frontiersin.org/articles/10.3389/fpsyg.2016.01251/full)), but the effect in real-world settings is small ([Czyż et al., 2024](https://frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1377122/full)). A later study of difficult violin excerpts favored blocked practice at retention ([Mathias and Goldman, 2025](https://journals.sagepub.com/doi/full/10.1177/00224294231222801)). The plan uses focused work and manageable reviews; the best schedule depends on the task.
- **Spacing and retrieval.** How you play during practice is a poor guide to what you keep ([Soderstrom and Bjork, 2015](https://pubmed.ncbi.nlm.nih.gov/25910388/)). Spaced reviews help memory, and the best gap grows with how long you want to remember ([Cepeda et al., 2008](https://pubmed.ncbi.nlm.nih.gov/19076480/)). Recalling from memory beats re-reading ([Karpicke and Roediger](https://applied-science-cisdev.sites.olt.ubc.ca/files/2018/06/retrieval-and-spacing.pdf)). Hence cold checks, mixed unit reviews and cumulative checks. Gaps of a few minutes within one session didn't help a piano task ([Wiseheart et al., 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5553926)), so reviews are spaced over days, not minutes.
- **Focus on the sound.** An external focus on the music improved expression without hurting accuracy ([Mornell and Wulf, 2018](https://oasis.library.unlv.edu/kns_fac_articles/224); [OPTIMAL theory](https://gwulf.faculty.unlv.edu/wp-content/uploads/2021/11/Wulf_Lewthwaite_OPTIMAL_Current_Directions_2021.pdf)). Hence listening cues and clear, generous success criteria.
- **Make your own music.** Popular musicians learn by ear, from real songs, mixing playing and composing ([Lucy Green](https://www.ucl.ac.uk/ioe/research-projects/2017/jun/adapting-popular-musicians-practices-classroom)). Well-chosen constraints push past habits ([Stokes, via Kaufman](https://scottbarrykaufman.com/does-creativity-require-constraints)). Hence the "Your riff" step and its daily constraint.
- **Purposeful practice.** Specific goals, full focus, quick feedback and working just past your comfort zone ([Ericsson, *Peak*](https://commoncog.com/peak-book-summary)). Practice explains a real but partial share of musical skill ([Hambrick et al., 2014](https://www.frontiersin.org/articles/10.3389/fpsyg.2014.00751/full)).
- Functional ear training: [Functional Ear Trainer](https://apps.apple.com/app/id1088761926)


Audio startup retries suspended or interrupted browser audio on a tap or click and recreates closed sessions. If sound cannot start, playback pauses and Volume offers **Enable sound** with site-permission guidance. **Test sound** plays through Master, independently of the Notes and Click sliders; it explicitly unmutes Master when needed. Generated guitar and noise buffers use write-only sample transfer. Browser checks cover denied/pending starts, retry and closed-context recovery. The isolated sound check has been confirmed audible on Android Brave; individual devices and their volume settings still determine physical output.

For device-specific silence, [Sound check](https://yuri-r2.github.io/fretlab/audio-check.html) compares a native audio clip, a fresh direct synth and synth playback through a media element. Select which sounds you heard and copy the report. This records no playing and sends nothing automatically. Online navigation fetches the current page immediately; the cached copy remains available offline.


The visual hierarchy groups controls through spacing and shared neutral surfaces. Cards and the player use fewer outlines, exercise steps use text tabs, and guidance stays separate from the score. Functional notation lines and keyboard focus indicators remain explicit. Design rationale: [Interface hierarchy](VISUAL_DESIGN_RESEARCH.md).
