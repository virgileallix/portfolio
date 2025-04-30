// Minecraft 2D Builder Easter Egg
// Ce script permet d'ajouter un mini constructeur style Minecraft sur le portfolio

class MinecraftBuilder {
    constructor() {
      this.isActive = false;
      this.gridSize = { width: 20, height: 15 };
      this.blockSize = 30;
      this.selectedBlock = 'grass';
      this.grid = [];
      this.container = null;
      this.blockTypes = {
        empty: { color: 'transparent', texture: null },
        grass: { 
          color: '#52A535', 
          texture: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzhmOGY4ZiIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM1NTU1NTUiIGQ9Ik0wIDBoMnYzMkgwem0zMCAwaDJ2MzJoLTJ6TTAgMGgzMnYySDB6bTAgMzBoMzJ2MkgweiIvPjxwYXRoIGZpbGw9IiM2NzlFNjAiIGQ9Ik0yIDJoMjh2MTBIMnoiLz48cGF0aCBmaWxsPSIjOEM2MjNBIiBkPSJNMiAxMmgyOHYxOEgyeiIvPjwvc3ZnPg==\')'
        },
        dirt: { 
          color: '#8B5D3A', 
          texture: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzhjNjIzQSIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM3MzUwMzAiIGQ9Ik0wIDBoMnYzMkgwem0zMCAwaDJ2MzJoLTJ6TTAgMGgzMnYySDB6bTAgMzBoMzJ2MkgweiIvPjxwYXRoIGZpbGw9IiM5QjcxNDciIGQ9Ik0yIDJoMjh2MjhIMnoiLz48L3N2Zz4=\')'
        },
        stone: {
          color: '#7D7D7D',
          texture: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzdEN0Q3RCIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM1QTVBNUEiIGQ9Ik0wIDBoMnYzMkgwem0zMCAwaDJ2MzJoLTJ6TTAgMGgzMnYySDB6bTAgMzBoMzJ2MkgweiIvPjxwYXRoIGZpbGw9IiM5OTk5OTkiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48L3N2Zz4=\')'
        },
        wood: {
          color: '#A0753F',
          texture: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk5NzY0MyIgZD0iTTkgNGgxNHYyNEg5eiIvPjxwYXRoIGZpbGw9IiM3NzVCMzUiIGQ9Ik05IDRoMnYyNEg5em0xMiAwaDF2MjRoLTF6TTkgNGgxNHYxSDl6bTAgMjNoMTR2MUg5eiIvPjxwYXRoIGZpbGw9IiNBRDg5NEYiIGQ9Ik0xMSA1aDEwdjIySDExeiIvPjwvc3ZnPg==\')'
        },
        leaves: {
          color: '#3E5D29',
          texture: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzNFNUQyOSIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiMzMDQ5MUYiIGQ9Ik0wIDBoMnYzMkgwem0zMCAwaDJ2MzJoLTJ6TTAgMGgzMnYySDB6bTAgMzBoMzJ2MkgweiIvPjxwYXRoIGZpbGw9IiM0NTY5MkUiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48L3N2Zz4=\')'
        },
        diamond: {
          color: '#5AC7C7',
          texture: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzVBQzdDNyIgZD0iTTIgMmgyOHYyOEgyeiIvPjxwYXRoIGZpbGw9IiMzQThBOEEiIGQ9Ik0yIDJoMnYyOEgyem0yNiAwaDF2MjhoLTF6TTIgMmgyOHYxSDJ6bTAgMjZoMjh2MUgyeiIvPjxwYXRoIGZpbGw9IiM4QkU3RTciIGQ9Ik00IDRoMjR2MjRINHoiLz48L3N2Zz4=\')'
        },
        obsidian: {
          color: '#150E1F',
          texture: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzE1MEUxRiIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiMwQTA2MTIiIGQ9Ik0wIDBoMnYzMkgwem0zMCAwaDJ2MzJoLTJ6TTAgMGgzMnYySDB6bTAgMzBoMzJ2MkgweiIvPjxwYXRoIGZpbGw9IiMyMzE0MkYiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48cGF0aCBmaWxsPSIjMUEwRTI0IiBkPSJNNCAxMmgyIDExLTIgMkgxMGg4djJINnY0aDJ2LTJoNHY0aC0ydjJoNnYtMmgydi0yaC0ydi0yaDR2NGgtMnYyaDZ2LTJoMnYtMmgtMnYtMmg0djItMnYtMmgtNnYyaC0ydi0yaC0ydjJoLTZ6Ii8+PC9zdmc+\')'
        },
        tnt: {
          color: '#D95B5B',
          texture: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0QzMjcxRiIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiNBMzFCMTUiIGQ9Ik0wIDBoMnYzMkgwem0zMCAwaDJ2MzJoLTJ6TTAgMGgzMnYySDB6bTAgMzBoMzJ2MkgweiIvPjxwYXRoIGZpbGw9IiNFMzNDMjUiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTIgMTJoOHY4aC04eiIvPjwvc3ZnPg==\')'
        }
      };
      
      this.keySequence = [];
      this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
      this.creativeCode = ['c', 'r', 'e', 'a', 't', 'e'];
      
      this.initializeEventListeners();
    }
    
    // Initialise les écouteurs d'événements
    initializeEventListeners() {
      document.addEventListener('keydown', (e) => this.handleKeyDown(e));
      
      // Utiliser un raccourci clavier alternatif pour mobile
      document.addEventListener('click', (e) => {
        if (e.target.matches('#minecraft-builder-toggle')) {
          this.toggleBuilder();
        }
      });
    }
    
    // Gère les événements de touches pour l'easter egg
    handleKeyDown(e) {
      // Stocke la dernière touche
      this.keySequence.push(e.key);
      
      // Garde uniquement les N dernières touches
      if (this.keySequence.length > Math.max(this.konamiCode.length, this.creativeCode.length)) {
        this.keySequence.shift();
      }
      
      // Vérifie si la séquence du Konami Code est présente
      const konamiMatches = this.checkSequence(this.konamiCode);
      
      // Vérifie si la séquence "creative" est présente
      const creativeMatches = this.checkSequence(this.creativeCode);
      
      if (konamiMatches || creativeMatches) {
        this.toggleBuilder();
        this.keySequence = []; // Réinitialiser la séquence
      }
      
      // Raccourci pour fermer le constructeur
      if (this.isActive && e.key === 'Escape') {
        this.toggleBuilder();
      }
    }
    
    // Vérifie si une séquence spécifique est présente dans la séquence de touches
    checkSequence(sequence) {
      if (this.keySequence.length < sequence.length) return false;
      
      // Vérifie les dernières touches
      const lastKeys = this.keySequence.slice(-sequence.length);
      return lastKeys.every((key, index) => key === sequence[index]);
    }
    
    // Affiche ou masque le constructeur
    toggleBuilder() {
      if (this.isActive) {
        this.hideBuilder();
      } else {
        this.showBuilder();
      }
    }
    
    // Crée et affiche le constructeur
    showBuilder() {
      this.playSound('achievement');
      
      // Crée le conteneur principal
      this.container = document.createElement('div');
      this.container.id = 'minecraft-builder-container';
      this.container.classList.add('minecraft-builder');
      
      // Crée les éléments de l'interface
      this.createHeader();
      this.createGrid();
      this.createPalette();
      
      // Ajoute le constructeur au DOM
      document.body.appendChild(this.container);
      
      // Initialise la grille
      this.initializeGrid();
      
      // Marque le constructeur comme actif
      this.isActive = true;
      
      // Affiche avec animation
      setTimeout(() => {
        this.container.classList.add('active');
      }, 10);
    }
    
    // Masque et détruit le constructeur
    hideBuilder() {
      if (!this.container) return;
      
      this.playSound('click');
      
      // Anime la fermeture
      this.container.classList.remove('active');
      
      // Supprime après l'animation
      setTimeout(() => {
        this.container.remove();
        this.container = null;
        this.isActive = false;
      }, 300);
    }
    
    // Crée l'en-tête du constructeur
    createHeader() {
      const header = document.createElement('div');
      header.className = 'mc-builder-header';
      
      const title = document.createElement('h2');
      title.className = 'mc-builder-title';
      title.textContent = 'Minecraft Builder';
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'mc-builder-close-btn';
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', () => this.toggleBuilder());
      
      const saveBtn = document.createElement('button');
      saveBtn.className = 'mc-builder-save-btn';
      saveBtn.textContent = 'Sauvegarder';
      saveBtn.addEventListener('click', () => this.saveCreation());
      
      const loadBtn = document.createElement('button');
      loadBtn.className = 'mc-builder-load-btn';
      loadBtn.textContent = 'Charger';
      loadBtn.addEventListener('click', () => this.loadCreation());
      
      const clearBtn = document.createElement('button');
      clearBtn.className = 'mc-builder-clear-btn';
      clearBtn.textContent = 'Effacer';
      clearBtn.addEventListener('click', () => this.clearGrid());
      
      header.appendChild(title);
      header.appendChild(saveBtn);
      header.appendChild(loadBtn);
      header.appendChild(clearBtn);
      header.appendChild(closeBtn);
      
      this.container.appendChild(header);
    }
    
    // Crée la grille de construction
    createGrid() {
      const gridContainer = document.createElement('div');
      gridContainer.className = 'mc-builder-grid';
      gridContainer.style.width = `${this.gridSize.width * this.blockSize}px`;
      gridContainer.style.height = `${this.gridSize.height * this.blockSize}px`;
      
      // Crée les cellules de la grille
      for (let y = 0; y < this.gridSize.height; y++) {
        for (let x = 0; x < this.gridSize.width; x++) {
          const cell = document.createElement('div');
          cell.className = 'mc-builder-cell';
          cell.dataset.x = x;
          cell.dataset.y = y;
          cell.style.width = `${this.blockSize}px`;
          cell.style.height = `${this.blockSize}px`;
          
          // Gestion des clics sur les cellules
          cell.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.handleCellClick(x, y, e.button);
          });
          
          // Gestion du survol pour dessiner en continu
          cell.addEventListener('mouseover', (e) => {
            if (e.buttons === 1) { // Clic gauche enfoncé
              this.handleCellClick(x, y, 0);
            } else if (e.buttons === 2) { // Clic droit enfoncé
              this.handleCellClick(x, y, 2);
            }
          });
          
          gridContainer.appendChild(cell);
        }
      }
      
      // Désactive le menu contextuel sur la grille
      gridContainer.addEventListener('contextmenu', (e) => e.preventDefault());
      
      this.container.appendChild(gridContainer);
    }
    
    // Crée la palette de blocs
    createPalette() {
      const palette = document.createElement('div');
      palette.className = 'mc-builder-palette';
      
      // Crée les boutons pour chaque type de bloc
      Object.entries(this.blockTypes).forEach(([type, properties]) => {
        if (type === 'empty') return; // Pas de bouton pour le bloc vide
        
        const blockBtn = document.createElement('div');
        blockBtn.className = 'mc-builder-palette-block';
        blockBtn.dataset.type = type;
        
        if (properties.texture) {
          blockBtn.style.backgroundImage = properties.texture;
        } else {
          blockBtn.style.backgroundColor = properties.color;
        }
        
        // Applique une classe active au bloc sélectionné
        if (type === this.selectedBlock) {
          blockBtn.classList.add('active');
        }
        
        // Sélectionne le bloc au clic
        blockBtn.addEventListener('click', () => {
          this.selectBlock(type);
          
          // Met à jour l'interface
          document.querySelectorAll('.mc-builder-palette-block').forEach(el => {
            el.classList.remove('active');
          });
          blockBtn.classList.add('active');
          
          this.playSound('click');
        });
        
        palette.appendChild(blockBtn);
      });
      
      this.container.appendChild(palette);
    }
    
    // Initialise la grille avec des blocs vides
    initializeGrid() {
      this.grid = [];
      
      for (let y = 0; y < this.gridSize.height; y++) {
        const row = [];
        for (let x = 0; x < this.gridSize.width; x++) {
          // Ajoute du terrain en bas de la grille
          if (y >= this.gridSize.height - 3) {
            if (y === this.gridSize.height - 3) {
              row.push('grass');
            } else {
              row.push('dirt');
            }
          } else {
            row.push('empty');
          }
        }
        this.grid.push(row);
      }
      
      this.renderGrid();
    }
    
    // Gère les clics sur les cellules
    handleCellClick(x, y, button) {
      if (button === 0) { // Clic gauche - place un bloc
        this.grid[y][x] = this.selectedBlock;
        this.playSound('place');
      } else if (button === 2) { // Clic droit - supprime un bloc
        this.grid[y][x] = 'empty';
        this.playSound('dig');
      }
      
      this.renderGrid();
    }
    
    // Sélectionne un type de bloc
    selectBlock(type) {
      this.selectedBlock = type;
    }
    
    // Rend la grille en fonction de son état actuel
    renderGrid() {
      const cells = document.querySelectorAll('.mc-builder-cell');
      
      for (let y = 0; y < this.gridSize.height; y++) {
        for (let x = 0; x < this.gridSize.width; x++) {
          const index = y * this.gridSize.width + x;
          const cell = cells[index];
          const blockType = this.grid[y][x];
          const blockProperties = this.blockTypes[blockType];
          
          cell.style.backgroundColor = blockProperties.color || 'transparent';
          
          if (blockProperties.texture) {
            cell.style.backgroundImage = blockProperties.texture;
          } else {
            cell.style.backgroundImage = 'none';
          }
        }
      }
    }
    
    // Efface toute la grille
    clearGrid() {
      if (!confirm('Êtes-vous sûr de vouloir effacer toute votre création ?')) return;
      
      this.playSound('explosion');
      
      // Réinitialise la grille
      this.initializeGrid();
    }
    
    // Sauvegarde la création actuelle
    saveCreation() {
      const savedData = {
        grid: this.grid,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('minecraft-builder-save', JSON.stringify(savedData));
      
      this.playSound('achievement');
      
      // Animation et message de confirmation
      const message = document.createElement('div');
      message.className = 'mc-builder-message';
      message.textContent = 'Création sauvegardée !';
      this.container.appendChild(message);
      
      setTimeout(() => {
        message.remove();
      }, 2000);
    }
    
    // Charge une création sauvegardée
    loadCreation() {
      const savedData = localStorage.getItem('minecraft-builder-save');
      
      if (!savedData) {
        alert('Aucune sauvegarde trouvée !');
        return;
      }
      
      try {
        const { grid } = JSON.parse(savedData);
        this.grid = grid;
        this.renderGrid();
        this.playSound('achievement');
      } catch (error) {
        console.error('Erreur lors du chargement de la sauvegarde:', error);
        alert('Erreur lors du chargement de la sauvegarde');
      }
    }
    
    // Joue un son en fonction de l'action
    playSound(type) {
      // Utilise la fonction existante du site si disponible
      if (typeof window.playSound === 'function') {
        window.playSound(type);
        return;
      }
      
      // Fonction de secours si la fonction principale n'est pas disponible
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
        case 'place':
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          oscillator.start();
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
        case 'dig':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          oscillator.start();
          oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
        case 'achievement':
          oscillator.type = 'triangle';
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.1);
          oscillator.start();
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.stop(audioContext.currentTime + 0.3);
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
  }
  
  // Initialisation du constructeur Minecraft
  document.addEventListener('DOMContentLoaded', function() {
    window.minecraftBuilder = new MinecraftBuilder();
    
    // Ajout d'un bouton d'accès dans le footer
    const footer = document.querySelector('.footer-info');
    if (footer) {
      const builderLink = document.createElement('a');
      builderLink.id = 'minecraft-builder-toggle';
      builderLink.href = '#';
      builderLink.className = 'builder-link';
      builderLink.innerHTML = '<i class="fas fa-cubes"></i> Mode Construction';
      builderLink.style.display = 'flex';
      builderLink.style.alignItems = 'center';
      builderLink.style.gap = '5px';
      builderLink.style.marginTop = '10px';
      
      builderLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.minecraftBuilder.toggleBuilder();
      });
      
      footer.appendChild(builderLink);
    }
    
    // Ajoute une indication de raccourci clavier sur la page d'accueil
    const heroSection = document.querySelector('.hero-buttons');
    if (heroSection) {
      const hint = document.createElement('div');
      hint.className = 'minecraft-hint';
      hint.innerHTML = 'Indice: Tapez "CREATE" sur votre clavier pour un secret...';
      hint.style.fontSize = '0.8rem';
      hint.style.opacity = '0.6';
      hint.style.marginTop = '20px';
      hint.style.fontStyle = 'italic';
      
      heroSection.appendChild(hint);
    }
  });