// Ajouter au script.js
function initializeMinecraftWeather() {
    const weatherTypes = ['clear', 'rain', 'thunder'];
    let currentWeather = 'clear';
    let weatherDuration = 0;
    
    // Container pour les effets météo
    const weatherContainer = document.createElement('div');
    weatherContainer.className = 'minecraft-weather-container';
    document.body.appendChild(weatherContainer);
    
    // Style CSS
    const style = document.createElement('style');
    style.textContent = `
      .minecraft-weather-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999;
        overflow: hidden;
      }
      
      .rain-drop {
        position: absolute;
        width: 2px;
        height: 15px;
        background: linear-gradient(to bottom, rgba(120, 160, 255, 0), rgba(120, 160, 255, 0.6));
        opacity: 0.7;
      }
      
      .thunder-flash {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        opacity: 0;
        transition: opacity 0.1s;
      }
      
      @keyframes rainFall {
        0% { transform: translateY(-100px); }
        100% { transform: translateY(calc(100vh + 100px)); }
      }
    `;
    document.head.appendChild(style);
    
    // Fonction pour changer la météo aléatoirement
    function changeWeather() {
      if (weatherDuration <= 0) {
        const prevWeather = currentWeather;
        // Choisir un nouveau type de météo avec une préférence pour le temps clair
        const rand = Math.random();
        if (rand < 0.6) {
          currentWeather = 'clear';
          weatherDuration = 60 + Math.floor(Math.random() * 120); // 1-3 minutes
        } else if (rand < 0.9) {
          currentWeather = 'rain';
          weatherDuration = 30 + Math.floor(Math.random() * 90); // 30s-2min
        } else {
          currentWeather = 'thunder';
          weatherDuration = 15 + Math.floor(Math.random() * 45); // 15s-1min
        }
        
        // Appliquer le changement
        if (prevWeather !== currentWeather) {
          applyWeatherEffect(currentWeather);
        }
      } else {
        weatherDuration--;
      }
    }
    
    function applyWeatherEffect(type) {
      // Nettoyer les effets précédents
      weatherContainer.innerHTML = '';
      
      if (type === 'rain' || type === 'thunder') {
        // Créer les gouttes de pluie
        const rainCount = type === 'thunder' ? 300 : 200;
        
        for (let i = 0; i < rainCount; i++) {
          const drop = document.createElement('div');
          drop.className = 'rain-drop';
          
          // Position aléatoire
          const x = Math.random() * window.innerWidth;
          const delay = Math.random() * 5;
          const duration = 1 + Math.random();
          
          drop.style.left = `${x}px`;
          drop.style.animation = `rainFall ${duration}s linear infinite`;
          drop.style.animationDelay = `${delay}s`;
          
          weatherContainer.appendChild(drop);
        }
        
        // Ajouter le son
        if (typeof window.playSound === 'function') {
          window.playSound(type === 'thunder' ? 'thunder' : 'rain');
        }
      }
      
      // Flash de tonnerre
      if (type === 'thunder') {
        setInterval(() => {
          if (Math.random() < 0.1) { // 10% de chance par intervalle
            const flash = document.createElement('div');
            flash.className = 'thunder-flash';
            weatherContainer.appendChild(flash);
            
            // Jouer le son
            if (typeof window.playSound === 'function') {
              window.playSound('thunder');
            }
            
            // Animation de flash
            setTimeout(() => {
              flash.style.opacity = '1';
              setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => {
                  flash.remove();
                }, 100);
              }, 50);
            }, 10);
          }
        }, 5000); // Vérifier toutes les 5 secondes
      }
    }
    
    // Initialiser le cycle météo
    setInterval(changeWeather, 1000); // Vérifier chaque seconde
    
    // Exposer une fonction pour changer la météo manuellement
    window.changeMinecraftWeather = function(type) {
      if (weatherTypes.includes(type)) {
        currentWeather = type;
        weatherDuration = 30;
        applyWeatherEffect(type);
      }
    };
    
    // Easter egg: taper "RAIN" ou "THUNDER" ou "SUN"
    const weatherCodes = {
      'RAIN': 'rain',
      'THUNDER': 'thunder',
      'SUN': 'clear'
    };
    
    let keySequence = [];
    document.addEventListener('keydown', (e) => {
      keySequence.push(e.key.toUpperCase());
      if (keySequence.length > 10) keySequence.shift();
      
      Object.keys(weatherCodes).forEach(code => {
        if (keySequence.join('').includes(code)) {
          window.changeMinecraftWeather(weatherCodes[code]);
          keySequence = [];
        }
      });
    });
  }
  
  // Appeler cette fonction au chargement
  document.addEventListener('DOMContentLoaded', initializeMinecraftWeather);

  function addHiddenCreeper() {
    // Créer le creeper
    const creeper = document.createElement('div');
    creeper.className = 'hidden-creeper';
    
    // Style CSS pour le creeper
    const style = document.createElement('style');
    style.textContent = `
      .hidden-creeper {
        position: fixed;
        width: 20px;
        height: 20px;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0yNlQyMTozOTozMSswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI2VDIxOjM5OjMxKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgEk4MkAAADjSURBVDiN1ZQxDoJAEEXfbremJVSmouEKVsZTeAMOYW1lrAyVpbUltRUeksLCYsDVxNjM8O/M/J+ZbBDN80xumRFYJAEe/oaL0Js9SQPsJQE+SjUd67pO3l+PxoLW2plQkgA4HA+qdWtJggAbgEySAIyxZaLmHmBgFTfGmHJpvQ7wNEluDVUlSc6hSiUBdv7qLw5VT4LZGDMopeSNhmoDSgGuKRg1EVVIqL4xVUtUrYpqlvAS1apVVMlFdE5RZcMw+DOfhpGGYVhNlJLkEqHKJL0kuRg9HlCXlpGrYXQBFdI5T89HcYoAAAAASUVORK5CYII=');
        background-size: contain;
        background-repeat: no-repeat;
        opacity: 0.2;
        cursor: pointer;
        z-index: 9999;
        transition: opacity 0.3s;
      }
      
      .hidden-creeper:hover {
        opacity: 0.8;
      }
      
      .minecraft-explosion {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        z-index: 10000;
        transition: opacity 0.5s;
      }
      
      .minecraft-explosion-particles {
        position: fixed;
        width: 4px;
        height: 4px;
        background-color: #888;
        border-radius: 50%;
        z-index: 10001;
      }
    `;
    document.head.appendChild(style);
    
    // Position aléatoire du creeper
    const positions = [
      { top: '10%', left: '5%' },
      { bottom: '20%', right: '8%' },
      { top: '50%', right: '5%' },
      { bottom: '10%', left: '15%' },
      { top: '80%', left: '50%' }
    ];
    
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    Object.assign(creeper.style, randomPosition);
    
    // Ajouter le creeper au DOM après un délai aléatoire
    setTimeout(() => {
      document.body.appendChild(creeper);
    }, 60000 + Math.random() * 120000); // Entre 1 et 3 minutes
    
    // Gérer le clic sur le creeper
    creeper.addEventListener('click', () => {
      // Son de creeper
      if (typeof window.playSound === 'function') {
        window.playSound('creeper');
      }
      
      // Animation de "ssssss"
      const sssText = document.createElement('div');
      sssText.textContent = 'Sssssssssss...';
      sssText.style.position = 'fixed';
      sssText.style.top = creeper.style.top;
      sssText.style.left = creeper.style.left;
      sssText.style.color = '#52A535';
      sssText.style.fontFamily = 'Minecraft, monospace';
      sssText.style.zIndex = '10000';
      document.body.appendChild(sssText);
      
      // Cacher le creeper
      creeper.style.display = 'none';
      
      // Après un court délai, explosion
      setTimeout(() => {
        sssText.remove();
        
        // Créer l'explosion
        const explosion = document.createElement('div');
        explosion.className = 'minecraft-explosion';
        document.body.appendChild(explosion);
        
        // Son d'explosion
        if (typeof window.playSound === 'function') {
          window.playSound('explosion');
        }
        
        // Créer des particules
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.className = 'minecraft-explosion-particles';
          
          // Position initiale (au centre de l'écran)
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          
          // Direction aléatoire
          const angle = Math.random() * Math.PI * 2;
          const distance = 100 + Math.random() * 200;
          const endX = startX + Math.cos(angle) * distance;
          const endY = startY + Math.sin(angle) * distance;
          
          particle.style.left = `${startX}px`;
          particle.style.top = `${startY}px`;
          
          document.body.appendChild(particle);
          
          // Animation
          const duration = 500 + Math.random() * 500;
          particle.animate([
            { left: `${startX}px`, top: `${startY}px`, opacity: 1 },
            { left: `${endX}px`, top: `${endY}px`, opacity: 0 }
          ], {
            duration: duration,
            easing: 'ease-out',
            fill: 'forwards'
          });
          
          // Supprimer après l'animation
          setTimeout(() => {
            particle.remove();
          }, duration);
        }
        
        // Fade out et retour à la normale
        setTimeout(() => {
          explosion.style.opacity = '0';
          setTimeout(() => {
            explosion.remove();
            
            // Réapparaître ailleurs après un certain temps
            setTimeout(() => {
              const newPosition = positions[Math.floor(Math.random() * positions.length)];
              Object.assign(creeper.style, newPosition);
              creeper.style.display = 'block';
            }, 120000 + Math.random() * 180000); // 2-5 minutes
          }, 500);
        }, 300);
      }, 1000);
    });
  }
  
  // Appeler cette fonction au chargement
  document.addEventListener('DOMContentLoaded', addHiddenCreeper);

  function addFloatingBlocks() {
    // Style CSS
    const style = document.createElement('style');
    style.textContent = `
      .floating-block {
        position: fixed;
        width: 30px;
        height: 30px;
        background-size: contain;
        background-repeat: no-repeat;
        z-index: 800;
        cursor: pointer;
        transform-style: preserve-3d;
        transform: translateZ(0);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        image-rendering: pixelated;
      }
      
      .float-animation {
        animation: floatBlock 8s ease-in-out infinite alternate;
      }
      
      .spin-animation {
        animation: spinBlock 10s linear infinite;
      }
      
      @keyframes floatBlock {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(-20px) rotate(360deg); }
      }
      
      @keyframes spinBlock {
        0% { transform: rotateY(0deg); }
        100% { transform: rotateY(360deg); }
      }
      
      .block-break-particle {
        position: absolute;
        width: 8px;
        height: 8px;
        background-size: contain;
        opacity: 0.8;
      }
    `;
    document.head.appendChild(style);
    
    // Textures de blocs
    const blockTextures = [
      // Diamant
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGAmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0yNlQyMTozOTozMSswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI2VDIxOjM5OjMxKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg0ecEAAAAGhSURBVFjD7ZY9TsNAEIXfrEFCOQPQkVBRcAWOwG25Aw1NjkCRkis4RUSnLkeBdNJKCYnEWYrYZrO244TYEeKnPM2MZ+e9XfvdyDzP8Zfj6s/JnQJOAf8E4L3ve/x3MFJNsiwbs6Idi8Q0iVxb+7RMNbgAjZ0nSeIIunC4xtkpQE/wWZZNoihyd+xDWwnoD4QDAlAHd8/GYhJA8oM83wEo2UgO+CKAsgk+DMO5fGQJLGFiLq0MoRzm4Bwu9BfYHWPfZuEBgJHgODvIEgqgLXgURZX2KIrGq8CjOA6lkWDCVKU9iiJTB45ns8AcfFTaoyioCZCCj1jFTdvAucHjOHaKp9NpOwLO80rBbOw9ETc3YTsC5sDrTVjvBWaA7/ujOI4RMz9D0jQVzDRNz7jEMv0E4H3fuwROkqQE2+cEJwl0KJj/oQADYOw4QKqBlQIf1CzwJsuyW7M5x29MJMvyUjAsy/I7y/Ixlj9fUQdRbMHY7wSg2bwoyiHO20awLKvv1wHK2oOUDG/N69J8KOjC4frc0/8FpwLbCXAKqBurF7lbxZ6/AAAAAElFTkSuQmCC',
      // Or
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMPCRIkc9zFVAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMy0xNVQwOToxODozNiswMDowMLeVxJAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDMtMTVUMDk6MTg6MzYrMDA6MDDGyna8AAAAlElEQVRYw+2WMQ6AIAxFX40nkyN4FY/DHTgCF3Aw4QpOwSE4itSEwQ3bxqRvbGnzf9IWA0LEYcl4BSUDOCrAk4yRtx9nFl7nFoDnSc5KJjkrD+CQMYA0N9+eNRwATcYGUGvsADjHagCt4rWnwXLOw8lfXQcigTiCFYAuYwXAZYxlUuYZ/pzxyQ3Y8YxHbsCpRzA6fwq+Mh7fFEU9IQAAAABJRU5ErkJggg==',
      // TNT
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMPCRErjMfYkgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMy0xNVQwOToxNzowMiswMDowMIxZtqMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDMtMTVUMDk6MTc6MDIrMDA:wMDNDhycAAAANElEQVRYw+3SsQ0AIAwDwYj9l+ZTMgBCSkbg7tPXKwAA8Lw0rWkz0ze4AT8AAAAAkiSzxAUgLwLsOOvV4QAAAABJRU5ErkJggg=='
    ];
    
    // Fonction pour ajouter un bloc flottant
    function addFloatingBlock() {
      const block = document.createElement('div');
      block.className = 'floating-block';
      
      // Texture aléatoire
      const texture = blockTextures[Math.floor(Math.random() * blockTextures.length)];
      block.style.backgroundImage = `url('${texture}')`;
      
      // Position aléatoire
      const x = Math.random() * (window.innerWidth - 50);
      const y = Math.random() * (window.innerHeight - 50);
      block.style.left = `${x}px`;
      block.style.top = `${y}px`;
      
      // Animation aléatoire
      if (Math.random() > 0.5) {
        block.classList.add('float-animation');
      } else {
        block.classList.add('spin-animation');
      }
      
      // Gérer le clic (pour casser le bloc)
      block.addEventListener('click', () => {
        // Son
        if (typeof window.playSound === 'function') {
          window.playSound('dig');
        }
        
        // Créer des particules de bloc
        for (let i = 0; i < 8; i++) {
          const particle = document.createElement('div');
          particle.className = 'block-break-particle';
          particle.style.backgroundImage = block.style.backgroundImage;
          
          // Position initiale (au centre du bloc)
          const blockRect = block.getBoundingClientRect();
          const startX = blockRect.left + blockRect.width / 2;
          const startY = blockRect.top + blockRect.height / 2;
          
          // Direction aléatoire
          const angle = Math.random() * Math.PI * 2;
          const distance = 20 + Math.random() * 50;
          const endX = startX + Math.cos(angle) * distance;
          const endY = startY + Math.sin(angle) * distance;
          
          particle.style.left = `${startX}px`;
          particle.style.top = `${startY}px`;
          
          document.body.appendChild(particle);
          
          // Animation
          const duration = 300 + Math.random() * 200;
          particle.animate([
            { left: `${startX}px`, top: `${startY}px`, opacity: 1, transform: 'scale(0.5)' },
            { left: `${endX}px`, top: `${endY + 40}px`, opacity: 0, transform: 'scale(0)' }
          ], {
            duration: duration,
            easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)',
            fill: 'forwards'
          });
          
          // Supprimer après l'animation
          setTimeout(() => {
            particle.remove();
          }, duration);
        }
        
        // Supprimer le bloc
        block.remove();
        
        // Ajouter des points/XP
        if (window.minecraftAchievements) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('minecraft-xp-gain', {
              detail: { amount: 5 }
            }));
          }, 200);
        }
      });
      
      document.body.appendChild(block);
      
      // Supprimer après un certain temps
      setTimeout(() => {
        if (document.body.contains(block)) {
          block.remove();
        }
      }, 20000 + Math.random() * 40000); // 20-60 secondes
    }
    
    // Ajouter des blocs périodiquement
    setInterval(() => {
      // 10% de chance d'ajouter un bloc
      if (Math.random() < 0.1) {
        addFloatingBlock();
      }
    }, 10000); // Vérifier toutes les 10 secondes
    
    // Ajouter un premier bloc après un délai
    setTimeout(addFloatingBlock, 20000 + Math.random() * 30000);
  }
  
  document.addEventListener('DOMContentLoaded', addFloatingBlocks);

  function addVillagePopups() {
    // Style CSS
    const style = document.createElement('style');
    style.textContent = `
      .minecraft-village-popup {
        position: fixed;
        background-color: rgba(20, 21, 25, 0.9);
        border: 3px solid #3C8527;
        border-radius: 6px;
        padding: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        font-family: 'Minecraft', 'Outfit', sans-serif;
        color: white;
        z-index: 9999;
        width: 280px;
        transition: opacity 0.3s, transform 0.3s;
        pointer-events: none;
      }
      
      .village-popup-title {
        font-size: 16px;
        margin: 0 0 5px 0;
        color: #52A535;
        border-bottom: 1px solid #52A535;
        padding-bottom: 3px;
      }
      
      .village-popup-content {
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
      }
      
      .village-popup-note {
        font-size: 12px;
        color: #AAAAAA;
        font-style: italic;
        margin-top: 5px;
      }
    `;
    document.head.appendChild(style);
    
    // Définition des éléments qui peuvent avoir une infobulle
    const popupElements = [
      {
        selector: '.floating-pickaxe',
        title: 'Pioche enchantée',
        content: 'Cette pioche est enchantée avec Efficacité III et Fortune II. Elle permet de miner plus rapidement et d\'obtenir plus de ressources.',
        note: 'Cliquez pour l\'équiper'
      },
      {
        selector: '.project-title',
        title: 'Projet Découvert',
        content: 'Vous avez découvert un projet spécial! Consultez-le pour gagner de l\'expérience et découvrir des compétences uniques.',
        note: ''
      },
      {
        selector: '.logo',
        title: 'Virgile Allix',
        content: 'Développeur passionné et créatif, spécialisé en applications Java et développement web.',
        note: 'Cliquez pour retourner à l\'accueil'
      },
      {
        selector: '.skill-card',
        title: 'Compétence',
        content: 'Cette compétence peut être utilisée pour créer des projets avancés et résoudre des problèmes complexes.',
        note: 'Niveau: Expert'
      },
      {
        selector: '.social-link',
        title: 'Réseau Social',
        content: 'Connectez-vous avec moi sur les réseaux sociaux pour suivre mes dernières créations et projets.',
        note: 'Cliquez pour visiter'
      }
    ];
    
    // Créer une popup
    const popup = document.createElement('div');
    popup.className = 'minecraft-village-popup';
    popup.style.opacity = '0';
    popup.style.transform = 'translateY(10px)';
    
    const popupTitle = document.createElement('h3');
    popupTitle.className = 'village-popup-title';
    
    const popupContent = document.createElement('p');
    popupContent.className = 'village-popup-content';
    
    const popupNote = document.createElement('p');
    popupNote.className = 'village-popup-note';
    
    popup.appendChild(popupTitle);
    popup.appendChild(popupContent);
    popup.appendChild(popupNote);
    
    document.body.appendChild(popup);
    
    // Variables pour gérer l'affichage
    let activeElement = null;
    let popupTimeout = null;
    
    // Fonction pour afficher une popup
    function showPopupForElement(element, popupInfo) {
      const rect = element.getBoundingClientRect();
      
      // Position (au-dessus de l'élément)
      popup.style.left = `${rect.left + rect.width / 2 - 140}px`;
      popup.style.top = `${rect.top - popup.offsetHeight - 10}px`;
      
      // Si la popup sort de l'écran, l'ajuster
      const popupRect = popup.getBoundingClientRect();
      if (popupRect.left < 10) {
        popup.style.left = '10px';
      } else if (popupRect.right > window.innerWidth - 10) {
        popup.style.left = `${window.innerWidth - popupRect.width - 10}px`;
      }
      
      if (popupRect.top < 10) {
        // Si pas assez de place en haut, mettre en dessous
        popup.style.top = `${rect.bottom + 10}px`;
      }
      
      // Contenu
      popupTitle.textContent = popupInfo.title;
      popupContent.textContent = popupInfo.content;
      popupNote.textContent = popupInfo.note;
      
      // Afficher
      popup.style.opacity = '1';
      popup.style.transform = 'translateY(0)';
      
      // Son
      if (typeof window.playSound === 'function') {
        window.playSound('click');
      }
      
      // Fermer après un délai
      if (popupTimeout) {
        clearTimeout(popupTimeout);
      }
      
      popupTimeout = setTimeout(() => {
        hidePopup();
      }, 5000);
    }
    
    // Fonction pour cacher la popup
    function hidePopup() {
      popup.style.opacity = '0';
      popup.style.transform = 'translateY(10px)';
      activeElement = null;
    }
    
    // Ajouter les écouteurs d'événements
    function setupPopupListeners() {
      popupElements.forEach(popupInfo => {
        const elements = document.querySelectorAll(popupInfo.selector);
        
        elements.forEach(element => {
          element.addEventListener('click', (e) => {
            // Ne pas afficher si l'élément est déjà actif
            if (activeElement === element) return;
            
            activeElement = element;
            showPopupForElement(element, popupInfo);
          });
        });
      });
    }
    
    // Initialisation
    setupPopupListeners();
    
    // Réinitialiser les écouteurs au changement de page ou chargement de contenu dynamique
    document.addEventListener('DOMContentLoaded', setupPopupListeners);
    window.addEventListener('load', setupPopupListeners);
    
    // Observer pour les nouveaux éléments
    const observer = new MutationObserver((mutations) => {
      let shouldSetup = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.nodeType === 1) { // Element node
              shouldSetup = true;
              break;
            }
          }
        }
      });
      
      if (shouldSetup) {
        setupPopupListeners();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  document.addEventListener('DOMContentLoaded', addVillagePopups);