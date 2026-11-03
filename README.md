# Fretlab

A fretboard practice app for intermediate and advanced guitarists, in a single HTML file. Open `index.html` in any modern browser, or use the hosted version on GitHub Pages.

## Learn path

Nine units that build on each other: notes on the low strings, octave shapes, intervals as shapes, the CAGED system, pentatonic boxes, the major scale (positions, three-notes-per-string patterns and lines along the strings), triads and inversions, chords in a key (diatonic chords, the progressions songs lean on, borrowed iv, bVII and bVI chords, the ii–V–I and guide tones), and voicings for riffs (color tones, open-string drones, alternate tunings). Each unit has short lesson cards with color-coded fretboard diagrams (root, 3rd, 5th, 7th), a 10-question check with an explanation after every answer (8 to pass, new questions each attempt), and links to the drills and exercises that make it automatic. From unit 2 on, each check includes two questions from earlier units. Passed units come back as a mixed 10-question review after 1, 3, 7, 16 and 35 days; a unit you get fully right moves to the next gap, and a miss brings it back the next day. Question types include naming and finding notes, finding every place a note lives, octave shapes, naming and finding intervals, identifying CAGED shapes and roots, scale degrees inside a position, triad inversions and quality, and key harmony.

## Exercises

Play-along workouts that show exactly what to play, note by note, in time. A scrolling tab with a fixed playhead shows pick direction, technique marks and labels (finger, note name or scale degree), while a live fretboard shows the note to play now, the next one, and the rest of the shape. Most exercises work in any key: pick one, roll a random key, or move up a 4th every loop to play through all 12.

Workouts for knowing the neck in any key, connecting it with technique and chord tones, and turning it into riffs:

- **Fretboard fluency**: cycle of fourths on every string, and one note across the whole neck (with octaves, 5ths and power chords)
- **Arpeggios and chords**: CAGED triad and major 7 arpeggios, diatonic 7th arpeggios in one position, ii–V–I arpeggios and guide tones, and triad inversions on every string set with voice-led I–vi–IV–V and I–V–vi–IV
- **Technique**: 3- and 5-string sweep-picked arpeggios
- **Riff building**: hammer-ons, pull-offs and slides between pentatonic boxes (the warm-up), octave riffs through the key, and 3rds and 6ths as two-note riffs, ending with a pedal-tone riff

Each exercise has 3 to 8 steps with a goal tempo. Tap the goal to set your own, for one step or every step of the exercise (Default puts it back). Rate each run (Clean, Almost, Messy): two clean runs in a row raise the tempo by 5 bpm, a messy run lowers it by about 10%, and two clean runs at the goal lock the step in. After that the tempo keeps climbing past the goal (up to 260 bpm) with every two clean runs, and the per-loop speed ladder keeps going too. Tap the tempo to type one, or hold − / + to change it fast. Locked-in steps come back as cold checks on the same 1, 3, 7, 16, 35 day schedule, and the first run of the day is the one that counts. New steps suggest a **Listen first** pass, **Practice** loops a single bar or pair of bars a little slower (part practice, then back to the whole step), and each exercise shows one listening cue. Count-in, looping, guide audio, a click, a step-through mode (arrow keys) and an automatic speed ladder are built in.

**History.** Every run you play or rate is logged with its step, key, tempo and rating. The library opens with *Pick up where you left off* (your last four steps, one tap to resume at the same step and key) and your **Favorites** (star any exercise). The **History** view lists runs day by day, filterable by exercise, and every row jumps straight back to that step. Inside an exercise, *Your history* shows each step's last session, run count, best tempo and a tempo sparkline colored by rating, with a button to jump to any step. Today shows a one-tap *Resume* for your last exercise.

## Scales

Pick a key and one of ten scales (major and minor pentatonic, blues, major, natural minor, Dorian, Mixolydian, Phrygian, Lydian, harmonic minor) and see it on the whole neck or one CAGED position at a time, then practice it with exercises built for that scale. They open right in the Scales tab, already in your key: five positions linked up the neck, three-notes-per-string patterns (diagonal patterns for pentatonic and blues), sequences in 3s, 4s, 3rds and 4ths, the scale along one string, and *Hear it over a drone*, which plays a held root under the scale and holds its color notes (the 6 in Dorian, the b7 in Mixolydian, the #4 in Lydian, and so on) so you hear what makes each scale sound like itself. Minor pentatonic uses the five-box exercise, and major uses the five positions, three notes per string, sequences and one-string exercises.

## Voicings

A library of 22 chord shapes for writing riffs in rock, alternative, midwest emo and shoegaze styles:

- **Rock**: power chords with the octave, anchored G–Cadd9–Dsus4–Em7, sus4 moves on open A and D, the 5–6 boogie shuffle, the 7#9 "Hendrix" chord, and five-string open G
- **Alternative**: two-finger shapes over open strings, drop D power chords, sus2 chords, octaves over open B and E, power chords with the 9th, and minor barres over open B and E
- **Midwest emo**: major 7ths with open strings, moving shapes under open B and E, FACGCE, sliding maj9 shapes, and DADGAD drones
- **Shoegaze**: a drone with a sliding shape, drone 3rds, open D shimmer, unison shimmer, and big open add9 chords Each voicing shows a chord diagram and fretboard colored by what each note does (root, 3rd, 5th, 7th, color tones), plays as a strum or arpeggio, lists four moves of the shape with riff ideas, and opens a four-step play-along (hear it, move the shape, variation, and your own riff inside a daily constraint), including riffs in 7/8 and in alternate tunings. All shapes are original.

## Other tools

- **Today**: an adaptive daily plan (warm-up, one new step in a focused block, due cold checks, mixed review or the next lesson, fretboard notes, a constrained riff of your own, and a one-minute replay of the new step), fixed routines (Quick 15, Deep 45 and Riff writer 20), a one-line reflection after each routine that greets you next session, daily goal, streak and 7-day chart
- **Metronome**: click, wood, beep or drum beats, swing, tap tempo, time signatures, accents, speed trainer, gap trainer and tempo log
- **Fretboard trainer**: find the note, name the note, intervals, find them all, and a progress map
- **Ear trainer**: scale degrees in a key, intervals and chord types
- **Tuner**: listens through the microphone with Auto, Manual and Chromatic modes, a needle gauge, a headstock that marks each string green once it's in tune, reference tones, and eight tunings (standard, half and whole step down, Drop D, DADGAD, Open G, Open D and FACGCE). The pitch detector and gauge are adapted from [KotoLab](https://github.com/yuri-r2/kotolab) (MIT, © 2026 yuri-r2). The microphone needs the hosted page (GitHub Pages); embedded previews may block it.
- **Drone** and **Riff Dice**

Progress is saved in your browser's local storage. Use **Settings → Download backup** to save it to a file, and **Restore from file** to move it to another device or browser.

## Keyboard

In an exercise: **Space** plays or stops, **1** / **2** / **3** rate the run Clean / Almost / Messy, **L** plays a listen-first pass, and **←** **→** step through notes. **M** mutes anywhere. In the tab bar, **←** **→** (and **Home** / **End**) move between tabs. In Learn checks and the ear trainer, number keys pick answers.

## Volume

The speaker button in the header opens a mixer: **Master** with **Mute**, plus separate **Guitar notes** (the guide sound in exercises and play-alongs) and **Click & drums** (metronome, count-ins and drum backing) levels, each up to 150%. The same two sliders sit next to the *Hear the notes* and *Click* switches inside every exercise. Press **M** anywhere to mute or unmute. On iPhone, sound plays even with the silent switch on.

## Install and offline use

On the GitHub Pages site, Fretlab can be installed like an app (Add to Home Screen on iPhone, Install app on Android or desktop Chrome) and works offline after the first visit, so it's available at rehearsal without Wi‑Fi. The screen stays awake while an exercise, the metronome or a Riff Dice loop is playing.

## Inspiration

The Learn path's structure (guided units, "every place" questions, weak-spot review) was inspired by [Fretman](https://github.com/drlholloway/fretboardtrainer/wiki); degree colors and shape-identification drills by Fretonomy and Fretastic; the note-learning order (one string at a time, landmarks, then octaves) by common teaching practice such as [TrueFire's fretboard guide](https://blog.truefire.com/guitar-lessons/learn-guitar-fretboard-notes-master-the-neck-fast-with-proven-strategies/); and the CAGED sequence (roots first, then the C-A-G-E-D order, then shapes as containers) by [Premier Guitar's CAGED guide](https://www.premierguitar.com/lessons/guitarists-guide-to-caged). No code from those projects is included.

## Methods

How the research shaped the app:

- **Clean runs over more runs.** In advanced pianists, total practice time and repetitions didn't predict next-day performance. What did: fixing errors right away, varying tempo on purpose and repeating until a passage stayed right ([Duke, Simmons and Cash, 2009](https://cml.music.utexas.edu/research/music-teaching-and-learning); [summary](https://www.musicmark.org.uk/news/8-things-top-practicers-do-differently/)). Hence the two-clean-runs rule, the 10% slow-down and part practice.
- **Part, then whole.** Chaining and whole–part–whole, plus goal setting and self-evaluation, made practice more effective in the same time ([Miksza](https://bulletproofmusician.com/research-tested-practice-strategies-that-will-help-you-learn-new-&)). Hence Practice loops and the reflection note.
- **Hear a model first.** Musicians who listened to the target before practicing gained more during practice and overnight ([Cash and colleagues](https://scholars.ttu.edu/en/publications/effects-of-model-performances-on-music-skill-acquisition-and-over-5)). Hence Listen first and the "Hear the voicing" steps.
- **Mixed practice for review.** Random or interleaved schedules held up better at a later test with clarinetists ([Stambaugh, 2011](https://digitalcommons.georgiasouthern.edu/music-facpubs/2); [Carter and Grahn, 2016](https://www.frontiersin.org/articles/10.3389/fpsyg.2016.01251/full)), but the effect in real-world settings is small ([Czyż et al., 2024](https://frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1377122/full)). Hence a focused block for new material and mixed blocks for review.
- **Spacing and retrieval.** How you play during practice is a poor guide to what you keep ([Soderstrom and Bjork, 2015](https://pubmed.ncbi.nlm.nih.gov/25910388/)). Spaced reviews help memory, and the best gap grows with how long you want to remember ([Cepeda et al., 2008](https://pubmed.ncbi.nlm.nih.gov/19076480/)). Recalling from memory beats re-reading ([Karpicke and Roediger](https://applied-science-cisdev.sites.olt.ubc.ca/files/2018/06/retrieval-and-spacing.pdf)). Hence cold checks, mixed unit reviews and cumulative checks. Gaps of a few minutes within one session didn't help a piano task ([Wiseheart et al., 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5553926)), so reviews are spaced over days, not minutes.
- **Sleep and interference.** Practicing a similar melody after a new one erased its overnight gain, and replaying the first before sleep restored it ([Allen](https://www.medicalnewstoday.com/releases/259155)). Hence the closing replay block.
- **Focus on the sound.** An external focus on the music improved expression without hurting accuracy ([Mornell and Wulf, 2018](https://oasis.library.unlv.edu/kns_fac_articles/224); [OPTIMAL theory](https://gwulf.faculty.unlv.edu/wp-content/uploads/2021/11/Wulf_Lewthwaite_OPTIMAL_Current_Directions_2021.pdf)). Hence listening cues and clear, generous success criteria.
- **Make your own music.** Popular musicians learn by ear, from real songs, mixing playing and composing ([Lucy Green](https://www.ucl.ac.uk/ioe/research-projects/2017/jun/adapting-popular-musicians-practices-classroom)). Well-chosen constraints push past habits ([Stokes, via Kaufman](https://scottbarrykaufman.com/does-creativity-require-constraints)). Hence the "Your riff" step and its daily constraint.
- **Purposeful practice.** Specific goals, full focus, quick feedback and working just past your comfort zone ([Ericsson, *Peak*](https://commoncog.com/peak-book-summary)). Practice explains a real but partial share of musical skill ([Hambrick et al., 2014](https://www.frontiersin.org/articles/10.3389/fpsyg.2014.00751/full)).
- Functional ear training: [Functional Ear Trainer](https://apps.apple.com/app/id1088761926)
