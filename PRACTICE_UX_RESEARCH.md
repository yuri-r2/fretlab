# Practice UX: patterns worth borrowing

Reviewed November 6, 2026. This comparison uses public product documentation. It establishes what the products offer, rather than ranking their teaching effectiveness.

## Findings

| Product and source | Useful pattern | Decision for Fretlab |
| --- | --- | --- |
| [Soundslice: looping](https://www.soundslice.com/help/en/player/basic/4/looping/) | Select a passage directly in the music, with boundaries that snap to musical positions. | Use a compact whole-step bar strip. Click to seek, drag or Shift-click to choose a range, and keep a native section selector as another route. Whole bars provide predictable entrances for the existing count-in and part-practice system. |
| [Soundslice: practice lists and saved loops](https://www.soundslice.com/blog/214/introducing-practice-lists/) | Keep specific passages so the next practice session can return directly to the problem. | Save a bar range with its exercise, step, key, tempo and labels. Keep spots beside the exercise and in a Library folder; provide exact last-position resume on Today. |
| [TrueFire: interactive tab player](https://blog.truefire.com/announcements/our-interactive-video-synced-tab-just-got-a-major-upgrade/) | Connect looping, speed training, saved clips and notation navigation in the player. | Put passage controls beside the tab, alongside the existing loop, count-in, tempo ladder and future-key cues. Preserve timing and avoid adding another player or separate editing destination. |
| [Pickup Music: homepage and learning pathways](https://help.pickupmusic.com/en/articles/10513850-navigating-the-homepage) | Make the personal learning plan easy to reach, and connect a concept with guided practice and a musical application. | Keep Fretlab's existing hear → practice → variation → write sequence and time-budgeted routines. Add a direct Continue practicing card so an experienced player can resume a specific problem instead of choosing material again. |

## Scope and interaction decisions

The useful opportunity was navigation within the material already present. Fretlab already has learning units, featured studies, practice plans, ratings, spaced reviews and creative transfer. Another course catalog or another progress score would duplicate those systems.

The bar strip represents the entire step, including when only a passage is playing. Selected bars are tinted; the current bar has the same amber cue as the tab playhead. Original bar numbers stay consistent across the strip, tablature and status text. A native selector, keyboard navigation and the one-click Loop this bar action supplement mouse selection.

Selecting a passage pauses playback so its entrance is deliberate. It uses the existing part-practice tempo reduction and restores the whole-step tempo when cleared. Restoring a saved spot uses its saved tempo directly and leaves audio paused. Saving the same exercise, step, key and range updates that spot. Skipping an exercise hides its spots and resume suggestion while preserving them for restoration.

The existing Inked colors, typography and small sheet-music chord boxes remain the visual foundation. No third-party course material, audio, branding or artwork is included.

## Verification

Practice and transport tests exercise a 120-bar passage, forward and reverse selection, keyboard seeking, clearing a loop, saved context, reload during playback and skip/restore behavior. Desktop layout and audio timing checks remain part of the ten-suite release checks. Screenshots are reviewed in light and dark mode.
