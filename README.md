# YAKA UI

<div align="center">
  <img src="image.png" alt="YAKA UI Logo" width="140" height="140" />
  <h1>YAKA UI</h1>
  <p><strong>Next-Generation UI Framework powered by GSAP & SVG</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#components">Components</a> •
    <a href="#customization">Customization</a>
  </p>

  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  ![Version](https://img.shields.io/badge/version-0.1.0-orange.svg)
  ![GSAP](https://img.shields.io/badge/Powered%20by-GSAP-88CE02.svg)
</div>

---

## 🚀 Overview

DoCS - https://yaka-ui.vercel.app/docs.html

**YAKA UI** is a lightweight, high-performance UI framework designed for creating stunning, interactive web interfaces with minimal effort. It leverages the power of **GSAP (GreenSock Animation Platform)** for buttery smooth 60fps animations and uses **SVG** for crisp, scalable graphics.

Built with modern **ES Modules** and **CSS3 Variables**, YAKA UI brings premium "Glassmorphism" aesthetics and complex physics-based interactions to your project without the bloat.

## ✨ Features

- 🎨 **Glassmorphism Ready**: Pre-styled, beautiful frosted glass components.
- ⚡ **GSAP Powered**: Best-in-class animation performance for complex interactions.
- 🧲 **Magnetic Elements**: Buttons and interactive elements that snap to your cursor.
- 🧊 **3D Tilt Effects**: Cards that react to mouse movement with 3D perspective.
- 🖱️ **Custom Cursor**: integrated smooth custom cursor with hover states.
- 📱 **Fully Responsive**: Mobile-first design that looks great on all devices.
- 🔧 **Modular Architecture**: Import only what you need.
- 🌗 **Themable**: Built entirely with CSS variables for easy customization.

## 📦 Installation

Simply include the `yaka.css` and `yaka.js` files via CDN in your project.

```html
<!-- Add CSS in <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dill-lk/YAKA-UI/yaka.css">

<!-- Add JS at the end of <body> -->
<script type="module" src="https://cdn.jsdelivr.net/gh/dill-lk/YAKA-UI/yaka.js"></script>
```

> **Note**: YAKA UI imports GSAP via CDN automatically in `yaka.js`. Ensure you have an internet connection or bundle GSAP locally.

## 🔨 Usage

YAKA UI automatically initializes its core components upon loading. You can use specific **data attributes** and **classes** to activate features immediately without writing extra JavaScript.

### Basic Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dill-lk/YAKA-UI/yaka.css">
</head>
<body>
    
    <button class="btn-primary" data-magnetic>Hover Me</button>

    <script type="module" src="https://cdn.jsdelivr.net/gh/dill-lk/YAKA-UI/yaka.js"></script>
</body>
</html>
```

## 🧩 Components

### Buttons

YAKA UI provides a variety of button styles with built-in interaction effects.

```html
<!-- Primary Magnetic Button -->
<button class="btn-primary" data-magnetic>
    <span>Get Started</span>
    <svg class="btn-bg">...</svg>
</button>

<!-- Glow Button -->
<button class="btn-glow" data-magnetic>
    <span>Explore</span>
</button>

<!-- Cyber/Glitch Button -->
<button class="btn-glitch" data-text="CYBER">CYBER</button>
```

### Glass Cards

Beautiful glassmorphism cards with optional 3D tilt effects.

```html
<div class="card glass-card" data-tilt>
    <div class="card-content">
        <h3>Smart Card</h3>
        <p>Interactive glassmorphism with 3D tilt.</p>
    </div>
    <!-- Optional animated border -->
    <div class="card-border"></div>
</div>
```

### Inputs & Forms

Modern input fields with animated borders and floating labels.

```html
<!-- Minimal Input -->
<div class="input-minimal">
    <input type="text" placeholder=" " id="username">
    <label for="username">Username</label>
</div>

<!-- Glass Input -->
<div class="input-glass">
    <input type="email" placeholder="Email Address">
</div>
```

### Interactive Elements

#### Accordions
```html
<div class="accordion-item">
    <div class="accordion-header">
        Click to Expand <span class="accordion-icon">▼</span>
    </div>
    <div class="accordion-content">
        <p>Smooth expanding content...</p>
    </div>
</div>
```

#### Modals
```html
<!-- Trigger -->
<button data-trigger-modal="myModal">Open Modal</button>

<!-- Modal Structure -->
<div id="myModal" class="modal-overlay">
    <div class="modal">
        <div class="modal-header">
            <h3>Title</h3>
            <button class="modal-close">×</button>
        </div>
        <div class="modal-body">
            Hello World!
        </div>
    </div>
</div>
```

#### Tooltips
```html
<button data-tooltip="I am a tooltip!">Hover Me</button>
```

## 🎨 Customization

YAKA UI is built with CSS variables. You can easily override them in your own CSS to match your brand.

```css
:root {
    /* Brand Colors */
    --accent: #FF3CAC;       /* Main Accent (Pink) */
    --accent-2: #784BA0;     /* Secondary (Purple) */
    
    /* Backgrounds */
    --bg-dark: #0a0a0a;
    --glass-bg: rgba(255, 255, 255, 0.03);
    
    /* Typography */
    --font-main: 'Outfit', sans-serif;
}
```

## 📂 File Structure

```
c:\Users\Dell\Desktop\YAKA UI\
├── index.html      # Demo/Showcase page
├── docs.html       # Documentation
├── yaka.css        # Core styles & variables
├── yaka.js         # Core logic & GSAP integration
└── favicon.png     # Project Icon
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
    <p>Made with ❤️ by the YAKA UI Team</p>
</div>
