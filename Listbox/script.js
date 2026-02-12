/**
 * Glass Listbox Component - Interactive Selection Dropdown
 * Features dynamic option rendering, selection tracking, and GSAP animations
 */

const people = [
    { id: 1, name: 'Tom Cook' },
    { id: 2, name: 'Wade Cooper' },
    { id: 3, name: 'Tanya Fox' },
    { id: 4, name: 'Arlene Mccoy' },
    { id: 5, name: 'Devon Webb' },
];

let selected = people[1]; // Default: Wade Cooper
const btn = document.getElementById('listboxBtn');
const optionsContainer = document.getElementById('listboxOptions');
const selectedNameLabel = document.getElementById('selectedName');

/**
 * Renders all options with checkmark on selected item
 */
function renderOptions() {
    optionsContainer.innerHTML = '';
    people.forEach(person => {
        const opt = document.createElement('div');
        opt.className = `listbox-option ${person.id === selected.id ? 'selected' : ''}`;
        opt.innerHTML = `
            <i class="fa-solid fa-check check-icon"></i>
            <span>${person.name}</span>
        `;
        opt.onclick = (e) => {
            e.stopPropagation();
            selected = person;
            selectedNameLabel.innerText = person.name;
            renderOptions();
            toggleOptions();
        };
        optionsContainer.appendChild(opt);
    });
}

/**
 * Toggles dropdown visibility
 */
function toggleOptions() {
    const isOpen = optionsContainer.classList.contains('show');
    if (isOpen) {
        optionsContainer.classList.remove('show');
    } else {
        optionsContainer.classList.add('show');
    }
}

// Event Listeners
btn.onclick = (e) => {
    e.stopPropagation();
    toggleOptions();
};

// Close dropdown when clicking outside
window.onclick = () => {
    optionsContainer.classList.remove('show');
};

// Initial Render
renderOptions();

// Entry Animation
window.onload = () => {
    gsap.from("#listbox", {
        opacity: 0,
        y: 10,
        duration: 1,
        ease: "power3.out"
    });
};
