// Chargement
window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 2000);
  });
  
  // Navigation
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
  
  // Effet de scroll pour l'en-tête
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Animations de révélation
  function revealElements() {
    const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    elements.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', revealElements);
  window.addEventListener('load', revealElements);
  
  // Filtrage des projets (seulement sur la page projets)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Suppression de la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Ajout de la classe active au bouton cliqué
        button.classList.add('active');
        
        // Filtrage des projets
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || filter === category) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 200);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 500);
          }
        });
      });
    });
  }
  
  // Mode clair/sombre
  const themeToggle = document.getElementById('theme-toggle');
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.getElementById('header').classList.toggle('header-light');
    
    if (document.body.classList.contains('light-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
  
  // Formulaire de contact (seulement sur la page contact)
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Animation de succès (dans un projet réel, ici on traiterait l'envoi du formulaire)
      const formSubmit = document.querySelector('.form-submit');
      formSubmit.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
      formSubmit.style.background = '#28a745';
      
      // Réinitialisation du formulaire après un délai
      setTimeout(() => {
        contactForm.reset();
        formSubmit.innerHTML = 'Envoyer le message <i class="fas fa-paper-plane"></i>';
        formSubmit.style.background = '';
      }, 3000);
    });
    
    // Animation lors du focus sur les champs du formulaire
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        const icon = input.nextElementSibling;
        if (icon) {
          icon.style.color = 'var(--primary)';
        }
      });
      
      input.addEventListener('blur', () => {
        const icon = input.nextElementSibling;
        if (icon && !input.value) {
          icon.style.color = 'var(--accent)';
        }
      });
    });
  }
  
  // Scroll vers la section sur la page d'accueil
  const scrollIndicator = document.getElementById('scroll-down');
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }