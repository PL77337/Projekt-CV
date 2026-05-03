// Numer albumu: PL77337

// ==========================================
// ZADANIE 4 - Zmiana motywu i pokazywanie sekcji
// ==========================================

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

// Funkcja asynchroniczna do pobierania danych
async function loadDataFromJSON() {
    try {
        // 1. Wysyłamy zapytanie o plik
        const response = await fetch('data.json');
        
        // Sprawdzamy czy plik istnieje
        if (!response.ok) {
            throw new Error('Błąd pobierania danych z pliku JSON');
        }

        // 2. Tłumaczymy odpowiedź na obiekt JavaScript
        const data = await response.json();

        // 3. Budujemy sekcję "Umiejętności"
        // ZMIENIONO: skills-container -> skills-list
        const skillsContainer = document.getElementById('skills-list'); 
        skillsContainer.innerHTML = ''; // Czyścimy napis "Ładowanie..."
        
        const ulSkills = document.createElement('ul');
        data.umiejetnosci.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            ulSkills.appendChild(li);
        });
        skillsContainer.appendChild(ulSkills);

        // 4. Budujemy sekcję "Projekty"
        // ZMIENIONO: projects-container -> projects-list
        const projectsContainer = document.getElementById('projects-list'); 
        projectsContainer.innerHTML = ''; // Czyścimy napis "Ładowanie..."
        
        const ulProjects = document.createElement('ul');
        data.projekty.forEach(projekt => {
            const li = document.createElement('li');
            // Używamy innerHTML bo chcemy pogrubić tytuł za pomocą tagu <strong>
            li.innerHTML = `<strong>${projekt.tytul}</strong>: ${projekt.opis}`;
            ulProjects.appendChild(li);
        });
        projectsContainer.appendChild(ulProjects);

    } catch (error) {
        console.error('Błąd zadania 6:', error);
        // ZMIENIONO: obsługa błędów też musi wskazywać na właściwe ID
        document.getElementById('skills-list').textContent = 'Nie udało się załadować umiejętności.';
        document.getElementById('projects-list').textContent = 'Nie udało się załadować projektów.';
    }
}

// Uruchamiamy funkcję od razu po załadowaniu skryptu
loadDataFromJSON();