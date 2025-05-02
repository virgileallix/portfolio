// Easter eggs et système de succès Minecraft - Version enrichie
// Ajouter ce fichier dans toutes les pages où vous souhaitez activer les easter eggs

document.addEventListener('DOMContentLoaded', function() {
    addEasterEggStyles();
    initializeAchievementsSystem();
    setupBanCommand();
    setupSecretCommands();
    renderAchievements();
    setupSpeedClicker();
    setupHiddenBlocks();
    setupCreeperSoundCounter();
    setupMiniGames();
    setupRandomEvents();
    setupInteractiveElements();
    setupHiddenPortals();
    setupSeasonalEvents();
    setupMusicDiscs();
  });
  
  // Ajout des styles au document
  function addEasterEggStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Style pour le panneau de ban */
      .ban-panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        max-width: 90vw;
        max-height: 80vh;
        background: rgba(30, 33, 40, 0.95);
        border: 3px solid var(--primary);
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        z-index: 9999;
        overflow: hidden;
        animation: panel-appear 0.3s ease-out;
      }
      
      @keyframes panel-appear {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
      
      .ban-panel-header {
        background: rgba(20, 21, 25, 0.9);
        padding: 15px;
        border-bottom: 3px solid var(--primary-dark);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .ban-panel-header h2 {
        font-family: 'Minecraft', 'Outfit', sans-serif;
        margin: 0;
        color: var(--light);
        font-size: 20px;
      }
      
      #close-ban-panel {
        background: none;
        border: none;
        color: var(--light);
        font-size: 18px;
        cursor: pointer;
        transition: color 0.2s;
      }
      
      #close-ban-panel:hover {
        color: var(--primary);
      }
      
      .ban-panel-content {
        padding: 20px;
        max-height: calc(80vh - 60px);
        overflow-y: auto;
      }
      
      .ban-panel-section h3 {
        margin-top: 0;
        margin-bottom: 15px;
        color: var(--primary);
        font-size: 18px;
        border-bottom: 1px solid rgba(82, 165, 53, 0.3);
        padding-bottom: 8px;
      }
      
      .user-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .user-item {
        display: flex;
        align-items: center;
        gap: 15px;
        background: rgba(0, 0, 0, 0.3);
        padding: 10px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.2s;
      }
      
      .user-item:hover {
        background: rgba(0, 0, 0, 0.4);
        transform: translateY(-2px);
      }
      
      .user-avatar {
        width: 48px;
        height: 48px;
        border-radius: 6px;
        overflow: hidden;
        border: 2px solid var(--primary-dark);
      }
      
      .user-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .user-info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      
      .user-name {
        font-weight: bold;
        font-size: 16px;
        color: var(--light);
      }
      
      .user-role {
        font-size: 12px;
        opacity: 0.7;
      }
      
      .user-role.admin {
        color: #ff5555;
      }
      
      .user-role.moderator {
        color: #5555ff;
      }
      
      .user-role.member {
        color: #55ff55;
      }
      
      .ban-button {
        background: #ff5555;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      
      .ban-button:hover:not([disabled]) {
        background: #ff3333;
        transform: scale(1.05);
      }
      
      .ban-button[disabled] {
        background: #555;
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .ban-reason-dialog {
        background: rgba(30, 33, 40, 0.98);
        border: 2px solid var(--primary);
        border-radius: 6px;
        padding: 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        z-index: 10000;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
      }
      
      .ban-reason-dialog h3 {
        margin-top: 0;
        color: var(--primary);
        font-size: 16px;
        margin-bottom: 10px;
      }
      
      .ban-reason-input {
        width: 100%;
        padding: 8px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        color: var(--light);
        margin-bottom: 15px;
      }
      
      .ban-reason-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
      
      .cancel-ban {
        background: #555;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 12px;
        cursor: pointer;
      }
      
      .confirm-ban {
        background: #ff3333;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 12px;
        cursor: pointer;
      }
      
      /* Style pour les notifications de succès */
      .achievement-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(30, 33, 40, 0.95);
        border: 3px solid var(--primary);
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        z-index: 9999;
        transform: translateX(120%);
        transition: transform 0.3s ease-out;
      }
      
      .achievement-notification.show {
        transform: translateX(0);
      }
      
      .achievement-notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
      }
      
      .achievement-notification-icon {
        width: 50px;
        height: 50px;
        background: rgba(82, 165, 53, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: var(--primary);
        border: 2px solid var(--primary-dark);
        overflow: hidden;
      }
      
      .achievement-notification-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      
      .achievement-notification-text {
        flex: 1;
      }
      
      .achievement-notification-title {
        font-family: 'Minecraft', 'Outfit', sans-serif;
        font-size: 14px;
        color: #ffff55;
        margin-bottom: 5px;
      }
      
      .achievement-notification-name {
        font-size: 16px;
        font-weight: bold;
        color: var(--light);
      }
      
      /* Style pour les succès */
      .achievements-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 30px;
      }
      
      .achievement-card {
        background: rgba(30, 33, 40, 0.8);
        border: 3px solid var(--medium);
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s ease;
        position: relative;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        opacity: 0.6;
      }
      
      .achievement-card.unlocked {
        opacity: 1;
        border-color: var(--primary);
        box-shadow: 0 0 15px rgba(82, 165, 53, 0.3);
      }
      
      .achievement-card .locked-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
      }
      
      .achievement-card.unlocked .locked-overlay {
        display: none;
      }
      
      .achievement-icon {
        width: 80px;
        height: 80px;
        background: rgba(82, 165, 53, 0.2);
        border-radius: 50%;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        color: var(--primary);
        border: 2px solid var(--primary-dark);
        overflow: hidden;
      }
      
      .achievement-icon img {
        width: 64px;
        height: 64px;
        object-fit: contain;
      }
      
      .achievement-card.unlocked .achievement-icon {
        animation: achievement-glow 2s infinite alternate;
      }
      
      @keyframes achievement-glow {
        0% { box-shadow: 0 0 5px rgba(82, 165, 53, 0.3); }
        100% { box-shadow: 0 0 15px rgba(82, 165, 53, 0.8); }
      }
      
      .achievement-title {
        font-family: 'Minecraft', 'Outfit', sans-serif;
        margin-bottom: 10px;
        color: var(--light);
        font-size: 18px;
        text-transform: uppercase;
      }
      
      .achievement-description {
        font-size: 0.9rem;
        color: var(--light);
        opacity: 0.8;
        margin-bottom: 15px;
      }
      
      .achievement-date {
        font-size: 12px;
        color: var(--primary);
        font-style: italic;
      }
      
      .achievement-progress {
        width: 100%;
        height: 10px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        margin-top: 10px;
        overflow: hidden;
        position: relative;
      }
      
      .achievement-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--primary), var(--primary-light));
        width: 0;
        transition: width 0.5s ease;
      }
      
      /* Style pour le mini-jeu de snake */
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
      
      /* Style pour le mini-jeu clicker */
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
      
      /* Style pour les portails cachés */
      .hidden-portal {
        position: fixed;
        width: 30px;
        height: 30px;
        background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/enigma-berry.png');
        background-size: contain;
        background-repeat: no-repeat;
        opacity: 0.3;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s;
      }
      
      .hidden-portal:hover {
        opacity: 0.8;
        transform: scale(1.2) rotate(180deg);
      }
      
      /* Style pour le jukebox */
      .jukebox-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: rgba(30, 33, 40, 0.7);
        border: 2px solid var(--primary-dark);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 999;
        transition: all 0.3s;
      }
      
      .jukebox-container:hover {
        transform: scale(1.1);
        background: rgba(82, 165, 53, 0.3);
      }
      
      .jukebox-icon {
        font-size: 24px;
        color: var(--primary);
      }
      
      .jukebox-panel {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 300px;
        background: rgba(30, 33, 40, 0.95);
        border: 3px solid var(--primary);
        border-radius: 8px;
        padding: 15px;
        z-index: 998;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        transform: translateY(20px);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s;
      }
      
      .jukebox-panel.active {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
      }
      
      .jukebox-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      
      .jukebox-title {
        font-family: 'Minecraft', 'Outfit', sans-serif;
        font-size: 18px;
        color: var(--primary);
        margin: 0;
      }
      
      .jukebox-close {
        background: none;
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
      }
      
      .music-discs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      
      .music-disc {
        width: 50px;
        height: 50px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        border: 2px solid transparent;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s;
        margin: 0 auto;
      }
      
      .music-disc:hover {
        transform: scale(1.1);
        border-color: var(--primary);
      }
      
      .music-disc.playing {
        border-color: var(--primary);
        animation: rotate-disc 3s linear infinite;
      }
      
      @keyframes rotate-disc {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Style pour les événements saisonniers */
      .seasonal-snow {
        position: fixed;
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9990;
        opacity: 0.8;
        animation: snow-fall 10s linear infinite;
      }
      
      @keyframes snow-fall {
        0% {
          transform: translateY(-10px) translateX(0);
          opacity: 0;
        }
        10% {
          opacity: 0.8;
        }
        90% {
          opacity: 0.8;
        }
        100% {
          transform: translateY(100vh) translateX(20px);
          opacity: 0;
        }
      }
      
      .seasonal-header {
        position: fixed;
        top: 10px;
        left: 0;
        right: 0;
        text-align: center;
        font-family: 'Minecraft', 'Outfit', sans-serif;
        color: var(--primary);
        font-size: 20px;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        z-index: 9991;
        pointer-events: none;
      }
      
      /* Style pour les messages de chat Minecraft */
      .minecraft-chat {
        position: fixed;
        bottom: 80px;
        left: 20px;
        width: 350px;
        max-width: 80vw;
        max-height: 200px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        z-index: 998;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s;
        overflow-y: auto;
        pointer-events: none;
      }
      
      .minecraft-chat.active {
        opacity: 1;
        transform: translateY(0);
      }
      
      .minecraft-chat-message {
        font-family: 'Minecraft', 'Outfit', sans-serif;
        font-size: 14px;
        color: white;
        margin: 0;
        line-height: 1.3;
      }
      
      .minecraft-chat-message .player {
        color: #55AAFF;
      }
      
      .minecraft-chat-message .system {
        color: #AAAAAA;
        font-style: italic;
      }
      
      .minecraft-chat-message .achievement {
        color: #FFAA00;
      }
    `;
    
    document.head.appendChild(style);
  }
  
  // ------------ SYSTÈME DE SUCCÈS ------------
  
  // Définition des succès disponibles (version étendue)
  const ACHIEVEMENTS = [
    {
      id: 'diamond_hunter',
      title: 'Diamant Découvreur',
      description: 'Trouvez 5 diamants cachés sur le site',
      icon: 'fas fa-gem',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/blue-orb.png',
      secret: false,
      progress: {
        current: 0,
        max: 5
      }
    },
    {
      id: 'konami_master',
      title: 'Maître du Code',
      description: 'Entrez le code secret Konami',
      icon: 'fas fa-keyboard',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/up-grade.png',
      secret: false,
      progress: {
        current: 0,
        max: 1
      }
    },
    {
      id: 'ban_hammer',
      title: 'Marteau de Ban',
      description: 'Bannissez 3 utilisateurs fictifs',
      icon: 'fas fa-gavel',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/iron-hammer.png',
      secret: true,
      progress: {
        current: 0,
        max: 3
      }
    },
    {
      id: 'night_owl',
      title: 'Hibou de Nuit',
      description: 'Visitez le site après minuit',
      icon: 'fas fa-moon',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/moon-stone.png',
      secret: true,
      progress: {
        current: 0,
        max: 1
      }
    },
    {
      id: 'speed_clicker',
      title: 'Cliqueur Rapide',
      description: 'Cliquez 50 fois sur le logo en moins de 10 secondes',
      icon: 'fas fa-mouse-pointer',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/quick-claw.png',
      secret: true,
      progress: {
        current: 0,
        max: 50
      }
    },
    {
      id: 'minecraft_expert',
      title: 'Expert Minecraft',
      description: 'Trouvez tous les blocs cachés',
      icon: 'fas fa-cube',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png',
      secret: true,
      progress: {
        current: 0,
        max: 5
      }
    },
    {
      id: 'creeper_whisperer',
      title: 'Dompteur de Creeper',
      description: 'Entendez 5 sons de Creeper',
      icon: 'fas fa-volume-up',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/green-scarf.png',
      secret: true,
      progress: {
        current: 0,
        max: 5
      }
    },
    {
      id: 'command_guru',
      title: 'Gourou des Commandes',
      description: 'Utilisez 3 commandes secrètes',
      icon: 'fas fa-terminal',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/data-card.png',
      secret: true,
      progress: {
        current: 0,
        max: 3
      }
    },
    // Nouveaux succès
    {
      id: 'portal_explorer',
      title: 'Explorateur de Portails',
      description: 'Trouvez et activez 3 portails cachés',
      icon: 'fas fa-door-open',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/enigma-berry.png',
      secret: true,
      progress: {
        current: 0,
        max: 3
      }
    },
    {
      id: 'snake_master',
      title: 'Maître du Serpent',
      description: 'Atteignez un score de 10 au jeu du serpent',
      icon: 'fas fa-gamepad',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luck-incense.png',
      secret: true,
      progress: {
        current: 0,
        max: 1
      }
    },
    {
      id: 'clicker_champion',
      title: 'Champion du Clic',
      description: 'Obtenez 100 points au jeu clicker',
      icon: 'fas fa-mouse',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/scope-lens.png',
      secret: true,
      progress: {
        current: 0,
        max: 1
      }
    },
    {
      id: 'music_collector',
      title: 'Collectionneur de Musique',
      description: 'Trouvez et écoutez 5 disques de musique',
      icon: 'fas fa-music',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-ghost.png',
      secret: true,
      progress: {
        current: 0,
        max: 5
      }
    },
    {
      id: 'seasonal_visitor',
      title: 'Visiteur Saisonnier',
      description: 'Visitez le site pendant un événement saisonnier',
      icon: 'fas fa-snowflake',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ice-stone.png',
      secret: true,
      progress: {
        current: 0,
        max: 1
      }
    },
    {
      id: 'secret_message',
      title: 'Message Secret',
      description: 'Découvrez un message caché dans le chat',
      icon: 'fas fa-comment',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/upgrade.png',
      secret: true,
      progress: {
        current: 0,
        max: 1
      }
    },
    {
      id: 'enchanter',
      title: 'Enchanteur',
      description: 'Enchantez 5 éléments sur le site',
      icon: 'fas fa-magic',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mystic-water.png',
      secret: true,
      progress: {
        current: 0,
        max: 5
      }
    }
  ];
  
  // Initialisation du système de succès
  function initializeAchievementsSystem() {
    // Vérifie si les succès existent déjà en localStorage
    if (!localStorage.getItem('achievements')) {
      localStorage.setItem('achievements', JSON.stringify(ACHIEVEMENTS));
    } else {
      // Mise à jour du système si de nouveaux succès sont ajoutés
      const savedAchievements = JSON.parse(localStorage.getItem('achievements'));
      const updatedAchievements = [...ACHIEVEMENTS];
      
      // Conserver les progrès existants
      updatedAchievements.forEach(achievement => {
        const savedAchievement = savedAchievements.find(a => a.id === achievement.id);
        if (savedAchievement) {
          achievement.progress = savedAchievement.progress;
        }
      });
      
      localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
    }
    
    // Vérifier si c'est la nuit pour le succès du hibou
    const currentHour = new Date().getHours();
    if (currentHour >= 22 || currentHour <= 5) {
      updateAchievementProgress('night_owl', 1);
    }
    
    // Vérifier l'événement saisonnier
    checkSeasonalEvent();
  }
  
  // Vérifier l'événement saisonnier actuel
  function checkSeasonalEvent() {
    const today = new Date();
    const month = today.getMonth(); // 0-11
    const day = today.getDate();
    
    // Noël (Décembre)
    if (month === 11 && day >= 15 && day <= 31) {
      updateAchievementProgress('seasonal_visitor', 1);
      
      // Si c'est la première visite pendant la saison
      if (!localStorage.getItem('christmas_visited')) {
        localStorage.setItem('christmas_visited', 'true');
        activateChristmasTheme();
      }
    }
    
    // Halloween (Octobre)
    if (month === 9 && day >= 15 && day <= 31) {
      updateAchievementProgress('seasonal_visitor', 1);
      
      // Si c'est la première visite pendant la saison
      if (!localStorage.getItem('halloween_visited')) {
        localStorage.setItem('halloween_visited', 'true');
        activateHalloweenTheme();
      }
    }
  }
  
  // Activer le thème de Noël
  function activateChristmasTheme() {
    // Ajouter la neige
    for (let i = 0; i < 50; i++) {
      createSnowflake();
    }
    
    // Ajouter le message d'en-tête
    const christmasHeader = document.createElement('div');
    christmasHeader.className = 'seasonal-header';
    christmasHeader.innerHTML = '❄️ Joyeuses Fêtes! ❄️';
    document.body.appendChild(christmasHeader);
    
    // Ajouter un message dans le chat Minecraft
    showMinecraftChat([
      { type: 'system', text: 'Événement Noël activé! Recherchez des cadeaux cachés sur le site.' }
    ]);
  }
  
  // Activer le thème d'Halloween
  function activateHalloweenTheme() {
    // Ajouter le message d'en-tête
    const halloweenHeader = document.createElement('div');
    halloweenHeader.className = 'seasonal-header';
    halloweenHeader.innerHTML = '🎃 Happy Halloween! 🎃';
    document.body.appendChild(halloweenHeader);
    
    // Ajouter un message dans le chat Minecraft
    showMinecraftChat([
      { type: 'system', text: 'Événement Halloween activé! Méfiez-vous des creepers qui rôdent...' }
    ]);
    
    // Plus de chance de voir des creepers
    setInterval(() => {
      if (Math.random() < 0.1 && typeof playSound === 'function') {
        playSound('creeper');
      }
    }, 60000); // Toutes les minutes (10% de chance)
  }
  
  // Créer un flocon de neige
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'seasonal-snow';
    
    // Position aléatoire sur l'axe horizontal
    const randomX = Math.random() * 100;
    snowflake.style.left = `${randomX}%`;
    
    // Taille aléatoire
    const randomSize = Math.random() * 10 + 5;
    snowflake.style.width = `${randomSize}px`;
    snowflake.style.height = `${randomSize}px`;
    
    // Vitesse aléatoire
    const randomDuration = Math.random() * 10 + 5;
    snowflake.style.animationDuration = `${randomDuration}s`;
    
    // Délai aléatoire
    const randomDelay = Math.random() * 5;
    snowflake.style.animationDelay = `${randomDelay}s`;
    
    document.body.appendChild(snowflake);
    
    // Supprimer le flocon après l'animation
    setTimeout(() => {
      snowflake.remove();
      createSnowflake(); // Créer un nouveau flocon pour maintenir le nombre
    }, (randomDuration + randomDelay) * 1000);
  }
  
  // Setup du cliqueur rapide
  function setupSpeedClicker() {
    const logo = document.querySelector('.logo');
    if (!logo) return;
    
    let clickCount = 0;
    let clickTimer = null;
    
    logo.addEventListener('click', () => {
      clickCount++;
      
      if (clickCount === 1) {
        clickTimer = setTimeout(() => {
          clickCount = 0;
          clickTimer = null;
        }, 10000);
      }
      
      if (clickCount >= 50) {
        updateAchievementProgress('speed_clicker', 50);
        clickCount = 0;
        clearTimeout(clickTimer);
        clickTimer = null;
      }
    });
  }
  
  // Setup des blocs cachés
  function setupHiddenBlocks() {
    const blockTypes = ['grass', 'stone', 'wood', 'gold', 'diamond'];
    const blockCount = 5;
    
    // Ne pas ajouter les blocs s'ils existent déjà
    if (document.querySelector('.hidden-block')) return;
    
    for (let i = 0; i < blockCount; i++) {
      setTimeout(() => {
        const block = document.createElement('div');
        block.className = `hidden-block ${blockTypes[i]}-block`;
        
        block.style.position = 'fixed';
        block.style.width = '30px';
        block.style.height = '30px';
        block.style.backgroundSize = 'contain';
        block.style.cursor = 'pointer';
        block.style.zIndex = '1000';
        block.style.opacity = '0.4';
        block.style.transition = 'all 0.3s';
        
        // Images de GitHub pour les blocs
        switch (blockTypes[i]) {
          case 'grass':
            block.style.backgroundImage = "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/green-shard.png')";
            break;
          case 'stone':
            block.style.backgroundImage = "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hard-stone.png')";
            break;
          case 'wood':
            block.style.backgroundImage = "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/charcoal.png')";
            break;
          case 'gold':
            block.style.backgroundImage = "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/comet-shard.png')";
            break;
          case 'diamond':
            block.style.backgroundImage = "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/blue-shard.png')";
            break;
        }
        
        // Position aléatoire
        const x = Math.random() * (window.innerWidth - 50);
        const y = Math.random() * (window.innerHeight - 50);
        block.style.left = `${x}px`;
        block.style.top = `${y}px`;
        
        // Rendre le bloc visible aléatoirement
        block.style.opacity = '0';
        setTimeout(() => {
          block.style.opacity = '0.8';
        }, Math.random() * 60000 + 30000); // Entre 30s et 90s
        
        // Événement au clic
        block.addEventListener('click', () => {
          playSound('click');
          block.style.transform = 'scale(2)';
          block.style.opacity = '0';
          
          setTimeout(() => {
            block.remove();
            
            // Mettre à jour le progrès
            updateAchievementProgress('minecraft_expert', 1);
            
            // Recréer le bloc après un moment
            setTimeout(() => {
              setupHiddenBlocks();
            }, 60000);
          }, 500);
        });
        
        document.body.appendChild(block);
      }, i * 10000); // Ajouter un bloc toutes les 10 secondes
    }
  }
  
  // Setup des portails cachés
  function setupHiddenPortals() {
    const portalCount = 3;
    
    // Ne pas ajouter les portails s'ils existent déjà
    if (document.querySelector('.hidden-portal')) return;
    
    for (let i = 0; i < portalCount; i++) {
      setTimeout(() => {
        const portal = document.createElement('div');
        portal.className = 'hidden-portal';
        
        // Position aléatoire
        const x = Math.random() * (window.innerWidth - 50);
        const y = Math.random() * (window.innerHeight - 50);
        portal.style.left = `${x}px`;
        portal.style.top = `${y}px`;
        
        // Rendre le portail visible aléatoirement
        portal.style.opacity = '0';
        setTimeout(() => {
          portal.style.opacity = '0.3';
        }, Math.random() * 120000 + 60000); // Entre 1 et 3 minutes
        
        // Événement au clic
        portal.addEventListener('click', () => {
          activatePortal(portal);
        });
        
        document.body.appendChild(portal);
      }, i * 20000); // Ajouter un portail toutes les 20 secondes
    }
  }
  
  // Activer un portail
  function activatePortal(portal) {
    playSound('click');
    
    // Effet d'animation
    portal.style.transform = 'scale(2) rotate(720deg)';
    portal.style.opacity = '1';
    
    // Effet de téléportation
    const teleportEffect = document.createElement('div');
    teleportEffect.style.position = 'fixed';
    teleportEffect.style.top = '0';
    teleportEffect.style.left = '0';
    teleportEffect.style.width = '100%';
    teleportEffect.style.height = '100%';
    teleportEffect.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
    teleportEffect.style.zIndex = '9998';
    teleportEffect.style.opacity = '0';
    teleportEffect.style.transition = 'opacity 0.5s';
    
    document.body.appendChild(teleportEffect);
    
    // Afficher l'effet
    setTimeout(() => {
      teleportEffect.style.opacity = '1';
    }, 10);
    
    // Actions aléatoires du portail
    const portalActions = [
      () => openSnakeGame(),
      () => openClickerGame(),
      () => openJukebox(),
      () => activateSuperSecretMode(),
      () => showEasterEggMessage()
    ];
    
    const randomAction = portalActions[Math.floor(Math.random() * portalActions.length)];
    
    setTimeout(() => {
      teleportEffect.style.opacity = '0';
      portal.remove();
      
      setTimeout(() => {
        teleportEffect.remove();
        randomAction();
      }, 500);
      
      // Mettre à jour le progrès
      updateAchievementProgress('portal_explorer', 1);
      
      // Recréer le portail après un moment
      setTimeout(() => {
        setupHiddenPortals();
      }, 300000); // 5 minutes
    }, 1000);
  }
  
  // Afficher un message d'easter egg
  function showEasterEggMessage() {
    // Ajouter un message dans le chat Minecraft
    showMinecraftChat([
      { type: 'system', text: 'Un portail s\'est ouvert!' },
      { type: 'player', name: 'Notch', text: 'Bienvenue dans le monde secret!' },
      { type: 'achievement', text: 'Vous avez découvert un message caché!' }
    ]);
    
    updateAchievementProgress('secret_message', 1);
  }
  
  // Setup du compteur de sons de creeper
  function setupCreeperSoundCounter() {
    // Le compteur sera géré dans la fonction playSound
    // pour le type 'creeper'
    
    // Hook pour étendre la fonction playSound du script.js
    if (typeof playSound === 'function') {
      const originalPlaySound = playSound;
      
      window.playSound = function(type) {
        originalPlaySound(type);
        
        if (type === 'creeper') {
          updateAchievementProgress('creeper_whisperer', 1);
        }
      };
    } else {
      // Définir une fonction de base si playSound n'existe pas
      window.playSound = function(type) {
        console.log(`Son joué: ${type}`);
        
        if (type === 'creeper') {
          updateAchievementProgress('creeper_whisperer', 1);
        }
      };
    }
  }
  
  // Mise à jour du progrès d'un succès
  function updateAchievementProgress(achievementId, amount = 1) {
    const achievements = JSON.parse(localStorage.getItem('achievements'));
    const achievement = achievements.find(a => a.id === achievementId);
    
    if (achievement) {
      if (achievement.progress.current < achievement.progress.max) {
        achievement.progress.current += amount;
        
        // Limite au maximum
        if (achievement.progress.current > achievement.progress.max) {
          achievement.progress.current = achievement.progress.max;
        }
        
        // Vérifie si le succès vient d'être débloqué
        if (achievement.progress.current === achievement.progress.max) {
          showAchievementNotification(achievement);
        }
        
        localStorage.setItem('achievements', JSON.stringify(achievements));
        
        // Mettre à jour l'affichage des succès si la page est ouverte
        renderAchievements();
      }
    }
  }
  
  // Afficher une notification de succès
  function showAchievementNotification(achievement) {
    if (typeof playSound === 'function') {
      playSound('achievement');
    }
    
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-notification-content">
        <div class="achievement-notification-icon">
          ${achievement.image ? 
            `<img src="${achievement.image}" alt="${achievement.title}" style="width: 32px; height: 32px;">` : 
            `<i class="${achievement.icon}"></i>`
          }
        </div>
        <div class="achievement-notification-text">
          <div class="achievement-notification-title">Succès débloqué!</div>
          <div class="achievement-notification-name">${achievement.title}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 5000);
    
    // Ajouter un message dans le chat Minecraft
    showMinecraftChat([
      { type: 'achievement', text: `${achievement.title} débloqué!` }
    ]);
  }
  
  // Afficher tous les succès sur la page
  function renderAchievements() {
    const achievementsContainer = document.getElementById('achievements-container');
    if (!achievementsContainer) return;
    
    const achievements = JSON.parse(localStorage.getItem('achievements'));
    if (!achievements) return;
    
    achievementsContainer.innerHTML = '';
    
    achievements.forEach(achievement => {
      const isUnlocked = achievement.progress.current >= achievement.progress.max;
      const progressPercentage = (achievement.progress.current / achievement.progress.max) * 100;
      
      const achievementCard = document.createElement('div');
      achievementCard.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;
      achievementCard.innerHTML = `
        ${!isUnlocked && achievement.secret ? `
          <div class="locked-overlay">
            <i class="fas fa-lock" style="font-size: 2rem; color: rgba(255, 255, 255, 0.5);"></i>
          </div>
        ` : ''}
        
        <div class="achievement-icon">
          ${achievement.image && (isUnlocked || !achievement.secret) ? 
            `<img src="${achievement.image}" alt="${achievement.title}" style="width: 48px; height: 48px;">` : 
            `<i class="${achievement.icon}"></i>`
          }
        </div>
        
        <h3 class="achievement-title">${achievement.secret && !isUnlocked ? '???' : achievement.title}</h3>
        
        <p class="achievement-description">${achievement.secret && !isUnlocked ? 'Succès secret à découvrir' : achievement.description}</p>
        
        ${isUnlocked ? `<p class="achievement-date">Débloqué le ${new Date().toLocaleDateString()}</p>` : ''}
        
        <div class="achievement-progress">
          <div class="achievement-progress-bar" style="width: ${progressPercentage}%"></div>
        </div>
        
        <p class="achievement-progress-text">${achievement.progress.current}/${achievement.progress.max}</p>
      `;
      
      achievementsContainer.appendChild(achievementCard);
    });
    
    // Mise à jour du compteur global
    const unlockedCount = achievements.filter(a => a.progress.current >= a.progress.max).length;
    const totalCount = achievements.length;
    const completionPercentage = Math.round((unlockedCount / totalCount) * 100);
    
    const unlockedCountElement = document.getElementById('unlocked-count');
    const totalCountElement = document.getElementById('total-count');
    const completionPercentageElement = document.getElementById('completion-percentage');
    
    if (unlockedCountElement) unlockedCountElement.textContent = unlockedCount;
    if (totalCountElement) totalCountElement.textContent = totalCount;
    if (completionPercentageElement) completionPercentageElement.textContent = `${completionPercentage}%`;
  }
  
  // ------------ MINI-JEUX ------------
  
  // Setup des mini-jeux
  function setupMiniGames() {
    // Ces mini-jeux sont lancés via les portails ou les commandes
    // Aucune initialisation n'est requise ici
  }
  
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
  
  // Afficher le chat Minecraft
  function showMinecraftChat(messages) {
    let chatContainer = document.querySelector('.minecraft-chat');
    
    if (!chatContainer) {
      chatContainer = document.createElement('div');
      chatContainer.className = 'minecraft-chat';
      document.body.appendChild(chatContainer);
    }
    
    // Ajouter les messages
    messages.forEach(message => {
      const messageElement = document.createElement('p');
      messageElement.className = 'minecraft-chat-message';
      
      if (message.type === 'player') {
        messageElement.innerHTML = `<span class="player">${message.name}</span>: ${message.text}`;
      } else if (message.type === 'system') {
        messageElement.innerHTML = `<span class="system">${message.text}</span>`;
      } else if (message.type === 'achievement') {
        messageElement.innerHTML = `<span class="achievement">${message.text}</span>`;
      }
      
      chatContainer.appendChild(messageElement);
    });
    
    // Afficher le chat
    chatContainer.classList.add('active');
    
    // Faire défiler vers le bas
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Cacher le chat après un certain temps
    setTimeout(() => {
      chatContainer.classList.remove('active');
    }, 10000);
  }
  
  // Setup des événements aléatoires
  function setupRandomEvents() {
    // Événements aléatoires qui peuvent se produire
    const events = [
      {
        name: 'falling_diamond',
        probability: 0.0001, // 1/10000 chance à chaque vérification
        action: createFallingDiamond
      },
      {
        name: 'creeper_sound',
        probability: 0.0005, // 1/2000 chance à chaque vérification
        action: playCreeperSound
      }
    ];
    
    // Vérifier les événements aléatoires toutes les 10 secondes
    setInterval(() => {
      events.forEach(event => {
        if (Math.random() < event.probability) {
          event.action();
        }
      });
    }, 10000);
  }
  
  // Créer un diamant qui tombe
  function createFallingDiamond() {
    const diamond = document.createElement('div');
    diamond.style.position = 'fixed';
    diamond.style.width = '30px';
    diamond.style.height = '30px';
    diamond.style.backgroundImage = "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/blue-orb.png')";
    diamond.style.backgroundSize = 'contain';
    diamond.style.backgroundRepeat = 'no-repeat';
    diamond.style.top = '-30px';
    diamond.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
    diamond.style.zIndex = '9998';
    diamond.style.cursor = 'pointer';
    diamond.style.transition = 'top 5s linear';
    
    document.body.appendChild(diamond);
    
    // Faire tomber le diamant
    setTimeout(() => {
      diamond.style.top = `${window.innerHeight + 30}px`;
    }, 10);
    
    // Gérer le clic sur le diamant
    diamond.addEventListener('click', () => {
      if (typeof playSound === 'function') {
        playSound('click');
      }
      
      diamond.style.transform = 'scale(2)';
      diamond.style.opacity = '0';
      diamond.style.transition = 'all 0.3s';
      
      setTimeout(() => {
        diamond.remove();
      }, 300);
      
      // Mettre à jour le progrès des diamants
      updateAchievementProgress('diamond_hunter', 1);
    });
    
    // Supprimer le diamant s'il n'est pas attrapé
    setTimeout(() => {
      if (document.body.contains(diamond)) {
        diamond.remove();
      }
    }, 6000);
  }
  
  // Jouer un son de creeper aléatoire
  function playCreeperSound() {
    if (typeof playSound === 'function') {
      playSound('creeper');
    }
  }
  
  // Setup des éléments interactifs
  function setupInteractiveElements() {
    // Ajouter des effets d'enchantement aux éléments cliquables
    document.querySelectorAll('a, button, .project-card, .skill-card').forEach(element => {
      element.addEventListener('dblclick', (e) => {
        // Empêcher le double-clic normal
        e.preventDefault();
        
        // Vérifier si l'élément est déjà enchanté
        if (element.classList.contains('enchanted')) return;
        
        // Ajouter l'effet d'enchantement
        const enchantEffect = document.createElement('div');
        enchantEffect.style.position = 'absolute';
        enchantEffect.style.top = '0';
        enchantEffect.style.left = '0';
        enchantEffect.style.width = '100%';
        enchantEffect.style.height = '100%';
        enchantEffect.style.pointerEvents = 'none';
        enchantEffect.style.background = 'linear-gradient(45deg, rgba(82, 165, 53, 0.1), rgba(82, 165, 53, 0.3), rgba(82, 165, 53, 0.1))';
        enchantEffect.style.backgroundSize = '200% 200%';
        enchantEffect.style.animation = 'enchant 2s linear infinite';
        
        // S'assurer que l'élément est positionné correctement
        if (getComputedStyle(element).position === 'static') {
          element.style.position = 'relative';
        }
        
        element.appendChild(enchantEffect);
        element.classList.add('enchanted');
        
        // Jouer un son
        if (typeof playSound === 'function') {
          playSound('click');
        }
        
        // Mettre à jour le progrès
        updateAchievementProgress('enchanter', 1);
      });
    });
  }
  
  // Setup du Jukebox
  function setupMusicDiscs() {
    // Créer le bouton du Jukebox
    const jukebox = document.createElement('div');
    jukebox.className = 'jukebox-container';
    jukebox.innerHTML = '<i class="fas fa-music jukebox-icon"></i>';
    document.body.appendChild(jukebox);
    
    // Créer le panneau du Jukebox
    const jukeboxPanel = document.createElement('div');
    jukeboxPanel.className = 'jukebox-panel';
    
    jukeboxPanel.innerHTML = `
      <div class="jukebox-header">
        <h3 class="jukebox-title">Jukebox</h3>
        <button class="jukebox-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="music-discs">
        <div class="music-disc" data-disc="1" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png')"></div>
        <div class="music-disc" data-disc="2" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-fire.png')"></div>
        <div class="music-disc" data-disc="3" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-water.png')"></div>
        <div class="music-disc" data-disc="4" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-electric.png')"></div>
        <div class="music-disc" data-disc="5" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-grass.png')"></div>
        <div class="music-disc" data-disc="6" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-ice.png')"></div>
        <div class="music-disc" data-disc="7" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-fighting.png')"></div>
        <div class="music-disc" data-disc="8" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-poison.png')"></div>
        <div class="music-disc" data-disc="9" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-ground.png')"></div>
      </div>
    `;
    
    document.body.appendChild(jukeboxPanel);
    
    // Ouvrir/fermer le panneau
    jukebox.addEventListener('click', () => {
      jukeboxPanel.classList.toggle('active');
      
      // Jouer un son
      if (typeof playSound === 'function') {
        playSound('click');
      }
    });
    
    // Fermer le panneau avec le bouton
    document.querySelector('.jukebox-close').addEventListener('click', () => {
      jukeboxPanel.classList.remove('active');
    });
    
    // Gérer les disques de musique
    document.querySelectorAll('.music-disc').forEach(disc => {
      disc.addEventListener('click', () => {
        // Arrêter tous les disques en cours de lecture
        document.querySelectorAll('.music-disc.playing').forEach(playingDisc => {
          playingDisc.classList.remove('playing');
        });
        
        // Jouer le disque sélectionné
        disc.classList.add('playing');
        
        // Mettre à jour le progrès
        updateAchievementProgress('music_collector', 1);
        
        // Jouer un son
        if (typeof playSound === 'function') {
          playSound('click');
        }
        
        // Afficher un message dans le chat
        showMinecraftChat([
          { type: 'system', text: `Lecture du disque ${disc.getAttribute('data-disc')}...` }
        ]);
      });
    });
  }
  
  // Setup des événements saisonniers
  function setupSeasonalEvents() {
    // Ce setup est géré dans la fonction checkSeasonalEvent
  }
  
  // ------------ COMMANDE /BAN ------------
  
  function setupBanCommand() {
    let commandBuffer = '';
    const commandTimeout = 2000;
    let lastKeyTime = 0;
    
    // Écouter les touches pour détecter la commande "/ban"
    document.addEventListener('keydown', (e) => {
      const currentTime = new Date().getTime();
      
      // Réinitialiser le buffer si trop de temps a passé depuis la dernière touche
      if (currentTime - lastKeyTime > commandTimeout) {
        commandBuffer = '';
      }
      
      lastKeyTime = currentTime;
      commandBuffer += e.key;
      
      // Vérifier si la commande "/ban" a été tapée
      if (commandBuffer.includes('/ban')) {
        commandBuffer = '';
        openBanPanel();
      }
    });
  }
  
  function openBanPanel() {
    // Vérifier si le panneau existe déjà
    if (document.getElementById('ban-panel')) return;
    
    // Son d'ouverture du panneau
    if (typeof playSound === 'function') {
      playSound('click');
    }
    
    // Créer le panneau de ban
    const banPanel = document.createElement('div');
    banPanel.id = 'ban-panel';
    banPanel.className = 'ban-panel';
    
    banPanel.innerHTML = `
      <div class="ban-panel-header">
        <h2>Panneau d'administration</h2>
        <button id="close-ban-panel"><i class="fas fa-times"></i></button>
      </div>
      
      <div class="ban-panel-content">
        <div class="ban-panel-section">
          <h3>Liste des utilisateurs</h3>
          <div class="user-list">
            <div class="user-item" data-user="Notch">
              <div class="user-avatar">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/hiker.png">
              </div>
              <div class="user-info">
                <span class="user-name">Notch</span>
                <span class="user-role admin">Administrateur</span>
              </div>
              <button class="ban-button" disabled title="Vous ne pouvez pas bannir un administrateur">
                <i class="fas fa-ban"></i> Bannir
              </button>
            </div>
            
            <div class="user-item" data-user="Steve">
              <div class="user-avatar">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/worker.png">
              </div>
              <div class="user-info">
                <span class="user-name">Steve</span>
                <span class="user-role member">Membre</span>
              </div>
              <button class="ban-button">
                <i class="fas fa-ban"></i> Bannir
              </button>
            </div>
            
            <div class="user-item" data-user="Alex">
              <div class="user-avatar">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/lady.png">
              </div>
              <div class="user-info">
                <span class="user-name">Alex</span>
                <span class="user-role member">Membre</span>
              </div>
              <button class="ban-button">
                <i class="fas fa-ban"></i> Bannir
              </button>
            </div>
            
            <div class="user-item" data-user="Creeper123">
              <div class="user-avatar">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/green-scarf.png">
              </div>
              <div class="user-info">
                <span class="user-name">Creeper123</span>
                <span class="user-role member">Membre</span>
              </div>
              <button class="ban-button">
                <i class="fas fa-ban"></i> Bannir
              </button>
            </div>
            
            <div class="user-item" data-user="EnderDragon">
              <div class="user-avatar">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/black-sludge.png">
              </div>
              <div class="user-info">
                <span class="user-name">EnderDragon</span>
                <span class="user-role moderator">Modérateur</span>
              </div>
              <button class="ban-button">
                <i class="fas fa-ban"></i> Bannir
              </button>
            </div>
            
            <div class="user-item" data-user="ZombiePig">
              <div class="user-avatar">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pink-scarf.png">
              </div>
              <div class="user-info">
                <span class="user-name">ZombiePig</span>
                <span class="user-role member">Membre</span>
              </div>
              <button class="ban-button">
                <i class="fas fa-ban"></i> Bannir
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(banPanel);
    
    // Fermer le panneau
    document.getElementById('close-ban-panel').addEventListener('click', () => {
      closeBanPanel();
    });
    
    // Gestionnaire de ban
    const banButtons = document.querySelectorAll('.ban-button:not([disabled])');
    banButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const userItem = e.target.closest('.user-item');
        const username = userItem.getAttribute('data-user');
        
        openBanReasonDialog(username, userItem);
      });
    });
  }
  
  function openBanReasonDialog(username, userItem) {
    // Créer la boîte de dialogue de raison du ban
    const banReasonDialog = document.createElement('div');
    banReasonDialog.className = 'ban-reason-dialog';
    
    banReasonDialog.innerHTML = `
      <h3>Raison du ban pour ${username}</h3>
      <input type="text" class="ban-reason-input" placeholder="Entrez la raison du ban...">
      <div class="ban-reason-buttons">
        <button class="cancel-ban">Annuler</button>
        <button class="confirm-ban">Confirmer</button>
      </div>
    `;
    
    document.body.appendChild(banReasonDialog);
    
    // Focus sur l'input
    banReasonDialog.querySelector('.ban-reason-input').focus();
    
    // Gestionnaire d'annulation
    banReasonDialog.querySelector('.cancel-ban').addEventListener('click', () => {
      banReasonDialog.remove();
    });
    
    // Gestionnaire de confirmation
    banReasonDialog.querySelector('.confirm-ban').addEventListener('click', () => {
      const banReason = banReasonDialog.querySelector('.ban-reason-input').value.trim() || 'Aucune raison spécifiée';
      
      // Suppression de l'utilisateur
      userItem.style.opacity = '0';
      userItem.style.height = '0';
      userItem.style.padding = '0';
      userItem.style.margin = '0';
      userItem.style.overflow = 'hidden';
      
      // Son d'explosion
      if (typeof playSound === 'function') {
        playSound('explosion');
      }
      
      // Affichage du message de ban
      const banMessage = document.createElement('div');
      banMessage.className = 'ban-message';
      banMessage.style.padding = '10px';
      banMessage.style.margin = '10px 0';
      banMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
      banMessage.style.borderRadius = '4px';
      banMessage.style.border = '1px solid rgba(255, 0, 0, 0.3)';
      banMessage.style.color = '#ff5555';
      banMessage.style.textAlign = 'center';
      banMessage.innerHTML = `<i class="fas fa-ban"></i> ${username} a été banni. Raison: ${banReason}`;
      
      const userList = document.querySelector('.user-list');
      userList.insertBefore(banMessage, userItem);
      
      // Suppression définitive de l'utilisateur après l'animation
      setTimeout(() => {
        userItem.remove();
      }, 300);
      
      // Fermeture de la boîte de dialogue
      banReasonDialog.remove();
      
      // Mise à jour du progrès du succès "Marteau de Ban"
      updateAchievementProgress('ban_hammer', 1);
      
      // Ajouter un message dans le chat Minecraft
      showMinecraftChat([
        { type: 'system', text: `${username} a été banni du serveur. Raison: ${banReason}` }
      ]);
    });
  }
  
  function closeBanPanel() {
    const banPanel = document.getElementById('ban-panel');
    if (banPanel) {
      banPanel.style.transform = 'translate(-50%, -50%) scale(0.8)';
      banPanel.style.opacity = '0';
      
      setTimeout(() => {
        banPanel.remove();
      }, 300);
    }
  }
  
  // ------------ COMMANDES SECRÈTES ------------
  
  function setupSecretCommands() {
    let commandBuffer = '';
    const commandTimeout = 2000;
    let lastKeyTime = 0;
    
    // Liste des commandes secrètes
    const secretCommands = [
      {
        command: '/give',
        action: () => {
          showItemGivePanel();
          updateAchievementProgress('command_guru', 1);
        }
      },
      {
        command: '/tp',
        action: () => {
          teleportAnimation();
          updateAchievementProgress('command_guru', 1);
        }
      },
      {
        command: '/time',
        action: () => {
          toggleDayNightCycle();
          updateAchievementProgress('command_guru', 1);
        }
      },
      {
        command: '/weather',
        action: () => {
          toggleWeatherEffect();
          updateAchievementProgress('command_guru', 1);
        }
      },
      {
        command: '/game',
        action: () => {
          openGameMenu();
          updateAchievementProgress('command_guru', 1);
        }
      },
      {
        command: '/help',
        action: () => {
          showCommandList();
          updateAchievementProgress('command_guru', 1);
        }
      }
    ];
    
    // Écouter les touches pour détecter les commandes
    document.addEventListener('keydown', (e) => {
      const currentTime = new Date().getTime();
      
      // Réinitialiser le buffer si trop de temps a passé depuis la dernière touche
      if (currentTime - lastKeyTime > commandTimeout) {
        commandBuffer = '';
      }
      
      lastKeyTime = currentTime;
      commandBuffer += e.key;
      
      // Vérifier les commandes
      secretCommands.forEach(cmd => {
        if (commandBuffer.includes(cmd.command)) {
          commandBuffer = '';
          cmd.action();
        }
      });
      
      // Vérifier le code Konami
      if (commandBuffer.includes('ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba')) {
        commandBuffer = '';
        activateSuperSecretMode();
        updateAchievementProgress('konami_master', 1);
      }
    });
  }
  
  // Ouvrir le menu des jeux
  function openGameMenu() {
    showCommandNotification('Menu des jeux');
    
    // Créer un menu des jeux disponibles
    const gameMenu = document.createElement('div');
    gameMenu.style.position = 'fixed';
    gameMenu.style.top = '50%';
    gameMenu.style.left = '50%';
    gameMenu.style.transform = 'translate(-50%, -50%)';
    gameMenu.style.background = 'rgba(30, 33, 40, 0.95)';
    gameMenu.style.borderRadius = '8px';
    gameMenu.style.border = '3px solid var(--primary)';
    gameMenu.style.padding = '20px';
    gameMenu.style.zIndex = '9999';
    gameMenu.style.display = 'flex';
    gameMenu.style.flexDirection = 'column';
    gameMenu.style.gap = '15px';
    gameMenu.style.minWidth = '300px';
    
    gameMenu.innerHTML = `
<div class="game-option" data-game="snake" style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 6px; text-align: center; cursor: pointer; transition: all 0.2s;">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/silver-leaf.png" style="width: 32px; height: 32px; margin-bottom: 10px;">
        <div style="font-family: 'Minecraft', 'Outfit', sans-serif; color: white;">Serpent</div>
      </div>
      <div class="game-option" data-game="clicker" style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 6px; text-align: center; cursor: pointer; transition: all 0.2s;">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png" style="width: 32px; height: 32px; margin-bottom: 10px;">
        <div style="font-family: 'Minecraft', 'Outfit', sans-serif; color: white;">Clicker</div>
      </div>
      <div class="game-option" data-game="memory" style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 6px; text-align: center; cursor: pointer; transition: all 0.2s;">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-psychic.png" style="width: 32px; height: 32px; margin-bottom: 10px;">
        <div style="font-family: 'Minecraft', 'Outfit', sans-serif; color: white;">Mémoire</div>
      </div>
      <div class="game-option" data-game="jukebox" style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 6px; text-align: center; cursor: pointer; transition: all 0.2s;">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-ghost.png" style="width: 32px; height: 32px; margin-bottom: 10px;">
        <div style="font-family: 'Minecraft', 'Outfit', sans-serif; color: white;">Jukebox</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(gameMenu);
  
  // Fermer le menu
  document.getElementById('close-game-menu').addEventListener('click', () => {
    gameMenu.remove();
  });
  
  // Styliser les options au survol
  const gameOptions = document.querySelectorAll('.game-option');
  gameOptions.forEach(option => {
    option.addEventListener('mouseover', () => {
      option.style.background = 'rgba(82, 165, 53, 0.3)';
      option.style.transform = 'translateY(-3px)';
    });
    
    option.addEventListener('mouseout', () => {
      option.style.background = 'rgba(0, 0, 0, 0.3)';
      option.style.transform = 'translateY(0)';
    });
    
    // Lancer le jeu sélectionné
    option.addEventListener('click', () => {
      const game = option.getAttribute('data-game');
      gameMenu.remove();
      
      switch (game) {
        case 'snake':
          openSnakeGame();
          break;
        case 'clicker':
          openClickerGame();
          break;
        case 'memory':
          openMemoryGame();
          break;
        case 'jukebox':
          openJukebox();
          break;
      }
    });
  });
}

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

// Ouvrir le Jukebox
function openJukebox() {
  const jukeboxContainer = document.querySelector('.jukebox-container');
  
  // Créer le Jukebox s'il n'existe pas
  if (!jukeboxContainer) {
    setupMusicDiscs();
  }
  
  // Afficher le panneau du Jukebox
  const jukeboxPanel = document.querySelector('.jukebox-panel');
  if (jukeboxPanel) {
    jukeboxPanel.classList.add('active');
  }
}

// Afficher la liste des commandes
function showCommandList() {
  const commandList = document.createElement('div');
  commandList.style.position = 'fixed';
  commandList.style.top = '50%';
  commandList.style.left = '50%';
  commandList.style.transform = 'translate(-50%, -50%)';
  commandList.style.background = 'rgba(30, 33, 40, 0.95)';
  commandList.style.borderRadius = '8px';
  commandList.style.border = '3px solid var(--primary)';
  commandList.style.padding = '20px';
  commandList.style.zIndex = '9999';
  commandList.style.minWidth = '300px';
  commandList.style.maxWidth = '500px';
  
  commandList.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
      <h3 style="font-family: 'Minecraft', 'Outfit', sans-serif; color: var(--primary); margin: 0;">Liste des commandes</h3>
      <button id="close-command-list" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;"><i class="fas fa-times"></i></button>
    </div>
    <div style="overflow-y: auto; max-height: 60vh;">
      <table style="width: 100%; border-collapse: collapse; color: white; font-family: 'Minecraft', 'Outfit', sans-serif; font-size: 14px;">
        <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
          <th style="text-align: left; padding: 8px 16px; color: var(--primary);">Commande</th>
          <th style="text-align: left; padding: 8px 16px; color: var(--primary);">Description</th>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
          <td style="padding: 8px 16px;">/ban</td>
          <td style="padding: 8px 16px;">Ouvre le panneau d'administration</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
          <td style="padding: 8px 16px;">/give</td>
          <td style="padding: 8px 16px;">Donne un objet aléatoire</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
          <td style="padding: 8px 16px;">/tp</td>
          <td style="padding: 8px 16px;">Téléporte vers une section aléatoire</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
          <td style="padding: 8px 16px;">/time</td>
          <td style="padding: 8px 16px;">Bascule entre le mode jour et nuit</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
          <td style="padding: 8px 16px;">/weather</td>
          <td style="padding: 8px 16px;">Active ou désactive l'effet météo</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
          <td style="padding: 8px 16px;">/game</td>
          <td style="padding: 8px 16px;">Ouvre le menu des mini-jeux</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
          <td style="padding: 8px 16px;">/help</td>
          <td style="padding: 8px 16px;">Affiche cette liste de commandes</td>
        </tr>
        <tr>
          <td style="padding: 8px 16px;">↑↑↓↓←→←→ba</td>
          <td style="padding: 8px 16px;">Code Konami (mode secret)</td>
        </tr>
      </table>
    </div>
  `;
  
  document.body.appendChild(commandList);
  
  // Fermer la liste
  document.getElementById('close-command-list').addEventListener('click', () => {
    commandList.remove();
  });
}

// Afficher le panneau de don d'objets
function showItemGivePanel() {
  if (typeof playSound === 'function') {
    playSound('click');
  }
  
  // Liste des objets possibles
  const items = [
    { name: 'Diamant', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/blue-orb.png', rarity: 'rare' },
    { name: 'Potion', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png', rarity: 'common' },
    { name: 'Super Potion', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png', rarity: 'uncommon' },
    { name: 'Hyper Potion', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png', rarity: 'rare' },
    { name: 'Pokeball', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png', rarity: 'common' },
    { name: 'Grande Ball', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png', rarity: 'uncommon' },
    { name: 'Ultra Ball', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png', rarity: 'rare' },
    { name: 'Master Ball', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png', rarity: 'legendary' },
    { name: 'Baie', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/wiki-berry.png', rarity: 'common' },
    { name: 'Pierre Feu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-stone.png', rarity: 'uncommon' },
    { name: 'Pierre Eau', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/water-stone.png', rarity: 'uncommon' },
    { name: 'Pierre Plante', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/leaf-stone.png', rarity: 'uncommon' },
    { name: 'Pierre Foudre', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/thunder-stone.png', rarity: 'uncommon' },
    { name: 'Pierre Lune', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/moon-stone.png', rarity: 'rare' },
    { name: 'Orbe Magique', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/comet-shard.png', rarity: 'legendary' }
  ];
  
  // Sélectionner un objet aléatoire en fonction de sa rareté
  const rarityWeights = {
    common: 0.5,
    uncommon: 0.3,
    rare: 0.15,
    legendary: 0.05
  };
  
  let randomValue = Math.random();
  let selectedRarity;
  
  if (randomValue < rarityWeights.legendary) {
    selectedRarity = 'legendary';
  } else if (randomValue < rarityWeights.legendary + rarityWeights.rare) {
    selectedRarity = 'rare';
  } else if (randomValue < rarityWeights.legendary + rarityWeights.rare + rarityWeights.uncommon) {
    selectedRarity = 'uncommon';
  } else {
    selectedRarity = 'common';
  }
  
  // Filtrer les objets par rareté
  const itemsOfSelectedRarity = items.filter(item => item.rarity === selectedRarity);
  
  // Sélectionner un objet aléatoire dans la catégorie
  const selectedItem = itemsOfSelectedRarity[Math.floor(Math.random() * itemsOfSelectedRarity.length)];
  
  // Couleurs des raretés
  const rarityColors = {
    common: '#AAAAAA',
    uncommon: '#55FF55',
    rare: '#5555FF',
    legendary: '#FFAA00'
  };
  
  // Créer la notification
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.top = '50%';
  notification.style.left = '50%';
  notification.style.transform = 'translate(-50%, -50%)';
  notification.style.backgroundColor = 'rgba(30, 33, 40, 0.95)';
  notification.style.padding = '20px';
  notification.style.borderRadius = '8px';
  notification.style.border = `3px solid ${rarityColors[selectedRarity]}`;
  notification.style.color = 'white';
  notification.style.zIndex = '9999';
  notification.style.fontFamily = 'Minecraft, Outfit, sans-serif';
  notification.style.textAlign = 'center';
  notification.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
  notification.style.minWidth = '250px';
  
  notification.innerHTML = `
    <div style="font-size: 18px; margin-bottom: 15px;">Vous avez reçu :</div>
    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
      <img src="${selectedItem.image}" style="width: 64px; height: 64px; animation: item-rotate 3s infinite alternate;">
    </div>
    <div style="font-size: 24px; color: ${rarityColors[selectedRarity]}; margin-bottom: 5px;">${selectedItem.name}</div>
    <div style="font-size: 14px; color: ${rarityColors[selectedRarity]}; opacity: 0.8; margin-bottom: 20px;">${selectedRarity.charAt(0).toUpperCase() + selectedRarity.slice(1)}</div>
    <button id="close-item-notification" style="background: #333; border: 1px solid #555; color: white; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-family: 'Minecraft', 'Outfit', sans-serif;">Fermer</button>
  `;
  
  document.body.appendChild(notification);
  
  // Ajouter l'animation pour l'item
  const style = document.createElement('style');
  style.textContent = `
    @keyframes item-rotate {
      0% { transform: rotate(-5deg) scale(1); }
      50% { transform: rotate(5deg) scale(1.1); }
      100% { transform: rotate(-5deg) scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  // Fermer la notification
  document.getElementById('close-item-notification').addEventListener('click', () => {
    notification.remove();
  });
  
  // Jouer un son en fonction de la rareté
  if (typeof playSound === 'function') {
    if (selectedRarity === 'legendary') {
      playSound('achievement');
    } else {
      playSound('click');
    }
  }
  
  // Si c'est un diamant, mettre à jour le succès
  if (selectedItem.name === 'Diamant') {
    updateAchievementProgress('diamond_hunter', 1);
  }
}

// Animation de téléportation
function teleportAnimation() {
  if (typeof playSound === 'function') {
    playSound('click');
  }
  
  // Créer un effet de téléportation
  const teleportEffect = document.createElement('div');
  teleportEffect.style.position = 'fixed';
  teleportEffect.style.top = '0';
  teleportEffect.style.left = '0';
  teleportEffect.style.width = '100%';
  teleportEffect.style.height = '100%';
  teleportEffect.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
  teleportEffect.style.zIndex = '9998';
  teleportEffect.style.opacity = '0';
  teleportEffect.style.transition = 'opacity 0.5s';
  
  // Ajouter des particules
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.backgroundColor = '#9955FF';
    particle.style.borderRadius = '50%';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    teleportEffect.appendChild(particle);
    
    // Animation de particule
    particle.animate([
      { opacity: 0, transform: 'scale(0)' },
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(0)' }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
  }
  
  document.body.appendChild(teleportEffect);
  
  // Afficher l'effet
  setTimeout(() => {
    teleportEffect.style.opacity = '1';
  }, 10);
  
  // Faire défiler vers une section aléatoire
  setTimeout(() => {
    const sections = document.querySelectorAll('section');
    if (sections.length > 0) {
      const randomSection = sections[Math.floor(Math.random() * sections.length)];
      randomSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    teleportEffect.style.opacity = '0';
    
    setTimeout(() => {
      teleportEffect.remove();
    }, 500);
  }, 1000);
}

// Cycle jour/nuit
function toggleDayNightCycle() {
  if (typeof playSound === 'function') {
    playSound('click');
  }
  
  const body = document.body;
  
  // Vérifier l'état actuel
  const isDayMode = body.classList.contains('light-mode');
  
  // Basculer le thème
  if (isDayMode) {
    body.classList.remove('light-mode');
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('theme', 'dark');
    
    // Créer une notification
    showCommandNotification('Temps défini sur nuit');
  } else {
    body.classList.add('light-mode');
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    localStorage.setItem('theme', 'light');
    
    // Créer une notification
    showCommandNotification('Temps défini sur jour');
  }
  
  // Animation du soleil/lune
  const skyAnimation = document.createElement('div');
  skyAnimation.style.position = 'fixed';
  skyAnimation.style.top = '0';
  skyAnimation.style.left = '0';
  skyAnimation.style.width = '100%';
  skyAnimation.style.height = '100%';
  skyAnimation.style.pointerEvents = 'none';
  skyAnimation.style.zIndex = '9995';
  
  // Ciel en dégradé
  skyAnimation.style.background = isDayMode 
    ? 'linear-gradient(to bottom, #111724 0%, #242F41 100%)' 
    : 'linear-gradient(to bottom, #64B6FF 0%, #C4E0FF 100%)';
  skyAnimation.style.opacity = '0';
  skyAnimation.style.transition = 'opacity 0.5s';
  
  // Ajouter l'astre (soleil ou lune)
  const celestialBody = document.createElement('div');
  celestialBody.style.position = 'absolute';
  celestialBody.style.width = '100px';
  celestialBody.style.height = '100px';
  celestialBody.style.borderRadius = '50%';
  celestialBody.style.top = '-120px';
  celestialBody.style.left = '50%';
  celestialBody.style.transform = 'translateX(-50%)';
  celestialBody.style.background = isDayMode ? '#E1E1E1' : '#FFDB80';
  celestialBody.style.boxShadow = isDayMode 
    ? '0 0 30px rgba(255, 255, 255, 0.8)' 
    : '0 0 50px rgba(255, 224, 130, 0.5)';
  
  skyAnimation.appendChild(celestialBody);
  document.body.appendChild(skyAnimation);
  
  // Animer le ciel
  setTimeout(() => {
    skyAnimation.style.opacity = '0.7';
  }, 10);
  
  // Animer l'astre
  celestialBody.animate([
    { top: '-120px' },
    { top: '120%' }
  ], {
    duration: 2000,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  });
  
  // Supprimer l'animation après un moment
  setTimeout(() => {
    skyAnimation.style.opacity = '0';
    setTimeout(() => {
      skyAnimation.remove();
    }, 500);
  }, 2000);
}

// Effet météo
function toggleWeatherEffect() {
  if (typeof playSound === 'function') {
    playSound('click');
  }
  
  // Vérifier si l'effet météo existe déjà
  const existingWeather = document.getElementById('weather-effect');
  
  if (existingWeather) {
    // Supprimer l'effet météo existant
    existingWeather.remove();
    showCommandNotification('Météo définie sur claire');
    return;
  }
  
  // Créer un panneau de choix météo
  const weatherMenu = document.createElement('div');
  weatherMenu.style.position = 'fixed';
  weatherMenu.style.top = '50%';
  weatherMenu.style.left = '50%';
  weatherMenu.style.transform = 'translate(-50%, -50%)';
  weatherMenu.style.background = 'rgba(30, 33, 40, 0.95)';
  weatherMenu.style.borderRadius = '8px';
  weatherMenu.style.border = '3px solid var(--primary)';
  weatherMenu.style.padding = '20px';
  weatherMenu.style.zIndex = '9999';
  weatherMenu.style.minWidth = '300px';
  
  weatherMenu.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3 style="font-family: 'Minecraft', 'Outfit', sans-serif; color: var(--primary); margin: 0;">Choisir la météo</h3>
      <button id="close-weather-menu" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;"><i class="fas fa-times"></i></button>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
      <div class="weather-option" data-weather="rain" style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 6px; text-align: center; cursor: pointer; transition: all 0.2s;">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mystic-water.png" style="width: 42px; height: 42px; margin-bottom: 10px;">
        <div style="font-family: 'Minecraft', 'Outfit', sans-serif; color: white;">Pluie</div>
      </div>
      <div class="weather-option" data-weather="snow" style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 6px; text-align: center; cursor: pointer; transition: all 0.2s;">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ice-stone.png" style="width: 42px; height: 42px; margin-bottom: 10px;">
        <div style="font-family: 'Minecraft', 'Outfit', sans-serif; color: white;">Neige</div>
      </div>
      <div class="weather-option" data-weather="thunder" style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 6px; text-align: center; cursor: pointer; transition: all 0.2s;">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/thunder-stone.png" style="width: 42px; height: 42px; margin-bottom: 10px;">
        <div style="font-family: 'Minecraft', 'Outfit', sans-serif; color: white;">Orage</div>
      </div>
      <div class="weather-option" data-weather="fog" style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 6px; text-align: center; cursor: pointer; transition: all 0.2s;">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mist-stone.png" style="width: 42px; height: 42px; margin-bottom: 10px;">
        <div style="font-family: 'Minecraft', 'Outfit', sans-serif; color: white;">Brouillard</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(weatherMenu);
  
  // Fermer le menu
  document.getElementById('close-weather-menu').addEventListener('click', () => {
    weatherMenu.remove();
  });
  
  // Styliser les options au survol
  const weatherOptions = document.querySelectorAll('.weather-option');
  weatherOptions.forEach(option => {
    option.addEventListener('mouseover', () => {
      option.style.background = 'rgba(82, 165, 53, 0.3)';
      option.style.transform = 'translateY(-3px)';
    });
    
    option.addEventListener('mouseout', () => {
      option.style.background = 'rgba(0, 0, 0, 0.3)';
      option.style.transform = 'translateY(0)';
    });
    
    // Activer la météo sélectionnée
    option.addEventListener('click', () => {
      const weather = option.getAttribute('data-weather');
      weatherMenu.remove();
      activateWeather(weather);
    });
  });
}

// Activer un effet météo
function activateWeather(type) {
  // Supprimer l'effet météo existant
  const existingWeather = document.getElementById('weather-effect');
  if (existingWeather) {
    existingWeather.remove();
  }
  
  // Créer l'effet météo
  const weatherEffect = document.createElement('div');
  weatherEffect.id = 'weather-effect';
  weatherEffect.style.position = 'fixed';
  weatherEffect.style.top = '0';
  weatherEffect.style.left = '0';
  weatherEffect.style.width = '100%';
  weatherEffect.style.height = '100%';
  weatherEffect.style.pointerEvents = 'none';
  weatherEffect.style.zIndex = '9997';
  
  // Créer l'effet selon le type
  switch (type) {
    case 'rain':
      createRainEffect(weatherEffect);
      showCommandNotification('Météo définie sur pluie');
      break;
    case 'snow':
      createSnowEffect(weatherEffect);
      showCommandNotification('Météo définie sur neige');
      break;
    case 'thunder':
      createThunderEffect(weatherEffect);
      showCommandNotification('Météo définie sur orage');
      break;
    case 'fog':
      createFogEffect(weatherEffect);
      showCommandNotification('Météo définie sur brouillard');
      break;
  }
  
  document.body.appendChild(weatherEffect);
}

// Créer un effet de pluie
function createRainEffect(container) {
  container.style.background = 'linear-gradient(to bottom, rgba(30, 60, 100, 0.1), rgba(30, 60, 100, 0.3))';
  
  // Créer des gouttes de pluie
  for (let i = 0; i < 100; i++) {
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';
    raindrop.style.position = 'absolute';
    raindrop.style.width = '2px';
    raindrop.style.height = '15px';
    raindrop.style.backgroundColor = 'rgba(173, 216, 230, 0.6)';
    raindrop.style.left = `${Math.random() * 100}%`;
    raindrop.style.top = `${Math.random() * 100}%`;
    raindrop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
    raindrop.style.animationTimingFunction = 'linear';
    raindrop.style.animationIterationCount = 'infinite';
    
    const animationDelay = Math.random() * 1;
    raindrop.style.animationDelay = `${animationDelay}s`;
    
    container.appendChild(raindrop);
  }
  
  // Créer le style pour l'animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes raindrop-fall {
      0% { transform: translateY(-100px) }
      100% { transform: translateY(100vh) }
    }
    
    .raindrop {
      animation-name: raindrop-fall;
      transform: rotate(20deg);
    }
  `;
  
  document.head.appendChild(style);
}

// Créer un effet de neige
function createSnowEffect(container) {
  container.style.background = 'linear-gradient(to bottom, rgba(200, 220, 240, 0.1), rgba(200, 220, 240, 0.3))';
  
  // Créer des flocons de neige
  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.position = 'absolute';
    snowflake.style.width = `${Math.random() * 5 + 5}px`;
    snowflake.style.height = snowflake.style.width;
    snowflake.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    snowflake.style.borderRadius = '50%';
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.top = `${Math.random() * 100}%`;
    snowflake.style.animationDuration = `${5 + Math.random() * 5}s`;
    snowflake.style.animationTimingFunction = 'linear';
    snowflake.style.animationIterationCount = 'infinite';
    
    const animationDelay = Math.random() * 5;
    snowflake.style.animationDelay = `${animationDelay}s`;
    
    container.appendChild(snowflake);
  }
  
  // Créer le style pour l'animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes snowflake-fall {
      0% { transform: translateY(-50px) translateX(0) rotate(0deg); }
      25% { transform: translateY(25vh) translateX(20px) rotate(90deg); }
      50% { transform: translateY(50vh) translateX(-20px) rotate(180deg); }
      75% { transform: translateY(75vh) translateX(20px) rotate(270deg); }
      100% { transform: translateY(100vh) translateX(0) rotate(360deg); }
    }
    
    .snowflake {
      animation-name: snowflake-fall;
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
  `;
  
  document.head.appendChild(style);
}

// Créer un effet d'orage
function createThunderEffect(container) {
  container.style.background = 'linear-gradient(to bottom, rgba(30, 30, 50, 0.3), rgba(30, 30, 50, 0.6))';
  
  // Créer des gouttes de pluie
  for (let i = 0; i < 150; i++) {
    const raindrop = document.createElement('div');
    raindrop.className = 'thunder-raindrop';
    raindrop.style.position = 'absolute';
    raindrop.style.width = '2px';
    raindrop.style.height = '15px';
    raindrop.style.backgroundColor = 'rgba(173, 216, 230, 0.6)';
    raindrop.style.left = `${Math.random() * 100}%`;
    raindrop.style.top = `${Math.random() * 100}%`;
    raindrop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
    raindrop.style.animationTimingFunction = 'linear';
    raindrop.style.animationIterationCount = 'infinite';
    
    const animationDelay = Math.random() * 1;
    raindrop.style.animationDelay = `${animationDelay}s`;
    
    container.appendChild(raindrop);
  }
  
  // Créer l'effet d'éclair
  const lightning = document.createElement('div');
  lightning.className = 'lightning';
  lightning.style.position = 'absolute';
  lightning.style.top = '0';
  lightning.style.left = '0';
  lightning.style.width = '100%';
  lightning.style.height = '100%';
  lightning.style.backgroundColor = 'rgba(255, 255, 255, 0)';
  lightning.style.zIndex = '2';
  lightning.style.pointerEvents = 'none';
  
  container.appendChild(lightning);
  
  // Créer le style pour l'animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes thunder-raindrop-fall {
      0% { transform: translateY(-100px) rotate(20deg); }
      100% { transform: translateY(100vh) rotate(20deg); }
    }
    
    .thunder-raindrop {
      animation-name: thunder-raindrop-fall;
    }
    
    @keyframes lightning-flash {
      0%, 100% { background-color: rgba(255, 255, 255, 0); }
      50% { background-color: rgba(255, 255, 255, 0.7); }
    }
  `;
  
  document.head.appendChild(style);
  
  // Animer l'éclair aléatoirement
  function flashLightning() {
    lightning.animate([
      { backgroundColor: 'rgba(255, 255, 255, 0)' },
      { backgroundColor: 'rgba(255, 255, 255, 0.7)' },
      { backgroundColor: 'rgba(255, 255, 255, 0)' }
    ], {
      duration: 300,
      easing: 'ease-out'
    });
    
    // Jouer un son
    if (typeof playSound === 'function') {
      setTimeout(() => {
        playSound('explosion');
      }, 300);
    }
    
    // Programmer le prochain éclair
    setTimeout(flashLightning, Math.random() * 8000 + 2000);
  }
  
  // Démarrer les éclairs
  setTimeout(flashLightning, Math.random() * 3000 + 1000);
}

// Créer un effet de brouillard
function createFogEffect(container) {
  container.style.background = 'rgba(200, 200, 210, 0.5)';
  container.style.backdropFilter = 'blur(10px)';
  
  // Créer des nuages de brouillard
  for (let i = 0; i < 20; i++) {
    const fogCloud = document.createElement('div');
    fogCloud.className = 'fog-cloud';
    fogCloud.style.position = 'absolute';
    fogCloud.style.width = `${Math.random() * 200 + 100}px`;
    fogCloud.style.height = `${Math.random() * 100 + 50}px`;
    fogCloud.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    fogCloud.style.borderRadius = '50%';
    fogCloud.style.filter = 'blur(30px)';
    fogCloud.style.left = `${Math.random() * 100}%`;
    fogCloud.style.top = `${Math.random() * 100}%`;
    fogCloud.style.animationDuration = `${30 + Math.random() * 30}s`;
    fogCloud.style.animationTimingFunction = 'linear';
    fogCloud.style.animationIterationCount = 'infinite';
    
    const animationDelay = Math.random() * 30;
    fogCloud.style.animationDelay = `${animationDelay}s`;
    
    container.appendChild(fogCloud);
  }
  
  // Créer le style pour l'animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fog-drift {
      0% { transform: translateX(-100%) translateY(0); }
      100% { transform: translateX(100vw) translateY(0); }
    }
    
    .fog-cloud {
      animation-name: fog-drift;
      opacity: 0.5;
    }
  `;
  
  document.head.appendChild(style);
}

// Afficher une notification de commande
function showCommandNotification(message) {
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';
  notification.style.backgroundColor = 'rgba(30, 33, 40, 0.9)';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '4px';
  notification.style.border = '2px solid var(--primary)';
  notification.style.color = 'white';
  notification.style.zIndex = '9999';
  notification.style.fontFamily = 'Minecraft, Outfit, sans-serif';
  notification.style.textAlign = 'center';
  notification.innerText = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(-50%) translateY(-20px)';
    notification.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 2000);
}

// ------------ MODE SUPER SECRET ------------

function activateSuperSecretMode() {
  if (typeof playSound === 'function') {
    playSound('achievement');
  }
  
  // Effet d'explosion
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
  // Ajouter la classe au body
  document.body.classList.add('creeper-mode');
  
  // Ajouter les styles spécifiques pour le mode Creeper
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
      background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/green-scarf.png');
      background-size: contain;
      z-index: 9998;
      opacity: 0.8;
      transform: translate(-50%, -50%);
    }
  `;
  
  document.head.appendChild(creeperStyle);
  
  // Notification
  showAchievementNotification({
    title: 'Maître du Code',
    description: 'Vous avez débloqué le mode Creeper!',
    icon: 'fas fa-keyboard',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/up-grade.png'
  });
  
  // Afficher le creeper qui suit le curseur
  const creeperFace = document.createElement('div');
  creeperFace.className = 'creeper-face';
  document.body.appendChild(creeperFace);
  
  document.addEventListener('mousemove', (e) => {
    creeperFace.style.left = `${e.clientX}px`;
    creeperFace.style.top = `${e.clientY}px`;
  });
  
  // Son de creeper
  if (typeof playSound === 'function') {
    playSound('creeper');
  }
  
  // Sons aléatoires de creeper
  setInterval(() => {
    if (Math.random() < 0.05 && typeof playSound === 'function') {
      playSound('creeper');
    }
  }, 30000); // Toutes les 30 secondes (en moyenne 1 fois toutes les 10 minutes)
  
  // Ajouter un message dans le chat Minecraft
  showMinecraftChat([
    { type: 'system', text: 'Mode Creeper activé!' },
    { type: 'player', name: 'Creeper123', text: 'Ssssssss...' }
  ]);
}