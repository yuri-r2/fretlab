# Practice UX: direct selection in the tablature

Reviewed November 6, 2026. These public product documents establish interaction patterns rather than comparative teaching effectiveness.

| Source | Useful pattern | Fretlab behavior |
| --- | --- | --- |
| [Guitar Pro: managing selections](https://www.guitar-pro.com/docs/gp8/basics/first-steps/click) | Drag across beats or bars in the score; resize the highlighted region by its edges; use the existing loop control for playback. | Select directly over tab notes. Snap to event boundaries, show the surrounding score, and resize from either edge. Keep the chosen tempo and the existing Loop switch. |
| [Guitar Pro: keyboard shortcuts](https://support.guitar-pro.com/hc/en-us/articles/360001646978-GP8-List-of-keyboard-shortcuts) | Keyboard commands extend a selection through beats or bars. | Shift-arrows extend through notes; Shift-Home/End extend to the step boundary. Ctrl/Cmd+A selects the whole step when the tab has focus. |
| [Soundslice: looping](https://www.soundslice.com/help/en/player/basic/4/looping/) | Create and resize a passage in the music, snapping to musical positions. | Show a quiet selection tint and draggable edges within the tab. Edge dragging autoscrolls for longer passages. Click outside or use Esc to clear. |
| [TrueFire: interactive tab player](https://blog.truefire.com/announcements/our-interactive-video-synced-tab-just-got-a-major-upgrade/) | Connect looping, speed practice and notation navigation in one player. | Keep the existing player and transport. Show the next key, tempo and actual incoming notes in the tablature instead of a separate preparation panel. |

A compact numbered row provides a direct jump to each bar. Desktop drag or Shift-click selects whole bars; touch hold selects a bar. The separate passage toolbar and Save spot action are absent. Desktop canvas selection catches nearby bar lines; its bar-number gutter offers whole-bar selection without a keyboard. Touch canvas swipes do not select, resize or seek. Touch keeps native scrolling and pinch zoom, with bar buttons and note taps for navigation. Loop labels use exclusive segment endpoints and collision-aware placement so the end of one pass cannot overwrite the beginning of the next. Old saved spots remain readable in Library, and Today can resume a selection and exact position after a reload.

A selection uses absolute musical beats and retains the whole step's data. Playback schedules only attacks within the selected interval. Its audio time origin is distinct from its audible entry time, allowing nonzero starts, seamless repeats and key or tempo changes. Invertible swing timing keeps the score cursor and audio aligned for offbeat selections. Count-in leads into the interrupted beat while keeping notes outside the selection silent.

Tests cover direct and reverse selection, edge resizing, cancellation, keyboard extension, autoscroll, a 120-bar exercise, straight and swung loops, incoming-key notation, reload resume and legacy saved spots. Desktop light/dark screenshots and the ten-suite release checks remain part of verification.

## Mobile audio

[Chrome’s Web Audio autoplay guidance](https://developer.chrome.com/blog/web-audio-autoplay) requires resuming a suspended context after interaction and recommends detecting its state. Fretlab retries existing audio on trusted touchend/click/keydown, resumes interrupted contexts, recreates closed contexts and exposes a retry when resume rejects or stays pending. This addresses verifiable lifecycle failures; a clean desktop Brave test did not reproduce the reported Android silence.

[Brave’s audio buffer implementation](https://github.com/brave/brave-core/blob/master/chromium_src/third_party/blink/renderer/modules/webaudio/audio_buffer.cc) applies fingerprint protection to sample readback. Synthesis fills local arrays and copies them into buffers, without requiring readback or changing browser protections. [Brave’s Android site-permission guide](https://support.brave.app/hc/en-us/articles/35849239473037-How-do-I-change-or-manage-site-permissions-Android) provides the browser-level recovery path. The app cannot detect device media volume or override site sound restrictions.
