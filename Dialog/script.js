const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('dialogOverlay');
const container = document.getElementById('dialogContainer');
const glowWrapper = document.getElementById('glowWrapper');

/**
 * Opens the modal and activates the premium glow effect
 */
function openModal() {
    container.style.display = 'flex';
    overlay.style.display = 'block';
    openBtn.classList.add('hidden-element');
    glowWrapper.classList.add('glow-active'); 
}

/**
 * Closes the modal and resets the UI state
 */
function closeModal() {
    container.style.display = 'none';
    overlay.style.display = 'none';
    openBtn.classList.remove('hidden-element');
    glowWrapper.classList.remove('glow-active'); 
}

// Event Listeners
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Handle Keyboard Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});