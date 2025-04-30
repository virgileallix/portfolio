/**
 * Minecraft Day/Night Cycle
 * Système de cycle jour/nuit style Minecraft pour le site web
 */

class MinecraftDayNightCycle {
    constructor() {
      this.time = 6000; // Commence à 6h du matin (6000 ticks)
      this.fullDayLength = 24000; // Durée d'un jour complet en ticks (20 minutes réels)
      this.tickSpeed = 20; // Vitesse d'écoulement du temps (ticks par seconde)
      this.isRunning = true;
      this.isPaused = false;
      this.timeMultiplier = 1; // Facteur multiplicateur de vitesse du temps
      
      // Les différentes périodes de la journée
      this.timePeriods = {
        sunrise: { start: 23000, end: 1000, name: 'Lever du soleil' },
        day: { start: 1000, end: 11000, name: 'Jour' },
        sunset: { start: 11000, end: 13000, name: 'Coucher du soleil' },
        night: { start: 13000, end: 23000, name: 'Nuit' }
      };
      
      // Couleurs du ciel et intensité de la lumière pour chaque période
      this.skyColors = {
        sunrise: { 
          skyColor: 'linear-gradient(to bottom, #ff7e50, #ffdd99, #87ceeb)', 
          lightIntensity: 0.8,
          fogIntensity: 0.1
        },
        day: { 
          skyColor: 'linear-gradient(to bottom, #73c2fb, #87ceeb, #b0e2ff)', 
          lightIntensity: 1.0,
          fogIntensity: 0.0
        },
        sunset: { 
          skyColor: 'linear-gradient(to bottom, #ff5e50, #ff8d70, #ffb347)', 
          lightIntensity: 0.7,
          fogIntensity: 0.2
        },
        night: { 
          skyColor: 'linear-gradient(to bottom, #0a1a2a, #1a2a3a, #2a3a4a)', 
          lightIntensity: 0.2,
          fogIntensity: 0.5
        }
      };
      
      // Créer l'overlay pour le jour/nuit
      this.createDayNightOverlay();
      
      // Créer les étoiles et la lune pour la nuit
      this.createCelestialObjects();
      
      // Ajouter les styles CSS
      this.addDayNightStyles();
      
      // Initialiser l'horloge
      this.startClock();
      
      // Ajouter les contrôles
      this.addDayNightControls();
      
      // Mettre à jour le cycle initial
      this.updateDayNightCycle();
    }
    
    /**
     * Ajoute les styles CSS nécessaires
     */
    addDayNightStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .minecraft-daynight-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 998;
          transition: background 2s ease, opacity 2s ease;
        }
        
        .minecraft-light-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          pointer-events: none;
          z-index: 998;
          opacity: 0;
          transition: opacity 2s ease;
        }
        
        .minecraft-fog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(40, 50, 65, 0.4);
          pointer-events: none;
          z-index: 998;
          opacity: 0;
          transition: opacity 2s ease;
          backdrop-filter: blur(2px);
        }
        
        .minecraft-stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 997;
          opacity: 0;
          transition: opacity 2s ease;
        }
        
        .minecraft-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
        }
        
        .minecraft-moon {
          position: fixed;
          width: 60px;
          height: 60px;
          background-color: rgba(230, 230, 210, 0.9);
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(230, 230, 210, 0.5);
          pointer-events: none;
          z-index: 997;
          opacity: 0;
          transition: opacity 2s ease, transform 30s linear;
        }
        
        .minecraft-sun {
          position: fixed;
          width: 80px;
          height: 80px;
          background-color: rgba(255, 200, 50, 0.9);
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(255, 200, 50, 0.7);
          pointer-events: none;
          z-index: 997;
          opacity: 0;
          transition: opacity 2s ease, transform 30s linear;
        }
        
        /* Horloge */
        .minecraft-clock {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(20, 21, 25, 0.7);
          border: 2px solid #3C8527;
          border-radius: 5px;
          padding: 5px 10px;
          color: white;
          font-family: 'Minecraft', sans-serif;
          font-size: 14px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.5s ease;
          backdrop-filter: blur(5px);
        }
        
        .minecraft-clock.show {
          opacity: 1;
        }
        
        .minecraft-clock-icon {
          width: 16px;
          height: 16px;
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAk0UIopJAAAAOdJREFUOMutkj0OgkAQhb8V0Gh0Y7yAnAODXsHGUHkH7yAFB6DwMJZWFMYKqusP4RkTNmgM+JJNZifz3sy8hTXIMs8LBAEMBtBuL+cPB3g8YD6HJIFhHDSc8zzPEZmDMgVrIxIEaJ9jjCXoZtD5hk4HdBRVdotcEkHNBv1KWyGfKXLXVj+DTBVpCdptUCZMhWjRLPBC0fBPfO9ayrdXcLAKbTDuTlWy1qXBbwYELq4Mf1TEyZRVBpoLXk/qHHk/dI+wrTt0Q/hNWtdTLKXLQa5yOT7lqnzKJcvq6ljnq3yVq14hCBT4tZj8A+j5QKFGdpE/AAAAAElFTkSuQmCC') no-repeat center center;
          background-size: contain;
        }
        
        .minecraft-clock-time {
          margin-right: 5px;
        }
        
        .minecraft-clock-period {
          font-size: 12px;
          opacity: 0.8;
        }
        
        /* Contrôles du temps */
        .minecraft-time-controls {
          position: fixed;
          top: 20px;
          left: 20px;
          background: rgba(20, 21, 25, 0.7);
          border: 2px solid #3C8527;
          border-radius: 5px;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 1000;
          font-family: 'Minecraft', sans-serif;
          transform: translateX(-150px);
          opacity: 0;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }
        
        .minecraft-time-controls.show {
          transform: translateX(0);
          opacity: 1;
        }
        
        .time-controls-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        
        .time-controls-title {
          color: white;
          font-size: 14px;
          margin: 0;
        }
        
        .time-controls-toggle {
          background: none;
          border: none;
          color: white;
          font-size: 14px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
          padding: 0;
        }
        
        .time-controls-toggle:hover {
          opacity: 1;
        }
        
        .time-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        
        .time-button {
          background-color: rgba(60, 70, 80, 0.7);
          border: 1px solid #555;
          color: white;
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .time-button:hover {
          background-color: rgba(80, 90, 100, 0.9);
          transform: translateY(-2px);
        }
        
        .time-button.active {
          background-color: rgba(82, 165, 53, 0.7);
          border-color: #3C8527;
        }
        
        .time-speed-controls {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .time-speed-label {
          color: white;
          font-size: 12px;
        }
        
        .time-speed-button {
          background: none;
          border: none;
          color: white;
          font-size: 14px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
          padding: 3px;
        }
        
        .time-speed-button:hover {
          opacity: 1;
        }
        
        .time-speed-value {
          color: white;
          font-size: 12px;
          min-width: 30px;
          text-align: center;
        }
        
        .time-pause-button {
          background-color: rgba(80, 80, 80, 0.7);
          border: 1px solid #555;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .time-pause-button:hover {
          background-color: rgba(100, 100, 100, 0.9);
        }
        
        .time-pause-button.paused {
          background-color: rgba(82, 165, 53, 0.7);
          border-color: #3C8527;
        }
      `;
      document.head.appendChild(style);
    }
    
    /**
     * Crée l'overlay pour le cycle jour/nuit
     */
    createDayNightOverlay() {
      // Overlay du ciel
      const overlay = document.createElement('div');
      overlay.className = 'minecraft-daynight-overlay';
      document.body.appendChild(overlay);
      this.skyOverlay = overlay;
      
      // Overlay pour la lumière (nuit)
      const lightOverlay = document.createElement('div');
      lightOverlay.className = 'minecraft-light-overlay';
      document.body.appendChild(lightOverlay);
      this.lightOverlay = lightOverlay;
      
      // Overlay pour le brouillard
      const fogOverlay = document.createElement('div');
      fogOverlay.className = 'minecraft-fog-overlay';
      document.body.appendChild(fogOverlay);
      this.fogOverlay = fogOverlay;
    }
    
    /**
     * Crée les étoiles et la lune pour la nuit
     */
    createCelestialObjects() {
      // Conteneur d'étoiles
      const starsContainer = document.createElement('div');
      starsContainer.className = 'minecraft-stars';
      document.body.appendChild(starsContainer);
      this.starsContainer = starsContainer;
      
      // Ajouter des étoiles
      const starCount = 100;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'minecraft-star';
        
        // Position aléatoire
        const x = Math.random() * 100;
        const y = Math.random() * 60; // Seulement dans le haut du ciel
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // Taille aléatoire
        const size = 1 + Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Luminosité aléatoire
        const brightness = 0.5 + Math.random() * 0.5;
        star.style.opacity = brightness.toString();
        
        // Animation de scintillement
        const animationDuration = 2 + Math.random() * 3;
        star.style.animation = `starTwinkle ${animationDuration}s infinite alternate`;
        
        starsContainer.appendChild(star);
      }
      
      // Lune
      const moon = document.createElement('div');
      moon.className = 'minecraft-moon';
      document.body.appendChild(moon);
      this.moon = moon;
      
      // Soleil
      const sun = document.createElement('div');
      sun.className = 'minecraft-sun';
      document.body.appendChild(sun);
      this.sun = sun;
      
      // Ajouter des cratères à la lune
      for (let i = 0; i < 5; i++) {
        const crater = document.createElement('div');
        crater.style.position = 'absolute';
        crater.style.width = `${4 + Math.random() * 8}px`;
        crater.style.height = `${4 + Math.random() * 8}px`;
        crater.style.backgroundColor = 'rgba(200, 200, 180, 0.8)';
        crater.style.borderRadius = '50%';
        crater.style.left = `${20 + Math.random() * 30}px`;
        crater.style.top = `${20 + Math.random() * 30}px`;
        moon.appendChild(crater);
      }
      
      // Positionner la lune et le soleil hors de l'écran initialement
      this.updateCelestialPositions();
    }
    
    /**
     * Démarre l'horloge du jeu
     */
    startClock() {
      // Créer l'horloge
      const clock = document.createElement('div');
      clock.className = 'minecraft-clock';
      
      const clockIcon = document.createElement('div');
      clockIcon.className = 'minecraft-clock-icon';
      
      const clockTime = document.createElement('div');
      clockTime.className = 'minecraft-clock-time';
      
      const clockPeriod = document.createElement('div');
      clockPeriod.className = 'minecraft-clock-period';
      
      clock.appendChild(clockIcon);
      clock.appendChild(clockTime);
      clock.appendChild(clockPeriod);
      
      document.body.appendChild(clock);
      this.clock = clock;
      this.clockTime = clockTime;
      this.clockPeriod = clockPeriod;
      
      // Afficher l'horloge après un délai
      setTimeout(() => {
        clock.classList.add('show');
      }, 2000);
      
      // Démarrer le tic-tac
      this.clockInterval = setInterval(() => {
        if (!this.isRunning || this.isPaused) return;
        
        // Avancer le temps
        this.time = (this.time + this.tickSpeed * this.timeMultiplier) % this.fullDayLength;
        
        // Mettre à jour le cycle jour/nuit et l'horloge
        this.updateDayNightCycle();
        this.updateClock();
      }, 1000);
    }
    
    /**
     * Met à jour l'affichage du cycle jour/nuit
     */
    updateDayNightCycle() {
      const currentPeriod = this.getCurrentPeriod();
      const skySettings = this.skyColors[currentPeriod];
      
      // Mise à jour de la couleur du ciel
      this.skyOverlay.style.background = skySettings.skyColor;
      
      // Mise à jour de l'intensité de la lumière (0 = jour clair, 1 = nuit noire)
      this.lightOverlay.style.opacity = (1 - skySettings.lightIntensity).toString();
      
      // Mise à jour du brouillard
      this.fogOverlay.style.opacity = skySettings.fogIntensity.toString();
      
      // Mise à jour des étoiles et de la lune
      if (currentPeriod === 'night' || currentPeriod === 'sunset' || currentPeriod === 'sunrise') {
        const nightProgress = this.getNightProgress();
        this.starsContainer.style.opacity = nightProgress.toString();
      } else {
        this.starsContainer.style.opacity = '0';
      }
      
      // Mettre à jour les positions de la lune et du soleil
      this.updateCelestialPositions();
      
      // Dispatcher un événement pour le système d'achievements
      window.dispatchEvent(new CustomEvent('minecraft-time-change', {
        detail: { 
          time: this.time,
          period: currentPeriod
        }
      }));
    }
    
    /**
     * Met à jour l'affichage de l'horloge
     */
    updateClock() {
      // Convertir le temps en heures et minutes (0-23:00)
      const totalHours = (this.time / 1000);
      const hours = Math.floor(totalHours);
      const minutes = Math.floor((totalHours - hours) * 60);
      
      // Formater l'heure
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      
      // Afficher l'heure
      this.clockTime.textContent = `${formattedHours}:${formattedMinutes}`;
      
      // Afficher la période
      const period = this.getCurrentPeriod();
      const periodNames = {
        sunrise: 'Aube',
        day: 'Jour',
        sunset: 'Crépuscule',
        night: 'Nuit'
      };
      
      this.clockPeriod.textContent = periodNames[period] || period;
    }
    
    /**
     * Met à jour les positions du soleil et de la lune
     */
    updateCelestialPositions() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Position basée sur le temps (0-24000)
      // Le soleil et la lune suivent un arc de cercle
      const timeProgress = this.time / this.fullDayLength; // 0-1 pour un cycle complet
      const angle = timeProgress * 2 * Math.PI - Math.PI / 2; // -π/2 à 3π/2
      
      // Calcul de la position du soleil
      const sunRadius = Math.min(windowWidth, windowHeight) * 0.8;
      const sunX = windowWidth / 2 + Math.cos(angle) * sunRadius;
      const sunY = windowHeight + Math.sin(angle) * sunRadius;
      
      // Calcul de la position de la lune (opposé au soleil)
      const moonRadius = Math.min(windowWidth, windowHeight) * 0.7;
      const moonX = windowWidth / 2 + Math.cos(angle + Math.PI) * moonRadius;
      const moonY = windowHeight + Math.sin(angle + Math.PI) * moonRadius;
      
      // Mettre à jour les positions
      this.sun.style.left = `${sunX - 40}px`; // Centre l'élément (taille 80px)
      this.sun.style.top = `${sunY - 40}px`;
      
      this.moon.style.left = `${moonX - 30}px`; // Centre l'élément (taille 60px)
      this.moon.style.top = `${moonY - 30}px`;
      
      // Mettre à jour la visibilité
      const sunVisible = this.isSunVisible();
      const moonVisible = this.isMoonVisible();
      
      this.sun.style.opacity = sunVisible ? '1' : '0';
      this.moon.style.opacity = moonVisible ? '1' : '0';
    }
    
    /**
     * Obtient la période actuelle (jour, nuit, etc.)
     */
    getCurrentPeriod() {
      const time = this.time;
      
      if (time >= this.timePeriods.sunrise.start || time < this.timePeriods.sunrise.end) {
        return 'sunrise';
      } else if (time >= this.timePeriods.day.start && time < this.timePeriods.day.end) {
        return 'day';
      } else if (time >= this.timePeriods.sunset.start && time < this.timePeriods.sunset.end) {
        return 'sunset';
      } else {
        return 'night';
      }
    }
    
    /**
     * Calcule la progression de la nuit (0-1)
     */
    getNightProgress() {
      const time = this.time;
      const currentPeriod = this.getCurrentPeriod();
      
      if (currentPeriod === 'night') {
        // Pleine nuit
        return 1;
      } else if (currentPeriod === 'day') {
        // Plein jour
        return 0;
      } else if (currentPeriod === 'sunset') {
        // Transition jour -> nuit
        const start = this.timePeriods.sunset.start;
        const end = this.timePeriods.sunset.end;
        return (time - start) / (end - start);
      } else if (currentPeriod === 'sunrise') {
        // Transition nuit -> jour
        const start = this.timePeriods.sunrise.start;
        const end = this.timePeriods.sunrise.end;
        const fullCycle = this.fullDayLength;
        
        // Gestion du passage minuit (23000-1000)
        if (time >= start) {
          return 1 - (time - start) / (fullCycle - start + end);
        } else {
          return 1 - (time + fullCycle - start) / (fullCycle - start + end);
        }
      }
      
      return 0;
    }
    
    /**
     * Vérifie si le soleil est visible
     */
    isSunVisible() {
      const time = this.time;
      return (time >= 23000 || time < 13000);
    }
    
    /**
     * Vérifie si la lune est visible
     */
    isMoonVisible() {
      const time = this.time;
      return (time >= 13000 && time < 23000);
    }
    
    /**
     * Définit l'heure spécifique
     */
    setTime(newTime) {
      this.time = newTime % this.fullDayLength;
      this.updateDayNightCycle();
      this.updateClock();
    }
    
    /**
     * Ajoute les contrôles du temps
     */
    addDayNightControls() {
      const controls = document.createElement('div');
      controls.className = 'minecraft-time-controls';
      
      // En-tête des contrôles
      const header = document.createElement('div');
      header.className = 'time-controls-header';
      
      const title = document.createElement('h3');
      title.className = 'time-controls-title';
      title.textContent = 'Heure Minecraft';
      
      const toggle = document.createElement('button');
      toggle.className = 'time-controls-toggle';
      toggle.innerHTML = '<i class="fas fa-times"></i>';
      toggle.title = 'Masquer';
      
      header.appendChild(title);
      header.appendChild(toggle);
      
      // Boutons pour les périodes spécifiques
      const buttons = document.createElement('div');
      buttons.className = 'time-buttons';
      
      const timePresets = [
        { name: 'Matin', time: 1000, icon: 'fa-sun' },
        { name: 'Midi', time: 6000, icon: 'fa-sun' },
        { name: 'Coucher', time: 12000, icon: 'fa-sunset' },
        { name: 'Minuit', time: 18000, icon: 'fa-moon' }
      ];
      
      timePresets.forEach(preset => {
        const button = document.createElement('button');
        button.className = 'time-button';
        button.innerHTML = `<i class="fas ${preset.icon}"></i> ${preset.name}`;
        button.title = `Régler l'heure à ${preset.name}`;
        
        button.addEventListener('click', () => {
          this.setTime(preset.time);
          
          // Jouer un son
          if (typeof window.playSound === 'function') {
            window.playSound('click');
          }
        });
        
        buttons.appendChild(button);
      });
      
      // Contrôles de la vitesse
      const speedControls = document.createElement('div');
      speedControls.className = 'time-speed-controls';
      
      const speedLabel = document.createElement('div');
      speedLabel.className = 'time-speed-label';
      speedLabel.textContent = 'Vitesse:';
      
      const decreaseSpeed = document.createElement('button');
      decreaseSpeed.className = 'time-speed-button';
      decreaseSpeed.innerHTML = '<i class="fas fa-minus"></i>';
      decreaseSpeed.title = 'Ralentir';
      
      const speedValue = document.createElement('div');
      speedValue.className = 'time-speed-value';
      speedValue.textContent = `${this.timeMultiplier}x`;
      
      const increaseSpeed = document.createElement('button');
      increaseSpeed.className = 'time-speed-button';
      increaseSpeed.innerHTML = '<i class="fas fa-plus"></i>';
      increaseSpeed.title = 'Accélérer';
      
      // Bouton pause
      const pauseButton = document.createElement('button');
      pauseButton.className = 'time-pause-button';
      pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
      pauseButton.title = 'Mettre en pause';
      
      speedControls.appendChild(speedLabel);
      speedControls.appendChild(decreaseSpeed);
      speedControls.appendChild(speedValue);
      speedControls.appendChild(increaseSpeed);
      speedControls.appendChild(pauseButton);
      
      // Assembler le tout
      controls.appendChild(header);
      controls.appendChild(buttons);
      controls.appendChild(speedControls);
      
      // Ajouter au DOM
      document.body.appendChild(controls);
      
      // Conserver des références
      this.timeControls = controls;
      this.speedValue = speedValue;
      
      // Écouteurs d'événements
      toggle.addEventListener('click', () => {
        controls.classList.remove('show');
      });
      
      decreaseSpeed.addEventListener('click', () => {
        this.timeMultiplier = Math.max(0.5, this.timeMultiplier - 0.5);
        speedValue.textContent = `${this.timeMultiplier}x`;
        
        // Jouer un son
        if (typeof window.playSound === 'function') {
          window.playSound('click');
        }
      });
      
      increaseSpeed.addEventListener('click', () => {
        this.timeMultiplier = Math.min(10, this.timeMultiplier + 0.5);
        speedValue.textContent = `${this.timeMultiplier}x`;
        
        // Jouer un son
        if (typeof window.playSound === 'function') {
          window.playSound('click');
        }
      });
      
      pauseButton.addEventListener('click', () => {
        this.isPaused = !this.isPaused;
        pauseButton.innerHTML = this.isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
        pauseButton.title = this.isPaused ? 'Reprendre' : 'Mettre en pause';
        pauseButton.classList.toggle('paused', this.isPaused);
        
        // Jouer un son
        if (typeof window.playSound === 'function') {
          window.playSound('click');
        }
      });
      
      // Bouton pour afficher les contrôles
      const showButton = document.createElement('button');
      showButton.className = 'time-controls-toggle show-time-controls';
      showButton.innerHTML = '<i class="fas fa-clock"></i>';
      showButton.title = 'Contrôles du temps';
      showButton.style.position = 'fixed';
      showButton.style.top = '20px';
      showButton.style.left = '20px';
      showButton.style.background = 'rgba(20, 21, 25, 0.7)';
      showButton.style.border = '2px solid #3C8527';
      showButton.style.borderRadius = '5px';
      showButton.style.color = 'white';
      showButton.style.padding = '8px';
      showButton.style.zIndex = '1000';
      showButton.style.cursor = 'pointer';
      showButton.style.opacity = '0';
      showButton.style.transition = 'opacity 0.3s ease';
      
      document.body.appendChild(showButton);
      
      // Afficher le bouton après un délai
      setTimeout(() => {
        showButton.style.opacity = '1';
      }, 2500);
      
      showButton.addEventListener('click', () => {
        controls.classList.add('show');
        showButton.style.opacity = '0';
        
        setTimeout(() => {
          showButton.style.display = 'none';
        }, 300);
        
        // Jouer un son
        if (typeof window.playSound === 'function') {
          window.playSound('click');
        }
      });
    }
    
    /**
     * Active ou désactive le cycle jour/nuit
     */
    toggleDayNightCycle(enable) {
      this.isRunning = enable;
      
      if (!enable) {
        // Réinitialiser au jour
        this.setTime(6000);
      }
    }
  }
  
  // Initialisation du cycle jour/nuit
  document.addEventListener('DOMContentLoaded', function() {
    // Attendre un peu avant d'initialiser pour ne pas interférer avec le chargement initial
    setTimeout(() => {
      window.minecraftDayNight = new MinecraftDayNightCycle();
    }, 2500);
  });