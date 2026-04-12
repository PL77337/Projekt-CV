// Numer albumu: PL77337

// 1.(Czerwony / Zielony)
const themeBtn = document.getElementById('theme-btn');
const themeLink = document.getElementById('theme-link');

themeBtn.addEventListener('click', function() {
    if (themeLink.getAttribute('href') === 'red.css') {
        themeLink.setAttribute('href', 'green.css');
    } else {
        themeLink.setAttribute('href', 'red.css');
    }
});

// 2.(Ukrycie i pokazanie sekcji "Umiejętności")
const toggleBtn = document.getElementById('toggle-section-btn');
const skillsSection = document.getElementById('skills-section');

toggleBtn.addEventListener('click', function() {
    if (skillsSection.style.display === 'none') {
        skillsSection.style.display = 'block';
        toggleBtn.textContent = 'Ukryj sekcję Umiejętności';
    } else {
        skillsSection.style.display = 'none';
        toggleBtn.textContent = 'Pokaż sekcję Umiejętności';
    }
});