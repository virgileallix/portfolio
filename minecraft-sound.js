/**
 * Minecraft Sound System
 * Système de sons style Minecraft pour le site web
 */

class MinecraftSoundSystem {
    constructor() {
      this.sounds = {
        // Sons basiques
        click: { type: 'square', frequency: 150, gain: 0.15, duration: 0.1 },
        place: { type: 'square', frequency: 220, gain: 0.2, duration: 0.2 },
        dig: { type: 'sine', frequency: 150, gain: 0.3, duration: 0.3, slide: { to: 100, time: 0.1 } },
        
        // Sons plus complexes
        achievement: {
          parts: [
            { type: 'triangle', frequency: 600, gain: 0.2, duration: 0.3, slide: { to: 900, time: 0.1 } },
            { type: 'triangle', frequency: 800, gain: 0.2, duration: 0.3, slide: { to: 1200, time: 0.1 }, delay: 0.15 }
          ]
        },
        
        // Son pour manger
        eat: {
          parts: [
            { type: 'sawtooth', frequency: 130, gain: 0.3, duration: 0.3 }
          ]
        },
        
        // Sons pour le diamant
        diamond: { type: 'triangle', frequency: 600, gain: 0.2, duration: 0.3, slide: { to: 900, time: 0.1 } },
        
        // Sons pour le creeper et explosion
        creeper: { type: 'sawtooth', frequency: 180, gain: 0.15, duration: 0.6, slide: { to: 100, time: 0.5 } },
        explosion: { type: 'noise', gain: 0.5, duration: 0.5 },
        
        // Sons pour la météo
        rain: { type: 'noise', gain: 0.1, filter: { type: 'lowpass', frequency: 500 }, duration: 1.0, loop: true },
        thunder: { type: 'noise', gain: 0.4, filter: { type: 'lowpass', frequency: 120 }, duration: 1.5 },
        
        // Sons pour le défilement et les mouvements
        step: { type: 'noise', gain: 0.05, filter: { type: 'highpass', frequency: 800 }, duration: 0.1 },
        splash: { type: 'noise', gain: 0.2, filter: { type: 'bandpass', frequency: 300 }, duration: 0.3 },
        
        // Sons pour les notifications
        notification: { type: 'sine', frequency: 800, gain: 0.15, duration: 0.2, slide: { to: 1000, time: 0.1 } },
        error: { type: 'square', frequency: 200, gain: 0.15, duration: 0.3, slide: { to: 150, time: 0.2 } },
        success: {
          parts: [
            { type: 'sine', frequency: 700, gain: 0.15, duration: 0.1 },
            { type: 'sine', frequency: 900, gain: 0.15, duration: 0.15, delay: 0.1 }
          ]
        }
      };
      
      this.activeLoops = {};
      this.audioContext = null;
      this.volume = this.loadVolume();
      this.muted = this.loadMutedState();
      
      // Création des contrôles du son
      this.createSoundControls();
    }
    
    /**
     * Initialise le contexte audio (doit être appelé après une interaction utilisateur)
     */
    initAudioContext() {
      if (!this.audioContext) {
        try {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
          console.error('Web Audio API n\'est pas supportée par ce navigateur.', e);
        }
      }
      return this.audioContext;
    }
    
    /**
     * Joue un son défini
     * @param {string} type - Type de son à jouer
     */
    playSound(type) {
      // Vérifier si le son est coupé globalement
      if (this.muted) return;
      
      // Initialiser le contexte audio si nécessaire
      const audioContext = this.initAudioContext();
      if (!audioContext) return;
      
      // Récupérer la définition du son
      const sound = this.sounds[type];
      if (!sound) {
        console.warn(`Son "${type}" non défini.`);
        return;
      }
      
      // Si le son a plusieurs parties
      if (sound.parts) {
        sound.parts.forEach(part => {
          setTimeout(() => {
            this.playSingleSound(part, type);
          }, (part.delay || 0) * 1000);
        });
      } else {
        // Son simple
        this.playSingleSound(sound, type);
      }
      
      // Visuel de l'onde sonore (optionnel)
      this.showSoundWave();
    }
    
    /**
     * Joue un son individuel
     * @param {Object} sound - Définition du son
     * @param {string} type - Type de son (pour les sons en boucle)
     */
    playSingleSound(sound, type) {
      const audioContext = this.audioContext;
      
      // Créer un GainNode (pour le volume)
      const gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
      gainNode.gain.setValueAtTime(sound.gain * this.volume, audioContext.currentTime);
      
      // Créer la source sonore
      if (sound.type === 'noise') {
        // Bruit blanc
        const noiseBuffer = this.createNoiseBuffer(audioContext);
        const noiseSource = audioContext.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        
        // Filtrer le bruit si nécessaire
        if (sound.filter) {
          const filter = audioContext.createBiquadFilter();
          filter.type = sound.filter.type;
          filter.frequency.value = sound.filter.frequency;
          noiseSource.connect(filter);
          filter.connect(gainNode);
        } else {
          noiseSource.connect(gainNode);
        }
        
        // Démarrer et programmer l'arrêt
        noiseSource.start();
        
        // Si son en boucle
        if (sound.loop) {
          // Stocker la référence pour pouvoir l'arrêter plus tard
          this.activeLoops[type] = {
            source: noiseSource,
            gain: gainNode
          };
        } else {
          // Fade out 
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
          noiseSource.stop(audioContext.currentTime + sound.duration);
        }
      } else {
        // Oscillateur
        const oscillator = audioContext.createOscillator();
        oscillator.type = sound.type;
        oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
        oscillator.connect(gainNode);
        
        // Glissement de fréquence
        if (sound.slide) {
          oscillator.frequency.exponentialRampToValueAtTime(
            sound.slide.to, 
            audioContext.currentTime + sound.slide.time
          );
        }
        
        // Démarrer et programmer l'arrêt
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
        oscillator.stop(audioContext.currentTime + sound.duration);
      }
    }
    
    /**
     * Arrête un son en boucle
     * @param {string} type - Type de son à arrêter
     */
    stopSound(type) {
      if (this.activeLoops[type]) {
        const loop = this.activeLoops[type];
        
        // Fade out progressif
        const now = this.audioContext.currentTime;
        loop.gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        
        // Arrêter après le fade out
        setTimeout(() => {
          if (loop.source.stop) {
            loop.source.stop();
          }
          delete this.activeLoops[type];
        }, 500);
      }
    }
    
    /**
     * Arrête tous les sons en boucle
     */
    stopAllSounds() {
      Object.keys(this.activeLoops).forEach(type => {
        this.stopSound(type);
      });
    }
    
    /**
     * Crée un buffer de bruit blanc
     */
    createNoiseBuffer(audioContext) {
      const bufferSize = audioContext.sampleRate * 2; // 2 secondes de bruit
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      return buffer;
    }
    
    /**
     * Affiche une animation d'onde sonore
     */
    showSoundWave() {
      // Supprimer toute onde sonore existante
      const existingWave = document.querySelector('.sound-wave');
      if (existingWave) {
        existingWave.remove();
      }
      
      // Créer l'élément d'onde sonore
      const wave = document.createElement('div');
      wave.className = 'sound-wave';
      
      // Ajouter plusieurs barres pour l'animation
      for (let i = 0; i < 5; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-bar';
        bar.style.animationDelay = `${i * 0.1}s`;
        wave.appendChild(bar);
      }
      
      // Placer l'onde près du coin inférieur droit
      wave.style.position = 'fixed';
      wave.style.bottom = '100px';
      wave.style.right = '20px';
      wave.style.zIndex = '1000';
      
      // Ajouter au DOM
      document.body.appendChild(wave);
      
      // Supprimer après animation
      setTimeout(() => {
        if (wave.parentNode) {
          wave.remove();
        }
      }, 1000);
    }
    
    /**
     * Crée les contrôles de son
     */
    createSoundControls() {
      // Vérifier si la barre sonore existe déjà
      if (document.querySelector('.minecraft-sound-controls')) return;
      
      // Style CSS
      const style = document.createElement('style');
      style.textContent = `
        .minecraft-sound-controls {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(20, 21, 25, 0.7);
          border: 2px solid #3C8527;
          border-radius: 5px;
          padding: 5px 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1000;
          backdrop-filter: blur(5px);
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
          transform: translateX(-50%) translateY(10px);
        }
        
        .minecraft-sound-controls.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        
        .sound-controls-button {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transition: all 0.2s;
        }
        
        .sound-controls-button:hover {
          opacity: 1;
          transform: scale(1.1);
        }
        
        .sound-controls-button.active {
          color: #52A535;
          opacity: 1;
        }
        
        .sound-volume-slider {
          width: 80px;
          height: 5px;
          -webkit-appearance: none;
          appearance: none;
          background: #444;
          outline: none;
          border-radius: 3px;
          transition: all 0.2s;
        }
        
        .sound-volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .sound-volume-slider::-webkit-slider-thumb:hover {
          background: #52A535;
          transform: scale(1.2);
        }
        
        .sound-controls-button.muted {
          color: #ff5252;
        }
        
        .sound-wave {
          display: flex;
          align-items: center;
          gap: 2px;
          height: 20px;
        }
        
        .wave-bar {
          width: 3px;
          height: 5px;
          background-color: #52A535;
          border-radius: 2px;
          animation: soundWave 0.5s ease-in-out infinite alternate;
        }
        
        @keyframes soundWave {
          0% { height: 5px; }
          100% { height: 15px; }
        }
      `;
      document.head.appendChild(style);
      
      // Créer la barre de contrôles
      const controls = document.createElement('div');
      controls.className = 'minecraft-sound-controls';
      
      // Bouton mute
      const muteBtn = document.createElement('button');
      muteBtn.className = `sound-controls-button ${this.muted ? 'muted' : ''}`;
      muteBtn.innerHTML = this.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
      muteBtn.title = this.muted ? 'Activer le son' : 'Couper le son';
      
      // Slider de volume
      const volumeSlider = document.createElement('input');
      volumeSlider.type = 'range';
      volumeSlider.min = '0';
      volumeSlider.max = '1';
      volumeSlider.step = '0.1';
      volumeSlider.value = this.volume.toString();
      volumeSlider.className = 'sound-volume-slider';
      volumeSlider.title = 'Volume';
      
      // Ajouter les éléments
      controls.appendChild(muteBtn);
      controls.appendChild(volumeSlider);
      
      // Ajouter au DOM
      document.body.appendChild(controls);
      
      // Montrer les contrôles après un délai
      setTimeout(() => {
        controls.classList.add('show');
      }, 1000);
      
      // Cacher les contrôles après un certain temps d'inactivité
      let hideTimeout;
      const resetHideTimeout = () => {
        clearTimeout(hideTimeout);
        controls.classList.add('show');
        hideTimeout = setTimeout(() => {
          controls.classList.remove('show');
        }, 5000);
      };
      
      resetHideTimeout();
      controls.addEventListener('mouseenter', resetHideTimeout);
      
      // Gérer les événements
      muteBtn.addEventListener('click', () => {
        this.muted = !this.muted;
        muteBtn.innerHTML = this.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        muteBtn.classList.toggle('muted', this.muted);
        
        if (this.muted) {
          this.stopAllSounds();
        }
        
        // Jouer un son de clic si on active le son
        if (!this.muted) {
          this.playSound('click');
        }
        
        // Sauvegarder l'état
        this.saveMutedState();
        resetHideTimeout();
      });
      
      volumeSlider.addEventListener('input', () => {
        this.volume = parseFloat(volumeSlider.value);
        
        // Si le volume est à 0, mettre en sourdine
        if (this.volume === 0) {
          this.muted = true;
          muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
          muteBtn.classList.add('muted');
        } else if (this.muted) {
          // Si le son était coupé et qu'on augmente le volume, réactiver le son
          this.muted = false;
          muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
          muteBtn.classList.remove('muted');
        }
        
        // Jouer un son à chaque changement
        if (!this.muted) {
          this.playSound('click');
        }
        
        // Sauvegarder les paramètres
        this.saveVolume();
        this.saveMutedState();
        resetHideTimeout();
      });
    }
    
    /**
     * Charge le niveau de volume depuis le localStorage
     */
    loadVolume() {
      const savedVolume = localStorage.getItem('minecraft-sound-volume');
      return savedVolume ? parseFloat(savedVolume) : 0.5; // 0.5 par défaut
    }
    
    /**
     * Sauvegarde le niveau de volume dans le localStorage
     */
    saveVolume() {
      localStorage.setItem('minecraft-sound-volume', this.volume.toString());
    }
    
    /**
     * Charge l'état muet depuis le localStorage
     */
    loadMutedState() {
      const savedState = localStorage.getItem('minecraft-sound-muted');
      return savedState === 'true';
    }
    
    /**
     * Sauvegarde l'état muet dans le localStorage
     */
    saveMutedState() {
      localStorage.setItem('minecraft-sound-muted', this.muted.toString());
    }
    
    /**
     * Désactive le système sonore
     */
    disable() {
      this.muted = true;
      this.saveMutedState();
      this.stopAllSounds();
      
      // Mettre à jour l'interface
      const muteBtn = document.querySelector('.sound-controls-button');
      if (muteBtn) {
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        muteBtn.classList.add('muted');
      }
    }
    
    /**
     * Réactive le système sonore
     */
    enable() {
      this.muted = false;
      this.saveMutedState();
      
      // Mettre à jour l'interface
      const muteBtn = document.querySelector('.sound-controls-button');
      if (muteBtn) {
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        muteBtn.classList.remove('muted');
      }
      
      // Jouer un son
      this.playSound('success');
    }
  }
  
  // Initialiser le système sonore
  document.addEventListener('DOMContentLoaded', function() {
    window.minecraftSoundSystem = new MinecraftSoundSystem();
    
    // Initialiser le contexte audio après une interaction utilisateur
    document.addEventListener('click', function initAudio() {
      if (window.minecraftSoundSystem) {
        window.minecraftSoundSystem.initAudioContext();
        document.removeEventListener('click', initAudio);
      }
    });
    
    // Exposer une fonction globale pour jouer des sons
    window.playSound = function(type) {
      if (window.minecraftSoundSystem) {
        window.minecraftSoundSystem.playSound(type);
      }
    };
  });