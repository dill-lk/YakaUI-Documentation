/**
 * Glass Input Field - Entrance Animation
 * Smooth GSAP-powered reveal with scale and vertical slide
 */

// Smooth entrance animation
window.onload = () => {
    gsap.from(".field-container", {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 1,
        ease: "power3.out"
    });
};
