# YAKA UI

**Next-Generation UI Framework powered by GSAP & SVG**

YAKA UI is a lightweight, high-performance UI framework designed for creating stunning, interactive web interfaces with minimal effort. It leverages the power of GSAP (GreenSock Animation Platform) for buttery smooth animations and uses SVG for crisp, scalable graphics.

## Features

-   **Modular Architecture**: Built with modern ES modules.
-   **GSAP Powered**: Best-in-class animation performance.
-   **Glassmorphism Ready**: Pre-styled glass components.
-   **Interactive Components**:
    -   Magnetic Buttons
    -   3D Tilt Cards
    -   Morphing Switches
    -   Dynamic Inputs
-   **Custom Cursor**: Integrated custom cursor with hover states.
-   **SVG Animations**: Native support for complex SVG animations.

## Getting Started

### Installation

Simply include the `yaka.css` and `yaka.js` files in your project.

```html
<link rel="stylesheet" href="yaka.css">
<script type="module" src="yaka.js"></script>
```

### Usage

YAKA UI automatically initializes its core components upon loading. You can use the following data attributes and classes to activate features:

-   **Magnetic Button**: Add `data-magnetic` to any button.
-   **Glass Card**: Use the class `.glass-card`.
-   **3D Tilt**: Add `data-tilt` (automatically applied to glass-cards in default setup, but configurable).
-   **Hover Effect**: Add `data-cursor-hover` to any element to trigger the custom cursor hover state.

### File Structure

-   `yaka.js`: Core framework logic (imports GSAP via CDN).
-   `yaka.css`: Framework styles and themes.
-   `index.html`: Documentation and component showcase.

## Tech Stack

-   **HTML5**
-   **CSS3** (Variables, Flexbox, Grid)
-   **JavaScript** (ES6+, Modules)
-   **GSAP** (Animation Engine)

## License

MIT
