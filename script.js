// Numer albumu: PL77337

// ==========================================
// ZADANIE 4 i 7 - Zmiana motywu i pokazywanie sekcji (z LocalStorage)
// ==========================================

// --- 1. Zmiana motywu (Czerwony / Zielony) ---
const themeBtn = document.getElementById('theme-btn');
const themeLink = document.getElementById('theme-link');

// Sprawdzamy przy ładowaniu, czy w localStorage jest już zapisany jakiś motyw
const savedTheme = localStorage.getItem('cv-theme');
if (savedTheme) {
    themeLink.setAttribute('href', savedTheme);
}

themeBtn.addEventListener('click', function() {
    let currentTheme = themeLink.getAttribute('href');
    let newTheme = currentTheme === 'red.css' ? 'green.css' : 'red.css';
    
    themeLink.setAttribute('href', newTheme);
    localStorage.setItem('cv-theme', newTheme); // Zapisujemy wybór użytkownika
});

// --- 2. Ukrycie i pokazanie sekcji "Umiejętności" ---
const toggleBtn = document.getElementById('toggle-section-btn');
const skillsSection = document.getElementById('skills-section');

// Sprawdzamy przy ładowaniu, czy użytkownik wcześniej ukrył sekcję
const isSkillsHidden = localStorage.getItem('cv-skills-hidden');
if (isSkillsHidden === 'true') {
    skillsSection.style.display = 'none';
    toggleBtn.textContent = 'Pokaż sekcję Umiejętności';
}

toggleBtn.addEventListener('click', function() {
    if (skillsSection.style.display === 'none') {
        skillsSection.style.display = 'block';
        toggleBtn.textContent = 'Ukryj sekcję Umiejętności';
        localStorage.setItem('cv-skills-hidden', 'false'); // Zapisujemy stan
    } else {
        skillsSection.style.display = 'none';
        toggleBtn.textContent = 'Pokaż sekcję Umiejętności';
        localStorage.setItem('cv-skills-hidden', 'true'); // Zapisujemy stan
    }
});

// ==========================================
// ZADANIE 5 - Walidacja formularza
// ==========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(event) {
    // 1. Zatrzymujemy domyślne wysyłanie formularza (wymóg: brak backendu)
    event.preventDefault(); 

    let isValid = true;

    // Pobieramy pola formularza
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const successMsg = document.getElementById('success-msg');

    // Wyrażenia regularne (Regex) do sprawdzania danych
    const hasNumber = /\d/; // Szuka jakiejkolwiek cyfry
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Wzór poprawnego e-maila

    // Funkcja pomocnicza: pokazuje błąd
    function showError(input, errorId, text) {
        input.classList.add('input-error');
        document.getElementById(errorId).textContent = text;
        document.getElementById(errorId).style.display = 'block';
        isValid = false;
    }

    // Funkcja pomocnicza: czyści błąd
    function clearError(input, errorId) {
        input.classList.remove('input-error');
        document.getElementById(errorId).style.display = 'none';
    }

    // Czyszczenie wszystkich błędów przed nową walidacją
    clearError(firstName, 'error-firstName');
    clearError(lastName, 'error-lastName');
    clearError(email, 'error-email');
    clearError(message, 'error-message');
    successMsg.style.display = 'none';

    // --- Walidacja Imienia ---
    if (firstName.value.trim() === '') {
        showError(firstName, 'error-firstName', 'Pole imię jest wymagane.');
    } else if (hasNumber.test(firstName.value)) {
        showError(firstName, 'error-firstName', 'Imię nie może zawierać cyfr.');
    }

    // --- Walidacja Nazwiska ---
    if (lastName.value.trim() === '') {
        showError(lastName, 'error-lastName', 'Pole nazwisko jest wymagane.');
    } else if (hasNumber.test(lastName.value)) {
        showError(lastName, 'error-lastName', 'Nazwisko nie może zawierać cyfr.');
    }

    // --- Walidacja E-maila ---
    if (email.value.trim() === '') {
        showError(email, 'error-email', 'Pole e-mail jest wymagane.');
    } else if (!emailPattern.test(email.value)) {
        showError(email, 'error-email', 'Podaj poprawny adres e-mail (np. test@test.com).');
    }

    // --- Walidacja Wiadomości ---
    if (message.value.trim() === '') {
        showError(message, 'error-message', 'Wiadomość nie może być pusta.');
    }

    // Jeśli wszystko jest poprawne
    if (isValid) {
        successMsg.style.display = 'block';
        contactForm.reset(); // Czyścimy formularz
    }
});

// ==========================================
// ZADANIE 6 - Pobieranie danych z pliku JSON
// ==========================================

async function loadDataFromJSON() {
    try {
        const response = await fetch('data.json');
        
        if (!response.ok) {
            throw new Error('Błąd pobierania danych z pliku JSON');
        }

        const data = await response.json();

        // Umiejętności
        const skillsContainer = document.getElementById('skills-list'); 
        skillsContainer.innerHTML = ''; 
        
        const ulSkills = document.createElement('ul');
        data.umiejetnosci.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            ulSkills.appendChild(li);
        });
        skillsContainer.appendChild(ulSkills);

        // Projekty
        const projectsContainer = document.getElementById('projects-list'); 
        projectsContainer.innerHTML = ''; 
        
        const ulProjects = document.createElement('ul');
        data.projekty.forEach(projekt => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${projekt.tytul}</strong>: ${projekt.opis}`;
            ulProjects.appendChild(li);
        });
        projectsContainer.appendChild(ulProjects);

    } catch (error) {
        console.error('Błąd zadania 6:', error);
        document.getElementById('skills-list').textContent = 'Nie udało się załadować umiejętności.';
        document.getElementById('projects-list').textContent = 'Nie udało się załadować projektów.';
    }
}

loadDataFromJSON();

// ==========================================
// ZADANIE 7 - Local Storage (Lista notatek dla rekrutera)
// ==========================================

const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesList = document.getElementById('notes-list');

// Pobieramy notatki (lub tworzymy pustą tablicę)
let notes = JSON.parse(localStorage.getItem('cv-notes')) || [];

function renderNotes() {
    notesList.innerHTML = ''; // Czyścimy listę przed nowym rysowaniem

    notes.forEach((note, index) => {
        const li = document.createElement('li');
        // Stylowanie notatki bezpośrednio w JS
        li.style.background = '#f9f9f9';
        li.style.border = '1px solid #ccc';
        li.style.margin = '5px 0';
        li.style.padding = '8px 12px';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.borderRadius = '4px';
        li.style.color = '#333'; // ciemny tekst zawsze czytelny

        const span = document.createElement('span');
        span.textContent = note;

        // Przycisk usunięcia
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Usuń';
        deleteBtn.style.background = '#d32f2f'; // Czerwony kolor
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.padding = '5px 10px';
        deleteBtn.style.borderRadius = '4px';
        deleteBtn.style.cursor = 'pointer';
        
        deleteBtn.addEventListener('click', function() {
            notes.splice(index, 1); // Usuwamy element z tablicy
            localStorage.setItem('cv-notes', JSON.stringify(notes)); // Nadpisujemy pamięć
            renderNotes(); // Odświeżamy widok
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

addNoteBtn.addEventListener('click', function() {
    const newNote = noteInput.value.trim(); 
    
    if (newNote !== '') {
        notes.push(newNote); // Dodajemy do tablicy
        localStorage.setItem('cv-notes', JSON.stringify(notes)); // Zapisujemy
        noteInput.value = ''; // Czyścimy pole
        renderNotes(); // Odświeżamy widok
    }
});

// Uruchamiamy rysowanie na starcie, by pokazać zapisane notatki
renderNotes();