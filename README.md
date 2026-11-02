# Fretlab

A fretboard practice app for intermediate and advanced guitarists, in a single HTML file. Open `index.html` in any modern browser, or use the hosted version on GitHub Pages.

## Learn path

Nine units that build on each other: notes on the low strings, octave shapes, intervals as shapes, the CAGED system, pentatonic boxes, the major scale, triads and inversions, harmony in a key (diatonic 7ths, ii–V–I, guide tones), and voicings for riffs (color tones, open-string drones, alternate tunings). Each unit has short lesson cards with color-coded fretboard diagrams (root, 3rd, 5th, 7th), a 10-question check with an explanation after every answer (8 to pass, new questions each attempt), and links to the drills and exercises that make it automatic. From unit 2 on, each check includes two questions from earlier units. Passed units come back as a mixed 10-question review after 1, 3, 7, 16 and 35 days; a unit you get fully right moves to the next gap, and a miss brings it back the next day. Question types include naming and finding notes, finding every place a note lives, octave shapes, naming and finding intervals, identifying CAGED shapes and roots, scale degrees inside a position, triad inversions and quality, and key harmony.

## Exercises

Play-along workouts that show exactly what to play, note by note, in time. A scrolling tab with a fixed playhead shows pick direction, technique marks and labels (finger, note name or scale degree), while a live fretboard shows the note to play now, the next one, and the rest of the shape. Most exercises work in any key: pick one, roll a random key, or move up a 4th every loop to play through all 12.

- **Warm-up**: finger permutations across the neck
- **Positions and scales**: all five minor pentatonic boxes linked, the major scale in five CAGED positions, three-notes-per-string patterns (including legato and groups of six), and scale sequences in 3s, 4s, 3rds and 4ths
- **Arpeggios and chords**: CAGED triad and dominant 7 arpeggios, diatonic 7th arpeggios in one position, ii–V–I arpeggios and guide tones, and triad inversions on every string set with voice-led progressions
- **Technique**: 3- and 5-string sweep-picked arpeggios
- **Fretboard fluency**: cycle of fourths on every string, one note across the whole neck, and scales on one string

Each exercise has 4 to 8 steps with a goal tempo. Rate each run (Clean, Almost, Messy): two clean runs in a row raise the tempo by 5 bpm, a messy run lowers it by about 10%, and two clean runs at the goal lock the step in. Locked-in steps come back as cold checks on the same 1, 3, 7, 16, 35 day schedule, and the first run of the day is the one that counts. New steps suggest a **Listen first** pass, **Practice** loops a single bar or pair of bars a little slower (part practice, then back to the whole step), and each exercise shows one listening cue. Count-in, looping, guide audio, a click, a step-through mode (arrow keys) and an automatic speed ladder are built in.

## Voicings

A library of chord shapes for writing riffs in alternative, midwest emo and shoegaze styles: two-finger shapes over open strings, drop D power chords, sus2 and major 7th chords with ringing open strings, moving shapes under open B and E, FACGCE and open D tunings, drone 3rds and unison shimmer. Each voicing shows a chord diagram and fretboard colored by what each note does (root, 3rd, 5th, 7th, color tones), plays as a strum or arpeggio, lists four moves of the shape with riff ideas, and opens a four-step play-along (hear it, move the shape, variation, and your own riff inside a daily constraint), including riffs in 7/8 and in alternate tunings. All shapes are original.

## Other tools

- **Today**: an adaptive daily plan (warm-up, one new step in a focused block, due cold checks, mixed review or the next lesson, fretboard notes, a constrained riff of your own, and a one-minute replay of the new step), fixed routines (15, 20, 30 and 45 minutes), a one-line reflection after each routine that greets you next session, daily goal, streak and 7-day chart
- **Metronome**: click, wood, beep or drum beats, swing, tap tempo, time signatures, accents, speed trainer, gap trainer and tempo log
- **Fretboard trainer**: find the note, name the note, intervals, find them all, and a progress map
- **Ear trainer**: scale degrees in a key, intervals and chord types
- **Tuner**: listens through the microphone with Auto, Manual and Chromatic modes, a needle gauge, a headstock that marks each string green once it's in tune, reference tones, and eight tunings (standard, half and whole step down, Drop D, DADGAD, Open G, Open D and FACGCE). The pitch detector and gauge are adapted from [KotoLab](https://github.com/yuri-r2/kotolab) (MIT, © 2026 yuri-r2). The microphone needs the hosted page (GitHub Pages); embedded previews may block it.
- **Drone**, **Scales** explorer and **Riff Dice**

Progress is saved in your browser's local storage.

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
