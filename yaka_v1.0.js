import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js";
import MotionPathPlugin from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/MotionPathPlugin.js";
import TextPlugin from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/TextPlugin.js";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin);

// Expose to window for component bundle compatibility
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

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
        if (!document.querySelector('.loader-circle')) return;
        const tl = gsap.timeline();
        tl.to('.loader-circle', { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" })
            .to('.loader-overlay', { yPercent: -100, duration: 1, ease: "power4.inOut" })
            .from('.char-wrap', { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: "back.out(1.7)" }, "-=0.5");
    }

    initMagneticButtons() {
        document.querySelectorAll('[data-magnetic]').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
                const span = btn.querySelector('span');
                if (span) gsap.to(span, { x: x * 0.1, y: y * 0.1, duration: 0.3, ease: "power2.out" });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
                const span = btn.querySelector('span');
                if (span) gsap.to(span, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
            });
        });
    }

    initBackgroundEffects() {
        gsap.to('.floating-orb', { y: "random(-50, 50)", x: "random(-30, 30)", scale: "random(0.8, 1.2)", duration: "random(3, 6)", repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 1 });
        const wavePath = document.querySelector('.wave-path');
        if (wavePath) {
            let progress = 0;
            const updateWave = () => {
                progress += 0.05;
                const width = window.innerWidth;
                const height = 800;
                let path = `M 0 ${height / 2}`;
                for (let x = 0; x <= width; x += 50) {
                    const y = (height / 2) + Math.sin((x * 0.005) + progress) * 50;
                    path += ` L ${x} ${y}`;
                }
                wavePath.setAttribute('d', path);
                requestAnimationFrame(updateWave);
            }
            updateWave();
        }
    }

    initAccordions() {
        document.querySelectorAll('.accordion-item').forEach(acc => {
            const header = acc.querySelector('.accordion-header');
            const content = acc.querySelector('.accordion-content');
            if (!header || !content) return;
            header.addEventListener('click', () => {
                const isOpen = acc.classList.contains('active');
                if (isOpen) {
                    acc.classList.remove('active');
                    gsap.to(content, { height: 0, opacity: 0, duration: 0.3, ease: "power2.out" });
                    const icon = acc.querySelector('.accordion-icon');
                    if (icon) gsap.to(icon, { rotation: 0, duration: 0.3 });
                } else {
                    acc.classList.add('active');
                    gsap.set(content, { height: "auto" });
                    gsap.from(content, { height: 0, opacity: 0, duration: 0.3, ease: "power2.out" });
                    const icon = acc.querySelector('.accordion-icon');
                    if (icon) gsap.to(icon, { rotation: 180, duration: 0.3 });
                }
            });
        });
    }

    initTabs() {
        document.querySelectorAll('.tabs-container').forEach(container => {
            const headers = container.querySelectorAll('.tab-item, .tab-btn');
            const contents = container.querySelectorAll('.tab-content');
            const indicator = container.querySelector('.tab-indicator');

            headers.forEach(header => {
                header.addEventListener('click', () => {
                    const targetId = header.getAttribute('data-tab');
                    headers.forEach(h => h.classList.remove('active'));
                    header.classList.add('active');

                    if (indicator) {
                        gsap.to(indicator, {
                            width: header.offsetWidth,
                            x: header.offsetLeft,
                            duration: 0.5,
                            ease: "elastic.out(1, 0.8)"
                        });
                    }

                    contents.forEach(content => {
                        if (content.id === targetId) {
                            content.classList.add('active');
                            gsap.fromTo(content,
                                { opacity: 0, y: 10 },
                                { opacity: 1, y: 0, duration: 0.4, clearProps: "opacity,transform" }
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
        document.querySelectorAll('[data-trigger-modal]').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.getAttribute('data-trigger-modal');
                const modalOverlay = document.getElementById(modalId);
                if (!modalOverlay) return;
                const modalCard = modalOverlay.querySelector('.modal');
                modalOverlay.classList.add('active');
                gsap.fromTo(modalOverlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
                if (modalCard) {
                    gsap.fromTo(modalCard, { scale: 0.8, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" });
                }
            });
        });
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay || e.target.closest('.modal-close')) {
                    const card = overlay.querySelector('.modal');
                    if (card) gsap.to(card, { scale: 0.8, opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
                    gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => overlay.classList.remove('active') });
                }
            });
        });
    }

    initTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(el => {
            const text = el.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = text;
            document.body.appendChild(tooltip);
            el.addEventListener('mouseenter', () => {
                const rect = el.getBoundingClientRect();
                tooltip.style.top = `${rect.top - 40}px`;
                tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
                tooltip.style.transform = 'translateX(-50%)';
                gsap.to(tooltip, { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "back.out(1.7)" });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(tooltip, { opacity: 0, scale: 0.8, y: 5, duration: 0.2 });
            });
        });
    }

    initDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (!trigger || !menu) return;
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = dropdown.classList.toggle('active');
                if (isOpen) gsap.fromTo(menu, { opacity: 0, y: -10, display: "none" }, { opacity: 1, y: 0, display: "block", duration: 0.2, ease: "power2.out" });
                else gsap.to(menu, { opacity: 0, y: -10, duration: 0.2, onComplete: () => { menu.style.display = "none"; } });
            });
            document.addEventListener('click', () => {
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                    gsap.to(menu, { opacity: 0, y: -10, duration: 0.2, onComplete: () => { menu.style.display = "none"; } });
                }
            });
        });
    }

    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            document.querySelectorAll('[data-speed]').forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed'));
                gsap.to(el, { y: -(scrolled * speed / 10), duration: 0.5, ease: "power1.out" });
            });
        });
    }

    initProgressBars() {
        document.querySelectorAll('.progress-fill').forEach(fill => {
            const val = fill.getAttribute('data-value');
            ScrollTrigger.create({
                trigger: fill,
                start: "top 95%",
                end: "bottom 5%",
                onEnter: () => { gsap.to(fill, { width: val, duration: 1.5, ease: "power2.out" }); },
                onLeaveBack: () => { gsap.to(fill, { width: 0, duration: 0.5, ease: "power2.in" }); }
            });
        });
    }

    initImageReveal() {
        document.querySelectorAll('.reveal-image').forEach(reveal => {
            const img = reveal.querySelector('img');
            if (!img) return;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: reveal,
                    start: "top 85%",
                    end: "bottom 5%",
                    toggleActions: "play reverse play reverse"
                }
            });
            tl.set(reveal, { autoAlpha: 1, visibility: "visible" });
            tl.from(reveal, { xPercent: -101, duration: 1.2, ease: "power2.inOut" });
            tl.from(img, { xPercent: 101, scale: 1.3, duration: 1.2, ease: "power2.inOut" }, "-=1.2");
        });
    }

    initTypingText() {
        document.querySelectorAll('[data-typing]').forEach(el => {
            const text = el.getAttribute('data-typing');
            el.textContent = '';
            el.classList.add('typing-text');
            ScrollTrigger.create({
                trigger: el,
                start: "top 90%",
                end: "bottom 5%",
                onEnter: () => { gsap.to(el, { text: text, duration: text.length * 0.05, ease: "none" }); },
                onLeaveBack: () => { gsap.to(el, { text: "", duration: 0.3, ease: "none" }); }
            });
        });
    }

    initSpotlightCards() {
        document.querySelectorAll('.spotlight-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        });
    }

    initCountUp() {
        document.querySelectorAll('[data-count]').forEach(count => {
            const target = parseInt(count.getAttribute('data-count'));
            const obj = { val: 0 };
            ScrollTrigger.create({
                trigger: count,
                start: "top 95%",
                end: "bottom 5%",
                onEnter: () => {
                    gsap.to(obj, { val: target, duration: 2, ease: "power2.out", onUpdate: () => { count.innerHTML = Math.floor(obj.val).toLocaleString(); } });
                },
                onLeaveBack: () => {
                    gsap.to(obj, { val: 0, duration: 1, ease: "power2.in", onUpdate: () => { count.innerHTML = Math.floor(obj.val).toLocaleString(); } });
                }
            });
        });
    }

    initCircularProgress() {
        document.querySelectorAll('.progress-circle-wrapper').forEach(wrapper => {
            const path = wrapper.querySelector('.progress-circle-path');
            const text = wrapper.querySelector('.progress-circle-text');
            const val = parseInt(wrapper.getAttribute('data-value'));
            if (!path) return;
            ScrollTrigger.create({
                trigger: wrapper,
                start: "top 95%",
                end: "bottom 5%",
                onEnter: () => {
                    gsap.to(path, { strokeDashoffset: 283 - (val / 100) * 283, duration: 1.5, ease: "power2.out" });
                    const obj = { val: 0 };
                    gsap.to(obj, { val: val, duration: 1.5, onUpdate: () => { if (text) text.innerHTML = `${Math.floor(obj.val)}%`; } });
                },
                onLeaveBack: () => {
                    gsap.to(path, { strokeDashoffset: 283, duration: 0.8, ease: "power2.in" });
                    const obj = { val: val };
                    gsap.to(obj, { val: 0, duration: 0.8, onUpdate: () => { if (text) text.innerHTML = `${Math.floor(obj.val)}%`; } });
                }
            });
        });
    }

    initScrollAnimations() {
        document.querySelectorAll('[data-yaka-fade]').forEach(el => {
            gsap.from(el, { scrollTrigger: { trigger: el, start: "top 90%" }, y: 30, opacity: 0, duration: 0.8, ease: "power2.out" });
        });
    }

    initCursor() {
        if (document.querySelector('.yaka-cursor')) return;
        const cursor = document.createElement('div');
        const cursorInner = document.createElement('div');
        cursor.className = 'yaka-cursor';
        cursorInner.className = 'yaka-cursor-inner';
        document.body.append(cursor, cursorInner);
        window.addEventListener('mousemove', e => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out" });
            gsap.set(cursorInner, { x: e.clientX, y: e.clientY });
        });
        document.querySelectorAll('a, button, .tab-item, .tab-btn, .accordion-header, .interactive, .sidebar-link').forEach(el => {
            el.addEventListener('mouseenter', () => { cursor.classList.add('active'); cursorInner.classList.add('active'); });
            el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); cursorInner.classList.remove('active'); });
        });
    }

    initTimeline() {
        document.querySelectorAll('.timeline-item').forEach((item, i) => {
            const content = item.querySelector('.timeline-content');
            const dot = item.querySelector('.timeline-dot');
            if (!content || !dot) return;
            const direction = i % 2 === 0 ? -50 : 50;
            ScrollTrigger.create({
                trigger: item,
                start: "top 80%",
                onEnter: () => {
                    gsap.fromTo(content, { x: direction, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
                    gsap.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.2 });
                }
            });
        });
    }
}

// Instantiate YAKA UI and expose to window
window.Yaka = new YakaUI();

// === Yaka Component Bundle ===
const YakaComponents = (function () {
    'use strict';
    const utils = {
        $(s) { return document.querySelector(s); },
        $$(s) { return document.querySelectorAll(s); },
        on(el, ev, h) { if (el) el.addEventListener(ev, h); },
        off(el, ev, h) { if (el) el.removeEventListener(ev, h); }
    };

    const Buttons = {
        init() {
            utils.$$('.glass-btn').forEach(btn => {
                utils.on(btn, 'click', () => { this.animate(btn, btn.getAttribute('data-anim')); });
            });
        },
        animate(btn, type) {
            switch (type) {
                case 'bounce': gsap.fromTo(btn, { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }); break;
                case 'spin': gsap.to(btn, { rotation: 360, duration: 0.6, ease: 'power2.inOut' }); break;
                case 'vibrate': gsap.to(btn, { x: -5, duration: 0.05, yoyo: true, repeat: 5, ease: 'power1.inOut' }); break;
                case 'pop': gsap.fromTo(btn, { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'back.out(4)' }); break;
                default: gsap.to(btn, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
            }
        },
        initGlow() {
            const followGlow = utils.$('#followGlow');
            if (followGlow) {
                utils.on(document, 'mousemove', (e) => {
                    gsap.to(followGlow, { x: e.clientX, y: e.clientY, duration: 0.8, ease: 'power3.out' });
                });
            }
        }
    };

    const Checkbox = {
        init() {
            utils.$$('.cb-square input, .switch input, .dot-outer input').forEach(cb => {
                utils.on(cb, 'change', () => {
                    const p = cb.closest('.cb-square, .switch, .dot-outer');
                    if (p) gsap.fromTo(p, { scale: 1 }, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'back.out(3)' });
                });
            });
        }
    };

    const Combobox = {
        data: [{ id: 1, name: 'Tom Cook' }, { id: 2, name: 'Wade Cooper' }, { id: 3, name: 'Tanya Fox' }, { id: 4, name: 'Jinuk Chanthusa' }, { id: 5, name: 'Mark Browney' }],
        selected: null,
        init() {
            const input = utils.$('#comboInput'), button = utils.$('#comboButton'), options = utils.$('#comboOptions');
            if (!input || !button || !options) return;
            this.selected = this.data[1];
            this.render(options, input);
            utils.on(input, 'focus', () => this.open(options));
            utils.on(input, 'input', (e) => this.filter(e.target.value, options, input));
            utils.on(button, 'click', () => this.toggle(options));
            utils.on(document, 'click', (e) => { if (!e.target.closest('#combobox')) this.close(options, input); });
        },
        render(container, input, filteredData = this.data) {
            container.innerHTML = filteredData.length ? '' : '<div style="padding: 0.75rem; text-align: center; color: rgba(255,255,255,0.4);">No results found</div>';
            filteredData.forEach(person => {
                const div = document.createElement('div');
                div.className = `combobox-option ${person.id === this.selected?.id ? 'selected' : ''}`;
                div.innerHTML = `<i class="fa-solid fa-check check-icon"></i><span>${person.name}</span>`;
                utils.on(div, 'click', () => { this.selected = person; input.value = person.name; this.close(container, input); this.render(container, input); });
                container.appendChild(div);
            });
        },
        filter(q, c, i) { this.render(c, i, this.data.filter(p => p.name.toLowerCase().includes(q.toLowerCase()))); this.open(c); },
        open(c) { gsap.to(c, { opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)', onStart: () => { c.style.display = 'block'; } }); },
        close(c, i) { gsap.to(c, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in', onComplete: () => { c.style.display = 'none'; if (this.selected) i.value = this.selected.name; } }); },
        toggle(c) { c.style.display === 'block' ? this.close(c) : this.open(c); }
    };

    const Listbox = {
        people: [{ id: 1, name: 'Tom Cook' }, { id: 2, name: 'Wade Cooper' }, { id: 3, name: 'Tanya Fox' }, { id: 4, name: 'Arlene Mccoy' }, { id: 5, name: 'Devon Webb' }],
        selected: null,
        init() {
            const btn = utils.$('#listboxBtn'), options = utils.$('#listboxOptions'), label = utils.$('#selectedName');
            if (!btn || !options || !label) return;
            this.selected = this.people[1];
            this.render(options, label);
            utils.on(btn, 'click', (e) => { e.stopPropagation(); options.classList.toggle('show'); });
            utils.on(window, 'click', () => options.classList.remove('show'));
        },
        render(container, label) {
            container.innerHTML = '';
            this.people.forEach(person => {
                const opt = document.createElement('div');
                opt.className = `listbox-option ${person.id === this.selected.id ? 'selected' : ''}`;
                opt.innerHTML = `<i class="fa-solid fa-check check-icon"></i><span>${person.name}</span>`;
                utils.on(opt, 'click', (e) => { e.stopPropagation(); this.selected = person; label.innerText = person.name; this.render(container, label); container.classList.remove('show'); });
                container.appendChild(opt);
            });
        }
    };

    const RadioGroup = {
        plans: [{ id: 'startup', name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256GB SSD disk' }, { id: 'business', name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512GB SSD disk' }, { id: 'enterprise', name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1TB SSD disk' }],
        selectedId: null,
        init() {
            const container = utils.$('#radioGroup');
            if (!container) return;
            this.selectedId = this.plans[0].id;
            this.render(container, true);
            window.addEventListener('load', () => { gsap.to('.radio-option', { opacity: 1, x: 0, startAt: { x: -20 }, stagger: 0.1, duration: 0.8, ease: 'power2.out', clearProps: 'transform' }); });
        },
        render(container, isInitial = false) {
            container.innerHTML = '';
            this.plans.forEach(plan => {
                const isChecked = plan.id === this.selectedId;
                const opt = document.createElement('div');
                opt.className = `radio-option ${isChecked ? 'checked' : ''}`;
                opt.setAttribute('tabindex', '0'); opt.setAttribute('role', 'radio'); opt.setAttribute('aria-checked', isChecked);
                if (isInitial) opt.style.opacity = '0';
                opt.innerHTML = `<div class="flex-1"><p class="plan-name">${plan.name}</p><div class="plan-details"><span>${plan.ram}</span><span class="dot">•</span><span>${plan.cpus}</span><span class="dot">•</span><span>${plan.disk}</span></div></div><i class="fa-solid fa-circle-check check-icon"></i>`;
                utils.on(opt, 'click', () => { this.selectedId = plan.id; this.render(container); });
                container.appendChild(opt);
            });
        }
    };

    const Transition = {
        current: 0, scenes: [],
        init() {
            this.scenes = utils.$$('.scene'); if (this.scenes.length === 0) return;
            utils.$$('.dot').forEach((dot, i) => { utils.on(dot, 'click', () => this.go(i)); });
            if (utils.$('#prevBtn')) utils.on(utils.$('#prevBtn'), 'click', () => this.go((this.current - 1 + this.scenes.length) % this.scenes.length));
            if (utils.$('#nextBtn')) utils.on(utils.$('#nextBtn'), 'click', () => this.go((this.current + 1) % this.scenes.length));
            this.show(0);
        },
        show(i) {
            this.current = i;
            this.scenes.forEach((s, idx) => s.classList.toggle('active', idx === i));
            utils.$$('.dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
        },
        go(i) { this.apply(this.current, i, this.scenes[i].getAttribute('data-transition')); this.show(i); },
        apply(from, to, type) {
            const f = this.scenes[from], t = this.scenes[to];
            switch (type) {
                case 'elastic': gsap.to(f, { x: -100, opacity: 0, duration: 0.6, ease: 'elastic.out(1, 0.8)' }); gsap.fromTo(t, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.8)' }); break;
                case 'tilt': gsap.to(f, { rotationY: 35, opacity: 0, duration: 0.7, ease: 'power2.inOut' }); gsap.fromTo(t, { rotationY: -35, opacity: 0 }, { rotationY: 0, opacity: 1, duration: 0.7, ease: 'power2.inOut' }); break;
                default: gsap.to(f, { opacity: 0, duration: 0.3 }); gsap.fromTo(t, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            }
        }
    };

    const Animations = {
        init() {
            window.addEventListener('load', () => {
                utils.$$('.glass-panel, .glass-card, .container-box').forEach(c => { gsap.from(c, { opacity: 0, y: 20, duration: 1, ease: 'power3.out' }); });
            });
        }
    };

    return {
        init() { Buttons.init(); Buttons.initGlow(); Checkbox.init(); Combobox.init(); Listbox.init(); RadioGroup.init(); Transition.init(); Animations.init(); },
        modules: { Buttons, Checkbox, Combobox, Listbox, RadioGroup, Transition, Animations }
    };
})();

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => YakaComponents.init());
else YakaComponents.init();
