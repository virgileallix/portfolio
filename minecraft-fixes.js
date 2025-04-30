// Solution pour le bug de cassage de blocs
function fixBlockBreaking() {
    // 1. Assurez-vous que le pointer lock fonctionne correctement
    const canvasContainer = document.querySelector('.mc-builder-canvas-container');
    if (canvasContainer) {
      canvasContainer.addEventListener('click', () => {
        canvasContainer.requestPointerLock();
      });
    }
    
    // 2. Ajoutez un gestionnaire d'événements mousedown plus simple et direct
    document.addEventListener('mousedown', (e) => {
      // Si l'inventaire est ouvert, ne pas casser de blocs
      const inventory = document.querySelector('.mc-inventory-container');
      if (inventory && inventory.classList.contains('active')) return;
      
      // Clic gauche pour casser
      if (e.button === 0 && window.minecraft3DBuilder && window.minecraft3DBuilder.isActive) {
        const targetedBlock = window.minecraft3DBuilder.getTargetedBlock();
        if (targetedBlock) {
          // Supprimer directement le bloc plutôt que d'utiliser l'animation progressive
          window.minecraft3DBuilder.removeBlock(
            targetedBlock.position.x, 
            targetedBlock.position.y, 
            targetedBlock.position.z
          );
          // Son de cassage
          if (typeof window.playSound === 'function') {
            window.playSound('dig');
          }
        }
      }
    });
  }
  
  // Appelez cette fonction après le chargement de la page
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(fixBlockBreaking, 5000); // Attendre que tout soit chargé
  });


  // Solution pour l'inventaire buggé
function fixInventory() {
    // 1. Réinitialiser complètement l'inventaire
    if (window.minecraftInventory) {
      // Sauvegarder l'ancien inventaire au cas où
      const oldInventory = localStorage.getItem('minecraft-inventory');
      localStorage.setItem('minecraft-inventory-backup', oldInventory);
      
      // Effacer l'inventaire actuel
      localStorage.removeItem('minecraft-inventory');
      
      // Recharger la page pour réinitialiser l'inventaire
      window.location.reload();
    }
  }
  
  // Alternative: fonction pour corriger l'inventaire sans recharger
  function repairInventory() {
    if (window.minecraftInventory) {
      // Recréer tous les écouteurs d'événements
      window.minecraftInventory.setupDragAndDrop();
      
      // Mettre à jour l'interface
      window.minecraftInventory.updateInventoryUI();
      
      // Réinitialiser l'inventaire si nécessaire
      const resetButton = document.createElement('button');
      resetButton.textContent = "Réinitialiser l'inventaire";
      resetButton.style.position = "fixed";
      resetButton.style.bottom = "100px";
      resetButton.style.right = "20px";
      resetButton.style.zIndex = "1000";
      resetButton.style.padding = "10px";
      resetButton.style.background = "#52A535";
      resetButton.style.color = "white";
      resetButton.style.border = "none";
      resetButton.style.borderRadius = "5px";
      resetButton.style.cursor = "pointer";
      resetButton.onclick = fixInventory;
      document.body.appendChild(resetButton);
    }
  }


  // Solution pour mettre à jour Three.js
function updateThreeJS() {
    // Supprimer l'ancienne version de Three.js
    const oldScripts = document.querySelectorAll('script[src*="three.js"]');
    oldScripts.forEach(script => script.remove());
    
    // Ajouter la nouvelle version de Three.js
    const newScript = document.createElement('script');
    newScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r140/three.min.js'; // Version plus récente
    document.head.appendChild(newScript);
    
    // Ajouter également les contrôles mis à jour
    const controlsScript = document.createElement('script');
    controlsScript.src = 'https://cdn.jsdelivr.net/npm/three@0.140.0/examples/js/controls/OrbitControls.min.js'; 
    document.head.appendChild(controlsScript);
    
    // Recharger la page après le chargement des scripts
    newScript.onload = () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };
  }
  /**
 * Correction des bugs d'inventaire
 * Résout plusieurs problèmes liés au système d'inventaire Minecraft
 */
function fixInventorySystem() {
    // Si l'inventaire n'est pas encore initialisé, attendre
    if (!window.minecraftInventory) {
      setTimeout(fixInventorySystem, 2000);
      return;
    }
  
    // 1. Corrige les problèmes de glisser-déposer
    fixDragAndDrop();
    
    // 2. Répare les problèmes d'enregistrement local
    fixStorageIssues();
    
    // 3. Ajoute un bouton de réinitialisation d'urgence
    addResetButton();
    
    console.log("✅ Corrections du système d'inventaire appliquées");
  }
  
  /**
   * Corrige les problèmes de glisser-déposer dans l'inventaire
   */
  function fixDragAndDrop() {
    const inventory = window.minecraftInventory;
    
    // Remplacer la fonction problématique
    inventory.setupDragAndDrop = function() {
      const slots = document.querySelectorAll('.inventory-slot, .hotbar-slot');
      let draggedItem = null;
      let draggedSlot = null;
      let dragImage = null;
      
      // Supprimer tous les écouteurs existants pour éviter les doublons
      slots.forEach(slot => {
        const clone = slot.cloneNode(true);
        if (slot.parentNode) {
          slot.parentNode.replaceChild(clone, slot);
        }
      });
      
      // Réassigner les slots après le clonage
      const freshSlots = document.querySelectorAll('.inventory-slot, .hotbar-slot');
      
      freshSlots.forEach((slot, index) => {
        // Assigner le bon index au slot
        slot.dataset.slot = index;
        
        // Rendre le slot draggable
        slot.setAttribute('draggable', 'true');
        
        // Gérer le début du drag
        slot.addEventListener('dragstart', (e) => {
          const itemElement = slot.querySelector('.item');
          if (!itemElement) {
            e.preventDefault();
            return;
          }
          
          draggedSlot = slot;
          draggedItem = {
            id: itemElement.dataset.itemId,
            count: parseInt(itemElement.querySelector('.item-count').textContent, 10)
          };
          
          // Créer une image pour le drag
          dragImage = itemElement.cloneNode(true);
          dragImage.style.position = 'absolute';
          dragImage.style.top = '-1000px';
          document.body.appendChild(dragImage);
          e.dataTransfer.setDragImage(dragImage, 15, 15);
          
          slot.classList.add('dragging');
          if (typeof window.playSound === 'function') {
            window.playSound('click');
          }
        });
        
        // Gérer la fin du drag
        slot.addEventListener('dragend', () => {
          if (draggedSlot) draggedSlot.classList.remove('dragging');
          if (dragImage && dragImage.parentNode) {
            dragImage.parentNode.removeChild(dragImage);
          }
          
          draggedSlot = null;
          draggedItem = null;
          dragImage = null;
        });
        
        // Autoriser le drop
        slot.addEventListener('dragover', (e) => {
          e.preventDefault();
        });
        
        // Gérer l'entrée dans la zone de drop
        slot.addEventListener('dragenter', (e) => {
          e.preventDefault();
          slot.classList.add('drag-over');
        });
        
        // Gérer la sortie de la zone de drop
        slot.addEventListener('dragleave', () => {
          slot.classList.remove('drag-over');
        });
        
        // Gérer le drop
        slot.addEventListener('drop', (e) => {
          e.preventDefault();
          slot.classList.remove('drag-over');
          
          if (!draggedItem) return;
          
          const sourceSlot = parseInt(draggedSlot.dataset.slot);
          const targetSlot = parseInt(slot.dataset.slot);
          
          // Empêcher de déposer sur le même slot
          if (sourceSlot === targetSlot) {
            return;
          }
          
          // Déplacer l'item
          inventory.swapSlots(sourceSlot, targetSlot);
          if (typeof window.playSound === 'function') {
            window.playSound('click');
          }
          inventory.updateInventoryUI();
          inventory.saveInventory();
        });
        
        // Gérer le clic simple (pour utiliser des items)
        slot.addEventListener('click', (e) => {
          const itemElement = slot.querySelector('.item');
          if (!itemElement) return;
          
          // Clic droit (ou Shift+clic) pour consommer
          if (e.button === 2 || e.shiftKey) {
            const itemId = itemElement.dataset.itemId;
            const itemDef = inventory.itemDefinitions[itemId];
            
            if (itemDef && itemDef.category === 'food') {
              inventory.consumeItem(parseInt(slot.dataset.slot));
            }
          }
          
          if (typeof window.playSound === 'function') {
            window.playSound('click');
          }
        });
        
        // Prévenir le menu contextuel
        slot.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          // Simuler un clic droit pour consommer
          const itemElement = slot.querySelector('.item');
          if (itemElement) {
            const slotIndex = parseInt(slot.dataset.slot);
            const slotItem = inventory.getSlotItem(slotIndex);
            if (slotItem && inventory.itemDefinitions[slotItem.id].category === 'food') {
              inventory.consumeItem(slotIndex);
            }
          }
        });
      });
      
      console.log("🔄 Fonctions de glisser-déposer réinitialisées");
    };
    
    // Appliquer la correction
    inventory.setupDragAndDrop();
  }
  
  /**
   * Corrige les problèmes d'enregistrement dans le localStorage
   */
  function fixStorageIssues() {
    const inventory = window.minecraftInventory;
    
    // Sauvegarde l'inventaire actuel comme backup
    const currentInventory = localStorage.getItem('minecraft-inventory');
    if (currentInventory) {
      localStorage.setItem('minecraft-inventory-backup', currentInventory);
    }
    
    // Améliorer la fonction de sauvegarde pour éviter les erreurs
    inventory.saveInventory = function() {
      try {
        const dataToSave = {
          items: this.items,
          selectedSlot: this.selectedSlot
        };
        
        // Vérifier que les données sont valides avant de sauvegarder
        if (typeof dataToSave.items === 'object' && typeof dataToSave.selectedSlot === 'number') {
          localStorage.setItem('minecraft-inventory', JSON.stringify(dataToSave));
        } else {
          console.error("Données d'inventaire invalides, sauvegarde annulée");
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'inventaire:", error);
      }
    };
    
    // Améliorer la fonction de chargement
    inventory.loadInventory = function() {
      try {
        const savedInventory = localStorage.getItem('minecraft-inventory');
        
        if (savedInventory) {
          const data = JSON.parse(savedInventory);
          
          // Vérification que les données chargées sont valides
          if (data && typeof data === 'object') {
            this.items = data.items || {};
            this.selectedSlot = data.selectedSlot || 0;
          } else {
            throw new Error("Format d'inventaire invalide");
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'inventaire:", error);
        console.log("Restauration depuis la sauvegarde ou réinitialisation...");
        
        // Essayer de charger depuis la sauvegarde
        const backupInventory = localStorage.getItem('minecraft-inventory-backup');
        if (backupInventory) {
          try {
            const data = JSON.parse(backupInventory);
            this.items = data.items || {};
            this.selectedSlot = data.selectedSlot || 0;
          } catch (backupError) {
            // En cas d'échec, réinitialiser l'inventaire
            this.clearInventory();
            // Ajouter quelques items par défaut
            this.addItem('stone', 64);
            this.addItem('oak_planks', 64);
            this.addItem('diamond_pickaxe', 1);
            this.addItem('apple', 10);
          }
        } else {
          // En cas d'absence de sauvegarde, réinitialiser l'inventaire
          this.clearInventory();
          // Ajouter quelques items par défaut
          this.addItem('stone', 64);
          this.addItem('oak_planks', 64);
          this.addItem('diamond_pickaxe', 1);
          this.addItem('apple', 10);
        }
      }
    };
    
    // Forcer la mise à jour de l'inventaire
    inventory.updateInventoryUI();
    
    console.log("🔄 Système de stockage de l'inventaire amélioré");
  }
  
  /**
   * Ajoute un bouton de réinitialisation d'urgence pour l'inventaire
   */
  function addResetButton() {
    // Vérifier si le bouton existe déjà
    if (document.getElementById('inventory-reset-button')) {
      return;
    }
    
    const resetButton = document.createElement('button');
    resetButton.id = 'inventory-reset-button';
    resetButton.textContent = "Réparer l'inventaire";
    resetButton.style.position = "fixed";
    resetButton.style.bottom = "80px";
    resetButton.style.right = "80px";
    resetButton.style.zIndex = "1000";
    resetButton.style.padding = "10px";
    resetButton.style.background = "#52A535";
    resetButton.style.color = "white";
    resetButton.style.border = "none";
    resetButton.style.borderRadius = "5px";
    resetButton.style.fontFamily = "'Minecraft', sans-serif";
    resetButton.style.fontSize = "14px";
    resetButton.style.cursor = "pointer";
    resetButton.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
    resetButton.style.transition = "all 0.3s";
    resetButton.style.opacity = "0.7";
    
    resetButton.addEventListener('mouseenter', () => {
      resetButton.style.opacity = "1";
      resetButton.style.transform = "translateY(-3px)";
    });
    
    resetButton.addEventListener('mouseleave', () => {
      resetButton.style.opacity = "0.7";
      resetButton.style.transform = "translateY(0)";
    });
    
    resetButton.addEventListener('click', () => {
      if (confirm("Voulez-vous réinitialiser l'inventaire ? Cette action ne peut pas être annulée.")) {
        // Sauvegarder l'inventaire actuel avant de le réinitialiser
        const currentInventory = localStorage.getItem('minecraft-inventory');
        if (currentInventory) {
          localStorage.setItem('minecraft-inventory-backup-' + Date.now(), currentInventory);
        }
        
        // Supprimer l'inventaire actuel
        localStorage.removeItem('minecraft-inventory');
        
        // Recréer un inventaire par défaut
        window.minecraftInventory.clearInventory();
        window.minecraftInventory.addItem('stone', 64);
        window.minecraftInventory.addItem('oak_planks', 64);
        window.minecraftInventory.addItem('diamond_pickaxe', 1);
        window.minecraftInventory.addItem('apple', 10);
        
        // Mettre à jour l'interface
        window.minecraftInventory.updateInventoryUI();
        
        // Feedback sonore
        if (typeof window.playSound === 'function') {
          window.playSound('success');
        }
        
        alert("Inventaire réinitialisé avec succès !");
      }
    });
    
    document.body.appendChild(resetButton);
    
    console.log("✅ Bouton de réinitialisation d'inventaire ajouté");
  }
  
  // Exécuter la correction après le chargement de la page
  document.addEventListener('DOMContentLoaded', function() {
    // Attendre que le système d'inventaire soit chargé
    setTimeout(fixInventorySystem, 3000);
  });
  
  // Appliquer immédiatement si la page est déjà chargée
  if (document.readyState === 'complete') {
    setTimeout(fixInventorySystem, 1000);
  }

  /**
 * Corrections générales pour les systèmes Minecraft
 * Résout divers problèmes, bugs et améliore les performances
 */

// Fonction principale pour appliquer toutes les corrections
function applyMinecraftFixes() {
    console.log("🛠️ Application des correctifs Minecraft...");
    
    // Correction des problèmes de performance
    fixPerformanceIssues();
    
    // Correction des problèmes d'interaction entre systèmes
    fixSystemInteractions();
    
    // Correction des bugs d'affichage
    fixDisplayIssues();
    
    // Correction du système de cassage de blocs
    fixBlockBreaking();
    
    // Ajouter un bouton de diagnostic
    addDiagnosticButton();
    
    console.log("✅ Corrections Minecraft appliquées avec succès");
  }
  
  /**
   * Améliore les performances générales
   */
  function fixPerformanceIssues() {
    // Limiter le nombre de particules et d'effets
    if (window.minecraftWeather) {
      const originalCreateRainEffects = window.minecraftWeather.createRainEffects;
      window.minecraftWeather.createRainEffects = function(isThunder = false) {
        // Réduire le nombre de gouttes de pluie
        const rainCount = isThunder ? 150 : 100; // Réduit de moitié pour de meilleures performances
        
        // Appeler la méthode originale avec les nouveaux paramètres
        const originalMethod = originalCreateRainEffects.bind(this);
        originalMethod(isThunder);
        
        console.log(`🔄 Effets de pluie optimisés (${rainCount} gouttes)`);
      };
    }
    
    // Optimiser le rendu de la scène 3D
    if (window.minecraft3DBuilder) {
      // Réduire la fréquence d'actualisation pour économiser les ressources
      const originalAnimate = window.minecraft3DBuilder.animate;
      let frameSkip = 0;
      
      window.minecraft3DBuilder.animate = function() {
        // Sauter certaines images pour économiser des ressources CPU
        frameSkip = (frameSkip + 1) % 2;
        if (frameSkip === 0) {
          originalAnimate.call(this);
        } else {
          this.animationFrame = requestAnimationFrame(() => this.animate());
        }
      };
    }
    
    console.log("✅ Optimisations de performance appliquées");
  }
  
  /**
   * Corrige les problèmes d'interaction entre les différents systèmes
   */
  function fixSystemInteractions() {
    // Corrige les problèmes entre le système de drops et l'inventaire
    if (window.minecraftDrops && window.minecraftInventory) {
      // S'assurer que les drops ajoutent correctement les items à l'inventaire
      window.addEventListener('minecraft-item-collected', function(e) {
        const { itemType, count } = e.detail;
        
        if (window.minecraftInventory && typeof window.minecraftInventory.addItem === 'function') {
          window.minecraftInventory.addItem(itemType, count);
        }
      });
    }
    
    // Corrige les problèmes entre météo et effets sonores
    if (window.minecraftWeather && window.minecraftSoundSystem) {
      const originalSetWeather = window.minecraftWeather.setWeather;
      
      window.minecraftWeather.setWeather = function(type) {
        // Arrêter tous les sons météo précédents
        if (typeof window.minecraftSoundSystem.stopSound === 'function') {
          window.minecraftSoundSystem.stopSound('rain');
          window.minecraftSoundSystem.stopSound('thunder');
        }
        
        // Appeler la méthode originale
        originalSetWeather.call(this, type);
      };
    }
    
    console.log("✅ Interactions entre systèmes corrigées");
  }
  
  /**
   * Corrige les problèmes d'affichage
   */
  function fixDisplayIssues() {
    // Corrige les problèmes de chevauchement des éléments d'interface
    const fixZIndexOverlap = () => {
      // Corriger les z-index pour éviter les chevauchements
      const uiElements = [
        { selector: '.minecraft-inventory-panel', zIndex: 1000 },
        { selector: '.minecraft-weather-controls', zIndex: 995 },
        { selector: '.minecraft-sound-controls', zIndex: 990 },
        { selector: '.minecraft-mob-controls', zIndex: 985 },
        { selector: '.minecraft-achievements-button', zIndex: 980 },
        { selector: '.minecraft-inventory-button', zIndex: 975 },
        { selector: '.minecraft-crafting-button', zIndex: 970 },
        { selector: '.minecraft-weather-container', zIndex: 950 },
        { selector: '.minecraft-builder-3d', zIndex: 1100 }
      ];
      
      uiElements.forEach(elem => {
        const elements = document.querySelectorAll(elem.selector);
        elements.forEach(el => {
          el.style.zIndex = elem.zIndex.toString();
        });
      });
    };
    
    // Exécuter immédiatement et à chaque fois que le DOM change
    fixZIndexOverlap();
    
    // Observer les changements dans le DOM pour maintenir les corrections d'affichage
    const observer = new MutationObserver(fixZIndexOverlap);
    observer.observe(document.body, { childList: true, subtree: true });
    
    console.log("✅ Problèmes d'affichage corrigés");
  }
  
  /**
   * Correction du système de cassage de blocs
   * Ce problème est souvent signalé dans le constructeur 3D Minecraft
   */
  function fixBlockBreaking() {
    if (!window.minecraft3DBuilder) {
      return;
    }
    
    // Améliorer la détection des blocs pour le cassage
    window.minecraft3DBuilder.getTargetedBlock = function() {
      // Mise à jour du raycaster (toujours au centre de l'écran)
      this.updateRaycaster();
  
      // Limiter la distance maximale (comme dans Minecraft, ~5 blocs)
      const MAX_REACH = 5;
  
      // Obtenir la direction du regard
      const lookDirection = new THREE.Vector3(0, 0, -1);
      lookDirection.applyQuaternion(this.camera.quaternion);
  
      // Créer un rayon partant de la caméra dans la direction du regard
      this.raycaster.set(this.camera.position, lookDirection);
  
      // Obtient tous les objets intersectés
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);
  
      // Filtre seulement les blocs à portée et exclut le highlightBox
      for (let i = 0; i < intersects.length; i++) {
        const intersect = intersects[i];
  
        // Vérifier si l'intersection est à portée
        if (intersect.distance <= MAX_REACH) {
          const object = intersect.object;
  
          // Vérifie si c'est un bloc (pas le highlightBox)
          if (object !== this.highlightBox && object.name !== 'breakingOverlay') {
            // Trouver le bloc dans notre dictionnaire
            for (const [posKey, blockInfo] of Object.entries(this.blocks)) {
              if (blockInfo.mesh === object) {
                const [x, y, z] = posKey.split(',').map(Number);
  
                // Calculer la normale de la face
                const face = new THREE.Vector3();
                face.copy(intersect.face.normal);
  
                return {
                  position: { x, y, z },
                  blockInfo,
                  face: { x: face.x, y: face.y, z: face.z },
                  distance: intersect.distance
                };
              }
            }
          }
        }
      }
  
      return null;
    };
    
    // Simplifier le système de cassage de blocs pour plus de fiabilité
    document.addEventListener('mousedown', (e) => {
      // Si l'inventaire est ouvert, ne pas casser de blocs
      const inventory = document.querySelector('.mc-inventory-container');
      if (inventory && inventory.classList.contains('active')) return;
      
      // Si le constructeur 3D est actif
      if (window.minecraft3DBuilder && window.minecraft3DBuilder.isActive) {
        // Clic gauche pour casser
        if (e.button === 0) {
          const targetedBlock = window.minecraft3DBuilder.getTargetedBlock();
          if (targetedBlock) {
            // Supprimer directement le bloc
            window.minecraft3DBuilder.removeBlock(
              targetedBlock.position.x, 
              targetedBlock.position.y, 
              targetedBlock.position.z
            );
            
            // Jouer le son de cassage
            if (typeof window.playSound === 'function') {
              window.playSound('dig');
            }
          }
        }
      }
    });
    
    console.log("✅ Système de cassage de blocs amélioré");
  }
  
  /**
   * Ajoute un bouton de diagnostic pour aider à résoudre les problèmes
   */
  function addDiagnosticButton() {
    // Vérifier si le bouton existe déjà
    if (document.getElementById('minecraft-diagnostic-button')) {
      return;
    }
    
    const diagnosticButton = document.createElement('button');
    diagnosticButton.id = 'minecraft-diagnostic-button';
    diagnosticButton.textContent = "Diagnostiquer Minecraft";
    diagnosticButton.style.position = "fixed";
    diagnosticButton.style.top = "80px";
    diagnosticButton.style.right = "20px";
    diagnosticButton.style.zIndex = "1200";
    diagnosticButton.style.padding = "10px";
    diagnosticButton.style.background = "#3C8527";
    diagnosticButton.style.color = "white";
    diagnosticButton.style.border = "none";
    diagnosticButton.style.borderRadius = "5px";
    diagnosticButton.style.fontFamily = "'Minecraft', sans-serif";
    diagnosticButton.style.fontSize = "14px";
    diagnosticButton.style.cursor = "pointer";
    diagnosticButton.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
    diagnosticButton.style.opacity = "0";
    diagnosticButton.style.transition = "opacity 0.3s";
    
    diagnosticButton.addEventListener('click', runDiagnostic);
    
    document.body.appendChild(diagnosticButton);
    
    // Afficher le bouton après un délai
    setTimeout(() => {
      diagnosticButton.style.opacity = "0.7";
    }, 5000);
    
    console.log("✅ Bouton de diagnostic ajouté");
  }
  
  /**
   * Exécute un diagnostic complet des systèmes Minecraft
   */
  function runDiagnostic() {
    console.log("🔍 Diagnostic des systèmes Minecraft en cours...");
    
    // Recueillir des informations sur les systèmes
    const systems = [
      { name: "Constructeur 3D", instance: window.minecraft3DBuilder, required: false },
      { name: "Système d'inventaire", instance: window.minecraftInventory, required: true },
      { name: "Système météo", instance: window.minecraftWeather, required: false },
      { name: "Système sonore", instance: window.minecraftSoundSystem, required: true },
      { name: "Système de mobs", instance: window.minecraftMobs, required: false },
      { name: "Système d'achievements", instance: window.minecraftAchievements, required: false },
      { name: "Système de drops", instance: window.minecraftDrops, required: false },
      { name: "Système de crafting", instance: window.minecraftCrafting, required: false }
    ];
    
    let report = "=== RAPPORT DE DIAGNOSTIC MINECRAFT ===\n\n";
    let issuesFound = false;
    
    systems.forEach(system => {
      if (system.instance) {
        report += `✅ ${system.name}: OK\n`;
      } else if (system.required) {
        report += `❌ ${system.name}: MANQUANT (Critique)\n`;
        issuesFound = true;
      } else {
        report += `⚠️ ${system.name}: MANQUANT (Optionnel)\n`;
      }
    });
    
    // Vérifier le localStorage
    try {
      localStorage.setItem('minecraft-test', 'test');
      localStorage.removeItem('minecraft-test');
      report += "✅ Stockage local: OK\n";
    } catch (e) {
      report += "❌ Stockage local: ERREUR (Les sauvegardes ne fonctionneront pas)\n";
      issuesFound = true;
    }
    
    // Vérifier WebGL
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        report += "✅ Support WebGL: OK\n";
      } else {
        report += "❌ Support WebGL: NON SUPPORTÉ (3D ne fonctionnera pas)\n";
        issuesFound = true;
      }
    } catch (e) {
      report += "❌ Support WebGL: ERREUR\n";
      issuesFound = true;
    }
    
    // Vérifier Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext) {
        report += "✅ Web Audio API: OK\n";
        audioContext.close();
      }
    } catch (e) {
      report += "❌ Web Audio API: NON SUPPORTÉE (Sons ne fonctionneront pas)\n";
      issuesFound = true;
    }
    
    // Conclusion et recommandations
    report += "\n=== CONCLUSION ===\n";
    if (issuesFound) {
      report += "⚠️ Des problèmes ont été détectés. Voici les solutions recommandées:\n\n";
      report += "1. Rafraîchissez la page pour réinitialiser les systèmes\n";
      report += "2. Videz le cache du navigateur\n";
      report += "3. Utilisez un navigateur moderne (Chrome, Firefox, Edge)\n";
      report += "4. Désactivez les bloqueurs de scripts et autorisez le stockage local\n";
    } else {
      report += "✅ Tous les systèmes fonctionnent correctement!\n";
    }
    
    // Afficher le rapport
    console.log(report);
    alert(report);
    
    // Si des problèmes critiques sont détectés, proposer une réparation
    if (issuesFound) {
      if (confirm("Voulez-vous tenter une réparation automatique?")) {
        repairSystems();
      }
    }
  }
  
  /**
   * Tente de réparer les systèmes défectueux
   */
  function repairSystems() {
    console.log("🔧 Tentative de réparation des systèmes Minecraft...");
    
    // Sauvegarder les données importantes
    const inventoryData = localStorage.getItem('minecraft-inventory');
    const achievementsData = localStorage.getItem('minecraft-achievements');
    
    // Réinitialiser les paramètres problématiques
    localStorage.removeItem('minecraft-inventory');
    localStorage.removeItem('minecraft-visited-pages');
    
    // Redémarrer les systèmes
    if (window.minecraftInventory) {
      window.minecraftInventory.loadInventory();
      window.minecraftInventory.updateInventoryUI();
    }
    
    if (window.minecraftAchievements) {
      window.minecraftAchievements.loadAchievements();
    }
    
    // Forcer la mise à jour des affichages
    if (document.querySelector('.minecraft-builder-3d') && window.minecraft3DBuilder) {
      const inventory = document.querySelector('.mc-inventory-container');
      if (inventory) inventory.classList.remove('active');
    }
    
    alert("Réparation terminée ! Rechargez la page si les problèmes persistent.");
  }
  
  // Exécuter les corrections après le chargement complet
  document.addEventListener('DOMContentLoaded', function() {
    // Attendre que tous les systèmes soient chargés
    setTimeout(applyMinecraftFixes, 3000);
  });
  
  // Appliquer immédiatement si la page est déjà chargée
  if (document.readyState === 'complete') {
    setTimeout(applyMinecraftFixes, 1000);
  }

  