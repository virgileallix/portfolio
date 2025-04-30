/**
 * Minecraft Inventory System
 * Système d'inventaire complet style Minecraft pour le site web
 */

class MinecraftInventory {
    constructor() {
        this.items = {};
        this.capacity = 36; // Taille d'un inventaire Minecraft standard
        this.hotbarSize = 9;
        this.selectedSlot = 0;
        
        // Définition des items disponibles avec leurs propriétés
        this.itemDefinitions = {
            // Blocs
            'stone': { name: 'Pierre', maxStack: 64, category: 'block', icon: 'stone' },
            'grass_block': { name: 'Bloc d\'herbe', maxStack: 64, category: 'block', icon: 'grass_block' },
            'dirt': { name: 'Terre', maxStack: 64, category: 'block', icon: 'dirt' },
            'cobblestone': { name: 'Pierre taillée', maxStack: 64, category: 'block', icon: 'cobblestone' },
            'oak_planks': { name: 'Planches de chêne', maxStack: 64, category: 'block', icon: 'oak_planks' },
            'oak_log': { name: 'Bûche de chêne', maxStack: 64, category: 'block', icon: 'oak_log' },
            'glass': { name: 'Verre', maxStack: 64, category: 'block', icon: 'glass' },
            'oak_leaves': { name: 'Feuilles de chêne', maxStack: 64, category: 'block', icon: 'oak_leaves' },
            'sand': { name: 'Sable', maxStack: 64, category: 'block', icon: 'sand' },
            'bookshelf': { name: 'Bibliothèque', maxStack: 64, category: 'block', icon: 'bookshelf' },
            'crafting_table': { name: 'Table de craft', maxStack: 64, category: 'block', icon: 'crafting_table' },
            'furnace': { name: 'Fourneau', maxStack: 64, category: 'block', icon: 'furnace' },
            'chest': { name: 'Coffre', maxStack: 64, category: 'block', icon: 'chest' },
            'diamond_block': { name: 'Bloc de diamant', maxStack: 64, category: 'block', icon: 'diamond_block' },
            'iron_block': { name: 'Bloc de fer', maxStack: 64, category: 'block', icon: 'iron_block' },
            'gold_block': { name: 'Bloc d\'or', maxStack: 64, category: 'block', icon: 'gold_block' },
            
            // Ressources
            'stick': { name: 'Bâton', maxStack: 64, category: 'resource', icon: 'stick' },
            'coal': { name: 'Charbon', maxStack: 64, category: 'resource', icon: 'coal' },
            'iron_ingot': { name: 'Lingot de fer', maxStack: 64, category: 'resource', icon: 'iron_ingot' },
            'gold_ingot': { name: 'Lingot d\'or', maxStack: 64, category: 'resource', icon: 'gold_ingot' },
            'diamond': { name: 'Diamant', maxStack: 64, category: 'resource', icon: 'diamond' },
            'redstone': { name: 'Redstone', maxStack: 64, category: 'resource', icon: 'redstone' },
            'string': { name: 'Ficelle', maxStack: 64, category: 'resource', icon: 'string' },
            'leather': { name: 'Cuir', maxStack: 64, category: 'resource', icon: 'leather' },
            'paper': { name: 'Papier', maxStack: 64, category: 'resource', icon: 'paper' },
            'book': { name: 'Livre', maxStack: 64, category: 'resource', icon: 'book' },
            
            // Outils
            'wooden_pickaxe': { name: 'Pioche en bois', maxStack: 1, durability: 59, category: 'tool', icon: 'wooden_pickaxe' },
            'stone_pickaxe': { name: 'Pioche en pierre', maxStack: 1, durability: 131, category: 'tool', icon: 'stone_pickaxe' },
            'iron_pickaxe': { name: 'Pioche en fer', maxStack: 1, durability: 250, category: 'tool', icon: 'iron_pickaxe' },
            'diamond_pickaxe': { name: 'Pioche en diamant', maxStack: 1, durability: 1561, category: 'tool', icon: 'diamond_pickaxe' },
            'wooden_sword': { name: 'Épée en bois', maxStack: 1, durability: 59, category: 'tool', icon: 'wooden_sword' },
            'stone_sword': { name: 'Épée en pierre', maxStack: 1, durability: 131, category: 'tool', icon: 'stone_sword' },
            'iron_sword': { name: 'Épée en fer', maxStack: 1, durability: 250, category: 'tool', icon: 'iron_sword' },
            'diamond_sword': { name: 'Épée en diamant', maxStack: 1, durability: 1561, category: 'tool', icon: 'diamond_sword' },
            'bow': { name: 'Arc', maxStack: 1, durability: 384, category: 'tool', icon: 'bow' },
            'fishing_rod': { name: 'Canne à pêche', maxStack: 1, durability: 64, category: 'tool', icon: 'fishing_rod' },
            
            // Nourriture
            'apple': { name: 'Pomme', maxStack: 64, foodPoints: 4, category: 'food', icon: 'apple' },
            'bread': { name: 'Pain', maxStack: 64, foodPoints: 5, category: 'food', icon: 'bread' },
            'cooked_beef': { name: 'Steak', maxStack: 64, foodPoints: 8, category: 'food', icon: 'cooked_beef' },
            'cookie': { name: 'Cookie', maxStack: 64, foodPoints: 2, category: 'food', icon: 'cookie' },
            'golden_apple': { name: 'Pomme dorée', maxStack: 64, foodPoints: 4, effects: ['regeneration'], category: 'food', icon: 'golden_apple' }
        };
        
        // Configuration de l'inventaire par défaut (vide)
        this.clearInventory();
        this.loadInventory();
        this.createInventoryUI();
        
        // Ajout d'items par défaut pour les nouveaux utilisateurs
        if (Object.keys(this.items).length === 0) {
            this.addItem('stone', 64);
            this.addItem('oak_planks', 64);
            this.addItem('diamond_pickaxe', 1);
            this.addItem('apple', 10);
        }
    }
    
    /**
     * Crée l'interface utilisateur de l'inventaire
     */
    createInventoryUI() {
        // Créer le conteneur principal
        const inventoryButton = document.createElement('div');
        inventoryButton.className = 'minecraft-inventory-button';
        inventoryButton.innerHTML = `
            <div class="inventory-icon">
                <i class="fas fa-box-open"></i>
            </div>
        `;
        
        // Créer le panneau d'inventaire
        const inventoryPanel = document.createElement('div');
        inventoryPanel.className = 'minecraft-inventory-panel';
        inventoryPanel.innerHTML = `
            <div class="inventory-panel-header">
                <h2>Inventaire</h2>
                <button class="inventory-close-btn"><i class="fas fa-times"></i></button>
            </div>
            <div class="inventory-panel-content">
                <div class="inventory-grid">
                    ${Array(this.capacity).fill(`<div class="inventory-slot" data-slot="0"></div>`).join('')}
                </div>
                <div class="inventory-hotbar">
                    ${Array(this.hotbarSize).fill(`<div class="hotbar-slot" data-slot="0"></div>`).join('')}
                </div>
                <div class="inventory-stats">
                    <div class="player-health">
                        <div class="health-icon"><i class="fas fa-heart"></i></div>
                        <div class="health-bar">
                            <div class="health-fill"></div>
                        </div>
                    </div>
                    <div class="player-hunger">
                        <div class="hunger-icon"><i class="fas fa-drumstick-bite"></i></div>
                        <div class="hunger-bar">
                            <div class="hunger-fill"></div>
                        </div>
                    </div>
                    <div class="player-xp">
                        <div class="xp-icon"><i class="fas fa-star"></i></div>
                        <div class="xp-bar">
                            <div class="xp-fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Ajouter le style pour l'inventaire
        this.addInventoryStyles();
        
        // Ajouter les éléments au DOM
        document.body.appendChild(inventoryButton);
        document.body.appendChild(inventoryPanel);
        
        // Ajouter les écouteurs d'événements
        inventoryButton.addEventListener('click', () => {
            this.toggleInventory();
            this.playSound('click');
        });
        
        const closeBtn = inventoryPanel.querySelector('.inventory-close-btn');
        closeBtn.addEventListener('click', () => {
            this.toggleInventory(false);
            this.playSound('click');
        });
        
        // Configurer le glisser-déposer pour les slots
        this.setupDragAndDrop();
        
        // Configurer la touche E pour ouvrir/fermer l'inventaire
        document.addEventListener('keydown', (e) => {
            if (e.code === 'KeyE') {
                this.toggleInventory();
                this.playSound('click');
                e.preventDefault();
            }
            
            // Touches numériques pour sélectionner les slots de la hotbar
            if (e.code.startsWith('Digit') && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                const digit = parseInt(e.code.replace('Digit', ''));
                if (digit >= 1 && digit <= 9) {
                    this.selectHotbarSlot(digit - 1);
                    this.playSound('click');
                }
            }
        });
        
        // Initialiser l'affichage
        this.updateInventoryUI();
    }
    
    /**
     * Configure les fonctionnalités de glisser-déposer pour l'inventaire
     */
    setupDragAndDrop() {
        const slots = document.querySelectorAll('.inventory-slot, .hotbar-slot');
        let draggedItem = null;
        let draggedSlot = null;
        let dragImage = null;
        
        slots.forEach((slot, index) => {
            // Assigner le bon index au slot
            slot.dataset.slot = index;
            
            // Rendre le slot draggable
            slot.setAttribute('draggable', 'true');
            
            // Gérer le début du drag
            slot.addEventListener('dragstart', (e) => {
                if (!slot.querySelector('.item')) return;
                
                draggedSlot = slot;
                draggedItem = {
                    id: slot.querySelector('.item').dataset.itemId,
                    count: parseInt(slot.querySelector('.item-count').textContent, 10)
                };
                
                // Créer une image pour le drag
                dragImage = slot.querySelector('.item').cloneNode(true);
                dragImage.style.position = 'absolute';
                dragImage.style.top = '-1000px';
                document.body.appendChild(dragImage);
                e.dataTransfer.setDragImage(dragImage, 15, 15);
                
                slot.classList.add('dragging');
                this.playSound('click');
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
                
                // Swap items between slots
                this.swapSlots(sourceSlot, targetSlot);
                this.playSound('click');
                this.updateInventoryUI();
                this.saveInventory();
            });
            
            // Gérer le clic simple (pour utiliser des items)
            slot.addEventListener('click', (e) => {
                const item = slot.querySelector('.item');
                if (!item) return;
                
                // Clic droit (ou Shift+clic) pour consommer
                if (e.button === 2 || e.shiftKey) {
                    const itemId = item.dataset.itemId;
                    const itemDef = this.itemDefinitions[itemId];
                    
                    if (itemDef.category === 'food') {
                        this.consumeItem(parseInt(slot.dataset.slot));
                    }
                }
                
                this.playSound('click');
            });
            
            // Prévenir le menu contextuel
            slot.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                // Simuler un clic droit pour consommer
                const itemElement = slot.querySelector('.item');
                if (itemElement) {
                    const slotIndex = parseInt(slot.dataset.slot);
                    const itemId = this.getSlotItem(slotIndex).id;
                    if (this.itemDefinitions[itemId].category === 'food') {
                        this.consumeItem(slotIndex);
                    }
                }
            });
        });
    }
    
    /**
     * Bascule l'affichage de l'inventaire
     */
    toggleInventory(show = null) {
        const panel = document.querySelector('.minecraft-inventory-panel');
        if (!panel) return;
        
        if (show === null) {
            panel.classList.toggle('show');
        } else {
            show ? panel.classList.add('show') : panel.classList.remove('show');
        }
    }
    
    /**
     * Ajoute un item à l'inventaire
     */
    addItem(itemId, count = 1) {
        if (!this.itemDefinitions[itemId]) {
            console.error(`Item ${itemId} n'existe pas.`);
            return false;
        }
        
        const itemDef = this.itemDefinitions[itemId];
        const maxStack = itemDef.maxStack || 64;
        let remainingCount = count;
        
        // D'abord, essayer de compléter les stacks existants
        for (let slot = 0; slot < this.capacity; slot++) {
            if (remainingCount <= 0) break;
            
            const existingItem = this.items[slot];
            if (existingItem && existingItem.id === itemId && existingItem.count < maxStack) {
                const addAmount = Math.min(remainingCount, maxStack - existingItem.count);
                this.items[slot].count += addAmount;
                remainingCount -= addAmount;
            }
        }
        
        // Ensuite, utiliser des slots vides
        for (let slot = 0; slot < this.capacity; slot++) {
            if (remainingCount <= 0) break;
            
            if (!this.items[slot]) {
                const addAmount = Math.min(remainingCount, maxStack);
                this.items[slot] = {
                    id: itemId,
                    count: addAmount,
                    durability: itemDef.durability
                };
                remainingCount -= addAmount;
            }
        }
        
        // Mettre à jour l'interface
        this.updateInventoryUI();
        this.saveInventory();
        
        // Dispatcher un événement pour le système d'achievements
        window.dispatchEvent(new CustomEvent('minecraft-item-collected', {
            detail: {
                itemId: itemId,
                count: count - remainingCount
            }
        }));
        
        // Retourne true si tout a été ajouté, false sinon
        return remainingCount === 0;
    }
    
    /**
     * Retire un item de l'inventaire
     */
    removeItem(itemId, count = 1) {
        let remainingCount = count;
        
        // Parcourir tous les slots de l'inventaire
        for (let slot = 0; slot < this.capacity; slot++) {
            if (remainingCount <= 0) break;
            
            const item = this.items[slot];
            if (item && item.id === itemId) {
                if (item.count <= remainingCount) {
                    // Prendre tout le stack
                    remainingCount -= item.count;
                    delete this.items[slot];
                } else {
                    // Prendre une partie du stack
                    item.count -= remainingCount;
                    remainingCount = 0;
                }
            }
        }
        
        // Mettre à jour l'interface
        this.updateInventoryUI();
        this.saveInventory();
        
        // Retourne true si tout a été retiré, false sinon
        return remainingCount === 0;
    }
    
    /**
     * Obtient les informations d'un item dans un slot
     */
    getSlotItem(slot) {
        return this.items[slot] || null;
    }
    
    /**
     * Échange le contenu de deux slots
     */
    swapSlots(fromSlot, toSlot) {
        const tempItem = this.items[toSlot];
        this.items[toSlot] = this.items[fromSlot];
        this.items[fromSlot] = tempItem;
    }
    
    /**
     * Sélectionne un slot de la hotbar
     */
    selectHotbarSlot(slotIndex) {
        if (slotIndex < 0 || slotIndex >= this.hotbarSize) return;
        
        this.selectedSlot = slotIndex;
        
        // Mettre à jour l'interface
        const hotbarSlots = document.querySelectorAll('.hotbar-slot');
        hotbarSlots.forEach((slot, index) => {
            slot.classList.toggle('selected', index === slotIndex);
        });
        
        // Mettre à jour la barre d'inventaire globale si elle existe
        const inventoryBar = document.getElementById('inventory-bar');
        if (inventoryBar) {
            const slots = inventoryBar.querySelectorAll('.inventory-slot');
            slots.forEach((slot, index) => {
                slot.classList.toggle('selected', index === slotIndex);
            });
        }
    }
    
    /**
     * Utilise ou consomme un item
     */
    consumeItem(slot) {
        const item = this.items[slot];
        if (!item) return;
        
        const itemDef = this.itemDefinitions[item.id];
        if (!itemDef) return;
        
        // Si c'est de la nourriture, augmenter la faim
        if (itemDef.category === 'food') {
            // Augmenter la faim
            const hungerBar = document.querySelector('.hunger-fill');
            if (hungerBar) {
                let currentHunger = parseFloat(hungerBar.style.width || 0);
                currentHunger = Math.min(100, currentHunger + (itemDef.foodPoints / 20) * 100);
                hungerBar.style.width = `${currentHunger}%`;
            }
            
            // Réduire le compte de 1
            item.count--;
            if (item.count <= 0) {
                delete this.items[slot];
            }
            
            // Jouer le son de manger
            this.playSound('eat');
            
            // Afficher une animation de particules
            this.showEatingParticles();
            
            // Si c'est une pomme dorée, ajouter un effet
            if (item.id === 'golden_apple') {
                this.applyEffect('regeneration');
                
                // Aussi augmenter la santé
                const healthBar = document.querySelector('.health-fill');
                if (healthBar) {
                    let currentHealth = parseFloat(healthBar.style.width || 0);
                    currentHealth = Math.min(100, currentHealth + 20);
                    healthBar.style.width = `${currentHealth}%`;
                }
            }
        }
        
        // Mettre à jour l'interface
        this.updateInventoryUI();
        this.saveInventory();
    }
    
    /**
     * Applique un effet au joueur
     */
    applyEffect(effectType, duration = 5000) {
        // Créer une icône d'effet
        const effectContainer = document.querySelector('.inventory-stats') || document.body;
        const effectElement = document.createElement('div');
        effectElement.className = `player-effect ${effectType}`;
        
        switch (effectType) {
            case 'regeneration':
                effectElement.innerHTML = `<i class="fas fa-heart"></i>`;
                effectElement.style.color = '#FF55FF';
                break;
            case 'strength':
                effectElement.innerHTML = `<i class="fas fa-fist-raised"></i>`;
                effectElement.style.color = '#FF5555';
                break;
            case 'speed':
                effectElement.innerHTML = `<i class="fas fa-running"></i>`;
                effectElement.style.color = '#55FFFF';
                break;
        }
        
        effectContainer.appendChild(effectElement);
        
        // Simuler la régénération pour l'effet de régénération
        if (effectType === 'regeneration') {
            let regenCount = 0;
            const regenInterval = setInterval(() => {
                const healthBar = document.querySelector('.health-fill');
                if (healthBar) {
                    let currentHealth = parseFloat(healthBar.style.width || 0);
                    currentHealth = Math.min(100, currentHealth + 5);
                    healthBar.style.width = `${currentHealth}%`;
                }
                
                regenCount++;
                if (regenCount >= 5) {
                    clearInterval(regenInterval);
                }
            }, 1000);
        }
        
        // Supprimer l'effet après la durée
        setTimeout(() => {
            effectElement.classList.add('fading');
            setTimeout(() => {
                if (effectElement.parentNode) {
                    effectElement.parentNode.removeChild(effectElement);
                }
            }, 1000);
        }, duration);
    }
    
    /**
     * Affiche des particules lors de la consommation
     */
    showEatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'eating-particles';
        document.body.appendChild(particlesContainer);
        
        // Créer plusieurs particules
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'eating-particle';
            
            // Position aléatoire autour du centre de l'écran
            const x = window.innerWidth / 2 + (Math.random() * 60 - 30);
            const y = window.innerHeight / 2 + (Math.random() * 60 - 30);
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Animation aléatoire
            const duration = 500 + Math.random() * 500;
            particle.style.animation = `particleFade ${duration}ms forwards`;
            
            particlesContainer.appendChild(particle);
        }
        
        // Supprimer le conteneur après l'animation
        setTimeout(() => {
            particlesContainer.remove();
        }, 1000);
    }
    
    /**
     * Met à jour l'interface utilisateur de l'inventaire
     */
    updateInventoryUI() {
        const slots = document.querySelectorAll('.inventory-slot');
        const hotbarSlots = document.querySelectorAll('.hotbar-slot');
        
        // Mettre à jour les slots d'inventaire
        slots.forEach((slot, index) => {
            // Vider le slot
            slot.innerHTML = '';
            
            const item = this.items[index];
            if (!item) return;
            
            const itemDef = this.itemDefinitions[item.id];
            if (!itemDef) return;
            
            // Créer l'élément d'item
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.dataset.itemId = item.id;
            
            // Ajouter l'icône
            const iconElement = document.createElement('div');
            iconElement.className = `item-icon ${itemDef.icon || item.id}`;
            itemElement.appendChild(iconElement);
            
            // Ajouter le compteur
            const countElement = document.createElement('div');
            countElement.className = 'item-count';
            countElement.textContent = item.count;
            itemElement.appendChild(countElement);
            
            // Ajouter la barre de durabilité si applicable
            if (itemDef.durability && item.durability) {
                const durabilityPercent = (item.durability / itemDef.durability) * 100;
                const durabilityElement = document.createElement('div');
                durabilityElement.className = 'item-durability';
                
                const durabilityBar = document.createElement('div');
                durabilityBar.className = 'durability-bar';
                durabilityBar.style.width = `${durabilityPercent}%`;
                
                // Changer la couleur selon la durabilité
                if (durabilityPercent > 50) {
                    durabilityBar.style.backgroundColor = '#55FF55';
                } else if (durabilityPercent > 25) {
                    durabilityBar.style.backgroundColor = '#FFFF55';
                } else {
                    durabilityBar.style.backgroundColor = '#FF5555';
                }
                
                durabilityElement.appendChild(durabilityBar);
                itemElement.appendChild(durabilityElement);
            }
            
            // Ajouter le tooltip
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'item-tooltip';
            tooltipElement.textContent = itemDef.name;
            
            // Ajouter des infos supplémentaires au tooltip
            if (itemDef.category === 'food') {
                tooltipElement.innerHTML += `<br><span class="food-points">+${itemDef.foodPoints} Nourriture</span>`;
            }
            
            if (itemDef.durability && item.durability) {
                tooltipElement.innerHTML += `<br><span class="durability-info">Durabilité: ${item.durability}/${itemDef.durability}</span>`;
            }
            
            itemElement.appendChild(tooltipElement);
            
            // Ajouter l'item au slot
            slot.appendChild(itemElement);
        });
        
        // Mettre à jour les slots de la hotbar
        hotbarSlots.forEach((slot, index) => {
            // La hotbar correspond aux premiers slots de l'inventaire
            const inventoryIndex = index;
            
            // Vider le slot
            slot.innerHTML = '';
            slot.classList.toggle('selected', index === this.selectedSlot);
            
            const item = this.items[inventoryIndex];
            if (!item) return;
            
            const itemDef = this.itemDefinitions[item.id];
            if (!itemDef) return;
            
            // Créer l'élément d'item
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.dataset.itemId = item.id;
            
            // Ajouter l'icône
            const iconElement = document.createElement('div');
            iconElement.className = `item-icon ${itemDef.icon || item.id}`;
            itemElement.appendChild(iconElement);
            
            // Ajouter le compteur
            const countElement = document.createElement('div');
            countElement.className = 'item-count';
            countElement.textContent = item.count;
            itemElement.appendChild(countElement);
            
            // Ajouter l'item au slot
            slot.appendChild(itemElement);
        });
        
        // Mettre à jour la barre d'inventaire du bas de l'écran si elle existe
        this.updateExternalHotbar();
        
        // Initialiser les barres de statut si nécessaire
        this.initializeStatusBars();
    }
    
    /**
     * Met à jour la barre d'inventaire externe (en bas de l'écran)
     */
    updateExternalHotbar() {
        const inventoryBar = document.getElementById('inventory-bar');
        if (!inventoryBar) return;
        
        const slots = inventoryBar.querySelectorAll('.inventory-slot');
        
        slots.forEach((slot, index) => {
            // Vider le slot
            while (slot.firstChild) {
                slot.removeChild(slot.firstChild);
            }
            
            const item = this.items[index];
            if (!item) return;
            
            const itemDef = this.itemDefinitions[item.id];
            if (!itemDef) return;
            
            // Créer l'élément d'item avec l'image correspondante
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            
            // Utiliser le bon style d'image pour le bloc
            itemElement.style.backgroundImage = `url('data:image/svg+xml;base64,${this.getItemIconBase64(item.id)}')`;
            
            // Ajouter l'item au slot
            slot.appendChild(itemElement);
            
            // Si c'est un item avec un compteur > 1, ajouter le nombre
            if (item.count > 1) {
                const countElement = document.createElement('div');
                countElement.className = 'inventory-item-count';
                countElement.textContent = item.count;
                slot.appendChild(countElement);
            }
        });
    }
    
    /**
     * Initialise les barres de statut du joueur
     */
    initializeStatusBars() {
        const healthFill = document.querySelector('.health-fill');
        const hungerFill = document.querySelector('.hunger-fill');
        const xpFill = document.querySelector('.xp-fill');
        
        // Initialiser les barres si elles n'ont pas de valeur
        if (healthFill && !healthFill.style.width) {
            healthFill.style.width = '100%';
        }
        
        if (hungerFill && !hungerFill.style.width) {
            hungerFill.style.width = '100%';
        }
        
        if (xpFill && !xpFill.style.width) {
            xpFill.style.width = '0%';
        }
    }
    
    /**
     * Efface tout l'inventaire
     */
    clearInventory() {
        this.items = {};
        this.selectedSlot = 0;
        this.updateInventoryUI();
        this.saveInventory();
    }
    
    /**
     * Enregistre l'inventaire dans le localStorage
     */
    saveInventory() {
        localStorage.setItem('minecraft-inventory', JSON.stringify({
            items: this.items,
            selectedSlot: this.selectedSlot
        }));
    }
    
    /**
     * Charge l'inventaire depuis le localStorage
     */
    loadInventory() {
        const savedInventory = localStorage.getItem('minecraft-inventory');
        if (savedInventory) {
            const data = JSON.parse(savedInventory);
            this.items = data.items || {};
            this.selectedSlot = data.selectedSlot || 0;
        }
    }
    
    /**
     * Obtient l'icône Base64 pour un item
     */
    getItemIconBase64(itemId) {
        // Mapping des icônes pour les items les plus courants
        const iconMap = {
            'stone': 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzdEODg4MCIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM1RTY1NjEiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiM5Q0E1OUYiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48L3N2Zz4=',
            'grass_block': 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzhmOGY4ZiIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM1NTU1NTUiIGQ9Ik0wIDBoMnYzMkgwem0zMCAwaDJ2MzJoLTJ6TTAgMGgzMnYySDB6bTAgMzBoMzJ2MkgweiIvPjxwYXRoIGZpbGw9IiM2NzlFNjAiIGQ9Ik0yIDJoMjh2MTBIMnoiLz48cGF0aCBmaWxsPSIjOEM2MjNBIiBkPSJNMiAxMmgyOHYxOEgyeiIvPjwvc3ZnPg==',
            'dirt': 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzhDNjIzQSIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM3MzUxMkEiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjwvc3ZnPg==',
            'cobblestone': 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk5OTk5OSIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM3Nzc3NzciIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiM1NTU1NTUiIGQ9Ik0xIDF2MzBoMzBWMUgxem0xMCA1aDEwdjEwSDExVjZ6bTEyIDBoNnY2aC02VjZ6TTYgOGgzdjEwSDZWOHptMTUgNGgzdjZoLTN2LTZ6bS04IDRoOHY4aC04di04ek02IDIwaDEwdjRINnYtNHptMTIgMGgxMHY2SDEydi02eiIvPjxwYXRoIGZpbGw9IiNCQkJCQkIiIGQ9Ik0yIDJoMjh2MjhIMnptOSA0aDEwdjEwaC0xMFY2em0xMiAwaDZ2NmgtNlY2ek01IDhoM3YxMEg1Vjh6bTE1IDRoM3Y2aC0zdi02em0tOCA0aDh2OGgtOHYtOHpNNSAyMGgxMHY0SDV2LTR6bTEyIDBoMTB2NkgxMnYtNnoiLz48L3N2Zz4=',
            'oak_planks': 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0FENTM0IiBkPSJNMCAwaDMydjMySDB6Ii8+PHBhdGggZmlsbD0iIzkzMzMxQSIgZD0iTTAgMGgxdjMySDB6bTMxIDBoMXYzMmgtMXpNMCAwaDMydjFIMHptMCAzMWgzMnYxSDB6Ii8+PHBhdGggZmlsbD0iIzk0N0Y1MSIgZD0iTTIgMmgyOHYyOEgyeiIvPjwvc3ZnPg==',
            'oak_log': 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk5NzY0MyIgZD0iTTkgNGgxNHYyNEg5eiIvPjxwYXRoIGZpbGw9IiM3NzVCMzUiIGQ9Ik05IDRoMnYyNEg5em0xMiAwaDF2MjRoLTF6TTkgNGgxNHYxSDl6bTAgMjNoMTR2MUg5eiIvPjxwYXRoIGZpbGw9IiNBRDg5NEYiIGQ9Ik0xMSA1aDEwdjIySDExeiIvPjwvc3ZnPg==',
            'glass': 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiNmMmYyZjIiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48cGF0aCBmaWxsPSIjZTBmN2ZmIiBkPSJNMiAyaDJ2MjhIMnptMjYgMGgydjI4aC0yek0yIDJoMjh2Mkgyem0wIDI2aDI4djJIMnoiLz48cGF0aCBmaWxsPSIjZTBmN2ZmIiBkPSJNMiAyaDJ2Mkgyem0yNiAwaDJ2MmgtMnptLTI2IDI2aDJ2Mkgyem0yNiAwaDJ2MmgtMnoiLz48L3N2Zz4=',
            'diamond_pickaxe': 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzVBQzdDNyIgZD0iTTUgNWg5djRINXoiLz48cGF0aCBmaWxsPSIjNzMzRDQ5IiBkPSJNMTQgN2gxMnYySDEyeiIvPjxwYXRoIGZpbGw9IiM5MzVGNDkiIGQ9Ik0xNSA5aDJ2MThoLTJ6Ii8+PC9zdmc+',
            'apple': 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk2Q0QzMiIgZD0iTTE2IDNsMiAyaDIydjJsLTIgMi0yLTJoLTJ2MmwtMi0yaC0ybDIgMnYybC0yLTJoLTJ2MmwtMi0yaC0ybDIgMnYybC0yLTJoLTJsLTIgMiIvPjxwYXRoIGZpbGw9IiM5OTMwMzMiIGQ9Ik04IDEwaDE2djE2SDh6TTE0IDR2NmgyVjRoMnoiLz48cGF0aCBmaWxsPSIjQ0MwMDAwIiBkPSJNMTAgMTJoMTJ2MTJIMTBNMTQgNnY0aDJ2LTQiLz48L3N2Zz4='
        };
        
        return iconMap[itemId] || iconMap['stone']; // Fallback à stone si l'icône n'existe pas
    }
    
    /**
     * Joue un son Minecraft
     */
    playSound(type) {
        // Utiliser le système de son global s'il existe
        if (typeof window.playSound === 'function') {
            window.playSound(type);
            return;
        }
        
        // Sinon, utiliser notre propre implémentation
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
            case 'pickup':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                oscillator.start();
                oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'eat':
                // Son de crunch pour manger
                const now = audioContext.currentTime;
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(150, now);
                gainNode.gain.setValueAtTime(0.2, now);
                oscillator.start(now);
                
                // Crunch son
                oscillator.frequency.setValueAtTime(130, now + 0.1);
                gainNode.gain.setValueAtTime(0.3, now + 0.1);
                oscillator.frequency.setValueAtTime(90, now + 0.2);
                gainNode.gain.setValueAtTime(0.2, now + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                oscillator.stop(now + 0.3);
                break;
        }
    }
    
    /**
     * Ajoute les styles CSS pour l'inventaire
     */
    addInventoryStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Bouton d'inventaire */
            .minecraft-inventory-button {
                position: fixed;
                bottom: 20px;
                right: 80px;
                background: rgba(30, 33, 40, 0.9);
                border: 2px solid var(--primary);
                width: 40px;
                height: 40px;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 900;
                transition: all 0.3s;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            }
            
            .minecraft-inventory-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(82, 165, 53, 0.4);
            }
            
            .inventory-icon {
                color: var(--primary);
                font-size: 20px;
            }
            
            /* Panneau d'inventaire */
            .minecraft-inventory-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                background: rgba(20, 21, 25, 0.95);
                border: 3px solid var(--primary);
                border-radius: 8px;
                width: 90%;
                max-width: 600px;
                z-index: 1000;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.5, 0, 0.15, 1);
                overflow: hidden;
                backdrop-filter: blur(10px);
            }
            
            .minecraft-inventory-panel.show {
                opacity: 1;
                visibility: visible;
                transform: translate(-50%, -50%) scale(1);
            }
            
            .inventory-panel-header {
                padding: 15px 20px;
                border-bottom: 2px solid var(--primary-dark);
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(0, 0, 0, 0.3);
            }
            
            .inventory-panel-header h2 {
                margin: 0;
                font-size: 22px;
                font-family: 'Minecraft', 'Outfit', sans-serif;
            }
            
            .inventory-close-btn {
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
            
            .inventory-close-btn:hover {
                color: var(--primary);
                transform: scale(1.1);
            }
            
            .inventory-panel-content {
                padding: 20px;
            }
            
            /* Grille d'inventaire */
            .inventory-grid {
                display: grid;
                grid-template-columns: repeat(9, 1fr);
                gap: 4px;
                margin-bottom: 20px;
                grid-template-rows: repeat(3, 1fr);
            }
            
            .inventory-slot, .hotbar-slot {
                background: rgba(30, 33, 40, 0.6);
                border: 2px solid #444;
                border-radius: 2px;
                width: 100%;
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                transition: all 0.2s;
            }
            
            .inventory-slot.drag-over, .hotbar-slot.drag-over {
                background: rgba(82, 165, 53, 0.2);
                border-color: var(--primary);
            }
            
            .inventory-slot.dragging, .hotbar-slot.dragging {
                opacity: 0.5;
            }
            
            /* Hotbar */
            .inventory-hotbar {
                display: grid;
                grid-template-columns: repeat(9, 1fr);
                gap: 4px;
                margin-top: 10px;
                margin-bottom: 20px;
            }
            
            .hotbar-slot {
                background: rgba(40, 43, 50, 0.8);
            }
            
            .hotbar-slot.selected {
                border-color: var(--primary);
                box-shadow: 0 0 10px rgba(82, 165, 53, 0.5);
            }
            
            /* Items */
            .item {
                width: 80%;
                height: 80%;
                position: relative;
                cursor: grab;
            }
            
            .item-icon {
                width: 100%;
                height: 100%;
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
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
            
            .item-durability {
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 1px;
                overflow: hidden;
            }
            
            .durability-bar {
                height: 100%;
                width: 100%;
                background: #55FF55;
            }
            
            .item-tooltip {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                font-size: 12px;
                padding: 5px 8px;
                border-radius: 3px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.2s;
                pointer-events: none;
                z-index: 10;
                text-align: center;
            }
            
            .food-points {
                color: #FFAA00;
            }
            
            .durability-info {
                color: #AAAAAA;
                font-size: 10px;
            }
            
            .item:hover .item-tooltip {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) translateY(-5px);
            }
            
            /* Stats du joueur */
            .inventory-stats {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 5px;
                margin-top: 10px;
            }
            
            .player-health, .player-hunger, .player-xp {
                display: flex;
                align-items: center;
                gap: 8px;
                flex: 1;
                max-width: 150px;
            }
            
            .health-icon, .hunger-icon, .xp-icon {
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
            }
            
            .health-icon {
                color: #FF5555;
            }
            
            .hunger-icon {
                color: #FFAA00;
            }
            
            .xp-icon {
                color: #55FF55;
            }
            
            .health-bar, .hunger-bar, .xp-bar {
                flex: 1;
                height: 8px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 4px;
                overflow: hidden;
            }
            
            .health-fill {
                height: 100%;
                width: 100%;
                background: linear-gradient(90deg, #FF5555, #FF0000);
            }
            
            .hunger-fill {
                height: 100%;
                width: 100%;
                background: linear-gradient(90deg, #FFAA00, #FF8800);
            }
            
            .xp-fill {
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, #55FF55, #00AA00);
            }
            
            /* Effets de joueur */
            .player-effect {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 24px;
                height: 24px;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: effectPulse 1s infinite alternate;
                z-index: 20;
            }
            
            .player-effect.fading {
                animation: effectFade 1s forwards;
            }
            
            @keyframes effectPulse {
                0% { opacity: 0.7; transform: scale(1); }
                100% { opacity: 1; transform: scale(1.1); }
            }
            
            @keyframes effectFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.5); }
            }
            
            /* Particules */
            .eating-particles {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
            }
            
            .eating-particle {
                position: absolute;
                width: 6px;
                height: 6px;
                background: #FFFFFF;
                border-radius: 50%;
                pointer-events: none;
            }
            
            @keyframes particleFade {
                0% { opacity: 0.8; transform: scale(1) translateY(0); }
                100% { opacity: 0; transform: scale(0.5) translateY(-20px); }
            }
            
            /* Icônes d'items */
            .stone { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzdEODg4MCIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM1RTY1NjEiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiM5Q0E1OUYiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48L3N2Zz4='); }
            .grass_block { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzhmOGY4ZiIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM1NTU1NTUiIGQ9Ik0wIDBoMnYzMkgwem0zMCAwaDJ2MzJoLTJ6TTAgMGgzMnYySDB6bTAgMzBoMzJ2MkgweiIvPjxwYXRoIGZpbGw9IiM2NzlFNjAiIGQ9Ik0yIDJoMjh2MTBIMnoiLz48cGF0aCBmaWxsPSIjOEM2MjNBIiBkPSJNMiAxMmgyOHYxOEgyeiIvPjwvc3ZnPg=='); }
            .dirt { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzhDNjIzQSIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM3MzUxMkEiIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjwvc3ZnPg=='); }
            .cobblestone { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk5OTk5OSIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiM3Nzc3NzciIGQ9Ik0wIDBoMXYzMkgwem0zMSAwaDF2MzJoLTF6TTAgMGgzMnYxSDB6bTAgMzFoMzJ2MUgweiIvPjxwYXRoIGZpbGw9IiM1NTU1NTUiIGQ9Ik0xIDF2MzBoMzBWMUgxem0xMCA1aDEwdjEwSDExVjZ6bTEyIDBoNnY2aC02VjZ6TTYgOGgzdjEwSDZWOHptMTUgNGgzdjZoLTN2LTZ6bS04IDRoOHY4aC04di04ek02IDIwaDEwdjRINnYtNHptMTIgMGgxMHY2SDEydi02eiIvPjxwYXRoIGZpbGw9IiNCQkJCQkIiIGQ9Ik0yIDJoMjh2MjhIMnptOSA0aDEwdjEwaC0xMFY2em0xMiAwaDZ2NmgtNlY2ek01IDhoM3YxMEg1Vjh6bTE1IDRoM3Y2aC0zdi02em0tOCA0aDh2OGgtOHYtOHpNNSAyMGgxMHY0SDV2LTR6bTEyIDBoMTB2NkgxMnYtNnoiLz48L3N2Zz4='); }
            .oak_planks { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0FENTM0IiBkPSJNMCAwaDMydjMySDB6Ii8+PHBhdGggZmlsbD0iIzkzMzMxQSIgZD0iTTAgMGgxdjMySDB6bTMxIDBoMXYzMmgtMXpNMCAwaDMydjFIMHptMCAzMWgzMnYxSDB6Ii8+PHBhdGggZmlsbD0iIzk0N0Y1MSIgZD0iTTIgMmgyOHYyOEgyeiIvPjwvc3ZnPg=='); }
            .oak_log { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk5NzY0MyIgZD0iTTkgNGgxNHYyNEg5eiIvPjxwYXRoIGZpbGw9IiM3NzVCMzUiIGQ9Ik05IDRoMnYyNEg5em0xMiAwaDF2MjRoLTF6TTkgNGgxNHYxSDl6bTAgMjNoMTR2MUg5eiIvPjxwYXRoIGZpbGw9IiNBRDg5NEYiIGQ9Ik0xMSA1aDEwdjIySDExeiIvPjwvc3ZnPg=='); }
            .glass { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGZpbGw9IiNmMmYyZjIiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48cGF0aCBmaWxsPSIjZTBmN2ZmIiBkPSJNMiAyaDJ2MjhIMnptMjYgMGgydjI4aC0yek0yIDJoMjh2Mkgyem0wIDI2aDI4djJIMnoiLz48cGF0aCBmaWxsPSIjZTBmN2ZmIiBkPSJNMiAyaDJ2Mkgyem0yNiAwaDJ2MmgtMnptLTI2IDI2aDJ2Mkgyem0yNiAwaDJ2MmgtMnoiLz48L3N2Zz4='); }
            .diamond_pickaxe { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzVBQzdDNyIgZD0iTTUgNWg5djRINXoiLz48cGF0aCBmaWxsPSIjNzMzRDQ5IiBkPSJNMTQgN2gxMnYySDEyeiIvPjxwYXRoIGZpbGw9IiM5MzVGNDkiIGQ9Ik0xNSA5aDJ2MThoLTJ6Ii8+PC9zdmc+'); }
            .apple { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzk2Q0QzMiIgZD0iTTE2IDNsMiAyaDIydjJsLTIgMi0yLTJoLTJ2MmwtMi0yaC0ybDIgMnYybC0yLTJoLTJ2MmwtMi0yaC0ybDIgMnYybC0yLTJoLTJsLTIgMiIvPjxwYXRoIGZpbGw9IiM5OTMwMzMiIGQ9Ik04IDEwaDE2djE2SDh6TTE0IDR2NmgyVjRoMnoiLz48cGF0aCBmaWxsPSIjQ0MwMDAwIiBkPSJNMTAgMTJoMTJ2MTJIMTBNMTQgNnY0aDJ2LTQiLz48L3N2Zz4='); }
        `;
        
        document.head.appendChild(style);
    }
}

// Initialiser le système d'inventaire
document.addEventListener('DOMContentLoaded', function() {
    window.minecraftInventory = new MinecraftInventory();
});