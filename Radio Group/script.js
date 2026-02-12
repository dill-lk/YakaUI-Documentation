/**
 * Glass Radio Group Component - Server Plan Selection
 * Features dynamic rendering, keyboard accessibility, and staggered GSAP animations
 */

const plans = [
    { id: 'startup', name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256GB SSD disk' },
    { id: 'business', name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512GB SSD disk' },
    { id: 'enterprise', name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1TB SSD disk' },
];

let selectedId = plans[0].id; // Default: Startup
const groupContainer = document.getElementById('radioGroup');

/**
 * Renders all radio options with proper ARIA attributes
 * @param {boolean} isInitial - If true, keeps opacity 0 for GSAP animation
 */
function renderOptions(isInitial = false) {
    groupContainer.innerHTML = '';
    plans.forEach(plan => {
        const isChecked = plan.id === selectedId;
        const option = document.createElement('div');
        option.className = `radio-option ${isChecked ? 'checked' : ''}`;
        option.setAttribute('tabindex', '0');
        option.setAttribute('role', 'radio');
        option.setAttribute('aria-checked', isChecked);

        // If it's the initial render, keep opacity 0 for GSAP
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
            selectedId = plan.id;
            renderOptions(false);
        };

        // Click handler
        option.onclick = selectPlan;

        // Keyboard accessibility (Enter or Space to select)
        option.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectPlan();
            }
        };

        groupContainer.appendChild(option);
    });
}

// Initial Render
renderOptions(true);

// Entrance Animation: Staggered slide-in from left
window.onload = () => {
    gsap.to(".radio-option", {
        opacity: 1,
        x: 0,
        startAt: { x: -20 },
        stagger: 0.1, // Each option appears 0.1s after the previous
        duration: 0.8,
        ease: "power2.out",
        clearProps: "transform" // Critical: removes GSAP transform so hover CSS works
    });
};
