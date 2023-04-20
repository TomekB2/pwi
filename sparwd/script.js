const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const target = event.target.getAttribute('href');
        const section = document.querySelector(target); 
        window.scrollTo({
          top: section.offsetTop, 
          behavior: 'smooth'
        });
      });
    });
