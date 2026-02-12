const glowWrapper = document.getElementById('glowWrapper');
const glowContainer = document.getElementById('glowContainer');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const tabPanels = document.getElementById('tabPanels');

let currentActiveId = 'recent';

function moveGlow(immediate = false) {
    const rect = tabPanels.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    gsap.to(glowContainer, {
        left: centerX,
        top: centerY,
        duration: immediate ? 0 : 1,
        ease: "power3.out"
    });
}

function switchTab(newTabBtn) {
    const newTabId = newTabBtn.getAttribute('data-tab');
    if (newTabId === currentActiveId) return;

    const oldContent = document.getElementById(currentActiveId);
    const newContent = document.getElementById(newTabId);

    tabBtns.forEach(b => b.classList.remove('active'));
    newTabBtn.classList.add('active');

    // Butterfly Transition
    gsap.to(oldContent, {
        opacity: 0,
        y: 8,
        scale: 0.98,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            oldContent.classList.remove('active');
            newContent.classList.add('active');

            gsap.fromTo(newContent,
                { opacity: 0, y: -8, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.2)" }
            );

            currentActiveId = newTabId;
            // Trigger glow update after panel size might change
            requestAnimationFrame(moveGlow);
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    gsap.to(glowWrapper, { opacity: 1, duration: 1.5 });
    moveGlow(true);

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn));
    });
});

window.addEventListener('resize', () => moveGlow(true));
