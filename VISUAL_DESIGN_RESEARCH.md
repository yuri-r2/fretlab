# Interface hierarchy

The interface uses Rubik for headings, controls and prose, with IBM Plex Mono retained for notation and changing numeric values. Rubik’s Latin variable WOFF2 is embedded so offline and body-only copies remain self-contained. Source: [Google Fonts Rubik](https://github.com/google/fonts/tree/main/ofl/rubik); license in `licenses/rubik-OFL.txt`.

The design applies [NN/g’s proximity principle](https://www.nngroup.com/articles/gestalt-proximity/): keep related controls close, and put more space between unrelated groups. Its [common-region guidance](https://www.nngroup.com/articles/common-region/) also cautions that excessive borders create clutter and that proximity can often supply the grouping.

Application choices:

- Use a 24–32px gap between major regions and tighter spacing within control groups.
- Use shared neutral surfaces for cards, the playback/display controls and guidance, rather than nested outlines.
- Keep primary Play/session actions solid teal; secondary actions use quieter neutral fills or text.
- Use numbered text tabs for exercise steps and a single selected state. Keep the separate per-bar controls.
- Remove the outer player frame; keep notation on its own surface and guidance in a separate column.
- Retain the meaningful lines in frets, strings, chord boxes, progress paths, slider tracks and focus indicators.
- Keep the near-white/near-black foundation and slate highlights. Decorative dividers use a separate quiet token, while musical lines retain their existing contrast.

These are design judgments informed by grouping principles, not evidence that a specific typeface improves learning. Verification covers font loading offline, normal and zoomed desktop layouts, light/dark phone views, control states, contrast pairs and existing practice behavior.
