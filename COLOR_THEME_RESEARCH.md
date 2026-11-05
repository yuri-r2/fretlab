# Fretlab color and contrast direction

The workspace uses near-white (`#fafafa`) in light mode and near-black (`#08090b`) in dark mode. Color belongs primarily in actions, selected states and musical markers. The app currently uses violet accents; three alternative accent treatments are previewed for selection.

## Why a palette name is not enough

Legibility depends on foreground/background pairs, line weight, text size and state differentiation. A theme can have readable body text while its cards, controls or diagrams still feel too faint. The previous soft palette needed stronger boundaries and clearer secondary text.

[WCAG minimum contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) specifies 4.5:1 for ordinary text. [Enhanced contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html) raises ordinary text to 7:1. [Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) uses 3:1 for meaningful control/state indicators and graphics against adjacent colors. Not every decorative border is subject to that criterion. Thin anti-aliased lines can also appear fainter than their nominal color pair suggests.

For this app, normal text, secondary text on the main surfaces, marker labels and primary-button labels target at least 7:1. Control and diagram boundaries are deliberately stronger than the soft theme. This is a set of checked color pairs, not a claim that the whole application has completed a WCAG audit. Historic/inactive notes may deliberately be faded to distinguish them from upcoming notes.

## Neutral foundation

| Role | Light | Dark |
|---|---|---|
| Main background | `#fafafa` | `#08090b` |
| Card/control surface | `#ffffff` | `#202328` |
| Secondary surface | `#eceef1` | `#30343b` |
| Main text | `#16181d` | `#ffffff` |
| Secondary text | `#3e424b` | `#e0e4eb` |
| Structural boundary | `#6c7078` | `#949aa5` |

Across those three surfaces, secondary text has a minimum contrast of approximately 8.66:1 in light mode and 9.80:1 in dark mode. Boundaries have a minimum of approximately 4.27:1 and 4.42:1 respectively. Ratios use WCAG relative luminance calculations on the declared opaque colors. They do not measure glare, the user's display or personal comfort.

## Accent options

These are original app adaptations informed by [Figma's website color-scheme collection](https://www.figma.com/resource-library/website-color-schemes/), rather than exact copies of its swatches. Every option keeps the neutral foundation above.

| Direction | Figma reference | Light action | Dark action | Design judgment for Fretlab |
|---|---|---|---|---|
| Inked | Scheme 51 | `#004f52` | `#2de0de` | Recommended: a crisp teal action color separates controls from the amber playhead. |
| Clockwork | Scheme 46 | `#7a2900` | `#ffb164` | A warmer, equipment-like feel. Actions and the playhead need clear shapes/labels as well as hue. |
| Lapis velvet evening | Scheme 24 | `#5b1d7d` | `#d7b0ff` | A violet direction for the atmospheric material, supported by neutral high-contrast surfaces. |

The proposed choices concern accent personality, not a different background tint. They remain previews until selected. The shipped violet treatment uses `#7d22ce` in light mode and `#d7b0ff` in dark mode.

## Musical information

Keep root/third/fifth/seventh identities stable across themes. Use darker saturated marker fills with white labels in light mode; brighter fills with near-black labels in dark mode. Check the label against its own marker, not only against the page. Open-string rings, active notes, the playhead, key-change preparation and focus indicators also need visible structure. Labels and note roles carry meaning alongside color.

## Practical verification

Color-pair checks cover text on the main surfaces and each marker/button foreground. Browser checks cover both appearances, desktop/narrow layouts, upcoming-key notation and live playback controls. Personal preference still matters: compare the same exercise at normal screen brightness, especially fine string lines and small finger annotations. The sources establish contrast guidance and palette inspiration; they do not prove one hue is best for learning guitar.
