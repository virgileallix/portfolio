// Fichier de gestion des succès Minecraft

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