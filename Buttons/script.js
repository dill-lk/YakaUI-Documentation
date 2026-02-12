/**
 * Premium Glass Button Suite - Interactive Animations
 * Features mouse-tracking glow and unique icon animations per button
 */

// Track the glow to the mouse for interactivity
const glow = document.getElementById('followGlow');
window.addEventListener('mousemove', (e) => {
    gsap.to(glow, {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
        duration: 1.5,
        ease: "power2.out"
    });
});

/**
 * Icon Animation Logic
 * Each button has a unique animation based on its data-anim attribute:
 * - bounce: Vertical bounce effect
 * - spin: 360-degree rotation
 * - vibrate: Horizontal shake
 * - pop: Scale pulse effect
 */
document.querySelectorAll('.glass-btn').forEach(btn => {
    const icon = btn.querySelector('i');
    const type = btn.dataset.anim;

    btn.addEventListener('click', () => {
        // Button Press Effect: Quick scale down and back
        gsap.to(btn, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });

        // Icon Specific Animations
        if (type === 'bounce') {
            // Upload: Bounce up animation
            gsap.fromTo(icon, { y: 0 }, { y: -8, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" });
        }
        else if (type === 'spin') {
            // Sync: Full rotation with back ease
            gsap.to(icon, { rotation: "+=360", duration: 0.6, ease: "back.inOut(1.7)" });
        }
        else if (type === 'vibrate') {
            // Notifications: Rapid horizontal shake
            gsap.fromTo(icon, { x: -2 }, { x: 2, duration: 0.05, repeat: 5, yoyo: true });
        }
        else if (type === 'pop') {
            // Favorite: Scale pop with back ease
            gsap.fromTo(icon, { scale: 1 }, { scale: 1.5, duration: 0.2, yoyo: true, repeat: 1, ease: "back.out(2)" });
        }
    });
});
