const glowWrapper = document.getElementById('glowWrapper');
const glowContainer = document.getElementById('glowContainer');
const trigger = document.getElementById('solutionsTrigger');
const panel = document.getElementById('solutionsPanel');
const container = document.querySelector('.popover-container');

/**
 * Aligns the glow elements directly behind the popover panel
 */
function alignGlowToPanel() {
    const rect = panel.getBoundingClientRect();
    // Calculate center of the actual panel
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Move the container to that coordinate
    glowContainer.style.left = `${centerX}px`;
    glowContainer.style.top = `${centerY}px`;
}

function closePopover() {
    panel.classList.remove('show');
    trigger.classList.remove('active');
    glowWrapper.classList.remove('glow-active');
}

trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isShowing = panel.classList.contains('show');

    if (!isShowing) {
        // Show panel first
        panel.classList.add('show');
        trigger.classList.add('active');

        // Align glow to the now-visible panel
        alignGlowToPanel();
        glowWrapper.classList.add('glow-active');
    } else {
        closePopover();
    }
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
        closePopover();
    }
});

// Keep alignment on window resize
window.addEventListener('resize', () => {
    if (panel.classList.contains('show')) {
        alignGlowToPanel();
    }
});

// Close on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopover();
    }
});
