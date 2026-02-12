/**
 * Glass Shipping Details Form - Entrance Animation
 * Smooth GSAP-powered form reveal on page load
 */

// Smooth entrance animation
window.onload = () => {
    gsap.from(".glass-fieldset", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power4.out"
    });
};
