document.addEventListener('DOMContentLoaded', function() {
  initializeLoader();
  createMinecraftParticles();
  addMinecraftEffects();
  initializeMinecraftEasterEggs();
  setupInventoryBar();
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

function initializeMinecraftEasterEggs() {
  let diamondCount = 0;
  
  const createHiddenDiamond = () => {
    const diamond = document.createElement('div');
    diamond.style.position = 'fixed';
    diamond.style.width = '20px';
    diamond.style.height = '20px';
    diamond.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iIzVBQzdDNyIgZD0iTTEwIDJMMiA4bDggMTAgOC0xMHoiLz48L3N2Zz4=')";
    diamond.style.backgroundSize = 'contain';
    diamond.style.zIndex = '1000';
    diamond.style.opacity = '0.7';
    diamond.style.cursor = 'pointer';
    diamond.style.pointerEvents = 'all';
    diamond.className = 'hidden-diamond';
    
    const x = Math.random() * (window.innerWidth - 30);
    const y = Math.random() * (window.innerHeight - 30);
    diamond.style.left = `${x}px`;
    diamond.style.top = `${y}px`;
    
    diamond.animate([
      { transform: 'translateY(0) rotate(0deg)' },
      { transform: 'translateY(-10px) rotate(360deg)' },
      { transform: 'translateY(0) rotate(720deg)' }
    ], {
      duration: 3000,
      iterations: Infinity
    });
    
    diamond.addEventListener('click', () => {
      playSound('diamond');
      
      diamond.style.transform = 'scale(2)';
      diamond.style.opacity = '0';
      setTimeout(() => diamond.remove(), 500);
      
      diamondCount++;
      
      updateOrCreateDiamondCounter();
      
      if (diamondCount >= 5) {
        activateEasterEgg();
      }
    });
    
    document.body.appendChild(diamond);
  };
  
  const updateOrCreateDiamondCounter = () => {
    let counter = document.getElementById('diamond-counter');
    
    if (!counter) {
      counter = document.createElement('div');
      counter.id = 'diamond-counter';
      counter.style.position = 'fixed';
      counter.style.bottom = '50px';
      counter.style.right = '10px';
      counter.style.background = 'rgba(0, 0, 0, 0.6)';
      counter.style.padding = '5px 10px';
      counter.style.borderRadius = '3px';
      counter.style.color = '#5AC7C7';
      counter.style.fontFamily = 'Minecraft, monospace';
      counter.style.fontSize = '14px';
      counter.style.zIndex = '1000';
      document.body.appendChild(counter);
    }
    
    counter.innerHTML = `<div style="display: flex; align-items: center;"><span style="display: inline-block; width: 16px; height: 16px; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iIzVBQzdDNyIgZD0iTTEwIDJMMiA4bDggMTAgOC0xMHoiLz48L3N2Zz4='); background-size: contain; margin-right: 5px;"></span> ${diamondCount} / 5</div>`;
  };
  
  const activateEasterEgg = () => {
    const achievement = document.createElement('div');
    achievement.style.position = 'fixed';
    achievement.style.top = '50%';
    achievement.style.left = '50%';
    achievement.style.transform = 'translate(-50%, -50%)';
    achievement.style.background = 'rgba(0, 0, 0, 0.8)';
    achievement.style.border = '2px solid #6A6A6A';
    achievement.style.padding = '20px';
    achievement.style.borderRadius = '5px';
    achievement.style.color = 'white';
    achievement.style.fontFamily = 'Minecraft, monospace';
    achievement.style.textAlign = 'center';
    achievement.style.zIndex = '2000';
    achievement.style.minWidth = '300px';
    
    achievement.innerHTML = `
      <div style="display: flex; align-items: center; gap: 15px;">
        <div style="width: 50px; height: 50px; background-color: #5AC7C7; border-radius: 5px; display: flex; align-items: center; justify-content: center;">
          <div style="width: 30px; height: 30px; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTEwIDJMMiA4bDggMTAgOC0xMHoiLz48L3N2Zz4='); background-size: contain;"></div>
        </div>
        <div style="text-align: left;">
          <div style="color: #FFFF55; font-size: 16px; margin-bottom: 5px;">Achievement Unlocked!</div>
          <div style="font-size: 14px;">Diamants Découvreur</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(achievement);
    
    achievement.animate([
      { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
      { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 1 },
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.5, 0, 0.15, 1)'
    });
    
    playSound('achievement');
    
    setTimeout(() => {
      achievement.animate([
        { transform: 'translate(-50%, -50%)', opacity: 1 },
        { transform: 'translate(-50%, -150%)', opacity: 0 }
      ], {
        duration: 1000,
        easing: 'cubic-bezier(0.5, 0, 0.15, 1)'
      }).onfinish = () => achievement.remove();
    }, 5000);
    
    document.body.classList.add('creeper-mode');
  };
  
  for (let i = 0; i < 5; i++) {
    setTimeout(() => createHiddenDiamond(), 5000 + i * 20000);
  }
  
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        activateSuperSecretMode();
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  function activateSuperSecretMode() {
    playSound('explosion');
    
    const explosion = document.createElement('div');
    explosion.style.position = 'fixed';
    explosion.style.top = '0';
    explosion.style.left = '0';
    explosion.style.width = '100%';
    explosion.style.height = '100%';
    explosion.style.backgroundColor = 'white';
    explosion.style.zIndex = '9999';
    explosion.style.transition = 'all 0.5s ease-out';
    
    document.body.appendChild(explosion);
    
    setTimeout(() => {
      explosion.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      setTimeout(() => explosion.remove(), 500);
      
      applyCreeperMode();
    }, 100);
  }
  
  function applyCreeperMode() {
    const creeperStyle = document.createElement('style');
    creeperStyle.textContent = `
      body.creeper-mode {
        background-color: #2F5234 !important;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0yNlQyMTozOTozMSswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI2VDIxOjM5OjMxKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgd2fsoAAAKLSURBVHja7dwxattQGIZhXdIFOOQWvIEXoAv5DtlBIFtx5kAW4M0gQ5aC5uLF4MGTu8izcJFbBALZQnCRQgUp4GqSDJZFdKKj90GP6G+x9MOj71iyUjqdTpKxXB5kRAAEAAJAACAABCDnABZ5/oyu60LbtkHTNEFd16mu66Aoiu9FUXwpimJXluVOO2+bpnlq2/axqqqdPk/9s9zGdV2vjTGBMebUWrvz3vcLZVmWz4MyxrwZY06ttYEx5q5pmrW19nKeJE3dT9eZzRx+9+l0eo9ESRTgP8VxrOu6bbP+I+DV5z9gDMD38M/VtW6BcgmY53C893sAl4AZD4uiCJxzwbSAubzx04cQVi8ePp2f6s2f9HkYD7+uq2Ddrq/G+1meDL4FIAAQAAgABIAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAJAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAA8J4BTHnR4ziuwjCs+76/nEwmC7nZbBb9MP73N4Z77+/HcbyaPNT3XGrb9uG173Vd94t+vxhjzp1zu8VicTfY75xz3vslgMsDX4wxi77vL4ZhuB3+oHVdh2EYPQ3DcL1cLu8HmNuRi/fTD/kXyJ8FIAAQAAgABAACAOcBYBYApkQ0zCPAozX2ZJ0N9NOHqqqOtC1orT2apz9n3QoYa87W2bA/fciyFRjzaK3dNk2znqdJvlmr9N7fD8Nw673fLhaLu7qu51VV3Q7bwTiOq/V6fTb+1vCu674dHBz8OD4+/nx0dPS9LMsd/z2ACAAEAAJAACAAvIF+AQmR84EF+5TfAAAAAElFTkSuQmCC') !important;
      }
      
      body.creeper-mode .header {
        background-color: #131613 !important;
        border-bottom: 4px solid #52af3a !important;
      }
      
      body.creeper-mode .mc-card {
        background: #2A2A2A !important;
        border-color: #191919 !important;
      }
      
      body.creeper-mode .btn {
        font-family: 'Minecraft', 'Outfit', sans-serif !important;
      }
      
      body.creeper-mode .btn-primary {
        background-color: #52af3a !important;
        border-color: #395731 !important;
      }
      
      body.creeper-mode .project-card {
        border-color: #151515 !important;
      }
      
      body.creeper-mode .project-card:hover {
        border-color: #52af3a !important;
      }
      
      body.creeper-mode .footer {
        background-color: #131613 !important;
      }
      
      .creeper-face {
        position: fixed;
        pointer-events: none;
        width: 40px;
        height: 40px;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0yNlQyMTozOTozMSswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI2VDIxOjM5OjMxKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk+Xj8AAAAGDSURBVFiF7ZixTsNADIa/NA0SOANiZOQJeADWTrwFYmGGLZkQYmNhQYiJLRMbDwASS5moRKRl6dhBTnGdq3OOg4qiMtjy5/vPvrOVeZ7zgv6AcsgDFIACUAAKwAY4A06AnZzc7YQRcA0sgQxYpWm6AOB4MqmA28LvvO/bHJ2Dfgk8WKB34ANIgKsFewEmwDHwa7ASeClpXxpnASwMGRnEBphbzG+AS0O+FvM7sON4fmyFrzR5B6AH7AFPWr4LIAdSfTwFdg35WtuY67gHfDrsBSBKkqQC3tI0XQEYSgOPFnAIXACXho2ZvqIL4EGLK1N+D/wAxw58LCJNHJsWpaCj7THyuGtc6eeWzrF/xSXwrM9LiJ13sQZ8BWDH3jGWF4ACUAAKwPIALrQaXo1XO/IueAjgF8uHQAW8SyUkjQ1QF3BjobZkB1wB+Oqwn//5n4j+UVGXOCaJ21CXEqfFCwOXAMdapKe2S+DNAi0NbA5c6LjUNoJN02QWwu8deDULSXEUST8DsNPyxU4IIoYAAAAASUVORK5CYII=');
        background-size: contain;
        z-index: 9998;
        opacity: 0.5;
        transform: translate(-50%, -50%);
      }
    `;
    
    document.head.appendChild(creeperStyle);
    
    document.body.classList.add('creeper-mode');
    
    const creeperFace = document.createElement('div');
    creeperFace.className = 'creeper-face';
    document.body.appendChild(creeperFace);
    
    document.addEventListener('mousemove', (e) => {
      creeperFace.style.left = `${e.clientX}px`;
      creeperFace.style.top = `${e.clientY}px`;
    });
    
    setInterval(() => {
      if (Math.random() < 0.05) {
        playSound('creeper');
      }
    }, 10000);
  }
}

function setupInventoryBar() {
  const inventoryBar = document.getElementById('inventory-bar');
  if (!inventoryBar) return;
  
  if (inventoryBar.children.length === 0) {
    for (let i = 0; i < 9; i++) {
      const slot = document.createElement('div');
      slot.className = i === 0 ? 'inventory-slot selected' : 'inventory-slot';
      
      const item = document.createElement('div');
      item.className = 'inventory-item';
      
      if (i === 0) {
        item.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzVBQzdDNyIgZD0iTTYgNGgyMHYySDZ6Ii8+PHBhdGggZmlsbD0iIzM5OEFBOCIgZD0iTTYgNmgyMHYySDF+Ii8+PHBhdGggZmlsbD0iIzczM0Q0OSIgZD0iTTE1IDhoMnYyMGgtMnoiLz48cGF0aCBmaWxsPSIjNTMyQjM1IiBkPSJNMTUgOGgxdjIwaC0xeiIvPjxwYXRoIGZpbGw9IiM5MzVGNDkiIGQ9Ik0xNiA4aDF2MjBoLTF6Ii8+PC9zdmc+')";
      } else if (i === 1) {
        item.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzhmOGY4ZiIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM1NTU1NTUiIGQ9Ik0wIDBoMnYzMkgwem0zMCAwaDJ2MzJoLTJ6TTAgMGgzMnYySDB6bTAgMzBoMzJ2MkgweiIvPjxwYXRoIGZpbGw9IiM2NzlFNjAiIGQ9Ik0yIDJoMjh2MTBIMnoiLz48cGF0aCBmaWxsPSIjOEM2MjNBIiBkPSJNMiAxMmgyOHYxOEgyeiIvPjwvc3ZnPg==')";
      } else if (i === 2) {
        item.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzhGOEY4RiIgZD0iTTYgMmgyMHYyOEg2eiIvPjxwYXRoIGZpbGw9IiM1NTU1NTUiIGQ9Ik02IDJoMnYyOEg2em0xOCAwaDF2MjhoLTF6TTYgMmgyMHYxSDZ6bTAgMjdoMjB2MUg2eiIvPjxwYXRoIGZpbGw9IiM1QUM3QzciIGQ9Ik04IDRoMTZ2MjRIOHoiLz48L3N2Zz4=')";
      } else if (i === 3) {
        item.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0IxOTAzMyIgZD0iTTExIDZoMTB2MjBIMTF6Ii8+PHBhdGggZmlsbD0iIzdBNjEyMiIgZD0iTTExIDZoMnYyMGgtMnptOCAwaDF2MjBoLTF6TTExIDZoMTB2MUgxMXptMCAxOWgxMHYxSDExeiIvPjxwYXRoIGZpbGw9IiNDRUEzMkEiIGQ9Ik0xMyA3aDZ2MThIMTN6Ii8+PHBhdGggZmlsbD0iIzdBNjEyMiIgZD0iTTYgMTFoMjB2MTBINnoiLz48cGF0aCBmaWxsPSIjQjE5MDMzIiBkPSJNNiAxMWgyMHYySDB6bTAgOGgyMHYySDZ6Ii8+PHBhdGggZmlsbD0iI0NFQTMyQSIgZD0iTTYgMTNoMjB2Nkg2eiIvPjwvc3ZnPg==')";
      } else if (i === 4) {
        item.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzc3NyIgZD0iTTMgNmgyNnY0SDN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTMgMTBoMjZ2MTZIM3oiLz48cGF0aCBmaWxsPSIjNTU1IiBkPSJNMyA2aDJ2MjBIM3ptMjQgMGgydjIwaC0yek0zIDZoMjZ2Mkgzem0wIDE4aDI2djJIM3oiLz48cGF0aCBmaWxsPSIjNDQ0IiBkPSJNMTMgMTRoNnY4aC02em0xIDFoNHY2aC00eiIvPjwvc3ZnPg==')";
      } else if (i === 5) {
        item.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk5NzY0MyIgZD0iTTkgNGgxNHYyNEg5eiIvPjxwYXRoIGZpbGw9IiM3NzVCMzUiIGQ9Ik05IDRoMnYyNEg5em0xMiAwaDF2MjRoLTF6TTkgNGgxNHYxSDl6bTAgMjNoMTR2MUg5eiIvPjxwYXRoIGZpbGw9IiNBRDg5NEYiIGQ9Ik0xMSA1aDEwdjIySDExeiIvPjwvc3ZnPg==')";
      } else if (i === 6) {
        item.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzQxNDE0MSIgZD0iTTIgNGgyOHYyMEgyek0yIDI0aDI4djRIMnoiLz48cGF0aCBmaWxsPSIjNTk1OTU5IiBkPSJNMiA0aDJ2MjRIMnptMjYgMGgydjI0aC0yek0yIDRoMjh2Mkgyem0wIDIyaDI4djJIMnoiLz48cGF0aCBmaWxsPSIjOEI4QjhCIiBkPSJNNCA2aDI0djE4SDR6bTAgMThoMjR2MUg0eiIvPjxwYXRoIGZpbGw9IiM3Nzc3NzciIGQ9Ik00IDZoMXYxOUg0em0yMyAwaDF2MTloLTF6Ii8+PHBhdGggZmlsbD0iI0E1QTVBNSIgZD0iTTUgN2gyMnYxN0g1eiIvPjxwYXRoIGZpbGw9IiM1QUM3QzciIGQ9Ik01IDE1aDIydjlINXoiLz48cGF0aCBmaWxsPSIjM0E4QThBIiBkPSJNNSAxNWgyMnYxSDV6bTAgOGgyMnYxSDV6Ii8+PC9zdmc+')";
      } else if (i === 7) {
        item.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk5OTk5OSIgZD0iTTEwIDVoMTN2N0gxMHoiLz48cGF0aCBmaWxsPSIjNzc3Nzc3IiBkPSJNMTAgNWgxdjdoLTF6bTEyIDBwMXY3aC0xek0xMCA1aDEzdjFIMTB6bTAgNmgxM3YxSDEweiIvPjxwYXRoIGZpbGw9IiNBQUFBQUEiIGQ9Ik0xMSA2aDExdjVIMTF6Ii8+PHBhdGggZmlsbD0iIzc3Nzc3NyIgZD0iTTEzIDE0aDd2MTNoLTd6Ii8+PHBhdGggZmlsbD0iIzU1NTU1NSIgZD0iTTEzIDE0aDF2MTNoLTF6bTYgMGgxdjEzaC0xek0xMyAxNGg3djFoLTd6bTAgMTJoN3YxaC03eiIvPjxwYXRoIGZpbGw9IiM4ODg4ODgiIGQ9Ik0xNCAxNWg1djExaC01eiIvPjxwYXRoIGZpbGw9IiNCRDdCMDAiIGQ9Ik0xMC41IDEyaDEydjJoLTEyeiIvPjxwYXRoIGZpbGw9IiM5MzYwMDAiIGQ9Ik0xMC41IDEyaDF2MmgtMXptMTEgMGgxdjJoLTF6TTEwLjUgMTJoMTJ2MWgtMTJ6bTAgMWgxMnYxaC0xMnoiLz48cGF0aCBmaWxsPSIjRUE5NjAwIiBkPSJNMTEuNSAxM2gxMHYyaC0xMHoiLz48L3N2Zz4=')";
      } else if (i === 8) {
        item.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0JEMDAwMCIgZD0iTTExIDEzaDEwdjEwSDExeiIvPjxwYXRoIGZpbGw9IiM4MjAwMDAiIGQ9Ik0xMSAxM2gxdjEwaC0xem05IDBwMXYxMGgtMXpNMTEgMTNoMTB2MUgxMXptMCA5aDEwdjFIMTF6Ii8+PHBhdGggZmlsbD0iI0YyMDAwMCIgZD0iTTEyIDE0aDh2OGgtOHoiLz48L3N2Zz4=')";
      }
      
      slot.appendChild(item);
      inventoryBar.appendChild(slot);
    }
  }
  
  const slots = inventoryBar.querySelectorAll('.inventory-slot');
  slots.forEach((slot, index) => {
    slot.addEventListener('click', () => {
      slots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      
      playSound('click');
    });
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '9') {
      const slotIndex = parseInt(e.key) - 1;
      if (slotIndex >= 0 && slotIndex < slots.length) {
        slots.forEach(s => s.classList.remove('selected'));
        slots[slotIndex].classList.add('selected');
        playSound('click');
      }
    }
  });
}

function setupBlockGeneration() {
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