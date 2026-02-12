/**
 * YAKA UI - Framework JavaScript
 * Premium Glassmorphic Component Library
 * Created by Jinuk Chanthusa (https://github.com/dill-lk)
 * 
 * Dependencies: GSAP 3.12.2+
 * 
 * Components: Buttons, Checkbox, Combobox, Dialog, Disclosure, Dropdown,
 *             Fieldset, Input, Listbox, Popover, Radio Group, Select, 
 *             Tabs, Textarea, Transition
 */

const YakaUI = (function () {
    'use strict';

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    const utils = {
        /**
         * Query selector helper
         */
        $(selector) {
            return document.querySelector(selector);
        },

        /**
         * Query selector all helper
         */
        $$(selector) {
            return document.querySelectorAll(selector);
        },

        /**
         * Add event listener helper
         */
        on(element, event, handler) {
            if (element) {
                element.addEventListener(event, handler);
            }
        },

        /**
         * Remove event listener helper
         */
        off(element, event, handler) {
            if (element) {
                element.removeEventListener(event, handler);
            }
        }
    };

    // ========================================
    // BUTTONS MODULE
    // ========================================

    const Buttons = {
        init() {
            const buttons = utils.$$('.glass-btn');

            buttons.forEach(btn => {
                const animType = btn.getAttribute('data-anim');

                utils.on(btn, 'click', () => {
                    this.animate(btn, animType);
                });
            });
        },

        animate(btn, type) {
            switch (type) {
                case 'bounce':
                    gsap.fromTo(btn,
                        { y: 0 },
                        { y: -10, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }
                    );
                    break;
                case 'spin':
                    gsap.to(btn, { rotation: 360, duration: 0.6, ease: 'power2.inOut' });
                    break;
                case 'vibrate':
                    gsap.to(btn, { x: -5, duration: 0.05, yoyo: true, repeat: 5, ease: 'power1.inOut' });
                    break;
                case 'pop':
                    gsap.fromTo(btn,
                        { scale: 1 },
                        { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'back.out(4)' }
                    );
                    break;
                default:
                    gsap.to(btn, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
            }
        },

        // Mouse-following glow effect
        initGlow() {
            const followGlow = utils.$('#followGlow');
            if (!followGlow) return;

            utils.on(document, 'mousemove', (e) => {
                gsap.to(followGlow, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });
        }
    };

    // ========================================
    // CHECKBOX MODULE
    // ========================================

    const Checkbox = {
        init() {
            const checkboxes = utils.$$('.cb-square input, .switch input, .dot-outer input');

            checkboxes.forEach(cb => {
                utils.on(cb, 'change', () => {
                    this.animateChange(cb);
                });
            });
        },

        animateChange(checkbox) {
            const parent = checkbox.closest('.cb-square, .switch, .dot-outer');
            if (parent) {
                gsap.fromTo(parent,
                    { scale: 1 },
                    { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'back.out(3)' }
                );
            }
        }
    };

    // ========================================
    // COMBOBOX MODULE
    // ========================================

    const Combobox = {
        data: [
            { id: 1, name: 'Tom Cook' },
            { id: 2, name: 'Wade Cooper' },
            { id: 3, name: 'Tanya Fox' },
            { id: 4, name: 'Jinuk Chanthusa' },
            { id: 5, name: 'Mark Browney' }
        ],
        selected: null,

        init() {
            const input = utils.$('#comboInput');
            const button = utils.$('#comboButton');
            const options = utils.$('#comboOptions');

            if (!input || !button || !options) return;

            this.selected = this.data[1]; // Default: Wade Cooper
            this.render(options, input);

            utils.on(input, 'focus', () => this.open(options));
            utils.on(input, 'input', (e) => this.filter(e.target.value, options, input));
            utils.on(button, 'click', () => this.toggle(options));
            utils.on(document, 'click', (e) => {
                if (!e.target.closest('#combobox')) {
                    this.close(options, input);
                }
            });
        },

        render(container, input, filteredData = this.data) {
            container.innerHTML = '';

            if (filteredData.length === 0) {
                container.innerHTML = '<div style="padding: 0.75rem; text-align: center; color: rgba(255,255,255,0.4);">No results found</div>';
                return;
            }

            filteredData.forEach(person => {
                const div = document.createElement('div');
                div.className = `combobox-option ${person.id === this.selected?.id ? 'selected' : ''}`;
                div.innerHTML = `
                    <i class="fa-solid fa-check check-icon"></i>
                    <span>${person.name}</span>
                `;
                utils.on(div, 'click', () => {
                    this.selected = person;
                    input.value = person.name;
                    this.close(container, input);
                    this.render(container, input);
                });
                container.appendChild(div);
            });
        },

        filter(query, container, input) {
            const filtered = this.data.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase())
            );
            this.render(container, input, filtered);
            this.open(container);
        },

        open(container) {
            gsap.to(container, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'back.out(1.7)',
                onStart: () => {
                    container.style.display = 'block';
                }
            });
        },

        close(container, input) {
            gsap.to(container, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    container.style.display = 'none';
                    if (this.selected) {
                        input.value = this.selected.name;
                    }
                }
            });
        },

        toggle(container) {
            if (container.style.display === 'block') {
                this.close(container);
            } else {
                this.open(container);
            }
        }
    };

    // ========================================
    // LISTBOX MODULE
    // ========================================

    const Listbox = {
        people: [
            { id: 1, name: 'Tom Cook' },
            { id: 2, name: 'Wade Cooper' },
            { id: 3, name: 'Tanya Fox' },
            { id: 4, name: 'Arlene Mccoy' },
            { id: 5, name: 'Devon Webb' }
        ],
        selected: null,

        init() {
            const btn = utils.$('#listboxBtn');
            const optionsContainer = utils.$('#listboxOptions');
            const selectedNameLabel = utils.$('#selectedName');

            if (!btn || !optionsContainer || !selectedNameLabel) return;

            this.selected = this.people[1]; // Default: Wade Cooper
            this.renderOptions(optionsContainer, selectedNameLabel);

            utils.on(btn, 'click', (e) => {
                e.stopPropagation();
                this.toggleOptions(optionsContainer);
            });

            utils.on(window, 'click', () => {
                optionsContainer.classList.remove('show');
            });
        },

        renderOptions(container, label) {
            container.innerHTML = '';
            this.people.forEach(person => {
                const opt = document.createElement('div');
                opt.className = `listbox-option ${person.id === this.selected.id ? 'selected' : ''}`;
                opt.innerHTML = `
                    <i class="fa-solid fa-check check-icon"></i>
                    <span>${person.name}</span>
                `;
                utils.on(opt, 'click', (e) => {
                    e.stopPropagation();
                    this.selected = person;
                    label.innerText = person.name;
                    this.renderOptions(container, label);
                    this.toggleOptions(container);
                });
                container.appendChild(opt);
            });
        },

        toggleOptions(container) {
            container.classList.toggle('show');
        }
    };

    // ========================================
    // RADIO GROUP MODULE
    // ========================================

    const RadioGroup = {
        plans: [
            { id: 'startup', name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256GB SSD disk' },
            { id: 'business', name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512GB SSD disk' },
            { id: 'enterprise', name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1TB SSD disk' }
        ],
        selectedId: null,

        init() {
            const groupContainer = utils.$('#radioGroup');
            if (!groupContainer) return;

            this.selectedId = this.plans[0].id; // Default: Startup
            this.renderOptions(groupContainer, true);

            // Entrance animation
            window.addEventListener('load', () => {
                gsap.to('.radio-option', {
                    opacity: 1,
                    x: 0,
                    startAt: { x: -20 },
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power2.out',
                    clearProps: 'transform'
                });
            });
        },

        renderOptions(container, isInitial = false) {
            container.innerHTML = '';
            this.plans.forEach(plan => {
                const isChecked = plan.id === this.selectedId;
                const option = document.createElement('div');
                option.className = `radio-option ${isChecked ? 'checked' : ''}`;
                option.setAttribute('tabindex', '0');
                option.setAttribute('role', 'radio');
                option.setAttribute('aria-checked', isChecked);

                if (isInitial) option.style.opacity = '0';
                else option.style.opacity = '1';

                option.innerHTML = `
                    <div class="flex-1">
                        <p class="plan-name">${plan.name}</p>
                        <div class="plan-details">
                            <span>${plan.ram}</span>
                            <span class="dot">•</span>
                            <span>${plan.cpus}</span>
                            <span class="dot">•</span>
                            <span>${plan.disk}</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-circle-check check-icon"></i>
                `;

                const selectPlan = () => {
                    this.selectedId = plan.id;
                    this.renderOptions(container, false);
                };

                utils.on(option, 'click', selectPlan);
                utils.on(option, 'keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectPlan();
                    }
                });

                container.appendChild(option);
            });
        }
    };

    // ========================================
    // TABS MODULE
    // ========================================

    const Tabs = {
        init() {
            const tabButtons = utils.$$('.tab-btn');
            const tabContents = utils.$$('.tab-content');

            tabButtons.forEach((btn, index) => {
                utils.on(btn, 'click', () => {
                    this.switchTab(index, tabButtons, tabContents);
                });
            });
        },

        switchTab(index, buttons, contents) {
            // Remove active from all
            buttons.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active to selected
            buttons[index].classList.add('active');
            contents[index].classList.add('active');

            // Animate content
            gsap.fromTo(contents[index],
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
        }
    };

    // ========================================
    // TRANSITION MODULE
    // ========================================

    const Transition = {
        currentScene: 0,
        scenes: [],

        init() {
            this.scenes = utils.$$('.scene');
            const dots = utils.$$('.dot');
            const prevBtn = utils.$('#prevBtn');
            const nextBtn = utils.$('#nextBtn');

            if (this.scenes.length === 0) return;

            this.showScene(0);

            dots.forEach((dot, i) => {
                utils.on(dot, 'click', () => this.goToScene(i));
            });

            if (prevBtn) utils.on(prevBtn, 'click', () => this.prev());
            if (nextBtn) utils.on(nextBtn, 'click', () => this.next());
        },

        showScene(index) {
            this.currentScene = index;
            this.scenes.forEach((scene, i) => {
                scene.classList.toggle('active', i === index);
            });

            const dots = utils.$$('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        },

        goToScene(index) {
            const transition = this.scenes[index].getAttribute('data-transition');
            this.applyTransition(this.currentScene, index, transition);
            this.showScene(index);
        },

        next() {
            const nextIndex = (this.currentScene + 1) % this.scenes.length;
            this.goToScene(nextIndex);
        },

        prev() {
            const prevIndex = (this.currentScene - 1 + this.scenes.length) % this.scenes.length;
            this.goToScene(prevIndex);
        },

        applyTransition(from, to, type) {
            const fromScene = this.scenes[from];
            const toScene = this.scenes[to];

            switch (type) {
                case 'elastic':
                    gsap.to(fromScene, { x: -100, opacity: 0, duration: 0.6, ease: 'elastic.out(1, 0.8)' });
                    gsap.fromTo(toScene, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.8)' });
                    break;
                case 'tilt':
                    gsap.to(fromScene, { rotationY: 35, opacity: 0, duration: 0.7, ease: 'power2.inOut' });
                    gsap.fromTo(toScene, { rotationY: -35, opacity: 0 }, { rotationY: 0, opacity: 1, duration: 0.7, ease: 'power2.inOut' });
                    break;
                case 'ripple':
                    gsap.to(fromScene, { scale: 1.2, opacity: 0, filter: 'blur(20px)', duration: 0.5 });
                    gsap.fromTo(toScene, { scale: 0.8, opacity: 0, filter: 'blur(20px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.5 });
                    break;
                case 'split':
                    gsap.to(fromScene, { scaleX: 0, rotation: 90, opacity: 0, duration: 0.6, ease: 'back.in(2)' });
                    gsap.fromTo(toScene, { scaleX: 0, rotation: -90, opacity: 0 }, { scaleX: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)' });
                    break;
                default:
                    gsap.to(fromScene, { opacity: 0, duration: 0.3 });
                    gsap.fromTo(toScene, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            }
        }
    };

    // ========================================
    // ENTRANCE ANIMATIONS
    // ========================================

    const Animations = {
        init() {
            window.addEventListener('load', () => {
                // Generic container entrance
                const containers = utils.$$('.glass-panel, .glass-card, .container-box, .field-container');
                containers.forEach(container => {
                    gsap.from(container, {
                        opacity: 0,
                        y: 20,
                        duration: 1,
                        ease: 'power3.out'
                    });
                });

                // Listbox entrance
                const listbox = utils.$('#listbox');
                if (listbox) {
                    gsap.from(listbox, {
                        opacity: 0,
                        y: 10,
                        duration: 1,
                        ease: 'power3.out'
                    });
                }
            });
        }
    };

    // ========================================
    // PUBLIC API
    // ========================================

    return {
        init() {
            // Initialize all modules
            Buttons.init();
            Buttons.initGlow();
            Checkbox.init();
            Combobox.init();
            Listbox.init();
            RadioGroup.init();
            Tabs.init();
            Transition.init();
            Animations.init();
        },

        // Expose modules for custom usage
        modules: {
            Buttons,
            Checkbox,
            Combobox,
            Listbox,
            RadioGroup,
            Tabs,
            Transition,
            Animations
        }
    };
})();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => YakaUI.init());
} else {
    YakaUI.init();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YakaUI;
}
