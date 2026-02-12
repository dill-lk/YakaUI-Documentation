/**
 * Premium GSAP Transition System
 * Handles scene transitions with unique animation styles for each scene
 */

let currentScene = 1;
let isAnimating = false;

// Initialize Glow Position
gsap.set("#glow", { x: window.innerWidth / 2, y: window.innerHeight / 2 });
gsap.set("#dot-1", { backgroundColor: "rgba(255,255,255,0.7)", scale: 2.5 });

/**
 * Transition between scenes with unique animations
 * @param {number} nextScene - The scene number to transition to (1-4)
 */
function transitionTo(nextScene) {
    if (isAnimating || nextScene === currentScene) return;
    isAnimating = true;

    const outEl = document.getElementById(`scene-${currentScene}`);
    const inEl = document.getElementById(`scene-${nextScene}`);
    const direction = nextScene > currentScene ? 1 : -1;

    // Dot Animation: Update pagination indicators
    gsap.to(`.dot`, { backgroundColor: "rgba(255,255,255,0.1)", scale: 1, duration: 0.5, ease: "power4.out" });
    gsap.to(`#dot-${nextScene}`, { backgroundColor: "rgba(255,255,255,0.7)", scale: 2.5, duration: 0.5, ease: "back.out(2)" });

    const tl = gsap.timeline({
        onComplete: () => {
            outEl.classList.remove('active');
            inEl.classList.add('active');
            runInAnimation(nextScene, inEl, direction);
        }
    });

    // Out Sequences: Different exit animation for each scene
    if (currentScene === 1) {
        // Elastic Glide: Blur and slide exit
        tl.to(outEl, { opacity: 0, x: -30 * direction, scale: 0.96, filter: "blur(8px)", duration: 0.45, ease: "power2.inOut" });
    } else if (currentScene === 2) {
        // Kinetic Tilt: 3D rotation exit
        tl.to(outEl, { opacity: 0, rotationY: 35 * direction, x: -80 * direction, duration: 0.55, ease: "expo.in" });
    } else if (currentScene === 3) {
        // Spectral Ripple: Blur and vertical fade
        tl.to(outEl, { opacity: 0, y: 25, filter: "blur(15px)", duration: 0.45, ease: "power2.in" });
    } else {
        // Split Expansion: Scale and blur exit
        tl.to(outEl, { opacity: 0, scale: 1.15, filter: "blur(12px)", duration: 0.45, ease: "power3.in" });
    }
}

/**
 * Run entrance animation for the incoming scene
 * @param {number} index - Scene number (1-4)
 * @param {HTMLElement} el - The scene element to animate
 * @param {number} direction - Direction of transition (1 or -1)
 */
function runInAnimation(index, el, direction) {
    if (index === 1) {
        // Elastic Glide: Spring-based entrance with blur
        gsap.fromTo(el,
            { opacity: 0, x: 50 * direction, scale: 0.92, filter: "blur(12px)" },
            { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "elastic.out(1, 0.8)", onComplete: () => isAnimating = false }
        );
    } else if (index === 2) {
        // Kinetic Tilt: 3D rotation entrance
        gsap.fromTo(el,
            { opacity: 0, rotationY: -35 * direction, x: 80 * direction },
            { opacity: 1, rotationY: 0, x: 0, duration: 0.9, ease: "power4.out", onComplete: () => isAnimating = false }
        );
    } else if (index === 3) {
        // Spectral Ripple: Blur diffusion entrance
        gsap.fromTo(el,
            { opacity: 0, filter: "blur(25px)", scale: 0.85, y: -15 },
            { opacity: 1, filter: "blur(0px)", scale: 1, y: 0, duration: 0.8, ease: "expo.out", onComplete: () => isAnimating = false }
        );
    } else {
        // Split Expansion: Back-ease scale entrance
        gsap.fromTo(el,
            { opacity: 0, scale: 0.6, rotation: 4 * direction },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: "back.out(1.5)", onComplete: () => isAnimating = false }
        );
    }
    currentScene = index;
}

/**
 * Spotlight Motion: Follows mouse cursor with smooth easing
 */
window.addEventListener('mousemove', (e) => {
    gsap.to("#glow", {
        x: e.clientX,
        y: e.clientY,
        duration: 2.2,
        ease: "power3.out"
    });
});
