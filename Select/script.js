/**
 * Glass Select Component - Entrance Animation
 * Smooth GSAP-powered reveal with vertical slide and fade-in
 */

// Entrance Animation
window.onload = () => {
    gsap.to(".container-box", {
        opacity: 1,
        y: 0,
        startAt: { y: 20 },
        duration: 1,
        ease: "power3.out"
    });
};
