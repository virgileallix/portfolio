document.addEventListener('DOMContentLoaded', function() {
  initializeLoader();
  createMinecraftParticles();
  addMinecraftEffects();
  setupHeaderAndScrolling();
  setupThemeToggle();
  setupMobileMenu();
  setupProjectFilters();
  setupFormValidation();
  setupLazyLoading();
  setupCookieBanner();
  setupCreeperFollowsCursor();
});

function playSound(type) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator = audioContext.createOscillator();
  let gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  switch(type) {
    case 'click':
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.stop(audioContext.currentTime + 0.1);
      break;
    case 'diamond':
      oscillator.type = 'triangle';
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.1);
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
    case 'achievement':
      playSound('diamond');
      setTimeout(() => {
        let osc = audioContext.createOscillator();
        let gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.2, audioContext.currentTime);
        osc.frequency.setValueAtTime(800, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        osc.stop(audioContext.currentTime + 0.3);
      }, 150);
      break;
    case 'creeper':
      oscillator.type = 'sawtooth';
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.5);
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      oscillator.stop(audioContext.currentTime + 1);
      break;
    case 'explosion':
      let noise = audioContext.createBufferSource();
      let buffer = audioContext.createBuffer(1, audioContext.sampleRate * 1, audioContext.sampleRate);
      let data = buffer.getChannelData(0);
      
      for (let i = 0; i < buffer.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      noise.buffer = buffer;
      let noiseGain = audioContext.createGain();
      noise.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      
      noiseGain.gain.setValueAtTime(0.5, audioContext.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      noise.start();
      noise.stop(audioContext.currentTime + 0.5);
      break;
  }
}

function initializeLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 3000);
  
  const loaderBlocks = document.querySelector('.loader-blocks');
  if (loaderBlocks && loaderBlocks.children.length === 0) {
    for(let i = 0; i < 20; i++) {
      const block = document.createElement('div');
      block.className = 'loader-block';
      loaderBlocks.appendChild(block);
    }
  }
  
  const messages = [
    "Génération du terrain...",
    "Chargement des textures...",
    "Préparation des shaders...",
    "Planter des arbres...",
    "Spawn des villageois...",
    "Minage des diamants...",
    "Création des grottes...",
    "Plaçage des minerais...",
    "Laissez un diamant si vous aimez !",
    "Enchantement de l'épée...",
    "Préparation de l'inventaire...",
    "Calibrage des redstones...",
    "Presque prêt...",
    "Construire le portfolio..."
  ];
  
  let messageIndex = 0;
  const loaderMessage = document.querySelector('.loader-message');
  if (loaderMessage) {
    const messageInterval = setInterval(() => {
      if (loader.classList.contains('hidden')) {
        clearInterval(messageInterval);
        return;
      }
      
      messageIndex = (messageIndex + 1) % messages.length;
      loaderMessage.textContent = messages[messageIndex];
    }, 700);
  }
}

function setupCreeperFollowsCursor() {
  let creeperCursor = document.getElementById('creeper-cursor');
  
  if (!creeperCursor) {
    creeperCursor = document.createElement('div');
    creeperCursor.id = 'creeper-cursor';
    creeperCursor.style.position = 'fixed';
    creeperCursor.style.width = '30px';
    creeperCursor.style.height = '30px';
    creeperCursor.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0yNlQyMTozOTozMSswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI2VDIxOjM5OjMxKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk+Xj8AAAAGDSURBVFiF7ZixTsNADIa/NA0SOANiZOQJeADWTrwFYmGGLZkQYmNhQYiJLRMbDwASS5moRKRl6dhBTnGdq3OOg4qiMtjy5/vPvrOVeZ7zgv6AcsgDFIACUAAKwAY4A06AnZzc7YQRcA0sgQxYpWm6AOB4MqmA28LvvO/bHJ2Dfgk8WKB34ANIgKsFewEmwDHwa7ASeClpXxpnASwMGRnEBphbzG+AS0O+FvM7sON4fmyFrzR5B6AH7AFPWr4LIAdSfTwFdg35WtuY67gHfDrsBSBKkqQC3tI0XQEYSgOPFnAIXACXho2ZvqIL4EGLK1N+D/wAxw58LCJNHJsWpaCj7THyuGtc6eeWzrF/xSXwrM9LiJ13sQZ8BWDH3jGWF4ACUAAKwPIALrQaXo1XO/IueAjgF8uHQAW8SyUkjQ1QF3BjobZkB1wB+Oqwn//5n4j+UVGXOCaJ21CXEqfFCwOXAMdapKe2S+DNAi0NbA5c6LjUNoJN02QWwu8deDULSXEUST8DsNPyxU4IIoYAAAAASUVORK5CYII=')";
    creeperCursor.style.backgroundSize = 'contain';
    creeperCursor.style.backgroundRepeat = 'no-repeat';
    creeperCursor.style.zIndex = '9998';
    creeperCursor.style.opacity = '0';
    creeperCursor.style.pointerEvents = 'none';
    creeperCursor.style.transform = 'translate(-50%, -50%)';
    creeperCursor.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(creeperCursor);
  }
  
  document.addEventListener('mousemove', (e) => {
    if (creeperCursor) {
      creeperCursor.style.left = `${e.clientX}px`;
      creeperCursor.style.top = `${e.clientY}px`;
      
      creeperCursor.animate([
        { transform: 'translate(-50%, -50%) scale(1)' },
        { transform: 'translate(-50%, -50%) scale(1.05)' },
        { transform: 'translate(-50%, -50%) scale(1)' }
      ], {
        duration: 1000,
        iterations: Infinity
      });
    }
  });
  
  function updateCreeperVisibility() {
    const isNightMode = !document.body.classList.contains('light-mode');
    if (creeperCursor) {
      creeperCursor.style.opacity = isNightMode ? '0.7' : '0';

      if (isNightMode) {
        setInterval(() => {
          if (Math.random() < 0.01) {
            playSound('creeper');
          }
        }, 10000);
      }
    }
  }
  
  updateCreeperVisibility();
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', updateCreeperVisibility);
  }
  
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    updateCreeperVisibility();
  }
}

function createMinecraftParticles() {
  const particlesContainer = document.getElementById('particles-container');
  if (!particlesContainer) return;
  
  const particleCount = window.innerWidth < 768 ? 20 : 50;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  
  const speed = 0.2 + Math.random() * 0.3;
  const angle = Math.random() * Math.PI * 2;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  
  container.appendChild(particle);
  
  let posX = x;
  let posY = y;
  
  function updateParticle() {
    posX += vx;
    posY += vy;
    
    if (posX < 0) posX = window.innerWidth;
    if (posX > window.innerWidth) posX = 0;
    if (posY < 0) posY = window.innerHeight;
    if (posY > window.innerHeight) posY = 0;
    
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    
    requestAnimationFrame(updateParticle);
  }
  
  updateParticle();
}

function addMinecraftEffects() {
  const buttons = document.querySelectorAll('button, a.btn, .project-card, .skill-card');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      playSound('click');
    });
  });
  
  const serverHeartbeat = document.getElementById('server-heartbeat');
  if (serverHeartbeat) {
    setInterval(() => {
      serverHeartbeat.classList.add('pulse');
      setTimeout(() => {
        serverHeartbeat.classList.remove('pulse');
      }, 300);
    }, 2000);
  }
}

function setupHeaderAndScrolling() {
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    if (scrollProgress) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + "%";
    }
    
    revealElements();
  });
  
  const scrollDown = document.getElementById('scroll-down');
  if (scrollDown) {
    scrollDown.addEventListener('click', () => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
        playSound('click');
      }
    });
  }
}

function revealElements() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const elementArray = [...elements, ...animateElements];
  
  elementArray.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
      element.classList.add('visible');
    }
  });
}

function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'light');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'dark');
    }
    
    const creeperCursor = document.getElementById('creeper-cursor');
    if (creeperCursor) {
      const isNightMode = !document.body.classList.contains('light-mode');
      creeperCursor.style.opacity = isNightMode ? '0.7' : '0';
    }
    
    playSound('click');
  });
  
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

function setupMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  if (!menuToggle || !nav) return;
  
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
    
    playSound('click');
  });
}

function setupProjectFilters() {
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
        
        playSound('click');
      });
    });
  }
}

function setupFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formSubmit = document.querySelector('.form-submit');
      formSubmit.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
      formSubmit.style.background = '#28a745';
      
      playSound('achievement');
      
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
}

function setupLazyLoading() {
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

function setupCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieSettings = document.getElementById('cookie-settings');
  
  if (!cookieBanner) return;
  
  if (!localStorage.getItem('cookies-accepted')) {
    setTimeout(() => {
      cookieBanner.classList.add('visible');
    }, 2000);
  }
  
  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'true');
      cookieBanner.classList.remove('visible');
      
      playSound('click');
    });
  }
  
  if (cookieSettings) {
    cookieSettings.addEventListener('click', () => {
      cookieBanner.classList.remove('visible');
      
      playSound('click');
    });
  }
}