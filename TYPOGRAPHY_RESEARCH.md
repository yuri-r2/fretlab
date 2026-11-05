# Typography directions for Fretlab

## Selected direction

Use Instrument Sans for headings, navigation and instructions, retaining IBM Plex Mono for tablature, fret numbers, BPM and timers. This is a design recommendation based on the app's content and visual comparison, not a measured finding that one font improves guitar learning.

At the initial review, the app combined Barlow Condensed, IBM Plex Sans and IBM Plex Mono. Plex Sans and Mono remain good foundations. The narrow display face is the part most worth reconsidering: long exercise names and small uppercase labels feel compressed beside the rest of the interface. A coherent sans family plus a numeric mono can simplify the hierarchy while preserving the instrument-like character.

## Three options

1. **Instrument Sans + IBM Plex Mono — recommended balance.** Instrument Sans has variable weight/width support, stylistic alternatives and tabular figures. Its designers describe a precise neo-grotesque with some playful details. For Fretlab, my judgment is that it adds character without making the controls theatrical. Use normal width initially; keep defaults for small text. [Designer repository](https://github.com/Instrument/instrument-sans).
2. **Inter + IBM Plex Mono — strongest utility direction.** Inter is designed for screens, with text/display optical sizes, a tall lowercase x-height, tabular figures and a slashed-zero option. It suits dense practice controls and instruction text. The tradeoff is a more familiar software appearance. [Designer documentation](https://rsms.me/inter/).
3. **Space Grotesk headings + Inter interface + IBM Plex Mono — more character.** Space Grotesk comes from Space Mono and retains some of its distinctive details; it supports tabular figures. My judgment is that its headings fit the alternative/experimental material well. Reserve it for titles and chord names so small controls remain calm. This keeps three families, making it the least simple system. [Designer repository](https://github.com/floriankarsten/space-grotesk).

The Plex Sans/Mono pairing is also a sensible conservative choice if continuity matters most. IBM provides Sans, Mono, Serif and Condensed within the Plex family. [IBM's typeface guidance](https://www.ibm.com/design/language/typography/typeface/).

## More consequential than the family name

- Start practice instructions at 16px with roughly 1.5 line height. Use 14–15px controls and 12–13px secondary metadata, retaining sufficient spacing. These are proposed app-specific starting values, not universal accessibility thresholds.
- Give headings normal proportions and a modest size/weight hierarchy. Keep long exercise names readable without relying on condensed type.
- Prefer sentence case for navigation and explanatory labels. Uppercase can remain for brief category labels, used sparingly.
- Keep long instruction lines around 45–65 characters where the layout permits. Let short labels remain compact; do not force every block to the same measure.
- Use stable-width numbers for BPM and time. Monospaced type is useful for fret/string alignment, but is unnecessary for all prose or buttons.
- Check ambiguous glyphs in context: 0/O, 1/I/l, 3/8, 6/9; Cmaj7♯11, B♭m9 and F♯sus2; fret 0, 11 and 12; finger 1–4; 3:35. Verify accidentals render from an appropriate fallback if absent from a font subset.
- Preserve the Inked foreground/background contrast and the existing root/third/fifth/seventh marker colors. Font replacement alone does not fix text that is too small, crowded or faint.

[USWDS typography guidance](https://designsystem.digital.gov/components/typography/) treats readability as a combination of size, spacing, line length and face selection. It recommends neutral faces for interfaces and avoiding extended uppercase/bold passages. The app-specific choices above apply that guidance to information scanned during playing.

## Implementation and verification

Keep the chosen family consistent across CSS, SVG and the canvas player: the canvas reads MONO/SANS/DISP from the CSS family tokens. Redraw after initial font readiness and subsequent font loading, preserving the current playback position. Otherwise the canvas can retain fallback text while the rest of the app uses the selected face.

Prefer locally served WOFF2 assets with the selected fonts' license files for reliable offline behavior. Limit weights/subsets to what is used and retain a system fallback. The shipped page instead embeds the four Latin WOFF2 faces directly: one Instrument Sans variable face (400–700) and IBM Plex Mono at 400, 500 and 600. This keeps the app self-contained for offline and body-only copies, without font requests to an external host. OFL license texts accompany the page in `licenses/`. Other characters retain the system fallback.

Check 1280, 1440 and 1920 desktop widths, a narrow fallback, light/dark appearance and browser zoom. Compare long titles, the session header, small diagram labels, note-marker fit, chord names and canvas alignment. Font designers' feature descriptions do not substitute for testing these actual screens.
