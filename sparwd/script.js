    // Skrypt obsługujący nawigację w SPA
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); // Zatrzymujemy domyślne zachowanie kliknięcia

        const target = event.target.getAttribute('href'); // Pobieramy atrybut href z klikniętego linka
        const section = document.querySelector(target); // Znajdujemy sekcję o danym identyfikatorze

        window.scrollTo({
          top: section.offsetTop, // Ustawiamy pozycję przewijania na początek sekcji
          behavior: 'smooth' // Dodajemy efekt płynnego przewijania
        });
      });
    });