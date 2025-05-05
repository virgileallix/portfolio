// Fichier contenant les mini-jeux pour les easter eggs Minecraft

// Setup des mini-jeux
function setupMiniGames() {
    // Ces mini-jeux sont lancés via les portails ou les commandes
    // Aucune initialisation n'est requise ici
  }
  
  // ------------ JEU DU SERPENT ------------ 
  
  // Ouvrir le jeu du serpent
  function openSnakeGame() {
    // Vérifier si le jeu existe déjà
    if (document.querySelector('.snake-game-container')) return;
    
    const gameContainer = document.createElement('div');
    gameContainer.className = 'snake-game-container';
    
    gameContainer.innerHTML = `
      <div class="snake-game-header">
        <h3 class="snake-game-title">Serpent Minecraft</h3>
        <button class="snake-game-close"><i class="fas fa-times"></i></button>
      </div>
      <canvas class="snake-game-canvas" width="300" height="300"></canvas>
      <div class="snake-game-score">Score: <span id="snake-score">0</span></div>
    `;
    
    // Ajouter le style pour le jeu du serpent
    const style = document.createElement('style');
    style.textContent = `
      .snake-game-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(30, 33, 40, 0.95);
        border: 3px solid var(--primary);
        border-radius: 8px;
        padding: 15px;
        z-index: 10000;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .snake-game-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 15px;
      }
      
      .snake-game-title {
        font-family: 'Minecraft', 'Outfit', sans-serif;
        font-size: 20px;
        color: var(--primary);
        margin: 0;
      }
      
      .snake-game-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }
      
      .snake-game-canvas {
        border: 2px solid var(--primary-dark);
        background-color: #111;
      }
      
      .snake-game-score {
        margin-top: 10px;
        font-family: 'Minecraft', 'Outfit', sans-serif;
        color: white;
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(gameContainer);
    
    // Fermer le jeu
    document.querySelector('.snake-game-close').addEventListener('click', () => {
      gameContainer.remove();
    });
    
    // Initialiser le jeu
    initSnakeGame();
  }
  
  // Initialiser le jeu du serpent
  function initSnakeGame() {
    const canvas = document.querySelector('.snake-game-canvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('snake-score');
    
    const gridSize = 15;
    const gridWidth = canvas.width / gridSize;
    const gridHeight = canvas.height / gridSize;
    
    let snake = [
      { x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) }
    ];
    
    let direction = 'right';
    let food = generateFood();
    let score = 0;
    let gameOver = false;
    let gameLoop;
    
    function generateFood() {
      const food = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight)
      };
      
      // S'assurer que la nourriture n'apparaît pas sur le serpent
      for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
          return generateFood();
        }
      }
      
      return food;
    }
    
    function drawSnake() {
      ctx.fillStyle = '#52A535';
      
      for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        
        // Dessiner le corps du serpent
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        
        // Ajouter un border pour l'effet pixelisé
        ctx.strokeStyle = '#3C8527';
        ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        
        // Dessiner une petite ombre pour la profondeur
        if (i > 0) {
          ctx.fillStyle = '#3C8527';
          ctx.fillRect(segment.x * gridSize + 3, segment.y * gridSize + 3, gridSize - 6, gridSize - 6);
          ctx.fillStyle = '#52A535';
        }
      }
      
      // Dessiner les yeux pour la tête
      const head = snake[0];
      ctx.fillStyle = 'white';
      
      // Position des yeux selon la direction
      if (direction === 'right') {
        ctx.fillRect(head.x * gridSize + gridSize - 5, head.y * gridSize + 3, 2, 2);
        ctx.fillRect(head.x * gridSize + gridSize - 5, head.y * gridSize + gridSize - 5, 2, 2);
      } else if (direction === 'left') {
        ctx.fillRect(head.x * gridSize + 3, head.y * gridSize + 3, 2, 2);
        ctx.fillRect(head.x * gridSize + 3, head.y * gridSize + gridSize - 5, 2, 2);
      } else if (direction === 'up') {
        ctx.fillRect(head.x * gridSize + 3, head.y * gridSize + 3, 2, 2);
        ctx.fillRect(head.x * gridSize + gridSize - 5, head.y * gridSize + 3, 2, 2);
      } else if (direction === 'down') {
        ctx.fillRect(head.x * gridSize + 3, head.y * gridSize + gridSize - 5, 2, 2);
        ctx.fillRect(head.x * gridSize + gridSize - 5, head.y * gridSize + gridSize - 5, 2, 2);
      }
    }
    
    function drawFood() {
      // Dessiner un "diamant" pour la nourriture
      ctx.fillStyle = '#5AC7C7';
      ctx.beginPath();
      ctx.moveTo(food.x * gridSize + gridSize / 2, food.y * gridSize);
      ctx.lineTo(food.x * gridSize + gridSize, food.y * gridSize + gridSize / 2);
      ctx.lineTo(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize);
      ctx.lineTo(food.x * gridSize, food.y * gridSize + gridSize / 2);
      ctx.closePath();
      ctx.fill();
      
      // Ajouter un effet brillant
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.moveTo(food.x * gridSize + gridSize / 2, food.y * gridSize + 2);
      ctx.lineTo(food.x * gridSize + gridSize - 2, food.y * gridSize + gridSize / 2);
      ctx.lineTo(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize - 2);
      ctx.closePath();
      ctx.fill();
    }
    
    function drawGrid() {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      
      for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
          ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
        }
      }
    }
    
    function updateGame() {
      if (gameOver) return;
      
      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner la grille
      drawGrid();
      
      // Dessiner la nourriture
      drawFood();
      
      // Déplacer le serpent
      const head = { ...snake[0] };
      
      switch (direction) {
        case 'right':
          head.x++;
          break;
        case 'left':
          head.x--;
          break;
        case 'up':
          head.y--;
          break;
        case 'down':
          head.y++;
          break;
      }
      
      // Vérifier les collisions avec les murs
      if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
        endGame();
        return;
      }
      
      // Vérifier les collisions avec le corps
      for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
          endGame();
          return;
        }
      }
      
      // Ajouter la tête
      snake.unshift(head);
      
      // Vérifier si le serpent a mangé la nourriture
      if (head.x === food.x && head.y === food.y) {
        // Augmenter le score
        score++;
        scoreElement.textContent = score;
        
        // Jouer un son
        if (typeof playSound === 'function') {
          playSound('click');
        }
        
        // Générer une nouvelle nourriture
        food = generateFood();
        
        // Vérifier le succès
        if (score >= 10) {
          updateAchievementProgress('snake_master', 1);
        }
      } else {
        // Supprimer la queue si pas de nourriture mangée
        snake.pop();
      }
      
      // Dessiner le serpent
      drawSnake();
    }
    
    function endGame() {
      gameOver = true;
      clearInterval(gameLoop);
      
      // Afficher le game over
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#FF5555';
      ctx.font = '20px Minecraft, Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
      
      ctx.fillStyle = 'white';
      ctx.font = '16px Minecraft, Arial';
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
      
      ctx.font = '12px Minecraft, Arial';
      ctx.fillText('Cliquez pour recommencer', canvas.width / 2, canvas.height / 2 + 40);
      
      // Jouer un son
      if (typeof playSound === 'function') {
        playSound('explosion');
      }
      
      // Écouter le clic pour recommencer
      canvas.addEventListener('click', restartGame);
    }
    
    function restartGame() {
      if (!gameOver) return;
      
      // Réinitialiser le jeu
      snake = [
        { x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) }
      ];
      
      direction = 'right';
      food = generateFood();
      score = 0;
      gameOver = false;
      
      // Mettre à jour le score affiché
      scoreElement.textContent = score;
      
      // Supprimer l'écouteur de clic
      canvas.removeEventListener('click', restartGame);
      
      // Redémarrer la boucle de jeu
      gameLoop = setInterval(updateGame, 150);
    }
    
    // Écouter les touches du clavier
    document.addEventListener('keydown', (e) => {
      // Empêcher le déplacement dans la direction opposée
      if (e.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
      } else if (e.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
      } else if (e.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
      } else if (e.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
      }
    });
    
    // Démarrer la boucle de jeu
    gameLoop = setInterval(updateGame, 150);
  }
  
  
  // ------------ JEU CLICKER ------------ 
  
  // Ouvrir le jeu clicker
  function openClickerGame() {
    // Vérifier si le jeu existe déjà
    if (document.querySelector('.clicker-game-container')) return;
    
    const gameContainer = document.createElement('div');
    gameContainer.className = 'clicker-game-container';
    
    gameContainer.innerHTML = `
      <div class="clicker-game-header">
        <h3 class="clicker-game-title">Minecraft Clicker</h3>
        <button class="clicker-game-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="clicker-target"></div>
      <div class="clicker-count">0</div>
      <div class="clicker-upgrades">
        <div class="clicker-upgrade" data-cost="10" data-value="1">
          Pioche en pierre<br>(+1/clic, coût: 10)
        </div>
        <div class="clicker-upgrade" data-cost="50" data-value="5">
          Pioche en fer<br>(+5/clic, coût: 50)
        </div>
        <div class="clicker-upgrade" data-cost="200" data-value="10">
          Pioche en or<br>(+10/clic, coût: 200)
        </div>
        <div class="clicker-upgrade" data-cost="500" data-value="50">
          Pioche en diamant<br>(+50/clic, coût: 500)
        </div>
      </div>
    `;
    
    // Ajouter le style pour le jeu clicker
    const style = document.createElement('style');
    style.textContent = `
      .clicker-game-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 320px;
        background: rgba(30, 33, 40, 0.95);
        border: 3px solid var(--primary);
        border-radius: 8px;
        padding: 15px;
        z-index: 10000;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
        text-align: center;
      }
      
      .clicker-game-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      
      .clicker-game-title {
        font-family: 'Minecraft', 'Outfit', sans-serif;
        font-size: 20px;
        color: var(--primary);
        margin: 0;
      }
      
      .clicker-game-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }
      
      .clicker-target {
        width: 120px;
        height: 120px;
        margin: 20px auto;
        background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/iron-hammer.png');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
        transition: transform 0.1s;
      }
      
      .clicker-target:active {
        transform: scale(0.9);
      }
      
      .clicker-count {
        font-family: 'Minecraft', 'Outfit', sans-serif;
        font-size: 24px;
        color: var(--primary);
        margin: 10px 0;
      }
      
      .clicker-upgrades {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 15px;
      }
      
      .clicker-upgrade {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid var(--primary-dark);
        border-radius: 4px;
        padding: 8px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
      }
      
      .clicker-upgrade:hover {
        background: rgba(82, 165, 53, 0.2);
      }
      
      .clicker-upgrade-disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(gameContainer);
    
    // Fermer le jeu
    document.querySelector('.clicker-game-close').addEventListener('click', () => {
      gameContainer.remove();
    });
    
    // Initialiser le jeu
    initClickerGame();
  }
  
  // Initialiser le jeu clicker
  function initClickerGame() {
    const target = document.querySelector('.clicker-target');
    const countElement = document.querySelector('.clicker-count');
    const upgrades = document.querySelectorAll('.clicker-upgrade');
    
    let count = 0;
    let clickValue = 1;
    
    // Gérer le clic sur la cible
    target.addEventListener('click', () => {
      count += clickValue;
      countElement.textContent = count;
      
      // Jouer un son
      if (typeof playSound === 'function') {
        playSound('click');
      }
      
      // Animation de clic
      target.style.transform = 'scale(0.9)';
      setTimeout(() => {
        target.style.transform = '';
      }, 100);
      
      // Vérifier le succès
      if (count >= 100) {
        updateAchievementProgress('clicker_champion', 1);
      }
      
      // Vérifier les améliorations disponibles
      updateUpgrades();
    });
    
    // Gérer les améliorations
    upgrades.forEach(upgrade => {
      upgrade.addEventListener('click', () => {
        const cost = parseInt(upgrade.getAttribute('data-cost'));
        const value = parseInt(upgrade.getAttribute('data-value'));
        
        if (count >= cost) {
          count -= cost;
          clickValue += value;
          countElement.textContent = count;
          
          // Désactiver l'amélioration après l'achat
          upgrade.classList.add('clicker-upgrade-disabled');
          upgrade.style.opacity = '0.5';
          upgrade.style.pointerEvents = 'none';
          
          // Jouer un son
          if (typeof playSound === 'function') {
            playSound('achievement');
          }
          
          // Mettre à jour les améliorations disponibles
          updateUpgrades();
        }
      });
    });
    
    // Mettre à jour l'état des améliorations
    function updateUpgrades() {
      upgrades.forEach(upgrade => {
        if (!upgrade.classList.contains('clicker-upgrade-disabled')) {
          const cost = parseInt(upgrade.getAttribute('data-cost'));
          
          if (count >= cost) {
            upgrade.style.backgroundColor = 'rgba(82, 165, 53, 0.2)';
          } else {
            upgrade.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
          }
        }
      });
    }
    
    // État initial des améliorations
    updateUpgrades();
  }
  
  
  // ------------ JEU DE MÉMOIRE ------------ 
  
  // Ouvrir le jeu de mémoire
  function openMemoryGame() {
    // Vérifier si le jeu existe déjà
    if (document.querySelector('.memory-game-container')) return;
    
    const gameContainer = document.createElement('div');
    gameContainer.className = 'memory-game-container';
    gameContainer.style.position = 'fixed';
    gameContainer.style.top = '50%';
    gameContainer.style.left = '50%';
    gameContainer.style.transform = 'translate(-50%, -50%)';
    gameContainer.style.background = 'rgba(30, 33, 40, 0.95)';
    gameContainer.style.border = '3px solid var(--primary)';
    gameContainer.style.borderRadius = '8px';
    gameContainer.style.padding = '15px';
    gameContainer.style.zIndex = '10000';
    gameContainer.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.8)';
    gameContainer.style.display = 'flex';
    gameContainer.style.flexDirection = 'column';
    gameContainer.style.alignItems = 'center';
    gameContainer.style.width = '350px';
    
    gameContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 15px;">
        <h3 style="font-family: 'Minecraft', 'Outfit', sans-serif; font-size: 20px; color: var(--primary); margin: 0;">Jeu de Mémoire</h3>
        <button class="memory-game-close" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;"><i class="fas fa-times"></i></button>
      </div>
      <div class="memory-stats" style="display: flex; gap: 20px; margin-bottom: 15px; font-family: 'Minecraft', 'Outfit', sans-serif; color: white;">
        <div>Tentatives: <span id="memory-attempts">0</span></div>
        <div>Paires: <span id="memory-pairs">0</span>/<span id="memory-total">8</span></div>
      </div>
      <div class="memory-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;"></div>
    `;
    
    document.body.appendChild(gameContainer);
    
    // Fermer le jeu
    document.querySelector('.memory-game-close').addEventListener('click', () => {
      gameContainer.remove();
    });
    
    // Initialiser le jeu
    initMemoryGame();
  }
  
  // Initialiser le jeu de mémoire
  function initMemoryGame() {
    const grid = document.querySelector('.memory-grid');
    const totalPairs = 8;
    
    let attempts = 0;
    let pairs = 0;
    let flippedCards = [];
    let canFlip = true;
    
    // Images pour les cartes
    const cardImages = [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-stone.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/water-stone.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/thunder-stone.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/leaf-stone.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/moon-stone.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sun-stone.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/shiny-stone.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dusk-stone.png'
    ];
    
    // Créer les paires de cartes
    const cards = [...cardImages, ...cardImages];
    
    // Mélanger les cartes
    shuffleArray(cards);
    
    // Créer les éléments de carte
    cards.forEach((image, index) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.setAttribute('data-card-index', index);
      card.setAttribute('data-card-image', image);
      card.style.width = '60px';
      card.style.height = '60px';
      card.style.backgroundColor = '#3C523D';
      card.style.borderRadius = '6px';
      card.style.display = 'flex';
      card.style.justifyContent = 'center';
      card.style.alignItems = 'center';
      card.style.cursor = 'pointer';
      card.style.transition = 'all 0.3s';
      card.style.transform = 'rotateY(0deg)';
      card.style.position = 'relative';
      
      // Côté caché de la carte
      const cardBack = document.createElement('div');
      cardBack.className = 'card-back';
      cardBack.style.position = 'absolute';
      cardBack.style.width = '100%';
      cardBack.style.height = '100%';
      cardBack.style.backfaceVisibility = 'hidden';
      cardBack.style.display = 'flex';
      cardBack.style.justifyContent = 'center';
      cardBack.style.alignItems = 'center';
      cardBack.style.backgroundColor = '#3C523D';
      cardBack.style.borderRadius = '6px';
      cardBack.style.border = '2px solid #52A535';
      
      cardBack.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" style="width: 32px; height: 32px;">`;
      
      // Côté visible de la carte
      const cardFront = document.createElement('div');
      cardFront.className = 'card-front';
      cardFront.style.position = 'absolute';
      cardFront.style.width = '100%';
      cardFront.style.height = '100%';
      cardFront.style.backfaceVisibility = 'hidden';
      cardFront.style.display = 'flex';
      cardFront.style.justifyContent = 'center';
      cardFront.style.alignItems = 'center';
      cardFront.style.backgroundColor = '#ffffff';
      cardFront.style.borderRadius = '6px';
      cardFront.style.border = '2px solid #52A535';
      cardFront.style.transform = 'rotateY(180deg)';
      
      cardFront.innerHTML = `<img src="${image}" style="width: 42px; height: 42px;">`;
      
      card.appendChild(cardBack);
      card.appendChild(cardFront);
      
      // Événement au clic
      card.addEventListener('click', () => {
        if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) return;
        
        // Retourner la carte
        card.style.transform = 'rotateY(180deg)';
        card.classList.add('flipped');
        
        // Jouer un son
        if (typeof playSound === 'function') {
          playSound('click');
        }
        
        // Ajouter à la liste des cartes retournées
        flippedCards.push(card);
        
        // Vérifier les paires
        if (flippedCards.length === 2) {
          attempts++;
          document.getElementById('memory-attempts').textContent = attempts;
          
          const card1 = flippedCards[0];
          const card2 = flippedCards[1];
          
          if (card1.getAttribute('data-card-image') === card2.getAttribute('data-card-image')) {
            // Paire trouvée
            card1.classList.add('matched');
            card2.classList.add('matched');
            
            card1.style.backgroundColor = 'rgba(82, 165, 53, 0.2)';
            card2.style.backgroundColor = 'rgba(82, 165, 53, 0.2)';
            
            // Jouer un son
            if (typeof playSound === 'function') {
              playSound('achievement');
            }
            
            pairs++;
            document.getElementById('memory-pairs').textContent = pairs;
            
            flippedCards = [];
            
            // Vérifier la victoire
            if (pairs === totalPairs) {
              setTimeout(() => {
                showVictoryMessage();
              }, 500);
            }
          } else {
            // Paire non trouvée
            canFlip = false;
            
            setTimeout(() => {
              card1.style.transform = 'rotateY(0deg)';
              card2.style.transform = 'rotateY(0deg)';
              
              card1.classList.remove('flipped');
              card2.classList.remove('flipped');
              
              flippedCards = [];
              canFlip = true;
            }, 1000);
          }
        }
      });
      
      grid.appendChild(card);
    });
    
    // Afficher un message de victoire
    function showVictoryMessage() {
      const victoryMessage = document.createElement('div');
      victoryMessage.style.position = 'absolute';
      victoryMessage.style.top = '0';
      victoryMessage.style.left = '0';
      victoryMessage.style.width = '100%';
      victoryMessage.style.height = '100%';
      victoryMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      victoryMessage.style.display = 'flex';
      victoryMessage.style.flexDirection = 'column';
      victoryMessage.style.justifyContent = 'center';
      victoryMessage.style.alignItems = 'center';
      victoryMessage.style.borderRadius = '8px';
      victoryMessage.style.zIndex = '1';
      
      victoryMessage.innerHTML = `
        <div style="font-family: 'Minecraft', 'Outfit', sans-serif; color: #FFFF55; font-size: 24px; margin-bottom: 10px;">Victoire !</div>
        <div style="font-family: 'Minecraft', 'Outfit', sans-serif; color: white; margin-bottom: 20px;">Tentatives: ${attempts}</div>
        <button class="replay-button" style="background: #52A535; color: white; border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer; font-family: 'Minecraft', 'Outfit', sans-serif;">Rejouer</button>
      `;
      
      document.querySelector('.memory-grid').appendChild(victoryMessage);
      
      // Écouter le bouton de replay
      document.querySelector('.replay-button').addEventListener('click', () => {
        document.querySelector('.memory-game-container').remove();
        openMemoryGame();
      });
      
      // Débloquer le succès si nécessaire
      updateAchievementProgress('memory_master', 1);
    }
    
    // Fonction pour mélanger un tableau
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  }