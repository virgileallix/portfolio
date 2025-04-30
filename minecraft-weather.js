/**
 * Minecraft Weather System
 * Système complet de météo style Minecraft pour le site web
 */

class MinecraftWeather {
    constructor() {
      this.weatherTypes = ['clear', 'rain', 'thunder', 'snow', 'sandstorm'];
      this.currentWeather = 'clear';
      this.weatherDuration = 0;
      this.isEnabled = true;
      this.transitionInProgress = false;
      
      // Container pour les effets météo
      this.weatherContainer = document.createElement('div');
      this.weatherContainer.className = 'minecraft-weather-container';
      document.body.appendChild(this.weatherContainer);
      
      // Style CSS
      this.addWeatherStyles();
      
      // Démarrer le cycle météo
      this.initializeWeatherCycle();
      
      // Ajouter les contrôles de la météo
      this.addWeatherControls();
      
      // Configurer les écouteurs pour les événements spéciaux
      this.setupEventListeners();
      
      // Initialiser avec un temps clair
      this.setWeather('clear');
    }
    
    /**
     * Ajoute les styles CSS pour les effets météo
     */
    addWeatherStyles() {
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
        
        /* Effet de pluie */
        .rain-drop {
          position: absolute;
          width: 1px;
          height: 15px;
          background: linear-gradient(to bottom, rgba(200, 220, 255, 0), rgba(200, 220, 255, 0.8));
          opacity: 0.7;
        }
        
        /* Effet de neige */
        .snow-flake {
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          opacity: 0.8;
        }
        
        /* Effet de tempête de sable */
        .sand-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: rgba(210, 180, 140, 0.6);
          opacity: 0.6;
        }
        
        /* Effet d'éclair */
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
        
        /* Overlay météo */
        .weather-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          transition: opacity 1.5s ease;
        }
        
        .rain-overlay {
          background-color: rgba(40, 50, 80, 0.15);
        }
        
        .thunder-overlay {
          background-color: rgba(20, 20, 40, 0.3);
        }
        
        .snow-overlay {
          background-color: rgba(200, 220, 255, 0.1);
        }
        
        .sandstorm-overlay {
          background-color: rgba(210, 180, 100, 0.2);
        }
        
        /* Animations */
        @keyframes rainFall {
          0% { transform: translateY(-30px) skewX(-20deg); }
          100% { transform: translateY(calc(100vh + 30px)) skewX(-20deg); }
        }
        
        @keyframes snowFall {
          0% { transform: translateY(-10px) rotate(0deg); }
          50% { transform: translateY(calc(50vh - 5px)) rotate(180deg) translateX(20px); }
          100% { transform: translateY(calc(100vh + 10px)) rotate(360deg) translateX(-20px); }
        }
        
        @keyframes sandDrift {
          0% { transform: translateY(0) translateX(-10px); }
          100% { transform: translateY(20px) translateX(calc(100vw + 10px)); }
        }
        
        /* Contrôles météo */
        .minecraft-weather-controls {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(20, 21, 25, 0.7);
          border: 2px solid #3C8527;
          border-radius: 5px;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 1000;
          backdrop-filter: blur(5px);
          font-family: 'Minecraft', sans-serif;
          transition: all 0.3s;
          transform: translateX(150px);
          opacity: 0;
        }
        
        .minecraft-weather-controls.show {
          transform: translateX(0);
          opacity: 1;
        }
        
        .weather-controls-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        
        .weather-controls-title {
          color: white;
          font-size: 14px;
          margin: 0;
        }
        
        .weather-controls-toggle {
          background: none;
          border: none;
          color: white;
          font-size: 14px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
          padding: 0;
        }
        
        .weather-controls-toggle:hover {
          opacity: 1;
        }
        
        .weather-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        
        .weather-button {
          background-color: rgba(60, 70, 80, 0.7);
          border: 1px solid #555;
          color: white;
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Minecraft', sans-serif;
        }
        
        .weather-button:hover {
          background-color: rgba(80, 90, 100, 0.9);
          transform: translateY(-2px);
        }
        
        .weather-button.active {
          background-color: rgba(82, 165, 53, 0.7);
          border-color: #3C8527;
        }
        
        .weather-status {
          color: #AAAAAA;
          font-size: 10px;
          text-align: right;
        }
        
        /* Icônes temps */
        .weather-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 5px;
          vertical-align: middle;
        }
        
        .weather-icon-clear {
          background-color: #ffcc00;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
        }
        
        .weather-icon-rain {
          background: linear-gradient(to bottom, #6699cc, transparent);
        }
        
        .weather-icon-thunder {
          background-color: #333;
          position: relative;
        }
        
        .weather-icon-thunder::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 6px;
          width: 4px;
          height: 10px;
          background-color: #ffcc00;
          clip-path: polygon(50% 0%, 100% 50%, 50% 50%, 100% 100%, 0% 30%, 50% 30%, 0% 0%);
        }
        
        .weather-icon-snow {
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          position: relative;
        }
        
        .weather-icon-snow::before,
        .weather-icon-snow::after {
          content: '';
          position: absolute;
          width: 12px;
          height: 2px;
          background-color: white;
          top: 7px;
          left: 2px;
        }
        
        .weather-icon-snow::before {
          transform: rotate(45deg);
        }
        
        .weather-icon-snow::after {
          transform: rotate(-45deg);
        }
        
        .weather-icon-sandstorm {
          background-color: #d2b48c;
          position: relative;
        }
        
        .weather-icon-sandstorm::before {
          content: '';
          position: absolute;
          width: 14px;
          height: 2px;
          background-color: #a0885e;
          top: 4px;
          left: 1px;
        }
        
        .weather-icon-sandstorm::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 2px;
          background-color: #a0885e;
          top: 8px;
          left: 3px;
        }
      `;
      document.head.appendChild(style);
    }
    
    /**
     * Initialise le cycle de changement de météo
     */
    initializeWeatherCycle() {
      // Vérifier et changer la météo toutes les secondes
      this.weatherInterval = setInterval(() => {
        if (!this.isEnabled) return;
        
        if (this.weatherDuration <= 0) {
          const prevWeather = this.currentWeather;
          
          // Choisir un nouveau type de météo selon des probabilités
          const rand = Math.random();
          
          if (rand < 0.6) {
            // 60% de chance de temps clair
            this.currentWeather = 'clear';
            this.weatherDuration = 60 + Math.floor(Math.random() * 120); // 1-3 minutes
          } else if (rand < 0.85) {
            // 25% de chance de pluie
            this.currentWeather = 'rain';
            this.weatherDuration = 30 + Math.floor(Math.random() * 60); // 30s-1min30s
          } else if (rand < 0.95) {
            // 10% de chance d'orage
            this.currentWeather = 'thunder';
            this.weatherDuration = 20 + Math.floor(Math.random() * 40); // 20s-1min
          } else if (rand < 0.975) {
            // 2.5% de chance de neige
            this.currentWeather = 'snow';
            this.weatherDuration = 30 + Math.floor(Math.random() * 60); // 30s-1min30s
          } else {
            // 2.5% de chance de tempête de sable
            this.currentWeather = 'sandstorm';
            this.weatherDuration = 15 + Math.floor(Math.random() * 30); // 15-45s
          }
          
          // Appliquer le changement si différent
          if (prevWeather !== this.currentWeather && !this.transitionInProgress) {
            this.setWeather(this.currentWeather);
            this.updateWeatherControls();
          }
        } else {
          this.weatherDuration--;
        }
        
        // Mettre à jour l'affichage du temps restant
        this.updateWeatherStatus();
      }, 1000);
    }
    
    /**
     * Définit un type de météo spécifique
     */
    setWeather(type) {
      if (!this.weatherTypes.includes(type) || this.transitionInProgress) return;
      
      // Marquer le début de la transition
      this.transitionInProgress = true;
      
      // Nettoyer les effets précédents
      this.clearWeatherEffects();
      
      // Appliquer le nouveau type de météo
      this.currentWeather = type;
      
      // Créer un overlay pour l'effet de la météo
      const overlay = document.createElement('div');
      overlay.className = `weather-overlay ${type}-overlay`;
      overlay.style.opacity = '0';
      this.weatherContainer.appendChild(overlay);
      
      // Transition en douceur
      setTimeout(() => {
        overlay.style.opacity = '1';
      }, 50);
      
      // Créer les particules de météo
      switch (type) {
        case 'rain':
          this.createRainEffects();
          if (typeof window.playSound === 'function') {
            window.playSound('rain');
          }
          break;
          
        case 'thunder':
          this.createRainEffects(true); // Pluie plus dense
          this.scheduleThunderEffects();
          if (typeof window.playSound === 'function') {
            window.playSound('thunder');
          }
          break;
          
        case 'snow':
          this.createSnowEffects();
          break;
          
        case 'sandstorm':
          this.createSandstormEffects();
          break;
      }
      
      // Fin de la transition
      setTimeout(() => {
        this.transitionInProgress = false;
      }, 1500);
      
      // Dispatcher un événement pour le système d'achievements
      window.dispatchEvent(new CustomEvent('minecraft-weather-change', {
        detail: { 
          weather: type
        }
      }));
    }
    
    /**
     * Supprime tous les effets météo actuels
     */
    clearWeatherEffects() {
      // Vider le conteneur météo avec une transition douce
      const elements = this.weatherContainer.querySelectorAll(':not(.weather-overlay)');
      elements.forEach(element => {
        element.style.opacity = '0';
        setTimeout(() => {
          if (element.parentNode === this.weatherContainer) {
            this.weatherContainer.removeChild(element);
          }
        }, 500);
      });
      
      // Faire disparaître les overlays avec une transition
      const overlays = this.weatherContainer.querySelectorAll('.weather-overlay');
      overlays.forEach(overlay => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          if (overlay.parentNode === this.weatherContainer) {
            this.weatherContainer.removeChild(overlay);
          }
        }, 1500);
      });
      
      // Arrêter tous les sons de météo
      if (typeof window.minecraftSoundSystem !== 'undefined') {
        if (typeof window.minecraftSoundSystem.stopSound === 'function') {
          window.minecraftSoundSystem.stopSound('rain');
          window.minecraftSoundSystem.stopSound('thunder');
        }
      }
    }
    
    /**
     * Crée les effets de pluie
     */
    createRainEffects(isThunder = false) {
      // Nombre de gouttes de pluie
      const rainCount = isThunder ? 300 : 200;
      
      for (let i = 0; i < rainCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        
        // Position aléatoire
        const x = Math.random() * window.innerWidth;
        const delay = Math.random() * 5;
        const duration = 0.8 + Math.random() * 0.4; // Vitesse aléatoire
        
        drop.style.left = `${x}px`;
        drop.style.opacity = `${0.4 + Math.random() * 0.4}`;
        drop.style.animation = `rainFall ${duration}s linear infinite`;
        drop.style.animationDelay = `${delay}s`;
        
        this.weatherContainer.appendChild(drop);
      }
      
      // Jouer le son de pluie
      if (typeof window.playSound === 'function') {
        window.playSound('rain');
      }
    }
    
    /**
     * Programme les effets de foudre pour l'orage
     */
    scheduleThunderEffects() {
      const scheduleNextThunder = () => {
        if (this.currentWeather !== 'thunder') return;
        
        // Intervalle entre les éclairs (entre 3 et 10 secondes)
        const nextThunderDelay = 3000 + Math.random() * 7000;
        
        setTimeout(() => {
          if (this.currentWeather !== 'thunder') return;
          
          this.createThunderFlash();
          
          // Jouer le son du tonnerre
          if (typeof window.playSound === 'function') {
            window.playSound('thunder');
          }
          
          // Programmer le prochain éclair
          scheduleNextThunder();
        }, nextThunderDelay);
      };
      
      // Démarrer la séquence
      scheduleNextThunder();
    }
    
    /**
     * Crée un flash de foudre
     */
    createThunderFlash() {
      const flash = document.createElement('div');
      flash.className = 'thunder-flash';
      this.weatherContainer.appendChild(flash);
      
      // Animation de flash
      setTimeout(() => {
        flash.style.opacity = '1';
        setTimeout(() => {
          flash.style.opacity = '0';
          setTimeout(() => {
            if (flash.parentNode === this.weatherContainer) {
              this.weatherContainer.removeChild(flash);
            }
          }, 100);
        }, 50);
      }, 10);
    }
    
    /**
     * Crée les effets de neige
     */
    createSnowEffects() {
      // Nombre de flocons de neige
      const snowCount = 150;
      
      for (let i = 0; i < snowCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'snow-flake';
        
        // Position et taille aléatoires
        const x = Math.random() * window.innerWidth;
        const size = 1 + Math.random() * 3;
        const delay = Math.random() * 10;
        const duration = 8 + Math.random() * 7; // Chute plus lente que la pluie
        
        flake.style.left = `${x}px`;
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        flake.style.opacity = `${0.5 + Math.random() * 0.5}`;
        flake.style.animation = `snowFall ${duration}s linear infinite`;
        flake.style.animationDelay = `${delay}s`;
        
        this.weatherContainer.appendChild(flake);
      }
    }
    
    /**
     * Crée les effets de tempête de sable
     */
    createSandstormEffects() {
      // Nombre de particules de sable
      const sandCount = 250;
      
      for (let i = 0; i < sandCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'sand-particle';
        
        // Position et taille aléatoires
        const x = -10 + Math.random() * 30; // Démarrer hors écran à gauche
        const y = Math.random() * window.innerHeight;
        const size = 1 + Math.random() * 2;
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 2; // Vitesse aléatoire, plus rapide que la neige
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = `${0.3 + Math.random() * 0.3}`;
        particle.style.animation = `sandDrift ${duration}s linear infinite`;
        particle.style.animationDelay = `${delay}s`;
        
        this.weatherContainer.appendChild(particle);
      }
    }
    
    /**
     * Ajoute les contrôles de la météo
     */
    addWeatherControls() {
      const controls = document.createElement('div');
      controls.className = 'minecraft-weather-controls';
      
      // En-tête des contrôles
      const header = document.createElement('div');
      header.className = 'weather-controls-header';
      
      const title = document.createElement('h3');
      title.className = 'weather-controls-title';
      title.textContent = 'Météo Minecraft';
      
      const toggle = document.createElement('button');
      toggle.className = 'weather-controls-toggle';
      toggle.innerHTML = '<i class="fas fa-times"></i>';
      toggle.title = 'Masquer';
      
      header.appendChild(title);
      header.appendChild(toggle);
      
      // Boutons pour chaque type de météo
      const buttons = document.createElement('div');
      buttons.className = 'weather-buttons';
      
      const weatherIcons = {
        clear: 'clear',
        rain: 'rain',
        thunder: 'thunder',
        snow: 'snow',
        sandstorm: 'sandstorm'
      };
      
      const weatherNames = {
        clear: 'Dégagé',
        rain: 'Pluie',
        thunder: 'Orage',
        snow: 'Neige',
        sandstorm: 'Tempête de sable'
      };
      
      this.weatherTypes.forEach(type => {
        const button = document.createElement('button');
        button.className = `weather-button ${type === this.currentWeather ? 'active' : ''}`;
        button.dataset.weather = type;
        
        const icon = document.createElement('span');
        icon.className = `weather-icon weather-icon-${weatherIcons[type]}`;
        
        const label = document.createElement('span');
        label.textContent = weatherNames[type];
        
        button.appendChild(icon);
        button.appendChild(label);
        
        button.addEventListener('click', () => {
          this.setWeather(type);
          this.weatherDuration = 60; // 1 minute
          this.updateWeatherControls();
          
          // Jouer un son
          if (typeof window.playSound === 'function') {
            window.playSound('click');
          }
        });
        
        buttons.appendChild(button);
      });
      
      // Statut de la météo
      const status = document.createElement('div');
      status.className = 'weather-status';
      status.id = 'weather-status';
      status.textContent = 'Temps: Dégagé';
      
      // Assemblage des éléments
      controls.appendChild(header);
      controls.appendChild(buttons);
      controls.appendChild(status);
      
      // Ajout au DOM
      document.body.appendChild(controls);
      
      // Ajouter une référence
      this.weatherControls = controls;
      
      // Écouteurs d'événements
      toggle.addEventListener('click', () => {
        controls.classList.remove('show');
      });
      
      // Bouton pour ouvrir les contrôles
      const toggleButton = document.createElement('button');
      toggleButton.className = 'weather-controls-toggle show-weather-controls';
      toggleButton.innerHTML = '<i class="fas fa-cloud"></i>';
      toggleButton.title = 'Contrôles météo';
      toggleButton.style.position = 'fixed';
      toggleButton.style.top = '20px';
      toggleButton.style.right = '20px';
      toggleButton.style.background = 'rgba(20, 21, 25, 0.7)';
      toggleButton.style.border = '2px solid #3C8527';
      toggleButton.style.borderRadius = '5px';
      toggleButton.style.color = 'white';
      toggleButton.style.padding = '8px';
      toggleButton.style.cursor = 'pointer';
      toggleButton.style.zIndex = '1000';
      toggleButton.style.opacity = '0';
      toggleButton.style.transition = 'opacity 0.3s';
      
      document.body.appendChild(toggleButton);
      
      // Afficher après un délai
      setTimeout(() => {
        toggleButton.style.opacity = '1';
      }, 2000);
      
      toggleButton.addEventListener('click', () => {
        controls.classList.add('show');
        toggleButton.style.opacity = '0';
        
        setTimeout(() => {
          toggleButton.style.display = 'none';
        }, 300);
        
        // Jouer un son
        if (typeof window.playSound === 'function') {
          window.playSound('click');
        }
      });
    }
    
    /**
     * Met à jour l'apparence des boutons de contrôle météo
     */
    updateWeatherControls() {
      if (!this.weatherControls) return;
      
      // Mise à jour des boutons
      const buttons = this.weatherControls.querySelectorAll('.weather-button');
      buttons.forEach(button => {
        const weatherType = button.dataset.weather;
        if (weatherType === this.currentWeather) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }
    
    /**
     * Met à jour le statut de la météo
     */
    updateWeatherStatus() {
      const status = document.getElementById('weather-status');
      if (!status) return;
      
      const weatherNames = {
        clear: 'Dégagé',
        rain: 'Pluie',
        thunder: 'Orage',
        snow: 'Neige',
        sandstorm: 'Tempête de sable'
      };
      
      const name = weatherNames[this.currentWeather] || this.currentWeather;
      status.textContent = `Temps: ${name} (${this.weatherDuration}s)`;
    }
    
    /**
     * Configure les écouteurs d'événements pour détecter les codes de changement de météo
     */
    setupEventListeners() {
      const weatherCodes = {
        'RAIN': 'rain',
        'THUNDER': 'thunder',
        'SUN': 'clear',
        'SNOW': 'snow',
        'SAND': 'sandstorm'
      };
      
      let keySequence = [];
      
      document.addEventListener('keydown', (e) => {
        // Ne pas traiter les touches dans les champs de texte
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        keySequence.push(e.key.toUpperCase());
        if (keySequence.length > 10) keySequence.shift();
        
        Object.keys(weatherCodes).forEach(code => {
          if (keySequence.join('').includes(code)) {
            this.setWeather(weatherCodes[code]);
            this.weatherDuration = 60; // 1 minute
            this.updateWeatherControls();
            keySequence = [];
          }
        });
      });
    }
    
    /**
     * Active ou désactive le système météo
     */
    toggleWeatherSystem(enable) {
      this.isEnabled = enable;
      
      if (!enable) {
        // Mettre le temps au clair si désactivé
        this.setWeather('clear');
      }
    }
  }
  
  // Initialisation du système météo
  document.addEventListener('DOMContentLoaded', function() {
    // Attendre un peu avant d'initialiser pour ne pas interférer avec le chargement initial
    setTimeout(() => {
      window.minecraftWeather = new MinecraftWeather();
    }, 2000);
  });