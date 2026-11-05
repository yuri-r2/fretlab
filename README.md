# Fretlab

A fretboard practice app for intermediate and advanced guitarists, in a single HTML file. Open `index.html` in any modern browser, or use the hosted version on GitHub Pages. Developer notes for working on the code are in [AGENTS.md](AGENTS.md).

## Find your way

The desktop web app uses a persistent navigation rail and a wider practice workspace. Playback and notation sit beside feedback and collapsible settings. Smaller windows use the compact navigation layout. Keyboard arrows move through navigation, and settings keep keyboard focus inside the dialog.

Four main destinations keep the learning flow close at hand: **Today**, **Learn**, **Library**, and **Progress**. The Library groups Chord Shapes, Scales, Rhythm, Exercises, Fretboard, and Ear training. **Tuner** and **Metronome** buttons sit in the header on every screen (icons on phones), and the drone lives on the Tuner page. The header transport follows the exercise while its player is open, so its tempo and play controls act on that exercise. Riff writing stays inside the chord practice steps. Older Riff Dice ideas remain in backup data; old links open Chord Shapes. Progress holds practice statistics, the seven-day chart, and the filterable history. Lessons resume at the last visited card, and a workout's Back button returns to its starting context.

Today's plan fits the time you choose, from 5 to 90 minutes. Choose a focus in Today, or make an exercise or chord collection your focus from its own screen. Reviews retain their key, and the final application block uses the session's focus material. Timers wait for Next block so a time limit does not interrupt a phrase.

## Essentials

Twelve exercises, chosen as the ones that pay off most for playing and writing riffs in a band, form an ordered path: Subdivision ladder, One note on the whole neck, Pendulum strumming, Minor pentatonic boxes, Palm-muted chugs and gallops, Triad inversions, 3rds and 6ths, Moving shape under open B and E, Syncopation and pushes, Octave riffs, Major scale positions, and CAGED arpeggios. Timing and rhythm guitar come early because they are what a band hears first. The Library shows your place in the path and the next one to play. Exercises lists the twelve first and tucks everything else under *All other exercises*; Rhythm shows its essentials first; Chord Shapes remains a reference independent of the workout order. Today's plan picks the next unfinished essential as its focus unless you chose one or practiced something else this week, reviews of essentials come first, and the Quick and Deep routines are built from them. Everything else stays in the library and in search.

## Learn path

Nine units that build on each other: notes on the low strings, octave shapes, intervals as shapes, the CAGED system, pentatonic boxes, the major scale (positions, three-notes-per-string patterns and lines along the strings), triads and inversions, chords in a key (diatonic chords, the progressions songs lean on, borrowed iv, bVII and bVI chords, the ii–V–I and guide tones), and voicings for riffs (color tones, open-string drones, alternate tunings). Each unit has short lesson cards with color-coded fretboard diagrams (root, 3rd, 5th, 7th), a 10-question check with an explanation after every answer (8 to pass, new questions each attempt), and links to the drills and exercises that make it automatic. From unit 2 on, each check includes two questions from earlier units. Passed units come back as a mixed 10-question review after 1, 3, 7, 16 and 35 days; a unit you get fully right moves to the next gap, and a miss brings it back the next day. Question types include naming and finding notes, finding every place a note lives, octave shapes, naming and finding intervals, identifying CAGED shapes and roots, scale degrees inside a position, triad inversions and quality, and key harmony.

## Exercises

Play-along workouts that show exactly what to play, note by note, in time. A scrolling tab with a fixed playhead shows pick direction, technique marks and labels (finger, note name or scale degree), while a live fretboard shows the note to play now, the next one, and the rest of the shape. Pause keeps your place, and Resume continues from there with your count-in setting. Scroll the tab horizontally (or use Shift + mouse wheel), click a note, or use the position slider to choose a starting point. Restart returns to the beginning. The Show fingers toggle shows or hides smaller suggested finger numbers beside the fret numbers and selected note labels. Space plays/pauses, Home restarts, and the focused position slider supports arrow keys, Page Up/Down, Home, and End. Automatic +4 bpm and key changes are scheduled ahead at the loop boundary, keeping the first note and click in time. Most exercises work in any key: pick one, roll a random key, or move up a 4th every loop to play through all 12.

Workouts for knowing the neck in any key, connecting it with technique and chord tones, and turning it into riffs:

- **Fretboard fluency**: cycle of fourths on every string, and one note across the whole neck (with octaves, 5ths and power chords)
- **Arpeggios and chords**: CAGED triad and major 7 arpeggios, diatonic 7th arpeggios in one position, ii–V–I arpeggios and guide tones, and triad inversions on every string set with voice-led I–vi–IV–V and I–V–vi–IV
- **Technique**: 3- and 5-string sweep-picked arpeggios
- **Riff building**: hammer-ons, pull-offs and slides between pentatonic boxes (the warm-up), octave riffs through the key, and 3rds and 6ths as two-note riffs, ending with a pedal-tone riff

Each exercise has 3 to 8 steps with a goal tempo. Tap the goal to set your own, for one step or every step of the exercise (Default puts it back). Rate each run (Clean, Almost, Messy): two clean runs in a row raise the tempo by 5 bpm, a messy run lowers it by about 10%, and two clean runs at the goal lock the step in. After that the tempo keeps climbing past the goal (up to 260 bpm) with every two clean runs, and the per-loop speed ladder keeps going too. Tap the tempo to type one, or hold − / + to change it fast. Locked-in steps come back as cold checks on the same 1, 3, 7, 16, 35 day schedule, with a first-play check before rehearsal or listening. New steps suggest a **Listen first** pass, **Practice** loops a single bar or pair of bars a little slower (part practice, then back to the whole step), and each exercise shows one listening cue. Count-in, looping, guide audio, a click, a step-through mode (arrow keys) and an automatic speed ladder are built in.

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

A chord reference with **Open chords** and **Movable shapes** views. Choose any of 12 roots and 28 chord types, then compare fingerings, notes, chord degrees and inversions. The root, type, view, filters and label choice are remembered. Hear any individual grip as a strum or arpeggio. Desktop controls remain available while scrolling through the diagrams. Arrow keys change the focused root; Home/End jump to C/B. Show more brings the first newly revealed grip into view.

Open chords start with frets 0–4; choose Full neck for higher open-string voicings. They contain actual open strings in the chosen tuning; their number depends on the root and chord type. Identical grips and redundant open-string muting variants with the same bass register and chord tones are collapsed. Movable shapes include closed grips and transferable open forms such as open A major: move all sounding notes together, replace the nut with a barre, and adjust the remaining fingers. A transferable open form appears in both views and is labeled accordingly.

Filter by barres, three-note grips, four-note grips, three-note shells, bass position, or neck area. Standard, Drop D, FACGCE, Open D, Open G and DADGAD are supported. Shapes are generated across frets 0–20 within a four-fret span, with at most four fretting fingers; this is a bounded practical reference rather than a claim to enumerate every possible guitar voicing. The root and defining tones are required. A permitted omitted fifth is identified on the card. Shapes load in batches of 24.

Diagrams distinguish finger numbers inside dots from the fret-number row below, mark open strings with circles, show skipped strings with ×, and connect barre notes with a wide bar. Fingerings are suggestions. Left-handed diagrams mirror the strings and fret row. In exercises, **Show fingers** controls smaller finger annotations beside the larger fret numbers and on the fretboard, independently of note/degree labels; the finger key explains 1–4 and open strings.

The reference follows the root/type and alternate-voicing organization used by [Fender's Chords tool](https://support.fender.com/hc/en-us/articles/42913518419867-What-is-the-Chords-tool) and [Oolimo's chord chart](https://www.oolimo.com/en/guitar-chords/chart). Fender also documents [switchable finger, note and interval labels](https://support.fender.com/hc/en-us/articles/42913392616731-What-do-the-numbers-in-the-dots-mean). [Guitar Pro's notation settings](https://www.guitar-pro.com/docs/gp8/preferences-stylesheet/stylesheet/notation) separate fretting-hand numbers from picking-hand letters and support smaller, separately positioned fingering annotations. [JustinGuitar's A-shape module](https://www.justinguitar.com/modules/a-shape-barre-chords) provides a familiar model for the transferable-open-form category. [Bret Willmott's book](https://www.melbay.com/Products/Default.aspx?bookid=95112) emphasizes four-note voicings on middle strings and voice leading; [Ted Greene's Chord Chemistry](https://www.alfred.com/products/ted-greene-chord-chemistry-00-el02778) supplies broader chord-vocabulary inspiration. Fretlab applies these organizational ideas with its own generated diagrams and explanations.

The 26 existing shape and genre workouts remain in **Exercises**, retaining their IDs, favorites and progress: movable A- and E-string shapes, triad inversions, shells, and rock, alternative, midwest emo and shoegaze applications. Listening and composing keep their own completion criteria.

Playback and display controls sit open in a bar above the tab, one tap each: Loop, Count-in, Click and Notes (each with its own volume), +4 bpm per loop, a new key per loop, the note labels (none, degrees, chord tones, notes), Show fingers, and the section to loop. The run rating and your history stay quietly in the side panel.

Completion, best tempos, and review schedules for keyed exercises are stored separately for each key. Existing progress is retained in its saved key (or the exercise's default key when none was saved). Listening or stepping through a due exercise before rating it postpones that review to tomorrow rather than advancing its cold-review interval. Ratings remain self-reported; Fretlab does not assess the guitar performance automatically.

## Checks

Install Playwright and Chromium, then run all eight suites: `node tests/validate.js`, `node tests/smoke.js`, `node tests/practice.js`, `node tests/desktop.js`, `node tests/transport.js`, `node tests/chords.js`, `node tests/rhythm.js`, and `node tests/essentials.js`. They cover exercise and quiz content, desktop and narrow-window layouts, reference preferences and previews, navigation, progression and review, pause/seek/count-in behavior, and audio timing across loop changes. Rhythm and Essentials checks verify bar counts, click modes, priority ordering and focus selection. Chord checks verify pitches, formulas, bass notes, finger assignments, barres, unique open grips, transferable forms, and familiar shapes across roots and tunings.

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

The speaker button in the header opens a mixer: **Master** with **Mute**, plus separate **Guitar notes** (the guide sound in exercises and play-alongs) and **Click & drums** (metronome, count-ins and drum backing) levels, each up to 150%. The same two sliders sit next to the *Hear the notes* and *Click* switches inside every exercise. Press **M** anywhere to mute or unmute. On iPhone, sound plays even with the silent switch on.

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

