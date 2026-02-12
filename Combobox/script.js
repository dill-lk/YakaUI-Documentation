/**
 * Premium Glass Combobox - Interactive Search & Select
 * Features real-time filtering, GSAP animations, and keyboard accessibility
 */

// Data source: Team members
const people = [
    { id: 1, name: 'Tom Cook' },
    { id: 2, name: 'Wade Cooper' },
    { id: 3, name: 'Tanya Fox' },
    { id: 4, name: 'Jinuk Chanthusa' },
];

let selectedPerson = null;
const comboInput = document.getElementById('comboInput');
const comboOptions = document.getElementById('comboOptions');
const comboButton = document.getElementById('comboButton');

/**
 * Renders filtered options based on search query
 * @param {string} filter - Search query to filter names
 */
function renderOptions(filter = '') {
    const filtered = people.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
    comboOptions.innerHTML = '';

    // Show empty state if no results
    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'p-4 text-sm text-white/30 text-center italic';
        empty.innerText = 'No results found';
        comboOptions.appendChild(empty);
        return;
    }

    // Render each filtered option
    filtered.forEach(person => {
        const opt = document.createElement('div');
        opt.className = `combobox-option ${person.id === selectedPerson?.id ? 'selected' : ''}`;
        opt.innerHTML = `<span>${person.name}</span><i class="fa-solid fa-check"></i>`;
        opt.onclick = (e) => {
            e.stopPropagation();
            selectedPerson = person;
            comboInput.value = person.name;
            closeDropdown();
        };
        comboOptions.appendChild(opt);
    });
}

/**
 * Opens dropdown with GSAP animation
 */
function openDropdown() {
    comboOptions.classList.add('show');
    renderOptions(comboInput.value);
    // Animate dropdown entrance with back ease
    gsap.fromTo(comboOptions,
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
}

/**
 * Closes dropdown with GSAP animation
 */
function closeDropdown() {
    if (!comboOptions.classList.contains('show')) return;
    gsap.to(comboOptions, {
        opacity: 0,
        y: -10,
        scale: 0.98,
        duration: 0.2,
        onComplete: () => {
            comboOptions.classList.remove('show');
            // Restore selected value if exists
            if (selectedPerson) comboInput.value = selectedPerson.name;
        }
    });
}

// Event Listeners
comboInput.onfocus = openDropdown;

comboInput.oninput = (e) => {
    if (!comboOptions.classList.contains('show')) openDropdown();
    renderOptions(e.target.value);
};

comboButton.onclick = (e) => {
    e.stopPropagation();
    comboOptions.classList.contains('show') ? closeDropdown() : openDropdown();
};

// Close dropdown when clicking outside
document.onclick = (e) => {
    if (!document.getElementById('combobox').contains(e.target)) closeDropdown();
};
