/**
 * Minecraft Crafting System
 * Système de fabrication d'objets style Minecraft pour le site web
 */

class MinecraftCrafting {
    constructor() {
      this.recipes = [
        {
          id: 'wooden_pickaxe',
          name: 'Pioche en bois',
          ingredients: [
            { id: 'planks', count: 3 },
            { id: 'stick', count: 2 }
          ],
          pattern: [
            'PPP',
            ' S ',
            ' S '
          ],
          result: {
            id: 'wooden_pickaxe',
            count: 1,
            icon: 'wooden_pickaxe',
            category: 'tools'
          }
        },
        {
          id: 'stone_pickaxe',
          name: 'Pioche en pierre',
          ingredients: [
            { id: 'cobblestone', count: 3 },
            { id: 'stick', count: 2 }
          ],
          pattern: [
            'CCC',
            ' S ',
            ' S '
          ],
          result: {
            id: 'stone_pickaxe',
            count: 1,
            icon: 'stone_pickaxe',
            category: 'tools'
          }
        },
        {
          id: 'iron_pickaxe',
          name: 'Pioche en fer',
          ingredients: [
            { id: 'iron_ingot', count: 3 },
            { id: 'stick', count: 2 }
          ],
          pattern: [
            'III',
            ' S ',
            ' S '
          ],
          result: {
            id: 'iron_pickaxe',
            count: 1,
            icon: 'iron_pickaxe',
            category: 'tools'
          }
        },
        {
          id: 'diamond_pickaxe',
          name: 'Pioche en diamant',
          ingredients: [
            { id: 'diamond', count: 3 },
            { id: 'stick', count: 2 }
          ],
          pattern: [
            'DDD',
            ' S ',
            ' S '
          ],
          result: {
            id: 'diamond_pickaxe',
            count: 1,
            icon: 'diamond_pickaxe',
            category: 'tools'
          }
        },
        {
          id: 'crafting_table',
          name: 'Table de craft',
          ingredients: [
            { id: 'planks', count: 4 }
          ],
          pattern: [
            'PP',
            'PP'
          ],
          result: {
            id: 'crafting_table',
            count: 1,
            icon: 'crafting_table',
            category: 'blocks'
          }
        },
        {
          id: 'furnace',
          name: 'Fourneau',
          ingredients: [
            { id: 'cobblestone', count: 8 }
          ],
          pattern: [
            'CCC',
            'C C',
            'CCC'
          ],
          result: {
            id: 'furnace',
            count: 1,
            icon: 'furnace',
            category: 'blocks'
          }
        },
        {
          id: 'chest',
          name: 'Coffre',
          ingredients: [
            { id: 'planks', count: 8 }
          ],
          pattern: [
            'PPP',
            'P P',
            'PPP'
          ],
          result: {
            id: 'chest',
            count: 1,
            icon: 'chest',
            category: 'blocks'
          }
        },
        {
          id: 'bed',
          name: 'Lit',
          ingredients: [
            { id: 'planks', count: 3 },
            { id: 'wool', count: 3 }
          ],
          pattern: [
            'WWW',
            'PPP'
          ],
          result: {
            id: 'bed',
            count: 1,
            icon: 'bed',
            category: 'blocks'
          }
        },
        {
          id: 'torch',
          name: 'Torche',
          ingredients: [
            { id: 'coal', count: 1 },
            { id: 'stick', count: 1 }
          ],
          pattern: [
            'C',
            'S'
          ],
          result: {
            id: 'torch',
            count: 4,
            icon: 'torch',
            category: 'blocks'
          }
        },
        {
          id: 'wooden_sword',
          name: 'Épée en bois',
          ingredients: [
            { id: 'planks', count: 2 },
            { id: 'stick', count: 1 }
          ],
          pattern: [
            'P',
            'P',
            'S'
          ],
          result: {
            id: 'wooden_sword',
            count: 1,
            icon: 'wooden_sword',
            category: 'tools'
          }
        },
        {
          id: 'stone_sword',
          name: 'Épée en pierre',
          ingredients: [
            { id: 'cobblestone', count: 2 },
            { id: 'stick', count: 1 }
          ],
          pattern: [
            'C',
            'C',
            'S'
          ],
          result: {
            id: 'stone_sword',
            count: 1,
            icon: 'stone_sword',
            category: 'tools'
          }
        },
        {
          id: 'iron_sword',
          name: 'Épée en fer',
          ingredients: [
            { id: 'iron_ingot', count: 2 },
            { id: 'stick', count: 1 }
          ],
          pattern: [
            'I',
            'I',
            'S'
          ],
          result: {
            id: 'iron_sword',
            count: 1,
            icon: 'iron_sword',
            category: 'tools'
          }
        },
        {
          id: 'diamond_sword',
          name: 'Épée en diamant',
          ingredients: [
            { id: 'diamond', count: 2 },
            { id: 'stick', count: 1 }
          ],
          pattern: [
            'D',
            'D',
            'S'
          ],
          result: {
            id: 'diamond_sword',
            count: 1,
            icon: 'diamond_sword',
            category: 'tools'
          }
        },
        {
          id: 'bow',
          name: 'Arc',
          ingredients: [
            { id: 'stick', count: 3 },
            { id: 'string', count: 3 }
          ],
          pattern: [
            ' ST',
            'S T',
            ' ST'
          ],
          result: {
            id: 'bow',
            count: 1,
            icon: 'bow',
            category: 'tools'
          }
        },
        {
          id: 'arrow',
          name: 'Flèche',
          ingredients: [
            { id: 'flint', count: 1 },
            { id: 'stick', count: 1 },
            { id: 'feather', count: 1 }
          ],
          pattern: [
            'F',
            'S',
            'H'
          ],
          result: {
            id: 'arrow',
            count: 4,
            icon: 'arrow',
            category: 'tools'
          }
        }
      ];
      
      this.items = [
        { id: 'planks', name: 'Planches', icon: 'planks', category: 'resources' },
        { id: 'cobblestone', name: 'Pierre taillée', icon: 'cobblestone', category: 'resources' },
        { id: 'stick', name: 'Bâton', icon: 'stick', category: 'resources' },
        { id: 'iron_ingot', name: 'Lingot de fer', icon: 'iron_ingot', category: 'resources' },
        { id: 'diamond', name: 'Diamant', icon: 'diamond', category: 'resources' },
        { id: 'coal', name: 'Charbon', icon: 'coal', category: 'resources' },
        { id: 'wool', name: 'Laine', icon: 'wool', category: 'resources' },
        { id: 'string', name: 'Ficelle', icon: 'string', category: 'resources' },
        { id: 'flint', name: 'Silex', icon: 'flint', category: 'resources' },
        { id: 'feather', name: 'Plume', icon: 'feather', category: 'resources' }
      ];
      
      // Ajouter les résultats des recettes à la liste des items
      this.recipes.forEach(recipe => {
        if (!this.items.find(item => item.id === recipe.result.id)) {
          this.items.push({
            id: recipe.result.id,
            name: recipe.name,
            icon: recipe.result.icon,
            category: recipe.result.category
          });
        }
      });
      
      this.inventory = {};
      this.craftingGrid = Array(9).fill(null);
      
      this.loadInventory();
      this.createCraftingUI();
      this.setupEventListeners();
    }
    
    /**
     * Crée l'interface utilisateur pour le système de crafting
     */
    createCraftingUI() {
      // 1. Créer le bouton pour ouvrir l'interface de crafting
      const craftingButton = document.createElement('div');
      craftingButton.className = 'minecraft-crafting-button';
      craftingButton.innerHTML = `
        <div class="crafting-icon">
          <i class="fas fa-hammer"></i>
        </div>
      `;
      
      // 2. Créer l'interface de crafting
      const craftingInterface = document.createElement('div');
      craftingInterface.className = 'minecraft-crafting-interface';
      craftingInterface.innerHTML = `
        <div class="crafting-interface-header">
          <h2>Table de Craft</h2>
          <button class="crafting-close-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="crafting-interface-content">
          <div class="crafting-workspace">
            <div class="crafting-grid">
              ${Array(9).fill(`<div class="crafting-slot"></div>`).join('')}
            </div>
            <div class="crafting-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
            <div class="crafting-result">
              <div class="crafting-slot result-slot"></div>
            </div>
          </div>
          
          <div class="crafting-inventory">
            <h3>Inventaire</h3>
            <div class="inventory-search">
              <input type="text" placeholder="Rechercher..." class="inventory-search-input">
            </div>
            <div class="inventory-grid">
              ${this.items.map(() => `<div class="inventory-slot"></div>`).join('')}
            </div>
          </div>
        </div>
      `;
      
      // 3. Ajouter les éléments au DOM
      document.body.appendChild(craftingButton);
      document.body.appendChild(craftingInterface);
      
      // 4. Ajouter les styles CSS
      this.addCraftingStyles();
      
      // 5. Remplir l'inventaire avec les items
      this.updateInventoryUI();
    }
    
    /**
     * Configure les écouteurs d'événements pour le système de crafting
     */
    setupEventListeners() {
      // 1. Bouton pour ouvrir/fermer l'interface de crafting
      const craftingButton = document.querySelector('.minecraft-crafting-button');
      const craftingInterface = document.querySelector('.minecraft-crafting-interface');
      const closeBtn = document.querySelector('.crafting-close-btn');
      
      // Ouvrir/fermer l'interface
      craftingButton.addEventListener('click', () => {
        craftingInterface.classList.toggle('show');
        this.playSound('click');
      });
      
      closeBtn.addEventListener('click', () => {
        craftingInterface.classList.remove('show');
        this.playSound('click');
      });
      
      // 2. Gestion du drag & drop des items
      const inventorySlots = document.querySelectorAll('.inventory-slot');
      const craftingSlots = document.querySelectorAll('.crafting-grid .crafting-slot');
      const resultSlot = document.querySelector('.result-slot');
      
      // Pour chaque slot d'inventaire
      inventorySlots.forEach((slot, index) => {
        // Rendre draggable
        slot.setAttribute('draggable', 'true');
        slot.dataset.slotType = 'inventory';
        slot.dataset.slotIndex = index;
        
        // Événements de drag
        slot.addEventListener('dragstart', (e) => this.handleDragStart(e));
        slot.addEventListener('dragend', (e) => this.handleDragEnd(e));
        slot.addEventListener('dragover', (e) => this.handleDragOver(e));
        slot.addEventListener('dragenter', (e) => this.handleDragEnter(e));
        slot.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        slot.addEventListener('drop', (e) => this.handleDrop(e));
        
        // Événement de clic
        slot.addEventListener('click', (e) => this.handleSlotClick(e));
      });
      
      // Pour chaque slot de crafting
      craftingSlots.forEach((slot, index) => {
        // Rendre droppable
        slot.dataset.slotType = 'crafting';
        slot.dataset.slotIndex = index;
        
        // Événements de drag
        slot.addEventListener('dragstart', (e) => this.handleDragStart(e));
        slot.addEventListener('dragend', (e) => this.handleDragEnd(e));
        slot.addEventListener('dragover', (e) => this.handleDragOver(e));
        slot.addEventListener('dragenter', (e) => this.handleDragEnter(e));
        slot.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        slot.addEventListener('drop', (e) => this.handleDrop(e));
        
        // Événement de clic
        slot.addEventListener('click', (e) => this.handleSlotClick(e));
      });
      
      // Pour le slot de résultat
      resultSlot.dataset.slotType = 'result';
      resultSlot.addEventListener('click', (e) => this.handleResultClick(e));
      
      // 3. Recherche dans l'inventaire
      const searchInput = document.querySelector('.inventory-search-input');
      searchInput.addEventListener('input', () => {
        this.filterInventory(searchInput.value.toLowerCase());
      });
      
      // 4. Ajouter un bouton pour récupérer des items aléatoires
      const craftingHeader = document.querySelector('.crafting-interface-header');
      const getItemsButton = document.createElement('button');
      getItemsButton.className = 'get-items-btn';
      getItemsButton.textContent = 'Obtenir des ressources';
      craftingHeader.appendChild(getItemsButton);
      
      getItemsButton.addEventListener('click', () => {
        this.getRandomItems();
        this.playSound('click');
      });
    }
    
    /**
     * Gère le début du drag d'un item
     */
    handleDragStart(e) {
      const slot = e.target;
      const slotType = slot.dataset.slotType;
      const slotIndex = slot.dataset.slotIndex;
      
      // Ne pas permettre de drag un slot vide
      if (!slot.querySelector('.item')) {
        e.preventDefault();
        return;
      }
      
      // Stocker les données du drag
      e.dataTransfer.setData('application/minecraft-item', JSON.stringify({
        slotType,
        slotIndex,
        itemId: slot.querySelector('.item').dataset.itemId,
        count: parseInt(slot.querySelector('.item-count').textContent, 10)
      }));
      
      // Style pour le drag
      slot.classList.add('dragging');
      
      // Son de clic
      this.playSound('click');
    }
    
    /**
     * Gère la fin du drag d'un item
     */
    handleDragEnd(e) {
      const slot = e.target;
      slot.classList.remove('dragging');
    }
    
    /**
     * Gère le survol d'un slot avec un item dragué
     */
    handleDragOver(e) {
      e.preventDefault(); // Autoriser le drop
    }
    
    /**
     * Gère l'entrée dans un slot avec un item dragué
     */
    handleDragEnter(e) {
      const slot = e.target.closest('.crafting-slot, .inventory-slot');
      if (slot) {
        slot.classList.add('drag-over');
      }
    }
    
    /**
     * Gère la sortie d'un slot avec un item dragué
     */
    handleDragLeave(e) {
      const slot = e.target.closest('.crafting-slot, .inventory-slot');
      if (slot) {
        slot.classList.remove('drag-over');
      }
    }
    
    /**
     * Gère le dépôt d'un item dans un slot
     */
    handleDrop(e) {
      e.preventDefault();
      const slot = e.target.closest('.crafting-slot, .inventory-slot');
      
      if (!slot) return;
      
      // Enlever la classe de survol
      slot.classList.remove('drag-over');
      
      try {
        // Récupérer les données du drag
        const data = JSON.parse(e.dataTransfer.getData('application/minecraft-item'));
        
        // Identifier les slots source et destination
        const sourceType = data.slotType;
        const sourceIndex = parseInt(data.slotIndex, 10);
        const destType = slot.dataset.slotType;
        const destIndex = parseInt(slot.dataset.slotIndex, 10);
        
        // Empêcher de déposer sur le même slot
        if (sourceType === destType && sourceIndex === destIndex) {
          return;
        }
        
        // Déplacer l'item
        this.moveItem(sourceType, sourceIndex, destType, destIndex);
        
        // Mettre à jour le résultat du crafting
        this.updateCraftingResult();
        
        // Son
        this.playSound('click');
      } catch (error) {
        console.error('Erreur lors du drop:', error);
      }
    }
    
    /**
     * Gère le clic sur un slot
     */
    handleSlotClick(e) {
      const slot = e.target.closest('.crafting-slot, .inventory-slot');
      if (!slot) return;
      
      const slotType = slot.dataset.slotType;
      const slotIndex = parseInt(slot.dataset.slotIndex, 10);
      
      // Si on maintient Shift, on déplace l'item entier
      if (e.shiftKey) {
        if (slotType === 'inventory') {
          // Trouver un slot de crafting vide
          const emptyCraftingSlot = Array.from(document.querySelectorAll('.crafting-grid .crafting-slot')).find(slot => !slot.querySelector('.item'));
          if (emptyCraftingSlot) {
            this.moveItem(slotType, slotIndex, 'crafting', parseInt(emptyCraftingSlot.dataset.slotIndex, 10));
          }
        } else if (slotType === 'crafting') {
          // Renvoyer dans l'inventaire
          this.moveItem(slotType, slotIndex, 'inventory', -1); // -1 pour indiquer n'importe quel slot disponible
        }
      } else {
        // Sélectionner l'item (pour un clic futur)
        slot.classList.toggle('selected');
      }
      
      // Mettre à jour le résultat du crafting
      this.updateCraftingResult();
      
      // Son
      this.playSound('click');
    }
    
    /**
     * Gère le clic sur le slot de résultat
     */
    handleResultClick(e) {
      const resultSlot = e.target.closest('.result-slot');
      const itemElement = resultSlot.querySelector('.item');
      
      if (!itemElement) return; // Pas d'item à récupérer
      
      const itemId = itemElement.dataset.itemId;
      const recipe = this.findRecipeById(itemId);
      
      if (!recipe) return;
      
      // Ajouter l'item crafté à l'inventaire
      this.addItemToInventory(itemId, recipe.result.count);
      
      // Consommer les ingrédients
      this.consumeIngredients(recipe);
      
      // Mettre à jour l'UI
      this.updateInventoryUI();
      this.updateCraftingGrid();
      this.updateCraftingResult();
      
      // Son de crafting
      this.playSound('achievement');
      
      // Afficher une notification flottante
      const resultRect = resultSlot.getBoundingClientRect();
      this.showFloatingText(`${recipe.name} crafté !`, resultRect.left + resultRect.width / 2, resultRect.top);
      
      // Déclencher un événement pour le système d'achievements
      window.dispatchEvent(new CustomEvent('minecraft-item-crafted', {
        detail: {
          itemId: itemId,
          name: recipe.name
        }
      }));
    }
    
    /**
     * Déplace un item d'un slot à un autre
     */
    moveItem(sourceType, sourceIndex, destType, destIndex) {
      // 1. Récupérer l'item source
      let sourceItem;
      
      if (sourceType === 'inventory') {
        const item = this.getInventoryItemAtIndex(sourceIndex);
        if (!item) return;
        
        sourceItem = {
          id: item.id,
          count: 1 // On déplace un à la fois
        };
        
        // Décrémenter le compteur dans l'inventaire
        this.removeItemFromInventory(item.id, 1);
      } else if (sourceType === 'crafting') {
        sourceItem = this.craftingGrid[sourceIndex];
        this.craftingGrid[sourceIndex] = null;
      }
      
      if (!sourceItem) return;
      
      // 2. Placer l'item à destination
      if (destType === 'inventory') {
        // Ajouter à l'inventaire
        this.addItemToInventory(sourceItem.id, sourceItem.count);
      } else if (destType === 'crafting') {
        // Ajouter à la grille de crafting
        this.craftingGrid[destIndex] = sourceItem;
      }
      
      // 3. Mettre à jour l'UI
      this.updateInventoryUI();
      this.updateCraftingGrid();
      
      // 4. Sauvegarder l'inventaire
      this.saveInventory();
    }
    
    /**
     * Récupère l'item de l'inventaire à l'index spécifié
     */
    getInventoryItemAtIndex(index) {
      const itemsList = [];
      
      // Convertir l'objet inventory en liste
      for (const itemId in this.inventory) {
        const count = this.inventory[itemId];
        if (count > 0) {
          const item = this.items.find(i => i.id === itemId);
          if (item) {
            itemsList.push({
              id: itemId,
              name: item.name,
              icon: item.icon,
              count: count
            });
          }
        }
      }
      
      return itemsList[index];
    }
    
    /**
     * Ajoute un item à l'inventaire
     */
    addItemToInventory(itemId, count) {
      if (!itemId) return;
      
      if (!this.inventory[itemId]) {
        this.inventory[itemId] = 0;
      }
      
      this.inventory[itemId] += count;
      this.saveInventory();
    }
    
    /**
     * Retire un item de l'inventaire
     */
    removeItemFromInventory(itemId, count) {
      if (!this.inventory[itemId] || this.inventory[itemId] < count) return false;
      
      this.inventory[itemId] -= count;
      
      if (this.inventory[itemId] <= 0) {
        delete this.inventory[itemId];
      }
      
      this.saveInventory();
      return true;
    }
    
    /**
     * Consomme les ingrédients d'une recette
     */
    consumeIngredients(recipe) {
      // Retirer les items de la grille de crafting
      for (let i = 0; i < this.craftingGrid.length; i++) {
        this.craftingGrid[i] = null;
      }
    }
    
    /**
     * Met à jour l'interface de la grille de crafting
     */
    updateCraftingGrid() {
      const craftingSlots = document.querySelectorAll('.crafting-grid .crafting-slot');
      
      craftingSlots.forEach((slot, index) => {
        // Vider le slot
        slot.innerHTML = '';
        
        // Remplir avec l'item actuel s'il y en a un
        const item = this.craftingGrid[index];
        if (item) {
          const itemData = this.items.find(i => i.id === item.id);
          if (itemData) {
            slot.innerHTML = `
              <div class="item" data-item-id="${item.id}">
                <div class="item-icon ${itemData.icon}"></div>
                <div class="item-count">${item.count}</div>
              </div>
            `;
          }
        }
      });
    }
    
    /**
     * Met à jour l'interface de l'inventaire
     */
    updateInventoryUI() {
      const inventorySlots = document.querySelectorAll('.inventory-grid .inventory-slot');
      const itemsList = [];
      
      // Convertir l'objet inventory en liste
      for (const itemId in this.inventory) {
        const count = this.inventory[itemId];
        if (count > 0) {
          const item = this.items.find(i => i.id === itemId);
          if (item) {
            itemsList.push({
              id: itemId,
              name: item.name,
              icon: item.icon,
              count: count
            });
          }
        }
      }
      
      // Ajouter tous les items disponibles avec un compteur de 0 s'ils ne sont pas déjà dans l'inventaire
      this.items.forEach(item => {
        if (!this.inventory[item.id]) {
          itemsList.push({
            id: item.id,
            name: item.name,
            icon: item.icon,
            count: 0
          });
        }
      });
      
      // Remplir les slots d'inventaire
      inventorySlots.forEach((slot, index) => {
        // Vider le slot
        slot.innerHTML = '';
        
        // Remplir avec l'item correspondant
        if (index < itemsList.length) {
          const item = itemsList[index];
          
          // Afficher l'item (même avec un compteur de 0)
          slot.innerHTML = `
            <div class="item ${item.count === 0 ? 'empty' : ''}" data-item-id="${item.id}">
              <div class="item-icon ${item.icon}"></div>
              <div class="item-count">${item.count}</div>
              <div class="item-tooltip">${item.name}</div>
            </div>
          `;
        }
      });
    }
    
    /**
     * Met à jour le résultat du crafting
     */
    updateCraftingResult() {
      const resultSlot = document.querySelector('.result-slot');
      resultSlot.innerHTML = '';
      
      // Obtenir le pattern actuel
      const pattern = this.getCurrentPattern();
      
      // Trouver une recette correspondante
      const recipe = this.findMatchingRecipe(pattern);
      
      // S'il y a une recette correspondante, afficher le résultat
      if (recipe) {
        resultSlot.innerHTML = `
          <div class="item" data-item-id="${recipe.result.id}">
            <div class="item-icon ${recipe.result.icon}"></div>
            <div class="item-count">${recipe.result.count}</div>
            <div class="item-tooltip">${recipe.name}</div>
          </div>
        `;
        
        // Ajouter une animation
        resultSlot.classList.add('has-result');
        setTimeout(() => {
          resultSlot.classList.remove('has-result');
        }, 500);
      }
    }
    
    /**
     * Obtient le pattern actuel dans la grille de crafting
     */
    getCurrentPattern() {
      const pattern = [];
      
      // Grille 3x3
      for (let row = 0; row < 3; row++) {
        let rowPattern = '';
        for (let col = 0; col < 3; col++) {
          const index = row * 3 + col;
          const item = this.craftingGrid[index];
          
          if (item) {
            // Utiliser la première lettre de l'ID de l'item
            const letterCode = this.getPatternLetter(item.id);
            rowPattern += letterCode;
          } else {
            rowPattern += ' '; // Espace pour les cases vides
          }
        }
        
        if (rowPattern.trim().length > 0) {
          pattern.push(rowPattern);
        }
      }
      
      return pattern;
    }
    
    /**
     * Obtient la lettre de pattern pour un item
     */
    getPatternLetter(itemId) {
      switch (itemId) {
        case 'planks': return 'P';
        case 'cobblestone': return 'C';
        case 'stick': return 'S';
        case 'iron_ingot': return 'I';
        case 'diamond': return 'D';
        case 'wool': return 'W';
        case 'string': return 'T';
        case 'flint': return 'F';
        case 'feather': return 'H';
        case 'coal': return 'C';
        default: return 'X';
      }
    }
    
    /**
     * Trouve une recette correspondant au pattern actuel
     */
    findMatchingRecipe(currentPattern) {
      // Si le pattern est vide, pas de recette
      if (currentPattern.length === 0) return null;
      
      // Vérifier chaque recette
      for (const recipe of this.recipes) {
        const recipePattern = recipe.pattern;
        
        // Vérifier si les dimensions correspondent
        if (currentPattern.length !== recipePattern.length) continue;
        
        // Vérifier chaque ligne
        let matches = true;
        for (let i = 0; i < recipePattern.length; i++) {
          // Vérifier si les longueurs des lignes correspondent
          if (currentPattern[i].trim().length !== recipePattern[i].trim().length) {
            matches = false;
            break;
          }
          
          // Vérifier chaque caractère
          for (let j = 0; j < recipePattern[i].length; j++) {
            const recipeChar = recipePattern[i][j];
            const currentChar = currentPattern[i][j];
            
            // Si la recette attend un caractère spécifique
            if (recipeChar !== ' ' && currentChar !== recipeChar) {
              matches = false;
              break;
            }
            
            // Si la recette attend un espace mais il y a un caractère
            if (recipeChar === ' ' && currentChar !== ' ') {
              matches = false;
              break;
            }
          }
          
          if (!matches) break;
        }
        
        if (matches) return recipe;
      }
      
      return null;
    }
    
    /**
     * Trouve une recette par son ID
     */
    findRecipeById(recipeId) {
      return this.recipes.find(recipe => recipe.result.id === recipeId);
    }
    
    /**
     * Filtre l'inventaire en fonction d'un terme de recherche
     */
    filterInventory(term) {
      const inventorySlots = document.querySelectorAll('.inventory-grid .inventory-slot');
      
      inventorySlots.forEach(slot => {
        const item = slot.querySelector('.item');
        if (!item) return;
        
        const itemId = item.dataset.itemId;
        const itemData = this.items.find(i => i.id === itemId);
        
        if (itemData) {
          // Vérifier si le nom de l'item contient le terme de recherche
          if (itemData.name.toLowerCase().includes(term)) {
            slot.style.display = '';
          } else {
            slot.style.display = 'none';
          }
        }
      });
    }
    
    /**
     * Ajoute des items aléatoires à l'inventaire
     */
    getRandomItems() {
      // Liste des items de base qu'on peut obtenir
      const baseItems = ['planks', 'cobblestone', 'stick', 'iron_ingot', 'coal', 'wool', 'string', 'flint', 'feather'];
      
      // Obtenir 3 à 5 items aléatoires
      const numItems = 3 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < numItems; i++) {
        const randomItemId = baseItems[Math.floor(Math.random() * baseItems.length)];
        const randomCount = 1 + Math.floor(Math.random() * 5);
        
        this.addItemToInventory(randomItemId, randomCount);
      }
      
      // 10% de chance d'obtenir un diamant
      if (Math.random() < 0.1) {
        this.addItemToInventory('diamond', 1);
        this.showFloatingText('Vous avez trouvé un diamant !', window.innerWidth / 2, window.innerHeight / 2, '#5AC7C7');
        this.playSound('diamond');
      }
      
      // Mettre à jour l'UI
      this.updateInventoryUI();
      
      // Montrer un message
      this.showFloatingText('Vous avez obtenu des ressources !', window.innerWidth / 2, window.innerHeight / 2);
    }
    
    /**
     * Charge l'inventaire depuis le localStorage
     */
    loadInventory() {
      const savedInventory = localStorage.getItem('minecraft-crafting-inventory');
      if (savedInventory) {
        this.inventory = JSON.parse(savedInventory);
      } else {
        // Inventaire par défaut pour les débutants
        this.inventory = {
          'planks': 10,
          'stick': 5,
          'cobblestone': 3
        };
      }
    }
    
    /**
     * Sauvegarde l'inventaire dans le localStorage
     */
    saveInventory() {
      localStorage.setItem('minecraft-crafting-inventory', JSON.stringify(this.inventory));
    }
    
    /**
     * Ajoute les styles CSS pour le système de crafting
     */
    addCraftingStyles() {
      const style = document.createElement('style');
      style.textContent = `
        /* Bouton de crafting */
        .minecraft-crafting-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgba(30, 33, 40, 0.9);
          border: 2px solid var(--primary);
          width: 40px;
          height: 40px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          transition: all 0.3s;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .minecraft-crafting-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(82, 165, 53, 0.4);
        }
        
        .crafting-icon {
          color: var(--primary);
          font-size: 20px;
        }
        
        /* Interface de crafting */
        .minecraft-crafting-interface {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          background: rgba(20, 21, 25, 0.95);
          border: 3px solid var(--primary);
          border-radius: 8px;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.5, 0, 0.15, 1);
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        
        .minecraft-crafting-interface.show {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, -50%) scale(1);
        }
        
        .crafting-interface-header {
          padding: 15px 20px;
          border-bottom: 2px solid var(--primary-dark);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
        }
        
        .crafting-interface-header h2 {
          margin: 0;
          font-size: 22px;
        }
        
        .crafting-close-btn {
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
        
        .crafting-close-btn:hover {
          color: var(--primary);
          transform: scale(1.1);
        }
        
        .crafting-interface-content {
          padding: 20px;
          max-height: calc(90vh - 70px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        
        .get-items-btn {
          background: var(--primary);
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
          margin-right: 10px;
        }
        
        .get-items-btn:hover {
          background: var(--primary-light);
          transform: translateY(-2px);
        }
        
        /* Zone de crafting */
        .crafting-workspace {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
        }
        
        .crafting-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 4px;
          width: 180px;
          height: 180px;
        }
        
        .crafting-slot {
          background: rgba(30, 33, 40, 0.6);
          border: 2px solid var(--medium);
          border-radius: 3px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          position: relative;
        }
        
        .crafting-slot.drag-over {
          background: rgba(82, 165, 53, 0.2);
          border-color: var(--primary);
        }
        
        .crafting-slot.selected {
          border-color: #FFAA00;
          box-shadow: 0 0 5px rgba(255, 170, 0, 0.5);
        }
        
        .crafting-arrow {
          font-size: 24px;
          color: var(--primary);
          animation: pulse 1.5s infinite;
        }
        
        .crafting-result {
          width: 60px;
          height: 60px;
        }
        
        .result-slot {
          width: 100%;
          height: 100%;
          background: rgba(30, 33, 40, 0.8);
          border: 2px solid var(--medium);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        
        .result-slot.has-result {
          border-color: var(--primary);
          box-shadow: 0 0 10px rgba(82, 165, 53, 0.5);
          animation: resultPulse 0.5s;
        }
        
        @keyframes resultPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        /* Inventaire */
        .crafting-inventory {
          margin-top: 20px;
        }
        
        .crafting-inventory h3 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 18px;
        }
        
        .inventory-search {
          margin-bottom: 15px;
        }
        
        .inventory-search-input {
          width: 100%;
          padding: 8px 12px;
          background: rgba(30, 33, 40, 0.6);
          border: 2px solid var(--medium);
          border-radius: 4px;
          color: var(--light);
          font-family: 'Outfit', sans-serif;
        }
        
        .inventory-search-input:focus {
          outline: none;
          border-color: var(--primary);
        }
        
        .inventory-grid {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 8px;
        }
        
        .inventory-slot {
          aspect-ratio: 1/1;
          background: rgba(30, 33, 40, 0.6);
          border: 2px solid var(--medium);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          position: relative;
        }
        
        .inventory-slot.drag-over {
          background: rgba(82, 165, 53, 0.2);
          border-color: var(--primary);
        }
        
        .inventory-slot.selected {
          border-color: #FFAA00;
          box-shadow: 0 0 5px rgba(255, 170, 0, 0.5);
        }
        
        /* Items */
        .item {
          width: 80%;
          height: 80%;
          position: relative;
          cursor: grab;
        }
        
        .item.empty {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .item-icon {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          image-rendering: pixelated;
        }
        
        .item-count {
          position: absolute;
          bottom: -2px;
          right: -2px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          font-size: 10px;
          padding: 1px 3px;
          border-radius: 2px;
          font-weight: 600;
        }
        
        .item-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          font-size: 12px;
          padding: 3px 6px;
          border-radius: 3px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s;
          pointer-events: none;
          z-index: 10;
        }
        
        .item:hover .item-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(-5px);
        }
        
        .item.dragging {
          opacity: 0.5;
        }
        
        /* Icônes des items */
        .planks { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0FENTM0IiBkPSJNMCAwaDMydjMySDB6Ii8+PHBhdGggZmlsbD0iIzkzMzMxQSIgZD0iTTAgMGgxdjMySDB6bTMxIDBoMXYzMmgtMXpNMCAwaDMydjFIMHptMCAzMWgzMnYxSDB6Ii8+PHBhdGggZmlsbD0iIzk0N0Y1MSIgZD0iTTIgMmgyOHYyOEgyeiIvPjwvc3ZnPg=='); }
        .cobblestone { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzdEODg4MCIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM1RTY1NjEiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiM5Q0E1OUYiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48L3N2Zz4='); }
        .stick { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzczM0Q0OSIgZD0iTTE1IDhoMnYyMGgtMnoiLz48cGF0aCBmaWxsPSIjNTMyQjM1IiBkPSJNMTUgOGgxdjIwaC0xeiIvPjxwYXRoIGZpbGw9IiM5MzVGNDkiIGQ9Ik0xNiA4aDF2MjBoLTF6Ii8+PC9zdmc+'); }
        .iron_ingot { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0JEQkRCRCIgZD0iTTIgN2gyOHYxOEgyeiIvPjxwYXRoIGZpbGw9IiM4Nzg3ODciIGQ9Ik0yIDdoMXYxOEgyem0yNyAwaDF2MThoLTF6TTIgN2gyOHYxSDJ6bTAgMTdoMjh2MUgyeiIvPjxwYXRoIGZpbGw9IiNFOEU4RTgiIGQ9Ik0zIDhoMjZ2MThIM3oiLz48L3N2Zz4='); }
        .diamond { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzVBQzdDNyIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiMzOThBQTgiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiMzMTdENTYiIGQ9Ik0xMCA3aDEydjFIMTB6bS0yIDJoMTZ2MUg4em0tMiAyaDIwdjFINnptLTIgMmgyNHYxSDR6bTAgMmgyNHYxSDR6bTIgMmgyMHYxSDZ6bTIgMmgxNnYxSDh6bTIgMmgxMnYxSDEweiIvPjwvc3ZnPg=='); }
        .coal { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzEwMTAxMCIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiMyMTIxMjEiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiMzQzNDM0MiIGQ9Ik04IDhoMTZ2MTZIOHoiLz48L3N2Zz4='); }
        .wool { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiNDQUNBQ0EiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48L3N2Zz4='); }
        .string { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTEyIDJoOHYyOGgtOHoiLz48cGF0aCBmaWxsPSIjQ0FDQUNBIiBkPSJNMTIgMmgxdjI4aC0xem03IDBoMXYyOGgtMXpNMTIgMmg4djFoLTh6bTAgMjdoOHYxaC04eiIvPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMyAzaDZ2MjZoLTZ6Ii8+PC9zdmc+'); }
        .flint { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzRENEQ0RCIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiMzNTM1MzUiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiM2QjZCNkIiIGQ9Ik0xMCA1aDEydjIySDF6TTEgMjdoOXYtOWg0di04aDhWNWgtNHYtNEgxeiIvPjwvc3ZnPg=='); }
        .feather { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTEwIDJoMTJ2MjhIMTB6Ii8+PHBhdGggZmlsbD0iI0NBQ0FDQSIgZD0iTTEwIDJoMXYyOGgtMXptMTEgMGgxdjI4aC0xek0xMCAyaDEydjFIMTB6bTAgMjdoMTJ2MUgxMHoiLz48cGF0aCBmaWxsPSIjRkJGQkZCIiBkPSJNMTEgM2gxMHYyNkgxMXoiLz48L3N2Zz4='); }
        .wooden_pickaxe { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk0N0Y1MSIgZD0iTTUgNWg5djRINXoiLz48cGF0aCBmaWxsPSIjNzMzRDQ5IiBkPSJNMTQgN2gxMnYySDEyeiIvPjxwYXRoIGZpbGw9IiM5MzVGNDkiIGQ9Ik0xNSA5aDJ2MThoLTJ6Ii8+PC9zdmc+'); }
        .stone_pickaxe { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzlDQTU5RiIgZD0iTTUgNWg5djRINXoiLz48cGF0aCBmaWxsPSIjNzMzRDQ5IiBkPSJNMTQgN2gxMnYySDEyeiIvPjxwYXRoIGZpbGw9IiM5MzVGNDkiIGQ9Ik0xNSA5aDJ2MThoLTJ6Ii8+PC9zdmc+'); }
        .iron_pickaxe { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0U4RThFOCIgZD0iTTUgNWg5djRINXoiLz48cGF0aCBmaWxsPSIjNzMzRDQ5IiBkPSJNMTQgN2gxMnYySDEyeiIvPjxwYXRoIGZpbGw9IiM5MzVGNDkiIGQ9Ik0xNSA5aDJ2MThoLTJ6Ii8+PC9zdmc+'); }
        .diamond_pickaxe { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzVBQzdDNyIgZD0iTTUgNWg5djRINXoiLz48cGF0aCBmaWxsPSIjNzMzRDQ5IiBkPSJNMTQgN2gxMnYySDEyeiIvPjxwYXRoIGZpbGw9IiM5MzVGNDkiIGQ9Ik0xNSA5aDJ2MThoLTJ6Ii8+PC9zdmc+'); }
        .crafting_table { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0FENTM0IiBkPSJNNSA1aDIydjIySDV6Ii8+PHBhdGggZmlsbD0iIzkzMzMxQSIgZD0iTTUgNWgxdjIySDV6bTIxIDBoMXYyMmgtMXpNNSA1aDIydjFINXptMCAyMWgyMnYxSDV6Ii8+PHBhdGggZmlsbD0iIzk0N0Y1MSIgZD0iTTcgN2gxOHYxOEg3eiIvPjxwYXRoIGZpbGw9IiNDNEFCNzQiIGQ9Ik05IDloNHY0SDl6bTEwIDBoNHY0aC00ek05IDE5aDR2NGgtNHptMTAgMGg0djRoLTR6Ii8+PC9zdmc+'); }
        .furnace { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzdEODg4MCIgZD0iTTQgNGgyNHYyNEg0eiIvPjxwYXRoIGZpbGw9IiM1RTY1NjEiIGQ9Ik00IDRoMXYyNEg0em0yMyAwaDF2MjRoLTF6TTQgNGgyNHYxSDR6bTAgMjNoMjR2MUg0eiIvPjxwYXRoIGZpbGw9IiM5Q0E1OUYiIGQ9Ik01IDVoMjJ2MjJINXoiLz48cGF0aCBmaWxsPSIjNEM0QzRDIiBkPSJNMTIgMTJoOHY4aC04eiIvPjxwYXRoIGZpbGw9IiNFMjU4MjIiIGQ9Ik0xMyAxM2g2djZoLTZ6Ii8+PC9zdmc+'); }
        .chest { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzg2NUQzNiIgZD0iTTMgNmgyNnYyMEgzeiIvPjxwYXRoIGZpbGw9IiM2MjQyMjUiIGQ9Ik0zIDZoMXYyMEgzem0yNSAwaDF2MjBoLTF6TTMgNmgyNnYxSDN6bTAgMTloMjZ2MUgzeiIvPjxwYXRoIGZpbGw9IiNBQTc0NEQiIGQ9Ik00IDdoMjR2MThINHoiLz48cGF0aCBmaWxsPSIjNEMzOTFCIiBkPSJNMTQgMTVoNHYzaC00eiIvPjwvc3ZnPg=='); }
        .bed { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk0N0Y1MSIgZD0iTTIgMThoMjh2OEgyeiIvPjxwYXRoIGZpbGw9IiNDQzE0MTQiIGQ9Ik0yIDZoMjh2MTJIMnoiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNiA5aDZ2Nkg2em0xNCAwaDZ2Nmgteiiv6PC9zdmc+'); }
        .torch { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzczM0Q0OSIgZD0iTTE0IDEyaDF2MTdoLTF6bTMgMGgxdjE3aC0xeiIvPjxwYXRoIGZpbGw9IiNGQ0M0MUIiIGQ9Ik0xMyA0aDZ2OGgtNnoiLz48cGF0aCBmaWxsPSIjRkY1QzVDIiBkPSJNMTQgNmg0djRoLTR6Ii8+PC9zdmc+'); }
        .wooden_sword { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk0N0Y1MSIgZD0iTTEyIDVoOHYxMmgtOHoiLz48cGF0aCBmaWxsPSIjNzMzRDQ5IiBkPSJNMTQgMTdoNHYxMGgtNHoiLz48L3N2Zz4='); }
        .stone_sword { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzlDQTU5RiIgZD0iTTEyIDVoOHYxMmgtOHoiLz48cGF0aCBmaWxsPSIjNzMzRDQ5IiBkPSJNMTQgMTdoNHYxMGgtNHoiLz48L3N2Zz4='); }
        .iron_sword { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0U4RThFOCIgZD0iTTEyIDVoOHYxMmgtOHoiLz48cGF0aCBmaWxsPSIjNzMzRDQ5IiBkPSJNMTQgMTdoNHYxMGgtNHoiLz48L3N2Zz4='); }
        .diamond_sword { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzVBQzdDNyIgZD0iTTEyIDVoOHYxMmgtOHoiLz48cGF0aCBmaWxsPSIjNzMzRDQ5IiBkPSJNMTQgMTdoNHYxMGgtNHoiLz48L3N2Zz4='); }
        .bow { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzczM0Q0OSIgZD0iTTYgNXY2bDIwIDE0di00TDYgN3YyOEw1IDNoMXYyeiIvPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0zIDVsMiAyMnYtNmwyMC0xMHYtNEwzIDV6Ii8+PC9zdmc+'); }
        .arrow { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzRENEQ0RCIgZD0iTTE0IDZoNHY0aC00eiIvPjxwYXRoIGZpbGw9IiM3MzNENDkiIGQ9Ik0xNCAxMGg0djEyaC00eiIvPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMCAyMmgxMnY0SDEweiIvPjwvc3ZnPg=='); }
        
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
        
        /* Styles pour les mobiles */
        @media (max-width: 768px) {
          .minecraft-crafting-interface {
            width: 95%;
            max-height: 95vh;
          }
          
          .crafting-interface-content {
            flex-direction: column;
            gap: 15px;
          }
          
          .crafting-workspace {
            flex-direction: column;
            gap: 15px;
          }
          
          .crafting-grid {
            width: 150px;
            height: 150px;
          }
          
          .inventory-grid {
            grid-template-columns: repeat(5, 1fr);
          }
          
          .get-items-btn {
            font-size: 12px;
            padding: 4px 8px;
          }
        }
        
        /* Préférences de réduction de mouvement */
        @media (prefers-reduced-motion: reduce) {
          .minecraft-crafting-interface,
          .floating-text,
          .result-slot,
          .crafting-arrow {
            transition: none !important;
            animation: none !important;
          }
        }
      `;
      
      document.head.appendChild(style);
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
  
  // Initialiser le système de crafting
  document.addEventListener('DOMContentLoaded', function() {
    window.minecraftCrafting = new MinecraftCrafting();
  });