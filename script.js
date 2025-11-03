// Plik: script.js - Logika "PROCES: Analiza Kandydata"

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Ustawienie Obserwatora (Scroll-Spy) dla Procesu ---
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-step');
    
    // Opcje dla IntersectionObserver
    const observerOptions = {
        root: null, // Używa viewportu
        rootMargin: '0px',
        threshold: 0.4 // Sekcja musi być widoczna w 40%
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-step[href="#${id}"]`);
                
                // Resetuj wszystkie statusy
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Ustaw status 'active' dla aktualnie widocznego
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                
                // Ustaw status 'completed' dla poprzednich
                let currentFound = false;
                navLinks.forEach(link => {
                    if (link === activeLink) {
                        currentFound = true;
                    } else if (!currentFound) {
                        link.classList.add('completed');
                    } else {
                        link.classList.remove('completed');
                    }
                });
            }
        });
    }, observerOptions);

    // Obserwuj każdą sekcję
    sections.forEach(section => {
        observer.observe(section);
    });

    
    // --- 2. Płynne przewijanie z paska nawigacyjnego ---
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// --- 3. Funkcja do przewijania do "Dowodów" (z kart kompetencji) ---
function scrollToEvidence(elementId) {
    const targetElement = document.getElementById(elementId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Dodaj tymczasowe podświetlenie
        targetElement.style.transition = 'all 0.3s ease';
        targetElement.style.backgroundColor = '#f9faff'; // Kolor tła
        targetElement.style.boxShadow = '0 0 15px rgba(10, 77, 144, 0.5)'; // Cień akcentu
        
        setTimeout(() => {
            targetElement.style.backgroundColor = '';
            targetElement.style.boxShadow = '';
        }, 2000);
    }
}