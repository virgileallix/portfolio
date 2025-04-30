window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.innerHTML = nav.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

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

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      button.classList.add('active');
      
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

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  document.getElementById('header').classList.toggle('header-light');
  
  if (document.body.classList.contains('light-mode')) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'light');
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'dark');
  }
});

function applyStoredTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('header').classList.add('header-light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

window.addEventListener('DOMContentLoaded', applyStoredTheme);

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formSubmit = document.querySelector('.form-submit');
    formSubmit.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
    formSubmit.style.background = '#28a745';
    
    setTimeout(() => {
      contactForm.reset();
      formSubmit.innerHTML = 'Envoyer le message <i class="fas fa-paper-plane"></i>';
      formSubmit.style.background = '';
    }, 3000);
  });
  
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

const scrollIndicator = document.getElementById('scroll-down');

if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      observer.observe(img);
    });
  } else {
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

window.addEventListener('DOMContentLoaded', lazyLoadImages);
