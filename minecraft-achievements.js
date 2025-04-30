/**
 * Minecraft Achievements System
 * Ajoute un système complet de succès style Minecraft au site web
 */

class MinecraftAchievements {
    constructor() {
      this.achievements = {
        // Achievements de base (navigation)
        FIRST_VISIT: {
          id: 'first_visit',
          title: 'Premier pas',
          description: 'Visiter le site pour la première fois',
          icon: 'dirt', // icône de bloc de terre
          secret: false,
          unlocked: false,
          points: 5
        },
        VISIT_ALL_PAGES: {
          id: 'visit_all_pages',
          title: 'Explorateur',
          description: 'Visiter toutes les pages du site',
          icon: 'map',
          secret: false,
          unlocked: false,
          points: 15,
          trackPages: ['index.html', 'projets.html', 'about.html', 'contact.html']
        },
        
        // Achievements d'interaction
        TOGGLE_THEME: {
          id: 'toggle_theme',
          title: 'Jour et Nuit',
          description: 'Alterner entre le mode clair et sombre',
          icon: 'clock',
          secret: false,
          unlocked: false,
          points: 10
        },
        CLICK_ALL_PROJECTS: {
          id: 'click_all_projects',
          title: 'Curieux',
          description: 'Consulter tous les projets',
          icon: 'chest',
          secret: false,
          unlocked: false,
          points: 20,
          trackItems: [] // Sera rempli dynamiquement avec les IDs des projets
        },
        CONTACT_FORM: {
          id: 'contact_form',
          title: 'Premiers contacts',
          description: 'Remplir le formulaire de contact',
          icon: 'paper',
          secret: false,
          unlocked: false,
          points: 15
        },
        
        // Achievements secrets
        KONAMI_CODE: {
          id: 'konami_code',
          title: 'Cheat Code',
          description: 'Saisir le code Konami',
          icon: 'command_block',
          secret: true,
          unlocked: false,
          points: 30
        },
        FIND_DIAMONDS: {
          id: 'find_diamonds',
          title: 'Mineur professionnel',
          description: 'Trouver tous les diamants cachés',
          icon: 'diamond',
          secret: true,
          unlocked: false,
          points: 50,
          requiredCount: 5,
          currentCount: 0
        },
        CREEPER_MODE: {
          id: 'creeper_mode',
          title: 'Ssssssplendide',
          description: 'Activer le mode Creeper',
          icon: 'tnt',
          secret: true,
          unlocked: false,
          points: 40
        },
        BUILDER_MASTER: {
          id: 'builder_master',
          title: 'Architecte en herbe',
          description: 'Construire une structure de plus de 50 blocs dans le builder 3D',
          icon: 'brick',
          secret: false,
          unlocked: false,
          points: 35,
          requiredCount: 50,
          currentCount: 0
        },
        HIDDEN_BUTTON: {
          id: 'hidden_button',
          title: 'Fouineur',
          description: 'Trouver et cliquer sur le bouton caché',
          icon: 'button',
          secret: true,
          unlocked: false,
          points: 25
        },
        CRAFTING_MASTER: {
          id: 'crafting_master',
          title: 'Artisan',
          description: 'Fabriquer 10 objets différents',
          icon: 'crafting_table',
          secret: false,
          unlocked: false,
          points: 45,
          requiredCount: 10,
          currentCount: 0
        },
        SPEED_RUNNER: {
          id: 'speed_runner',
          title: 'Speed Runner',
          description: 'Visiter toutes les pages en moins de 60 secondes',
          icon: 'clock',
          secret: true,
          unlocked: false,
          points: 50
        }
      };
      
      this.totalPoints = 0;
      this.earnedPoints = 0;
      this.visitedPages = [];
      this.startTime = Date.now();
      
      // Calculer le total des points possibles
      for (const key in this.achievements) {
        this.totalPoints += this.achievements[key].points;
      }
      
      this.loadAchievements();
      this.setupTracking();
      this.createAchievementsUI();
    }
    
    /**
     * Charge les achievements depuis le localStorage
     */
    loadAchievements() {
      const savedAchievements = localStorage.getItem('minecraft-achievements');
      if (savedAchievements) {
        const saved = JSON.parse(savedAchievements);
        
        // Mettre à jour les achievements sauvegardés
        for (const key in saved) {
          if (this.achievements[key]) {
            this.achievements[key].unlocked = saved[key].unlocked;
            if (saved[key].currentCount !== undefined) {
              this.achievements[key].currentCount = saved[key].currentCount;
            }
            
            // Ajouter les points pour les achievements débloqués
            if (saved[key].unlocked) {
              this.earnedPoints += this.achievements[key].points;
            }
          }
        }
        
        // Charger les pages visitées
        const visitedPages = localStorage.getItem('minecraft-visited-pages');
        if (visitedPages) {
          this.visitedPages = JSON.parse(visitedPages);
        }
      } else {
        // Première visite, déverrouiller l'achievement correspondant
        this.unlockAchievement('FIRST_VISIT');
      }
    }
    
    /**
     * Sauvegarde les achievements dans le localStorage
     */
    saveAchievements() {
      localStorage.setItem('minecraft-achievements', JSON.stringify(this.achievements));
      localStorage.setItem('minecraft-visited-pages', JSON.stringify(this.visitedPages));
    }
    
    /**
     * Configure le suivi des actions pour déverrouiller les achievements
     */
    setupTracking() {
      // Suivi des pages visitées
      this.trackPageVisit();
      
      // Suivi du changement de thème
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', () => {
          this.unlockAchievement('TOGGLE_THEME');
        });
      }
      
      // Suivi des projets cliqués
      const projectCards = document.querySelectorAll('.project-card, .other-project-card');
      if (projectCards.length > 0) {
        // Initialiser le suivi des projets
        this.achievements.CLICK_ALL_PROJECTS.trackItems = Array.from(projectCards).map((card, index) => `project-${index}`);
        this.achievements.CLICK_ALL_PROJECTS.trackItemsClicked = [];
        
        projectCards.forEach((card, index) => {
          const projectId = `project-${index}`;
          card.setAttribute('data-project-id', projectId);
          
          card.addEventListener('click', () => {
            if (!this.achievements.CLICK_ALL_PROJECTS.trackItemsClicked) {
              this.achievements.CLICK_ALL_PROJECTS.trackItemsClicked = [];
            }
            
            if (!this.achievements.CLICK_ALL_PROJECTS.trackItemsClicked.includes(projectId)) {
              this.achievements.CLICK_ALL_PROJECTS.trackItemsClicked.push(projectId);
              
              // Vérifier si tous les projets ont été cliqués
              if (this.achievements.CLICK_ALL_PROJECTS.trackItemsClicked.length === this.achievements.CLICK_ALL_PROJECTS.trackItems.length) {
                this.unlockAchievement('CLICK_ALL_PROJECTS');
              }
              
              this.saveAchievements();
            }
          });
        });
      }
      
      // Suivi du formulaire de contact
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
          this.unlockAchievement('CONTACT_FORM');
        });
      }
      
      // Suivi du code Konami
      let konamiIndex = 0;
      const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
      
      document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
          konamiIndex++;
          
          if (konamiIndex === konamiCode.length) {
            this.unlockAchievement('KONAMI_CODE');
            konamiIndex = 0;
          }
        } else {
          konamiIndex = 0;
        }
      });
      
      // Suivi des diamants trouvés
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('hidden-diamond')) {
          if (!this.achievements.FIND_DIAMONDS.currentCount) {
            this.achievements.FIND_DIAMONDS.currentCount = 0;
          }
          
          this.achievements.FIND_DIAMONDS.currentCount++;
          e.target.remove();
          
          this.playSound('diamond');
          this.showFloatingText('+1 diamant trouvé!', e.clientX, e.clientY, '#5AC7C7');
          
          if (this.achievements.FIND_DIAMONDS.currentCount >= this.achievements.FIND_DIAMONDS.requiredCount) {
            this.unlockAchievement('FIND_DIAMONDS');
          } else {
            this.saveAchievements();
            this.updateAchievementsUI();
          }
        }
        
        // Suivi du bouton caché
        if (e.target.classList.contains('hidden-button') || e.target.closest('.hidden-button')) {
          this.unlockAchievement('HIDDEN_BUTTON');
        }
      });
      
      // Vérifier toutes les 10 secondes si l'achievement SPEED_RUNNER peut être débloqué
      setInterval(() => {
        // Vérifier si toutes les pages ont été visitées
        const allPagesVisited = this.achievements.VISIT_ALL_PAGES.trackPages.every(page => 
          this.visitedPages.includes(page)
        );
        
        if (allPagesVisited) {
          const elapsedTime = (Date.now() - this.startTime) / 1000; // en secondes
          if (elapsedTime <= 60 && !this.achievements.SPEED_RUNNER.unlocked) {
            this.unlockAchievement('SPEED_RUNNER');
          }
        }
      }, 10000);
      
      // S'abonner aux événements du builder 3D
      window.addEventListener('minecraft-blocks-placed', (e) => {
        if (!this.achievements.BUILDER_MASTER.currentCount) {
          this.achievements.BUILDER_MASTER.currentCount = 0;
        }
        
        this.achievements.BUILDER_MASTER.currentCount = e.detail.count;
        
        if (this.achievements.BUILDER_MASTER.currentCount >= this.achievements.BUILDER_MASTER.requiredCount) {
          this.unlockAchievement('BUILDER_MASTER');
        } else {
          this.saveAchievements();
          this.updateAchievementsUI();
        }
      });
      
      // S'abonner aux événements du système de crafting
      window.addEventListener('minecraft-item-crafted', (e) => {
        if (!this.achievements.CRAFTING_MASTER.trackItems) {
          this.achievements.CRAFTING_MASTER.trackItems = [];
        }
        
        const itemId = e.detail.itemId;
        
        if (!this.achievements.CRAFTING_MASTER.trackItems.includes(itemId)) {
          this.achievements.CRAFTING_MASTER.trackItems.push(itemId);
          this.achievements.CRAFTING_MASTER.currentCount = this.achievements.CRAFTING_MASTER.trackItems.length;
          
          if (this.achievements.CRAFTING_MASTER.currentCount >= this.achievements.CRAFTING_MASTER.requiredCount) {
            this.unlockAchievement('CRAFTING_MASTER');
          } else {
            this.saveAchievements();
            this.updateAchievementsUI();
          }
        }
      });
      
      // S'abonner au mode Creeper
      document.addEventListener('creeper-mode-activated', () => {
        this.unlockAchievement('CREEPER_MODE');
      });
      
      // Ajout d'un bouton caché dans le footer
      this.addHiddenButton();
      // Ajouter des diamants cachés
      this.addHiddenDiamonds();
    }
    
    /**
     * Suit la visite de la page actuelle
     */
    trackPageVisit() {
      // Obtenir le nom de la page actuelle
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      if (!this.visitedPages.includes(currentPage)) {
        this.visitedPages.push(currentPage);
        this.saveAchievements();
        
        // Vérifier si toutes les pages ont été visitées
        const allPagesVisited = this.achievements.VISIT_ALL_PAGES.trackPages.every(page => 
          this.visitedPages.includes(page)
        );
        
        if (allPagesVisited) {
          this.unlockAchievement('VISIT_ALL_PAGES');
        }
      }
    }
    
    /**
     * Déverrouille un achievement et affiche une notification
     */
    unlockAchievement(achievementKey) {
      if (!this.achievements[achievementKey] || this.achievements[achievementKey].unlocked) {
        return;
      }
      
      this.achievements[achievementKey].unlocked = true;
      this.earnedPoints += this.achievements[achievementKey].points;
      
      // Jouer le son d'achievement
      this.playSound('achievement');
      
      // Afficher la notification d'achievement
      this.showAchievementNotification(this.achievements[achievementKey]);
      
      // Sauvegarder les achievements
      this.saveAchievements();
      
      // Mettre à jour l'UI des achievements
      this.updateAchievementsUI();
      
      // Dispatcher un événement custom pour que d'autres systèmes puissent réagir
      window.dispatchEvent(new CustomEvent('minecraft-achievement-unlocked', {
        detail: {
          achievement: this.achievements[achievementKey]
        }
      }));
    }
    
    /**
     * Affiche une notification quand un achievement est débloqué
     */
    showAchievementNotification(achievement) {
      // Créer l'élément de notification
      const notification = document.createElement('div');
      notification.className = 'minecraft-achievement-notification';
      
      // Structure de la notification
      notification.innerHTML = `
        <div class="achievement-icon ${achievement.icon}"></div>
        <div class="achievement-content">
          <div class="achievement-header">
            ${achievement.secret ? '<span class="achievement-secret">Secret débloqué!</span>' : 'Succès débloqué!'}
          </div>
          <div class="achievement-title">${achievement.title}</div>
          <div class="achievement-description">${achievement.description}</div>
          <div class="achievement-points">+${achievement.points} points</div>
        </div>
      `;
      
      // Ajouter la notification au DOM
      document.body.appendChild(notification);
      
      // Animer l'entrée de la notification
      setTimeout(() => {
        notification.classList.add('show');
      }, 100);
      
      // Supprimer la notification après un délai
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 500);
      }, 5000);
    }
    
    /**
     * Crée l'interface utilisateur pour les achievements
     */
    createAchievementsUI() {
      // Créer le bouton d'achievements
      const achievementsButton = document.createElement('div');
      achievementsButton.className = 'minecraft-achievements-button';
      achievementsButton.innerHTML = `
        <div class="achievements-icon">
          <i class="fas fa-trophy"></i>
        </div>
        <div class="achievements-count">${this.getUnlockedCount()}/${Object.keys(this.achievements).length}</div>
      `;
      
      // Ajouter le bouton au DOM
      document.body.appendChild(achievementsButton);
      
      // Créer le panel d'achievements
      const achievementsPanel = document.createElement('div');
      achievementsPanel.className = 'minecraft-achievements-panel';
      achievementsPanel.innerHTML = `
        <div class="achievements-panel-header">
          <h2>Succès <span class="achievement-points">${this.earnedPoints}/${this.totalPoints} points</span></h2>
          <button class="achievements-close-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="achievements-panel-content">
          ${this.generateAchievementsList()}
        </div>
      `;
      
      // Ajouter le panel au DOM
      document.body.appendChild(achievementsPanel);
      
      // Ajouter les styles CSS pour les achievements
      this.addAchievementsStyles();
      
      // Ajouter les écouteurs d'événements
      achievementsButton.addEventListener('click', () => {
        achievementsPanel.classList.toggle('show');
        this.playSound('click');
      });
      
      const closeBtn = achievementsPanel.querySelector('.achievements-close-btn');
      closeBtn.addEventListener('click', () => {
        achievementsPanel.classList.remove('show');
        this.playSound('click');
      });
    }
    
    /**
     * Génère la liste HTML des achievements
     */
    generateAchievementsList() {
      let html = '<div class="achievements-list">';
      
      for (const key in this.achievements) {
        const achievement = this.achievements[key];
        const isUnlocked = achievement.unlocked;
        const isSecret = achievement.secret;
        
        html += `
          <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'} ${isSecret && !isUnlocked ? 'secret' : ''}">
            <div class="achievement-item-icon ${achievement.icon}"></div>
            <div class="achievement-item-content">
              <div class="achievement-item-title">
                ${isUnlocked || !isSecret ? achievement.title : '???'}
                ${isSecret && isUnlocked ? '<span class="achievement-secret-tag">Secret</span>' : ''}
              </div>
              <div class="achievement-item-description">
                ${isUnlocked || !isSecret ? achievement.description : 'Ce succès est secret'}
              </div>
              ${achievement.requiredCount ? `
                <div class="achievement-progress">
                  <div class="achievement-progress-bar" style="width: ${Math.min(100, (achievement.currentCount / achievement.requiredCount) * 100)}%"></div>
                  <div class="achievement-progress-text">${achievement.currentCount || 0}/${achievement.requiredCount}</div>
                </div>
              ` : ''}
              <div class="achievement-item-points">${achievement.points} points</div>
            </div>
          </div>
        `;
      }
      
      html += '</div>';
      return html;
    }
    
    /**
     * Met à jour l'interface des achievements
     */
    updateAchievementsUI() {
      // Mettre à jour le compteur sur le bouton
      const countElement = document.querySelector('.achievements-count');
      if (countElement) {
        countElement.textContent = `${this.getUnlockedCount()}/${Object.keys(this.achievements).length}`;
      }
      
      // Mettre à jour les points
      const pointsElement = document.querySelector('.achievement-points');
      if (pointsElement) {
        pointsElement.textContent = `${this.earnedPoints}/${this.totalPoints} points`;
      }
      
      // Mettre à jour la liste des achievements
      const contentElement = document.querySelector('.achievements-panel-content');
      if (contentElement) {
        contentElement.innerHTML = this.generateAchievementsList();
      }
    }
    
    /**
     * Retourne le nombre d'achievements débloqués
     */
    getUnlockedCount() {
      let count = 0;
      for (const key in this.achievements) {
        if (this.achievements[key].unlocked) {
          count++;
        }
      }
      return count;
    }
    
    /**
     * Ajoute les styles CSS pour les achievements
     */
    addAchievementsStyles() {
      const style = document.createElement('style');
      style.textContent = `
        /* Bouton d'achievements */
        .minecraft-achievements-button {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: rgba(30, 33, 40, 0.9);
          border: 2px solid var(--primary);
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 999;
          transition: all 0.3s;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .minecraft-achievements-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(82, 165, 53, 0.4);
        }
        
        .achievements-icon {
          color: var(--primary);
          font-size: 20px;
        }
        
        .achievements-count {
          background: rgba(82, 165, 53, 0.2);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
        }
        
        /* Panel d'achievements */
        .minecraft-achievements-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          background: rgba(20, 21, 25, 0.95);
          border: 3px solid var(--primary);
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.5, 0, 0.15, 1);
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        
        .minecraft-achievements-panel.show {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, -50%) scale(1);
        }
        
        .achievements-panel-header {
          padding: 15px 20px;
          border-bottom: 2px solid var(--primary-dark);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
        }
        
        .achievements-panel-header h2 {
          margin: 0;
          font-size: 22px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .achievement-points {
          font-size: 14px;
          background: rgba(82, 165, 53, 0.2);
          padding: 3px 8px;
          border-radius: 4px;
          color: var(--primary);
        }
        
        .achievements-close-btn {
          background: none;
          border: none;
          color: var(--light);
          font-size: 20px;
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .achievements-close-btn:hover {
          color: var(--primary);
          transform: scale(1.1);
        }
        
        .achievements-panel-content {
          padding: 20px;
          max-height: calc(80vh - 70px);
          overflow-y: auto;
        }
        
        /* Liste des achievements */
        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .achievement-item {
          display: flex;
          gap: 15px;
          padding: 12px;
          border-radius: 6px;
          transition: all 0.3s;
          background: rgba(30, 33, 40, 0.6);
          border: 2px solid var(--medium);
        }
        
        .achievement-item.unlocked {
          border-color: var(--primary);
          box-shadow: 0 0 10px rgba(82, 165, 53, 0.2);
        }
        
        .achievement-item.locked:not(.secret) {
          opacity: 0.7;
        }
        
        .achievement-item.secret:not(.unlocked) {
          border-color: #8B5D3A;
          background: rgba(139, 93, 58, 0.1);
        }
        
        .achievement-item-icon {
          width: 40px;
          height: 40px;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--primary-dark);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
        
        .achievement-item.locked .achievement-item-icon {
          filter: grayscale(1);
          opacity: 0.6;
        }
        
        .achievement-item-content {
          flex: 1;
        }
        
        .achievement-item-title {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .achievement-secret-tag {
          font-size: 11px;
          background: #8B5D3A;
          color: white;
          padding: 1px 5px;
          border-radius: 3px;
        }
        
        .achievement-item-description {
          font-size: 14px;
          opacity: 0.8;
          margin-bottom: 6px;
        }
        
        .achievement-item-points {
          font-size: 12px;
          font-weight: 600;
          color: var(--primary);
        }
        
        .achievement-progress {
          height: 8px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          margin: 8px 0;
          overflow: hidden;
          position: relative;
        }
        
        .achievement-progress-bar {
          height: 100%;
          background: var(--primary);
          border-radius: 4px;
          transition: width 0.3s;
        }
        
        .achievement-progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 10px;
          font-weight: 600;
          color: white;
          text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
        }
        
        /* Notification d'achievement */
        .minecraft-achievement-notification {
          position: fixed;
          bottom: 30px;
          right: -400px;
          background: rgba(20, 21, 25, 0.9);
          border: 2px solid var(--primary);
          border-radius: 6px;
          padding: 12px;
          width: 320px;
          display: flex;
          gap: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          z-index: 9999;
          transition: right 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(5px);
        }
        
        .minecraft-achievement-notification.show {
          right: 30px;
        }
        
        .achievement-icon {
          width: 50px;
          height: 50px;
          background-color: rgba(82, 165, 53, 0.2);
          border-radius: 6px;
          border: 2px solid var(--primary-dark);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          flex-shrink: 0;
        }
        
        .achievement-content {
          flex: 1;
        }
        
        .achievement-header {
          font-size: 12px;
          color: var(--primary);
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 2px;
        }
        
        .achievement-secret {
          color: #FFAA00;
        }
        
        .achievement-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 2px;
        }
        
        .achievement-description {
          font-size: 12px;
          opacity: 0.8;
          margin-bottom: 4px;
        }
        
        .achievement-points {
          font-size: 11px;
          font-weight: 600;
          color: var(--primary);
        }
        
        /* Icônes pour les achievements */
        .dirt { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzhDNjIzQSIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM3MzUxMkEiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjwvc3ZnPg=='); }
        .map { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0Y0RURDQiIgZD0iTTMgM2gyNnYyNkgzeiIvPjxwYXRoIGZpbGw9IiNDNkIzOEEiIGQ9Ik0zIDNoMXYyNkgzem0yNSAwaDF2MjZoLTF6TTMgM2gyNnYxSDN6bTAgMjVoMjZ2MUgzeiIvPjxwYXRoIGZpbGw9IiNBQTk0NTUiIGQ9Ik04IDhoMTZ2MTZIOHoiLz48cGF0aCBmaWxsPSIjMDBBQTk0IiBkPSJNMTAgMTBoNHY0aC00em04IDBoNHY0aC00em0tOCA4aDR2NGgtNHptOCA4aDR2NGgtNHoiLz48L3N2Zz4='); }
        .clock { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGNpcmNsZSBmaWxsPSIjRkVGRUZFIiBjeD0iMTYiIGN5PSIxNiIgcj0iMTMiLz48cGF0aCBmaWxsPSIjNDQ0IiBkPSJNMTYgNmExMCAxMCAwIDEwMCAyMCA5LjkgOS45IDAgMDAwLTIwem0wIDE4YTggOCAwIDExMC0xNiA4IDggMCAwMTAgMTZ6Ii8+PHBhdGggZmlsbD0iIzc3NyIgZD0iTTE1IDE2VjhoMnY3aDdsLTEgMnoiLz48L3N2Zz4='); }
        .chest { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzg2NUQzNiIgZD0iTTMgNmgyNnYyMEgzeiIvPjxwYXRoIGZpbGw9IiM2MjQyMjUiIGQ9Ik0zIDZoMXYyMEgzem0yNSAwaDF2MjBoLTF6TTMgNmgyNnYxSDN6bTAgMTloMjZ2MUgzeiIvPjxwYXRoIGZpbGw9IiNBQTc0NEQiIGQ9Ik00IDdoMjR2MThINHoiLz48cGF0aCBmaWxsPSIjNEMzOTFCIiBkPSJNMTQgMTVoNHYzaC00eiIvPjwvc3ZnPg=='); }
        .paper { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYgNGgyMHYyNEg2eiIvPjxwYXRoIGZpbGw9IiNEREREREQiIGQ9Ik02IDRoMXYyNEg2em0xOSAwaDF2MjRoLTF6TTYgNGgyMHYxSDZ6bTAgMjNoMjB2MUg2eiIvPjxwYXRoIGZpbGw9IiM1NTU1NTUiIGQ9Ik05IDhoMTR2MUg5em0wIDRoMTR2MUg5em0wIDRoMTR2MUg5em0wIDRoMTR2MUg5em0wIDRoOHYxSDl6Ii8+PC9zdmc+'); }
        .command_block { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzdCQTM0RCIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM0QjY5MjkiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiM0QzQ5MzIiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48cGF0aCBmaWxsPSIjNUE1NzNBIiBkPSJNNCAxNWgzdjNoLTN6bTcgMGgzdjNoLTN6bTcgMGgzdjNoLTN6bTcgMGgzdjNoLTN6Ii8+PC9zdmc+'); }
        .diamond { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzVBQzdDNyIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiMzOThBQTgiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiMzMTdENTYiIGQ9Ik0xMCA3aDEydjFIMTB6bS0yIDJoMTZ2MUg4em0tMiAyaDIwdjFINnptLTIgMmgyNHYxSDR6bTAgMmgyNHYxSDR6bTIgMmgyMHYxSDZ6bTIgMmgxNnYxSDh6bTIgMmgxMnYxSDEweiIvPjwvc3ZnPg=='); }
        .tnt { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0ZGMDAwMCIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiNBQTAwMDAiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMiA3aDJ2MmgtMnptNiAwaDJ2MmgtMnptLTYgNmgydjJoLTJ6bTYgMGgydjJoLTJ6bS02IDZoMnYyaC0yem02IDBoMnYyaC0yeiIvPjxwYXRoIGZpbGw9IiNBQTAwMDAiIGQ9Ik0xMyAxNmg2djJoLTZ6Ii8+PC9zdmc+'); }
        .brick { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0E1NUUzNSIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM3QzQ1MjciIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiNFNTcxNDUiIGQ9Ik0yIDJoMTN2N0gyem0xNSAwaDEzdjdIMTd6TTIgMTFoMTN2N0gyem0xNSAwaDEzdjdIMTd6TTIgMjBoMTN2N0gyem0xNSAwaDEzdjdIMTd6Ii8+PHBhdGggZmlsbD0iI0E1NUUzNSIgZD0iTTIgOWgxM3YySDJ6bTE1IDBoMTN2MkgxN3pNMiAxOGgxM3YySDJ6bTE1IDBoMTN2MkgxN3pNMiAyN2gxM3YySDJ6bTE1IDBoMTN2MkgxN3oiLz48L3N2Zz4='); }
        .button { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzU1NSIgZD0iTTYgMTBoMjB2NTZINS41VjEweiIvPjxwYXRoIGZpbGw9IiMzODM4MzgiIGQ9Ik02IDEwaDF2NTZIN3ptMTggMGgxdjVoLTF6TTYgMTBoMjB2MUg2em0wIDRoMjB2MUg2eiIvPjxwYXRoIGZpbGw9IiM2QjZCNkIiIGQ9Ik03IDExaDE4djNoLTE4eiIvPjwvc3ZnPg=='); }
        .crafting_table { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0FENTM0IiBkPSJNNSA1aDIydjIySDV6Ii8+PHBhdGggZmlsbD0iIzkzMzMxQSIgZD0iTTUgNWgxdjIySDV6bTIxIDBoMXYyMmgtMXpNNSA1aDIydjFINXptMCAyMWgyMnYxSDV6Ii8+PHBhdGggZmlsbD0iIzk0N0Y1MSIgZD0iTTcgN2gxOHYxOEg3eiIvPjxwYXRoIGZpbGw9IiNDNEFCNzQiIGQ9Ik05IDloNHY0SDl6bTEwIDBoNHY0aC00ek05IDE5aDR2NGgtNHptMTAgMGg0djRoLTR6Ii8+PC9zdmc+'); }
        
        /* Texte flottant */
        .floating-text {
          position: fixed;
          font-weight: 600;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
          animation: floatUp 1.5s forwards;
        }
        
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
        
        /* Bouton caché */
        .hidden-button {
          width: 20px;
          height: 20px;
          position: relative;
          cursor: pointer;
          opacity: 0.2;
          transition: opacity 0.3s;
        }
        
        .hidden-button:hover {
          opacity: 1;
        }
        
        /* Diamants cachés */
        .hidden-diamond {
          position: fixed;
          width: 20px;
          height: 20px;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzVBQzdDNyIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiMzOThBQTgiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiMzMTdENTYiIGQ9Ik0xMCA3aDEydjFIMTB6bS0yIDJoMTZ2MUg4em0tMiAyaDIwdjFINnptLTIgMmgyNHYxSDR6bTAgMmgyNHYxSDR6bTIgMmgyMHYxSDZ6bTIgMmgxNnYxSDh6bTIgMmgxMnYxSDEweiIvPjwvc3ZnPg==');
          background-size: contain;
          background-repeat: no-repeat;
          cursor: pointer;
          z-index: 999;
          pointer-events: all;
          animation: diamondFloat 3s infinite alternate ease-in-out;
          opacity: 0.8;
        }
        
        @keyframes diamondFloat {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-10px) rotate(360deg); }
        }
        
        /* Animations pour mobiles */
        @media (prefers-reduced-motion: reduce) {
          .minecraft-achievement-notification,
          .minecraft-achievements-panel,
          .floating-text,
          .hidden-diamond {
            transition: none !important;
            animation: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .minecraft-achievements-panel {
            width: 95%;
            max-height: 90vh;
          }
          
          .minecraft-achievement-notification {
            width: 280px;
          }
          
          .minecraft-achievements-button {
            bottom: 10px;
            left: 10px;
          }
        }
      `;
      
      document.head.appendChild(style);
    }
    
    /**
     * Ajoute un bouton caché dans le footer
     */
    addHiddenButton() {
      const footer = document.querySelector('.footer');
      if (footer) {
        const hiddenButton = document.createElement('div');
        hiddenButton.className = 'hidden-button';
        hiddenButton.style.position = 'absolute';
        hiddenButton.style.bottom = '15px';
        hiddenButton.style.right = '15px';
        hiddenButton.innerHTML = '<i class="fas fa-gem" style="color: var(--primary); font-size: 16px;"></i>';
        
        footer.style.position = 'relative';
        footer.appendChild(hiddenButton);
      }
    }
    
    /**
     * Ajoute des diamants cachés sur la page
     */
    addHiddenDiamonds() {
      // Nombre de diamants à ajouter (basé sur le requis de l'achievement FIND_DIAMONDS)
      const diamondCount = this.achievements.FIND_DIAMONDS.requiredCount;
      
      // Si tous les diamants ont déjà été trouvés, ne pas en ajouter
      if (this.achievements.FIND_DIAMONDS.unlocked) {
        return;
      }
      
      // Nombre de diamants déjà trouvés
      const foundDiamonds = this.achievements.FIND_DIAMONDS.currentCount || 0;
      const remainingDiamonds = diamondCount - foundDiamonds;
      
      for (let i = 0; i < remainingDiamonds; i++) {
        setTimeout(() => {
          this.addRandomDiamond();
        }, 10000 + i * 60000); // Ajouter un diamant toutes les minutes, en commençant après 10 secondes
      }
    }
    
    /**
     * Ajoute un diamant à une position aléatoire sur la page
     */
    addRandomDiamond() {
      // Si l'achievement est déjà débloqué, ne pas ajouter de diamant
      if (this.achievements.FIND_DIAMONDS.unlocked) {
        return;
      }
      
      const diamond = document.createElement('div');
      diamond.className = 'hidden-diamond';
      
      // Position aléatoire (en évitant les bords)
      const x = 50 + Math.random() * (window.innerWidth - 100);
      const y = 50 + Math.random() * (window.innerHeight - 100);
      
      // Définir la position
      diamond.style.left = `${x}px`;
      diamond.style.top = `${y}px`;
      
      // Ajouter au DOM
      document.body.appendChild(diamond);
      
      // Supprimer le diamant après un certain temps s'il n'est pas collecté
      setTimeout(() => {
        if (diamond.parentNode) {
          diamond.remove();
          // Ajouter un nouveau diamant ailleurs
          this.addRandomDiamond();
        }
      }, 30000); // 30 secondes
    }
    
    /**
     * Joue un son Minecraft
     */
    playSound(type) {
      // Si window.playSound existe (défini dans script.js), l'utiliser
      if (typeof window.playSound === 'function') {
        window.playSound(type);
        return;
      }
      
      // Sinon, implémenter notre propre version
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
      }
    }
    
    /**
     * Affiche un texte flottant à une position donnée
     */
    showFloatingText(text, x, y, color) {
      const floatingText = document.createElement('div');
      floatingText.className = 'floating-text';
      floatingText.textContent = text;
      floatingText.style.left = `${x}px`;
      floatingText.style.top = `${y}px`;
      floatingText.style.color = color || 'white';
      
      document.body.appendChild(floatingText);
      
      // Supprimer après l'animation
      setTimeout(() => {
        floatingText.remove();
      }, 1500);
    }
  }
  
  // Initialiser le système d'achievements
  document.addEventListener('DOMContentLoaded', function() {
    window.minecraftAchievements = new MinecraftAchievements();
  });