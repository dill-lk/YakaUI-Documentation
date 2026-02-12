/**
 * UI Interactions and GSAP Animations
 * Handles the opening/closing of the glassmorphic menu
 */

const btn = document.getElementById('menuButton');
const menu = document.getElementById('menuItems');
const root = document.getElementById('menuRoot');
const mainGlow = document.getElementById('mainGlow');
const btnGlow = document.getElementById('btnGlow');
const chevron = document.getElementById('chevron');
const menuItems = document.querySelectorAll('.menu-item');

let isOpen = false;

// Initial menu state set by GSAP to ensure no flicker on load
gsap.set(menu, { 
    autoAlpha: 0, 
    scale: 0.95, 
    y: -10, 
    display: "none" 
});

/**
 * Toggles the menu state and triggers GSAP animations
 */
function toggleMenu() {
    isOpen = !isOpen;
    
    if (isOpen) {
        // Activate CSS-based glow transitions
        mainGlow.classList.add('active');
        btnGlow.classList.add('btn-glow-active');
        chevron.style.transform = 'rotate(180deg)';

        // GSAP: Animate main menu container with a smooth fade and scale
        // Removed elastic back.out easing for a cleaner, professional entrance
        gsap.to(menu, {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power3.out", // Smooth, non-elastic easing
            display: "block"
        });

        // GSAP: Stagger the appearance of internal menu items
        gsap.fromTo(menuItems, 
            { opacity: 0, x: -10 },
            { 
                opacity: 1, 
                x: 0, 
                stagger: 0.04, // Each item enters 0.04s after the previous
                duration: 0.25, 
                ease: "power2.out",
                delay: 0.05 
            }
        );
    } else {
        // Deactivate visuals
        mainGlow.classList.remove('active');
        btnGlow.classList.remove('btn-glow-active');
        chevron.style.transform = 'rotate(0deg)';

        // GSAP: Scale and fade out menu
        gsap.to(menu, {
            autoAlpha: 0,
            scale: 0.98,
            y: -5,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                // Ensure it doesn't catch clicks when hidden
                gsap.set(menu, { display: "none" });
            }
        });
    }
}

// Open/Close on click
btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close when clicking anywhere else on the document
document.addEventListener('click', (e) => {
    if (isOpen && !root.contains(e.target)) {
        toggleMenu();
    }
});

// Support for Escape key accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
        toggleMenu();
    }
});