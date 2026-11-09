# Riff repertoire

Checked 8 November 2026. The repertoire is a selected collection, not a ranked claim about the best or most popular riffs.

## Selection

73 linked guitar parts: 20 alternative/grunge, 20 emo/math rock, 16 indie/post-punk and 17 shoegaze. 50 use E standard. The default collection therefore needs no retuning, while the full library retains important open-tuning and dropped-tuning material.

Selection favors recognizable guitar vocabulary and a broad set of useful textures: interlocking lines, open-string harmony, chord fragments, syncopation, sustained textures, octaves and muted rhythm. The short practice-focus descriptions are Fretlab editorial cues, not copied lessons or transcriptions. No claim of comparative learning effectiveness is made.

## Provider and scope

[Songsterr's help](https://www.songsterr.com/help) says its tabs are user-contributed and can contain errors. It also says it licenses hosted tabs, but that this does not grant permission to embed or redistribute the content on another website. [Its terms](https://www.songsterr.com/terms) describe its publisher licensing and removal process.

Fretlab links to that provider. It stores titles, artists, genre, the selected part, tuning, an original practice cue and a direct link. It does not store tab notation, song audio, lyrics or an embedded player. Songsterr controls availability, playback and subscription features. This directory is not a claim that its tabs are official artist transcriptions.

## Tuning checks

The public tab pages' guitar-part metadata was inspected for all 75 initial candidates. Two AI-generated results were excluded, leaving 73 publicly available song pages with no provider restriction reported during the check. Search results with mismatched artists, unavailable songs or no usable guitar part were omitted. This is a metadata and availability check, not a note-by-note audit of each transcription.

Each final entry links to the exact song, guitar part and checked revision. Its high-to-low tuning is retained in `RIFF_TUNINGS`; visible string names run low to high. Linking the checked revision keeps the tuning label connected to the inspected arrangement if the current transcription later changes. A provider can still remove a revision or restrict it by region.

Important distinctions:

- [Never Meant](https://www.songsterr.com/a/wsa/american-football-never-meant-tab-s25202t1/r9605025): the selected lead part is FACGCE. It is excluded from E standard.
- [Only Shallow](https://www.songsterr.com/a/wsa/my-bloody-valentine-only-shallow-tab-s12757t1/r7603007): the selected lead part uses Open E. A different standard-tuned rhythm part does not make that lead riff an E-standard entry.
- [26 Is Dancier Than 4](https://www.songsterr.com/a/wsa/this-town-needs-guns-26-is-dancier-than-4-tab-s268996t2/r7537194): the selected Tim guitar part uses C G D G B D. The other guitar's standard tuning is not used to classify it.
- [Mayonaise](https://www.songsterr.com/a/wsa/smashing-pumpkins-mayonaise-tab-s17399t1/r10063747): the selected acoustic part uses E♭ B♭ B♭ G♭ B♭ D, rather than the lead guitar's E♭ standard.
- [This Charming Man](https://www.songsterr.com/a/wsa/smiths-this-charming-man-tab-s17973t2/r6441694): the selected source uses F♯ standard. It is not silently relabeled as E standard with a capo. [Adrian Woodward's lesson](https://www.anyonecanplayguitar.co.uk/this-charming-man/) discusses the distinction between the higher tuning and its standard-tuning demonstration.

The exact checked URLs, including part and revision, live with the corresponding `SONG_RIFFS` entries in `index.html`. Those entries are the source list for maintaining the repertoire.

## Learning flow

Start with E standard; narrow the genre or search for a technique. Save a small practice shortlist instead of adding every song to a mastery checklist. The selected guitar part and its tuning are visible before opening the tab. No completion or skill rating is inferred from opening or saving a song. Existing exercise progress and old Riff Dice data remain separate.

The catalog, saved list and filters work offline. External tabs need a connection. Empty states offer a direct route back to all tunings or the E-standard collection. Save/remove actions retain keyboard focus; touch targets are at least 44 pixels tall.

## Verification

`tests/riffs.js` checks repertoire coverage, unique IDs/links, pinned guitar parts, E-standard defaults, tuning/genre/search intersections, saved-list persistence, empty-state recovery, keyboard focus, safe external links, the legacy route and desktop/touch layouts. The existing ten suites cover the rest of the app.
