/**
 * Premium Glass Checkboxes - Interactive Feedback
 * Adds kinetic scale animation on checkbox state change
 */

// Kinetic feedback on interaction
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', function () {
        const row = this.closest('.row');
        // Quick scale down and back for tactile feedback
        gsap.to(row, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
    });
});
