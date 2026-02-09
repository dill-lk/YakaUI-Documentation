import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js";
import MotionPathPlugin from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/MotionPathPlugin.js";
import TextPlugin from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/TextPlugin.js";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin);

export class YakaUI {
    constructor() {
        this.initCursor();
        this.initLoader();
        this.initMagneticButtons();
        this.initBackgroundEffects();
        this.initAccordions();
        this.initTabs();
        this.initModals();
        this.initTooltips();
        this.initDropdowns();
        this.initParallax();
        this.initProgressBars();
        this.initImageReveal();
        this.initTypingText();
        this.initSpotlightCards();
        this.initCountUp();
        this.initCircularProgress();
        this.initScrollAnimations();
        this.initTimeline();
    }

    initLoader() {
        const tl = gsap.timeline();

        // Ensure loader elements exist before animating
        if (document.querySelector('.loader-circle')) {
            tl.to('.loader-circle', {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: "power2.inOut"
            })
                .to('.loader-overlay', {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut"
                })
                .from('.char-wrap', {
                    y: 100,
                    opacity: 0,
                    stagger: 0.05,
                    duration: 1,
                    ease: "back.out(1.7)"
                }, "-=0.5")
                .from('.hero-subtitle', {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.5")
                .from('.cta-group', {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.5)"
                }, "-=0.5");
        }
    }

    initMagneticButtons() {
        // Magnetic Button Effect
        const magneticBtns = document.querySelectorAll('[data-magnetic]');

        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Move inner text/icon slightly more for depth
                const span = btn.querySelector('span');
                if (span) {
                    gsap.to(span, {
                        x: x * 0.1,
                        y: y * 0.1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });

                const span = btn.querySelector('span');
                if (span) {
                    gsap.to(span, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: "elastic.out(1, 0.3)"
                    });
                }
            });
        });
    }

    initBackgroundEffects() {
        // Background Floating Orbs
        gsap.to('.floating-orb', {
            y: "random(-50, 50)",
            x: "random(-30, 30)",
            scale: "random(0.8, 1.2)",
            duration: "random(3, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 1
        });

        // Wave Path Animation
        const wavePath = document.querySelector('.wave-path');
        if (wavePath) {
            let progress = 0;

            const updateWave = () => {
                progress += 0.05; // Slightly faster for visibility
                const width = window.innerWidth;
                const height = 800; // Match SVG viewBox height or container
                const amplitude = 50;
                const frequency = 0.005;

                // Start path
                let path = `M 0 ${height / 2}`;

                for (let x = 0; x <= width; x += 50) {
                    // Use sin wave equation
                    const y = (height / 2) + Math.sin((x * frequency) + progress) * amplitude;
                    path += ` L ${x} ${y}`;
                }

                wavePath.setAttribute('d', path);
                requestAnimationFrame(updateWave);
            }

            updateWave();
        }
    }
    initAccordions() {
        const accordions = document.querySelectorAll('.accordion-item');

        accordions.forEach(acc => {
            const header = acc.querySelector('.accordion-header');
            const content = acc.querySelector('.accordion-content');

            header.addEventListener('click', () => {
                const isOpen = acc.classList.contains('active');

                // Close others (optional, could make this configurable)
                accordions.forEach(otherAcc => {
                    if (otherAcc !== acc && otherAcc.classList.contains('active')) {
                        otherAcc.classList.remove('active');
                        gsap.to(otherAcc.querySelector('.accordion-content'), {
                            height: 0,
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                        gsap.to(otherAcc.querySelector('.accordion-icon'), {
                            rotation: 0,
                            duration: 0.3
                        });
                    }
                });

                if (isOpen) {
                    acc.classList.remove('active');
                    gsap.to(content, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    gsap.to(acc.querySelector('.accordion-icon'), {
                        rotation: 0,
                        duration: 0.3
                    });
                } else {
                    acc.classList.add('active');
                    gsap.set(content, { height: "auto" });
                    gsap.from(content, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    gsap.to(acc.querySelector('.accordion-icon'), {
                        rotation: 180,
                        duration: 0.3
                    });
                }
            });
        });
    }

    initTabs() {
        const tabsContainers = document.querySelectorAll('.tabs-container');

        tabsContainers.forEach(container => {
            const headers = container.querySelectorAll('.tab-item');
            const contents = container.querySelectorAll('.tab-content');
            const indicator = container.querySelector('.tab-indicator');
            const isVertical = container.classList.contains('tabs-vertical');

            // Set initial indicator position
            const activeTab = container.querySelector('.tab-item.active');
            if (activeTab && indicator) {
                if (isVertical) {
                    gsap.set(indicator, {
                        height: activeTab.offsetHeight,
                        y: activeTab.offsetTop,
                        x: 0,
                        width: '2px'
                    });
                } else {
                    gsap.set(indicator, {
                        width: activeTab.offsetWidth,
                        x: activeTab.offsetLeft,
                        y: 0
                    });
                }
            }

            headers.forEach(header => {
                header.addEventListener('click', () => {
                    const targetId = header.getAttribute('data-tab');

                    // Update classes
                    headers.forEach(h => h.classList.remove('active'));
                    header.classList.add('active');

                    // Animate indicator
                    if (indicator) {
                        if (isVertical) {
                            gsap.to(indicator, {
                                height: header.offsetHeight,
                                y: header.offsetTop,
                                duration: 0.5,
                                ease: "elastic.out(1, 0.8)"
                            });
                        } else {
                            gsap.to(indicator, {
                                width: header.offsetWidth,
                                x: header.offsetLeft,
                                duration: 0.5,
                                ease: "elastic.out(1, 0.8)"
                            });
                        }
                    }

                    // Animate Content
                    contents.forEach(content => {
                        if (content.id === targetId) {
                            content.classList.add('active');
                            gsap.fromTo(content,
                                { opacity: 0, y: 10 },
                                { opacity: 1, y: 0, duration: 0.4, clearProps: "all" }
                            );
                        } else {
                            content.classList.remove('active');
                        }
                    });
                });
            });
        });
    }

    initModals() {
        const triggers = document.querySelectorAll('[data-trigger-modal]');
        const closeButtons = document.querySelectorAll('.modal-close');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.getAttribute('data-trigger-modal');
                const modalOverlay = document.getElementById(modalId);
                const modalCard = modalOverlay.querySelector('.modal');

                modalOverlay.classList.add('active');

                gsap.fromTo(modalOverlay,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3 }
                );

                gsap.fromTo(modalCard,
                    { scale: 0.8, opacity: 0, y: 20 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }
                );
            });
        });

        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const modalOverlay = btn.closest('.modal-overlay');
                const modalCard = modalOverlay.querySelector('.modal');

                gsap.to(modalCard, {
                    scale: 0.8,
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: "power2.in"
                });

                gsap.to(modalOverlay, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        modalOverlay.classList.remove('active');
                    }
                });
            });
        });

        // Close on clicking overlay
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    const modalCard = overlay.querySelector('.modal');
                    gsap.to(modalCard, { scale: 0.8, opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
                    gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => overlay.classList.remove('active') });
                }
            });
        });
    }

    showToast(message, type = 'default') {
        const container = document.querySelector('.toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        let icon = '';
        if (type === 'success') icon = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M20 6L9 17l-5-5"/></svg>';
        if (type === 'error') icon = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
            <div class="toast-progress"></div>
        `;

        container.appendChild(toast);

        // Animate In
        gsap.fromTo(toast,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
        );

        // Progress bar
        const progress = toast.querySelector('.toast-progress');
        gsap.to(progress, {
            width: "0%",
            duration: 3,
            ease: "linear",
            onComplete: () => {
                // Animate Out
                gsap.to(toast, {
                    x: 100,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power3.in",
                    onComplete: () => toast.remove()
                });
            }
        });
    }
    initTooltips() {
        const tooltips = document.querySelectorAll('[data-tooltip]');

        tooltips.forEach(el => {
            const text = el.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = text;
            document.body.appendChild(tooltip);

            el.addEventListener('mouseenter', () => {
                const rect = el.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();

                let top = rect.top - tooltipRect.height - 10;
                let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

                tooltip.style.top = `${top}px`;
                tooltip.style.left = `${left}px`;

                gsap.to(tooltip, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.2,
                    ease: "back.out(1.7)"
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(tooltip, {
                    opacity: 0,
                    scale: 0.8,
                    y: 5,
                    duration: 0.2
                });
            });
        });
    }

    initDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const menu = dropdown.querySelector('.dropdown-menu');

            if (!trigger || !menu) return;

            let isOpen = false;

            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                isOpen = !isOpen;

                if (isOpen) {
                    dropdown.classList.add('active');
                    gsap.fromTo(menu,
                        { opacity: 0, y: -10, display: "none" },
                        { opacity: 1, y: 0, display: "block", duration: 0.2, ease: "power2.out" }
                    );
                } else {
                    dropdown.classList.remove('active');
                    gsap.to(menu, {
                        opacity: 0,
                        y: -10,
                        duration: 0.2,
                        onComplete: () => { menu.style.display = "none"; }
                    });
                }
            });

            document.addEventListener('click', (e) => {
                if (isOpen && !dropdown.contains(e.target)) {
                    isOpen = false;
                    dropdown.classList.remove('active');
                    gsap.to(menu, {
                        opacity: 0,
                        y: -10,
                        duration: 0.2,
                        onComplete: () => { menu.style.display = "none"; }
                    });
                }
            });
        });
    }

    initParallax() {
        const parallaxEls = document.querySelectorAll('[data-speed]');

        if (parallaxEls.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;

                parallaxEls.forEach(el => {
                    const speed = el.getAttribute('data-speed');
                    const yPos = -(scrolled * speed / 10); // Subtle parallax

                    gsap.to(el, {
                        y: yPos,
                        duration: 0.5,
                        ease: "power1.out"
                    });
                });
            });
        }
    }

    initTypingText() {
        const texts = document.querySelectorAll('[data-typing]');

        texts.forEach(el => {
            const originalText = el.getAttribute('data-typing');
            el.textContent = '';
            el.classList.add('typing-text');

            ScrollTrigger.create({
                trigger: el,
                start: "top 85%",
                onEnter: () => {
                    gsap.to(el, {
                        text: originalText,
                        duration: originalText.length * 0.05,
                        ease: "none"
                    });
                }
            });
        });
    }

    initSpotlightCards() {
        const cards = document.querySelectorAll('.spotlight-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // Add a border reveal effect too
                gsap.to(card, {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    duration: 0.3
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    duration: 0.5
                });
            });
        });
    }

    initCountUp() {
        const counters = document.querySelectorAll('[data-count]');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));

            ScrollTrigger.create({
                trigger: counter,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    initCircularProgress() {
        const circles = document.querySelectorAll('.progress-circle-path');

        circles.forEach(circle => {
            const percent = parseInt(circle.getAttribute('data-percent')) || 0;
            const fullCircumference = 283; // 2 * PI * 45
            const offset = fullCircumference - ((percent / 100) * fullCircumference);
            const textElement = circle.parentNode.parentNode.querySelector('.progress-circle-text');

            ScrollTrigger.create({
                trigger: circle,
                start: "top 85%",
                onEnter: () => {
                    gsap.to(circle, {
                        strokeDashoffset: offset,
                        duration: 2,
                        ease: "power2.out"
                    });
                    if (textElement) {
                        gsap.to(textElement, {
                            innerHTML: percent,
                            duration: 2,
                            snap: { innerHTML: 1 },
                            ease: "power2.out"
                        });
                    }
                }
            });
        });
    }

    initScrollAnimations() {
        // Generic Fade Up
        gsap.utils.toArray('[data-animate="fade-up"]').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });

        // Staggered Children
        gsap.utils.toArray('[data-animate="stagger"]').forEach(container => {
            gsap.from(container.children, {
                scrollTrigger: {
                    trigger: container,
                    start: "top 85%"
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            });
        });
    }

    initProgressBars() {
        const fills = document.querySelectorAll('.progress-fill');
        fills.forEach(fill => {
            const val = fill.getAttribute('data-value');
            ScrollTrigger.create({
                trigger: fill,
                start: "top 90%",
                onEnter: () => {
                    gsap.to(fill, { width: val, duration: 1.5, ease: "power2.out" });
                }
            });
        });
    }

    initImageReveal() {
        const reveals = document.querySelectorAll('.reveal-image');
        reveals.forEach(reveal => {
            const img = reveal.querySelector('img');
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: reveal,
                    start: "top 85%"
                }
            });

            tl.set(reveal, { visibility: "visible" });
            tl.from(reveal, { xPercent: -100, duration: 1.2, ease: "power2.inOut" });
            tl.from(img, { xPercent: 100, scale: 1.3, duration: 1.2, ease: "power2.inOut" }, "-=1.2");
        });
    }

    initTypingText() {
        const elements = document.querySelectorAll('[data-typing]');
        elements.forEach(el => {
            const text = el.getAttribute('data-typing');
            let i = 0;
            const type = () => {
                if (i < text.length) {
                    el.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                }
            };

            ScrollTrigger.create({
                trigger: el,
                start: "top 90%",
                onEnter: () => type()
            });
        });
    }

    initSpotlightCards() {
        document.querySelectorAll('.spotlight-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    initCountUp() {
        const counts = document.querySelectorAll('[data-count]');
        counts.forEach(count => {
            const target = parseInt(count.getAttribute('data-count'));
            const obj = { val: 0 };
            ScrollTrigger.create({
                trigger: count,
                start: "top 90%",
                onEnter: () => {
                    gsap.to(obj, {
                        val: target,
                        duration: 2,
                        ease: "power2.out",
                        onUpdate: () => {
                            count.innerHTML = Math.floor(obj.val).toLocaleString();
                        }
                    });
                }
            });
        });
    }

    initCircularProgress() {
        const circles = document.querySelectorAll('.progress-circle-wrapper');
        circles.forEach(wrapper => {
            const path = wrapper.querySelector('.progress-circle-path');
            const text = wrapper.querySelector('.progress-circle-text');
            const val = parseInt(wrapper.getAttribute('data-value'));

            ScrollTrigger.create({
                trigger: wrapper,
                start: "top 90%",
                onEnter: () => {
                    const offset = 283 - (val / 100) * 283;
                    gsap.to(path, { strokeDashoffset: offset, duration: 1.5, ease: "power2.out" });

                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: val,
                        duration: 1.5,
                        onUpdate: () => { text.innerHTML = `${Math.floor(obj.val)}%`; }
                    });
                }
            });
        });
    }

    initScrollAnimations() {
        // Fade in up animation for elements with data-yaka-fade
        const fadeElements = document.querySelectorAll('[data-yaka-fade]');
        fadeElements.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }

    showToast(message, type = 'info') {
        const container = document.querySelector('.toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-message">${message}</div>
            <div class="toast-progress"></div>
        `;

        container.appendChild(toast);

        // Animate Entry
        gsap.fromTo(toast, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });

        // Animate Progress Bar
        const progress = toast.querySelector('.toast-progress');
        gsap.fromTo(progress, { scaleX: 1 }, { scaleX: 0, duration: 3, ease: "linear", transformOrigin: "left" });

        // Remove
        setTimeout(() => {
            gsap.to(toast, {
                x: 50, opacity: 0, duration: 0.5, onComplete: () => toast.remove()
            });
        }, 3000);
    }

    initCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'yaka-cursor';
        document.body.appendChild(cursor);

        const cursorInner = document.createElement('div');
        cursorInner.className = 'yaka-cursor-inner';
        document.body.appendChild(cursorInner);

        window.addEventListener('mousemove', e => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out" });
            gsap.set(cursorInner, { x: e.clientX, y: e.clientY });
        });

        document.querySelectorAll('a, button, .tab-item, .accordion-header, .interactive').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorInner.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorInner.classList.remove('active');
            });
        });
    }

    initTimeline() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, i) => {
            const content = item.querySelector('.timeline-content');
            const dot = item.querySelector('.timeline-dot');

            const direction = i % 2 === 0 ? -50 : 50;

            ScrollTrigger.create({
                trigger: item,
                start: "top 80%",
                onEnter: () => {
                    gsap.fromTo(content,
                        { x: direction, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
                    );
                    gsap.fromTo(dot,
                        { scale: 0 },
                        { scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.2 }
                    );
                }
            });
        });
    }

}

// Instantiate YAKA UI and expose to window
window.Yaka = new YakaUI();
