class Minecraft3DBuilder {
    constructor() {
        this.isActive = false;
        this.gridSize = { width: 32, height: 32, depth: 32 };
        this.selectedBlock = 'grass';
        this.selectedSlot = 0;
        this.blocks = {};
        this.container = null;
        this.playerHeight = 1.8;
        this.gravity = 0.08;
        this.jumpVelocity = 0.2;
        this.velocity = { x: 0, y: 0, z: 0 };
        this.isGrounded = false;
        this.canJump = true;
        this.crosshairSize = 20;

        this.blockTypes = {
            grass: {
                name: 'Herbe',
                textures: {
                    top: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/grass_block_top.png',
                    side: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/grass_block_side.png',
                    bottom: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/dirt.png'
                }
            },
            dirt: {
                name: 'Terre',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/dirt.png'
                }
            },
            stone: {
                name: 'Pierre',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/stone.png'
                }
            },
            cobblestone: {
                name: 'Pierre taillée',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/cobblestone.png'
                }
            },
            oak_planks: {
                name: 'Planches de chêne',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/oak_planks.png'
                }
            },
            oak_log: {
                name: 'Bois de chêne',
                textures: {
                    top: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/oak_log_top.png',
                    side: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/oak_log.png'
                }
            },
            oak_leaves: {
                name: 'Feuilles de chêne',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/oak_leaves.png'
                },
                transparent: true,
                opacity: 0.9
            },
            sand: {
                name: 'Sable',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/sand.png'
                }
            },
            gravel: {
                name: 'Gravier',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/gravel.png'
                }
            },
            bedrock: {
                name: 'Roche mère',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/bedrock.png'
                }
            },
            diamond_ore: {
                name: 'Minerai de diamant',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/diamond_ore.png'
                }
            },
            diamond_block: {
                name: 'Bloc de diamant',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/diamond_block.png'
                }
            },
            iron_ore: {
                name: 'Minerai de fer',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/iron_ore.png'
                }
            },
            iron_block: {
                name: 'Bloc de fer',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/iron_block.png'
                }
            },
            gold_ore: {
                name: 'Minerai d\'or',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/gold_ore.png'
                }
            },
            gold_block: {
                name: 'Bloc d\'or',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/gold_block.png'
                }
            },
            obsidian: {
                name: 'Obsidienne',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/obsidian.png'
                }
            },
            tnt: {
                name: 'TNT',
                textures: {
                    top: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/tnt_top.png',
                    side: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/tnt_side.png',
                    bottom: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/tnt_bottom.png'
                }
            },
            glass: {
                name: 'Verre',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/glass.png'
                },
                transparent: true,
                opacity: 0.8
            },
            water: {
                name: 'Eau',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/water_still.png'
                },
                transparent: true,
                opacity: 0.7
            },
            lava: {
                name: 'Lave',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/lava_still.png'
                },
                emissive: true
            },
            bookshelf: {
                name: 'Bibliothèque',
                textures: {
                    top: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/oak_planks.png',
                    side: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/bookshelf.png',
                    bottom: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/oak_planks.png'
                }
            },
            crafting_table: {
                name: 'Table de craft',
                textures: {
                    top: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/crafting_table_top.png',
                    side: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/crafting_table_side.png',
                    front: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/crafting_table_front.png',
                    bottom: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/oak_planks.png'
                }
            },
            furnace: {
                name: 'Fourneau',
                textures: {
                    top: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/furnace_top.png',
                    side: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/furnace_side.png',
                    front: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/furnace_front.png'
                }
            },
            glowstone: {
                name: 'Pierre lumineuse',
                textures: {
                    all: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/glowstone.png'
                },
                emissive: true
            }
        };

        this.keySequence = [];
        this.inventory = [];
        this.hotbarSize = 9;

        for (let i = 0; i < this.hotbarSize; i++) {
            const blockTypes = Object.keys(this.blockTypes);
            if (i < blockTypes.length) {
                this.inventory.push(blockTypes[i]);
            } else {
                this.inventory.push(null);
            }
        }

        this.moveState = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            up: false,
            down: false,
            sprint: false,
            flying: true
        };

        this.mouseState = {
            leftDown: false,
            rightDown: false,
            breakingBlock: false,
            breakingProgress: 0,
            breakingPosition: null,
            breakingInterval: null,
            breakingMesh: null
        };

        // Augmentation de la vitesse pour un gameplay plus fluide
        this.moveSpeed = 0.20; // Vitesse de base augmentée
        this.sprintMultiplier = 2.0; // Sprint plus rapide
        this.rotationSpeed = 0.002;
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.creativeCode = ['c', 'r', 'e', 'a', 't', 'e'];

        this.textureOptions = {};
        Object.keys(this.blockTypes).forEach(type => {
            this.textureOptions[type] = {
                transparent: this.blockTypes[type].transparent || false,
                opacity: this.blockTypes[type].opacity || 1.0,
                emissive: this.blockTypes[type].emissive || false
            };
        });

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.raycaster = null;
        this.mouse = null;
        this.textures = {};
        this.materials = {};
        this.blockGeometry = null;
        this.highlightBox = null;
        this.highlightMaterial = null;
        this.stats = null;
        this.breakingTextures = {};
        this.skybox = null;
        this.inventory = [];
        this.inventoryUI = null;
        this.crosshair = null;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        document.addEventListener('click', (e) => {
            if (e.target.matches('#minecraft-builder-toggle')) {
                this.toggleBuilder();
            }
        });
        // Signaler que le builder est prêt pour le système de mobs
        document.dispatchEvent(new CustomEvent('minecraft-builder-ready', {
            detail: { builder: this }
        }));
        window.addEventListener('wheel', (e) => this.handleMouseWheel(e));
    }

    handleKeyDown(e) {
        // Ne pas traiter les touches si l'inventaire est ouvert
        const inventory = document.querySelector('.mc-inventory-container');
        if (inventory && inventory.classList.contains('active')) {
            // Sauf pour la touche E qui ferme l'inventaire et Escape
            if (e.code === 'KeyE' || e.code === 'Escape') {
                if (e.code === 'KeyE') this.toggleInventory();
                if (e.code === 'Escape') this.toggleBuilder();
            }
            return; // Ignorer toutes les autres touches
        }

        if (this.isActive) {
            switch (e.code) {
                // Support des touches ZQSD (clavier français) et WASD (international)
                // Z/W fait avancer, S fait reculer
                case 'KeyW':
                case 'KeyZ':
                    this.moveState.forward = true;
                    break;
                case 'KeyS':
                    this.moveState.backward = true;
                    break;
                case 'KeyA':
                case 'KeyQ':
                    this.moveState.left = true;
                    break;
                case 'KeyD':
                    this.moveState.right = true;
                    break;
                case 'Space':
                    if (this.moveState.flying) {
                        this.moveState.up = true;
                    } else if (this.isGrounded && this.canJump) {
                        this.velocity.y = this.jumpVelocity;
                        this.isGrounded = false;
                        this.canJump = false;
                        setTimeout(() => { this.canJump = true; }, 300);
                    }
                    break;
                case 'ShiftLeft':
                    if (this.moveState.flying) {
                        this.moveState.down = true;
                    } else {
                        this.moveState.sprint = true;
                    }
                    break;
                case 'KeyE':
                    this.toggleInventory();
                    break;
                case 'KeyF':
                    this.toggleFlying();
                    break;
                case 'KeyC':
                    this.toggleCursor();
                    break;
                case 'Escape':
                    this.toggleBuilder();
                    break;
                case 'Digit1':
                case 'Ampersand':
                    this.selectHotbarSlot(0);
                    break;
                case 'Digit2':
                case 'Eacute':
                    this.selectHotbarSlot(1);
                    break;
                case 'Digit3':
                case 'QuoteDbl':
                    this.selectHotbarSlot(2);
                    break;
                case 'Digit4':
                case 'Quote':
                    this.selectHotbarSlot(3);
                    break;
                case 'Digit5':
                case 'ParenthesisLeft':
                    this.selectHotbarSlot(4);
                    break;
                case 'Digit6':
                case 'Minus':
                    this.selectHotbarSlot(5);
                    break;
                case 'Digit7':
                case 'Egrave':
                    this.selectHotbarSlot(6);
                    break;
                case 'Digit8':
                case 'Underscore':
                    this.selectHotbarSlot(7);
                    break;
                case 'Digit9':
                case 'Ccedilla':
                    this.selectHotbarSlot(8);
                    break;
            }
        }

        this.keySequence.push(e.key);
        if (this.keySequence.length > Math.max(this.konamiCode.length, this.creativeCode.length)) {
            this.keySequence.shift();
        }

        const konamiMatches = this.checkSequence(this.konamiCode);
        const creativeMatches = this.checkSequence(this.creativeCode);

        if (konamiMatches || creativeMatches) {
            this.toggleBuilder();
            this.keySequence = [];
        }
    }

    handleKeyUp(e) {
        if (this.isActive) {
            switch (e.code) {
                case 'KeyW':
                case 'KeyZ':
                    this.moveState.forward = false;
                    break;
                case 'KeyS':
                    this.moveState.backward = false;
                    break;
                case 'KeyA':
                case 'KeyQ':
                    this.moveState.left = false;
                    break;
                case 'KeyD':
                    this.moveState.right = false;
                    break;
                case 'Space':
                    this.moveState.up = false;
                    break;
                case 'ShiftLeft':
                    this.moveState.down = false;
                    this.moveState.sprint = false;
                    break;
            }
        }
    }

    handleMouseWheel(e) {
        if (this.isActive) {
            // Scroll vers le haut, slot précédent
            if (e.deltaY < 0) {
                let newSlot = this.selectedSlot - 1;
                if (newSlot < 0) newSlot = this.hotbarSize - 1;
                this.selectHotbarSlot(newSlot);
            }
            // Scroll vers le bas, slot suivant
            else if (e.deltaY > 0) {
                let newSlot = this.selectedSlot + 1;
                if (newSlot >= this.hotbarSize) newSlot = 0;
                this.selectHotbarSlot(newSlot);
            }
        }
    }

    selectHotbarSlot(slotIndex) {
        if (slotIndex >= 0 && slotIndex < this.hotbarSize) {
            this.selectedSlot = slotIndex;
            this.selectedBlock = this.inventory[slotIndex];
            this.updateHotbarUI();
            this.playSound('click');
        }
    }

    updateHotbarUI() {
        const hotbarSlots = document.querySelectorAll('.mc-hotbar-slot');
        hotbarSlots.forEach((slot, index) => {
            slot.classList.remove('active');
            if (index === this.selectedSlot) {
                slot.classList.add('active');
            }
        });
    }

    toggleFlying() {
        this.moveState.flying = !this.moveState.flying;
        if (this.moveState.flying) {
            this.velocity.y = 0;
        }
        this.playSound('click');

        // Afficher un message temporaire
        this.showMessage(this.moveState.flying ? "Mode vol activé" : "Mode vol désactivé");
    }

    // Nouvelle méthode pour activer/désactiver le curseur
    toggleCursor() {
        if (document.pointerLockElement === this.container.querySelector('.mc-builder-canvas-container')) {
            document.exitPointerLock();
            this.showMessage("Curseur libéré");
        } else {
            this.lockPointer();
            this.showMessage("Curseur verrouillé");
        }
        this.playSound('click');
    }

    toggleInventory() {
        const inventory = document.querySelector('.mc-inventory-container');
        if (inventory) {
            // Si l'inventaire n'est pas actif, on va l'ouvrir
            if (!inventory.classList.contains('active')) {
                inventory.classList.add('active');
                this.playSound('click');
                // Libérer le curseur AVANT d'ouvrir l'inventaire
                document.exitPointerLock();
                // Ajouter un léger délai pour s'assurer que le curseur est libéré
                setTimeout(() => {
                    // S'assurer que le curseur est visible et utilisable
                    const canvasContainer = this.container.querySelector('.mc-builder-canvas-container');
                    canvasContainer.style.cursor = 'default';
                }, 50);
            } else {
                // On ferme l'inventaire
                inventory.classList.remove('active');
                this.playSound('click');
                // Reverrouiller le curseur après fermeture
                setTimeout(() => {
                    this.lockPointer();
                    const canvasContainer = this.container.querySelector('.mc-builder-canvas-container');
                    canvasContainer.style.cursor = 'none';
                }, 50);
            }
        }
    }

    checkSequence(sequence) {
        if (this.keySequence.length < sequence.length) return false;
        const lastKeys = this.keySequence.slice(-sequence.length);
        return lastKeys.every((key, index) => key === sequence[index]);
    }

    toggleBuilder() {
        if (this.isActive) {
            this.hideBuilder();
        } else {
            this.showBuilder();
        }
    }

    showBuilder() {
        this.playSound('achievement');

        if (typeof THREE === 'undefined') {
            this.loadThreeJS(() => {
                this.initializeBuilder();
            });
        } else {
            this.initializeBuilder();
        }
    }

    loadThreeJS(callback) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        threeScript.onload = callback;
        document.head.appendChild(threeScript);
    }

    initializeBuilder() {
        this.container = document.createElement('div');
        this.container.id = 'minecraft-builder-container';
        this.container.className = 'minecraft-builder-3d';

        // Fixe le problème des interactions dans l'inventaire
        document.addEventListener('keydown', (e) => {
            // Empêcher les touches de jeu de fonctionner quand l'inventaire est ouvert
            const inventory = document.querySelector('.mc-inventory-container');
            if (inventory && inventory.classList.contains('active')) {
                if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyZ', 'KeyQ', 'Space'].includes(e.code)) {
                    e.stopPropagation(); // Empêcher la propagation de l'événement
                }
            }
        }, true);

        // Ajout des styles pour le conteneur
        const style = document.createElement('style');
        style.textContent = `
        .minecraft-builder-3d {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background-color: #1E2128;
            border: 4px solid #3C8527;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(82, 165, 53, 0.5);
            border-radius: 6px;
            z-index: 10000;
            padding: 10px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.5, 0, 0.15, 1);
            width: 80vw;
            height: 80vh;
            max-width: 1200px;
            max-height: 800px;
            display: flex;
            flex-direction: column;
            font-family: 'Minecraft', 'Outfit', sans-serif;
        }
                
        .minecraft-builder-3d.active {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
            visibility: visible;
        }
            
            .mc-builder-canvas-container {
                flex: 1;
                width: 100%;
                height: 100%;
                position: relative;
                cursor: none;
            }
            
            .mc-crosshair {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 20px;
                pointer-events: none;
                z-index: 10;
            }
            
            .mc-builder-header {
                display: flex;
                align-items: center;
                padding: 8px 16px;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 2;
            }
            
            .mc-builder-title {
                color: #fff;
                margin: 0;
                font-family: 'Minecraft', sans-serif;
                flex: 1;
            }
            
            .mc-builder-button {
                background-color: #5a5a5a;
                color: #fff;
                border: 2px solid #3a3a3a;
                padding: 5px 10px;
                margin-left: 10px;
                cursor: pointer;
                font-family: 'Minecraft', sans-serif;
            }
            
            .mc-builder-button:hover {
                background-color: #6a6a6a;
            }
            
            .mc-builder-close-btn {
                background-color: #c42a2a;
                color: #fff;
                border: none;
                width: 28px;
                height: 28px;
                border-radius: 4px;
                font-size: 20px;
                cursor: pointer;
                margin-left: 10px;
            }
            
            .mc-hotbar-container {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                background-color: rgba(0, 0, 0, 0.5);
                border: 2px solid #5a5a5a;
                border-radius: 3px;
                z-index: 5;
                padding: 3px;
            }
            
            .mc-hotbar-slot {
                width: 48px;
                height: 48px;
                background-color: rgba(70, 70, 70, 0.5);
                border: 2px solid #3a3a3a;
                margin: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            
            .mc-hotbar-slot.active {
                border-color: #fff;
                background-color: rgba(90, 90, 90, 0.7);
            }
            
            .mc-hotbar-slot img {
                max-width: 70%;
                max-height: 70%;
                image-rendering: pixelated;
            }
            
            .mc-breaking-overlay {
                position: absolute;
                pointer-events: none;
                z-index: 2;
            }
            
            .mc-inventory-container {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 352px;
                height: 332px;
                background-image: url('https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/gui/container/inventory.png');
                background-size: contain;
                background-repeat: no-repeat;
                display: none;
                z-index: 10;
                padding: 20px;
                overflow-y: auto;
                max-height: 80vh;
            }
            
            .mc-inventory-container.active {
                display: block;
            }
            
            .mc-inventory-title {
                color: white;
                text-align: center;
                padding: 5px;
                font-size: 18px;
                font-family: 'Minecraft', sans-serif;
                margin-bottom: 10px;
            }
            
            .mc-inventory-category {
                grid-column: 1 / span 9;
                padding: 5px;
                background-color: rgba(0, 0, 0, 0.5);
                color: #FFAA00;
                font-weight: bold;
                border-bottom: 1px solid #aaa;
                margin-top: 10px;
            }
            
            .mc-inventory-grid {
                display: grid;
                grid-template-columns: repeat(9, 1fr);
                gap: 4px;
                width: 336px;
            }
            
            .mc-inventory-slot {
                width: 32px;
                height: 32px;
                background-color: rgba(50, 50, 50, 0.3);
                border: 1px solid #3a3a3a;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                position: relative;
            }
            
            .mc-inventory-slot:hover {
                background-color: rgba(80, 80, 80, 0.5);
                border-color: #fff;
            }
            
            .mc-inventory-slot img {
                max-width: 80%;
                max-height: 80%;
                image-rendering: pixelated;
            }
            
            .mc-inventory-block-name {
                position: absolute;
                bottom: -20px;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 10px;
                color: white;
                opacity: 0;
                transition: opacity 0.2s;
                pointer-events: none;
                z-index: 11;
                text-shadow: 1px 1px 1px black;
            }
            
            .mc-inventory-slot:hover .mc-inventory-block-name {
                opacity: 1;
            }
            
            .mc-inventory-close {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                padding: 5px 10px;
                background-color: #4d7c32;
                border: 2px solid #374d27;
                color: white;
                cursor: pointer;
                font-family: 'Minecraft', sans-serif;
            }
            
            .mc-game-info {
                position: absolute;
                top: 10px;
                left: 10px;
                color: white;
                font-family: 'Minecraft', sans-serif;
                font-size: 14px;
                text-shadow: 1px 1px 2px black;
                z-index: 5;
            }
            
            .mc-message {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                font-family: 'Minecraft', sans-serif;
                animation: fadeOut 2s forwards;
                animation-delay: 1s;
                z-index: 100;
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            .mc-building-hint {
                position: absolute;
                bottom: 70px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-family: 'Minecraft', sans-serif;
                font-size: 12px;
                text-shadow: 1px 1px 2px black;
                z-index: 5;
                text-align: center;
                width: 100%;
            }
            
            .mc-controls-info {
                position: absolute;
                top: 50px;
                right: 10px;
                color: white;
                font-family: 'Minecraft', sans-serif;
                font-size: 12px;
                text-shadow: 1px 1px 2px black;
                z-index: 5;
                text-align: right;
                background-color: rgba(0, 0, 0, 0.5);
                padding: 5px;
                border-radius: 3px;
            }
        `;
        document.head.appendChild(style);

        this.createHeader();
        this.createCanvas();
        this.createHotbar();
        this.createGameInfo();
        this.createControlsInfo();

        document.body.appendChild(this.container);

        this.initializeThreeJS();
        this.setupMinecraftControls();

        this.generateTerrain();

        this.isActive = true;

        setTimeout(() => {
            this.container.classList.add('active');
            this.lockPointer();

            // Message de bienvenue
            this.showMessage('Mode Créatif activé !');

            // Indice de contrôles
            const hint = document.createElement('div');
            hint.className = 'mc-building-hint';
            hint.innerHTML = 'ZQSD/WASD: Se déplacer | Espace: Sauter/Voler | E: Inventaire | F: Activer/Désactiver Vol | C: Libérer/Verrouiller Curseur | Échap: Quitter<br>Molette: Changer de bloc | Clic Gauche: Casser | Clic Droit: Placer';
            this.container.appendChild(hint);

            setTimeout(() => {
                hint.remove();
            }, 10000);
        }, 10);
    }

    // Méthode pour afficher un message temporaire
    showMessage(text, duration = 2000) {
        // Supprimer tout message existant
        const existingMessage = this.container.querySelector('.mc-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const message = document.createElement('div');
        message.className = 'mc-message';
        message.textContent = text;
        this.container.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, duration);
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'mc-builder-header';

        const title = document.createElement('h2');
        title.className = 'mc-builder-title';
        title.textContent = 'Minecraft Créatif';

        const saveBtn = document.createElement('button');
        saveBtn.className = 'mc-builder-button';
        saveBtn.textContent = 'Sauvegarder';
        saveBtn.addEventListener('click', () => this.saveCreation());

        const loadBtn = document.createElement('button');
        loadBtn.className = 'mc-builder-button';
        loadBtn.textContent = 'Charger';
        loadBtn.addEventListener('click', () => this.loadCreation());

        const clearBtn = document.createElement('button');
        clearBtn.className = 'mc-builder-button';
        clearBtn.textContent = 'Effacer';
        clearBtn.addEventListener('click', () => this.clearBlocks());

        const closeBtn = document.createElement('button');
        closeBtn.className = 'mc-builder-close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => this.toggleBuilder());

        header.appendChild(title);
        header.appendChild(saveBtn);
        header.appendChild(loadBtn);
        header.appendChild(clearBtn);
        header.appendChild(closeBtn);

        this.container.appendChild(header);
    }

    createCanvas() {
        const canvasContainer = document.createElement('div');
        canvasContainer.className = 'mc-builder-canvas-container';

        // Création du crosshair Minecraft
        this.crosshair = document.createElement('div');
        this.crosshair.className = 'mc-crosshair';

        // Style Minecraft authentique
        this.crosshair.innerHTML = `
            <svg width="${this.crosshairSize}" height="${this.crosshairSize}" viewBox="0 0 100 100">
                <line x1="35" y1="50" x2="65" y2="50" stroke="white" stroke-width="2" />
                <line x1="50" y1="35" x2="50" y2="65" stroke="white" stroke-width="2" />
            </svg>
        `;

        // Ajouter le crosshair au centre de l'écran
        canvasContainer.appendChild(this.crosshair);

        // Ajouter des styles spécifiques pour garantir le centrage parfait
        const style = document.createElement('style');
        style.textContent += `
            .mc-crosshair {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: ${this.crosshairSize}px;
                height: ${this.crosshairSize}px;
                pointer-events: none;
                z-index: 9999;
            }
            
            .mc-builder-canvas-container {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);

        this.container.appendChild(canvasContainer);
    }

    createHotbar() {
        const hotbar = document.createElement('div');
        hotbar.className = 'mc-hotbar-container';

        for (let i = 0; i < this.hotbarSize; i++) {
            const slot = document.createElement('div');
            slot.className = 'mc-hotbar-slot';
            if (i === this.selectedSlot) {
                slot.classList.add('active');
            }

            const blockType = this.inventory[i];
            if (blockType) {
                const blockData = this.blockTypes[blockType];
                const texturePath = blockData.textures.all || blockData.textures.side || blockData.textures.top;

                if (texturePath) {
                    const img = document.createElement('img');
                    img.src = texturePath;
                    img.alt = blockData.name;
                    slot.appendChild(img);
                }
            }

            slot.addEventListener('click', () => {
                this.selectHotbarSlot(i);
            });

            hotbar.appendChild(slot);
        }

        this.container.appendChild(hotbar);
    }

    createInventory() {
        const inventoryContainer = document.createElement('div');
        inventoryContainer.className = 'mc-inventory-container';

        // Ajouter un titre à l'inventaire
        const inventoryTitle = document.createElement('div');
        inventoryTitle.className = 'mc-inventory-title';
        inventoryTitle.textContent = 'Inventaire';
        inventoryContainer.appendChild(inventoryTitle);

        const inventoryGrid = document.createElement('div');
        inventoryGrid.className = 'mc-inventory-grid';

        // Organiser les blocs par catégories pour plus de clarté
        const categories = {
            'Naturel': ['grass', 'dirt', 'stone', 'sand', 'gravel', 'oak_log', 'oak_leaves'],
            'Construction': ['cobblestone', 'oak_planks', 'glass', 'bookshelf', 'crafting_table', 'furnace'],
            'Précieux': ['diamond_ore', 'diamond_block', 'iron_ore', 'iron_block', 'gold_ore', 'gold_block', 'obsidian'],
            'Spécial': ['water', 'lava', 'glowstone', 'tnt', 'bedrock']
        };

        // Créer des en-têtes de catégorie
        Object.entries(categories).forEach(([category, blocks], categoryIndex) => {
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'mc-inventory-category';
            categoryHeader.textContent = category;
            categoryHeader.style.gridColumn = '1 / span 9';

            inventoryGrid.appendChild(categoryHeader);

            // Ajouter les blocs de cette catégorie
            blocks.forEach(blockType => {
                const slot = document.createElement('div');
                slot.className = 'mc-inventory-slot';

                const blockData = this.blockTypes[blockType];

                // Ajouter l'image du bloc
                const img = document.createElement('img');
                img.src = blockData.textures.all || blockData.textures.side || blockData.textures.top;
                img.alt = blockData.name;
                slot.appendChild(img);

                // Ajouter le nom du bloc
                const blockName = document.createElement('div');
                blockName.className = 'mc-inventory-block-name';
                blockName.textContent = blockData.name;
                slot.appendChild(blockName);

                slot.addEventListener('click', () => {
                    this.inventory[this.selectedSlot] = blockType;
                    this.selectedBlock = blockType;
                    this.updateHotbarUI();
                    this.createHotbar();
                    this.toggleInventory(); // Fermer l'inventaire après sélection
                    this.playSound('click');
                });

                inventoryGrid.appendChild(slot);
            });
        });

        inventoryContainer.appendChild(inventoryGrid);

        // Ajouter un bouton pour fermer l'inventaire
        const closeButton = document.createElement('button');
        closeButton.className = 'mc-inventory-close';
        closeButton.textContent = 'Fermer (E)';
        closeButton.addEventListener('click', () => this.toggleInventory());

        inventoryContainer.appendChild(closeButton);
        this.container.appendChild(inventoryContainer);
    }

    createGameInfo() {
        const gameInfo = document.createElement('div');
        gameInfo.className = 'mc-game-info';

        this.container.appendChild(gameInfo);

        setInterval(() => {
            if (this.camera) {
                const position = this.camera.position;
                gameInfo.textContent = `XYZ: ${Math.floor(position.x)}, ${Math.floor(position.y)}, ${Math.floor(position.z)}`;

                if (this.moveState.flying) {
                    gameInfo.textContent += ' | Mode de vol: Activé';
                }
            }
        }, 100);
    }

    createControlsInfo() {
        const controlsInfo = document.createElement('div');
        controlsInfo.className = 'mc-controls-info';
        controlsInfo.innerHTML =
            'Contrôles:<br>' +
            'ZQSD/WASD: Déplacement<br>' +
            '→ Z/W: Avancer, S: Reculer<br>' +
            'Espace: Sauter/Monter<br>' +
            'Shift: Sprint/Descendre<br>' +
            'F: Mode Vol<br>' +
            'C: Libérer Curseur<br>' +
            'E: Inventaire<br>' +
            'Échap: Quitter';

        this.container.appendChild(controlsInfo);

        // Faire disparaître après 15 secondes
        setTimeout(() => {
            controlsInfo.style.opacity = '0';
            controlsInfo.style.transition = 'opacity 1s';

            setTimeout(() => {
                controlsInfo.remove();
            }, 1000);
        }, 15000);
    }

    hideBuilder() {
        if (!this.container) return;

        this.playSound('click');
        document.exitPointerLock();

        this.container.classList.remove('active');

        setTimeout(() => {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }

            if (this.scene) {
                this.disposeThreeJS();
            }

            this.container.remove();
            this.container = null;
            this.isActive = false;
        }, 300);
    }

    disposeThreeJS() {
        this.scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }

            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => {
                        if (material.map) material.map.dispose();
                        material.dispose();
                    });
                } else {
                    if (object.material.map) object.material.map.dispose();
                    object.material.dispose();
                }
            }
        });

        this.scene = null;
        this.camera = null;
        this.renderer.dispose();
        this.renderer = null;
    }

    initializeThreeJS() {
        const canvasContainer = this.container.querySelector('.mc-builder-canvas-container');

        // Initialisation de la scène
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Ciel bleu

        // Initialisation de la caméra (hauteur des yeux en Minecraft)
        this.camera = new THREE.PerspectiveCamera(
            70, // FOV comme dans Minecraft
            canvasContainer.clientWidth / canvasContainer.clientHeight,
            0.1,
            1000
        );

        // Position de départ (spawn) - au milieu du terrain à hauteur des yeux
        this.camera.position.set(0, this.playerHeight + 1, 0);

        // Orientation initiale - regarder vers Z positif (nord)
        this.camera.rotation.order = 'YXZ'; // Important pour la rotation FPS
        this.camera.rotation.set(0, 0, 0);

        // Renderer avec antialiasing
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.physicallyCorrectLights = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        canvasContainer.appendChild(this.renderer.domElement);

        // Raycaster pour l'interaction avec les blocs - part toujours du centre
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(0, 0); // Centré sur l'écran pour le crosshair

        // Configurer le raycaster pour utiliser le centre de l'écran
        this.updateRaycaster();

        // Géométrie des blocs
        this.blockGeometry = new THREE.BoxGeometry(1, 1, 1);

        // Surbrillance pour le bloc ciblé
        this.highlightMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 0.3,
            transparent: true,
            wireframe: true
        });

        this.highlightBox = new THREE.Mesh(
            this.blockGeometry.clone(),
            this.highlightMaterial
        );
        this.highlightBox.visible = false;
        this.scene.add(this.highlightBox);

        // Créer la texture de casse de bloc
        this.loadBreakingTextures();

        // Ajouter les lumières
        this.addLights();

        // Précharger les textures
        this.preloadTextures();

        // Initialiser l'inventaire
        this.createInventory();

        // Événements d'interaction avec la souris
        const canvas = this.renderer.domElement;
        canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));

        // Gérer le redimensionnement de la fenêtre
        window.addEventListener('resize', () => this.onWindowResize());

        // Démarrer la boucle d'animation
        this.animate();
    }

    // Mise à jour du raycaster - toujours au centre
    updateRaycaster() {
        // Dans Minecraft, le rayon part toujours du centre de l'écran
        this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    }

    loadBreakingTextures() {
        // Textures de "casse" de bloc
        const textureLoader = new THREE.TextureLoader();
        for (let i = 0; i <= 9; i++) {
            const texturePath = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/block/destroy_stage_${i}.png`;
            this.breakingTextures[i] = textureLoader.load(texturePath);
            this.breakingTextures[i].magFilter = THREE.NearestFilter;
            this.breakingTextures[i].minFilter = THREE.NearestFilter;
        }
    }

    addLights() {
        // Lumière ambiante (jour)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        // Lumière directionnelle (soleil)
        const sunLight = new THREE.DirectionalLight(0xffffcc, 0.8);
        sunLight.position.set(50, 100, 50);
        sunLight.castShadow = true;

        sunLight.shadow.mapSize.width = 1024;
        sunLight.shadow.mapSize.height = 1024;
        sunLight.shadow.camera.near = 0.5;
        sunLight.shadow.camera.far = 500;

        const shadowSize = 80;
        sunLight.shadow.camera.left = -shadowSize;
        sunLight.shadow.camera.right = shadowSize;
        sunLight.shadow.camera.top = shadowSize;
        sunLight.shadow.camera.bottom = -shadowSize;

        this.scene.add(sunLight);

        // Lumière hémisphérique pour un meilleur éclairage global
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x88aaee, 0.4);
        this.scene.add(hemiLight);
    }

    preloadTextures() {
        const textureLoader = new THREE.TextureLoader();

        // Pour chaque type de bloc
        Object.entries(this.blockTypes).forEach(([type, properties]) => {
            this.textures[type] = {};

            if (properties.textures) {
                // Si le bloc a une texture unique pour toutes les faces
                if (properties.textures.all) {
                    const texture = textureLoader.load(properties.textures.all);
                    texture.magFilter = THREE.NearestFilter;
                    texture.minFilter = THREE.NearestFilter;

                    this.textures[type].all = texture;

                    // Crée un matériau de base
                    let materialOptions = {
                        map: texture,
                        transparent: properties.transparent || false,
                        opacity: properties.opacity || 1.0
                    };

                    if (properties.emissive) {
                        materialOptions.emissive = new THREE.Color(0xffaa33);
                        materialOptions.emissiveIntensity = 0.5;
                    }

                    const material = new THREE.MeshLambertMaterial(materialOptions);
                    this.materials[type] = material;
                }
                // Si le bloc a des textures différentes pour les faces
                else {
                    // Charger les textures pour chaque face
                    const materials = [];

                    // Ordre: droite, gauche, haut, bas, avant, arrière

                    // Droite (x+)
                    materials.push(new THREE.MeshLambertMaterial({
                        map: textureLoader.load(properties.textures.side || properties.textures.right || properties.textures.all || ''),
                        transparent: properties.transparent || false,
                        opacity: properties.opacity || 1.0
                    }));

                    // Gauche (x-)
                    materials.push(new THREE.MeshLambertMaterial({
                        map: textureLoader.load(properties.textures.side || properties.textures.left || properties.textures.all || ''),
                        transparent: properties.transparent || false,
                        opacity: properties.opacity || 1.0
                    }));

                    // Haut (y+)
                    materials.push(new THREE.MeshLambertMaterial({
                        map: textureLoader.load(properties.textures.top || properties.textures.all || ''),
                        transparent: properties.transparent || false,
                        opacity: properties.opacity || 1.0
                    }));

                    // Bas (y-)
                    materials.push(new THREE.MeshLambertMaterial({
                        map: textureLoader.load(properties.textures.bottom || properties.textures.all || ''),
                        transparent: properties.transparent || false,
                        opacity: properties.opacity || 1.0
                    }));

                    // Avant (z+)
                    materials.push(new THREE.MeshLambertMaterial({
                        map: textureLoader.load(properties.textures.front || properties.textures.side || properties.textures.all || ''),
                        transparent: properties.transparent || false,
                        opacity: properties.opacity || 1.0
                    }));

                    // Arrière (z-)
                    materials.push(new THREE.MeshLambertMaterial({
                        map: textureLoader.load(properties.textures.back || properties.textures.side || properties.textures.all || ''),
                        transparent: properties.transparent || false,
                        opacity: properties.opacity || 1.0
                    }));

                    // Appliquer le filtre "nearest" à toutes les textures
                    materials.forEach(mat => {
                        if (mat.map) {
                            mat.map.magFilter = THREE.NearestFilter;
                            mat.map.minFilter = THREE.NearestFilter;
                        }
                    });

                    this.materials[type] = materials;
                }
            } else {
                // Fallback avec couleur unie
                this.materials[type] = new THREE.MeshLambertMaterial({
                    color: 0x888888,
                    transparent: properties.transparent || false,
                    opacity: properties.opacity || 1.0
                });
            }
        });
    }

    setupMinecraftControls() {
        const canvasContainer = this.container.querySelector('.mc-builder-canvas-container');

        // Configurer le verrouillage du pointeur pour FPS style
        canvasContainer.addEventListener('click', () => {
            this.lockPointer();
        });

        // Gestion des événements de verrouillage du pointeur
        document.addEventListener('pointerlockchange', this.handlePointerLockChange.bind(this));
        document.addEventListener('mozpointerlockchange', this.handlePointerLockChange.bind(this));
        document.addEventListener('webkitpointerlockchange', this.handlePointerLockChange.bind(this));
    }

    lockPointer() {
        const canvasContainer = this.container.querySelector('.mc-builder-canvas-container');
        canvasContainer.requestPointerLock = canvasContainer.requestPointerLock ||
            canvasContainer.mozRequestPointerLock ||
            canvasContainer.webkitRequestPointerLock;
        canvasContainer.requestPointerLock();
    }

    handlePointerLockChange() {
        const canvasContainer = this.container.querySelector('.mc-builder-canvas-container');

        if (document.pointerLockElement === canvasContainer ||
            document.mozPointerLockElement === canvasContainer ||
            document.webkitPointerLockElement === canvasContainer) {
            // Pointeur verrouillé, ajouter l'écouteur de mouvement
            document.addEventListener('mousemove', this.onMouseMove.bind(this));
        } else {
            // Pointeur déverrouillé, supprimer l'écouteur
            document.removeEventListener('mousemove', this.onMouseMove.bind(this));
        }
    }

    onMouseMove(e) {
        // Rotation de la caméra basée sur le mouvement de la souris
        const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
        const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

        // Paramètres de sensibilité ajustés comme dans Minecraft
        const sensitivity = 0.002;

        // Important: ordre de rotation YXZ pour la caméra FPS
        // Rotation horizontale (gauche/droite) - axe Y
        this.camera.rotation.y -= movementX * sensitivity;

        // Rotation verticale (haut/bas) - axe X
        // Avec limites pour éviter de se retourner complètement
        this.camera.rotation.x -= movementY * sensitivity;
        this.camera.rotation.x = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, this.camera.rotation.x));

        // Mise à jour du raycaster après rotation
        this.updateRaycaster();
    }

    onMouseDown(e) {
        // Vérifier si l'inventaire est ouvert - ne pas traiter les clics
        const inventory = document.querySelector('.mc-inventory-container');
        if (inventory && inventory.classList.contains('active')) {
            return; // Ne rien faire si l'inventaire est ouvert
        }

        // 0: Clic gauche (casser), 2: Clic droit (placer)
        if (e.button === 0) {
            this.mouseState.leftDown = true;
            this.startBreakingBlock();
        } else if (e.button === 2) {
            this.mouseState.rightDown = true;
            this.placeBlock();

            // Empêcher le menu contextuel
            e.preventDefault();
        }
    }

    onMouseUp(e) {
        if (e.button === 0) {
            this.mouseState.leftDown = false;
            this.stopBreakingBlock();
        } else if (e.button === 2) {
            this.mouseState.rightDown = false;
        }
    }

    startBreakingBlock() {
        if (this.mouseState.breakingInterval) {
            clearInterval(this.mouseState.breakingInterval);
        }

        // Vérifier si l'inventaire est ouvert - ne pas casser de bloc
        const inventory = document.querySelector('.mc-inventory-container');
        if (inventory && inventory.classList.contains('active')) {
            return; // Ne rien faire si l'inventaire est ouvert
        }

        const intersectedBlock = this.getTargetedBlock();
        if (!intersectedBlock) return;

        const { position, blockInfo } = intersectedBlock;

        // Si c'est de la bedrock, on ne peut pas casser
        if (blockInfo.type === 'bedrock') {
            this.playSound('click');
            return;
        }

        this.mouseState.breakingBlock = true;
        this.mouseState.breakingProgress = 0;
        this.mouseState.breakingPosition = {
            x: position.x,
            y: position.y,
            z: position.z
        };

        // Créer un overlay pour montrer la progression du cassage
        this.createBreakingOverlay(position);

        // En mode créatif, on casse plus vite (5 ticks = 250ms)
        const breakSpeed = 30; // Accéléré à 30ms par tick
        const creativeBreakTime = 200; // Temps total réduit à 200ms

        this.mouseState.breakingInterval = setInterval(() => {
            // Vérifier si l'inventaire a été ouvert entre temps
            const inventory = document.querySelector('.mc-inventory-container');
            if (inventory && inventory.classList.contains('active')) {
                this.stopBreakingBlock();
                return;
            }

            if (!this.mouseState.leftDown || !this.mouseState.breakingBlock) {
                this.stopBreakingBlock();
                return;
            }

            // Vérifier que le joueur regarde toujours le même bloc
            const currentTarget = this.getTargetedBlock();
            if (!currentTarget) {
                // Continuer même si le curseur n'est plus sur un bloc
                // Cela permet plus de fluidité lors du cassage
            } else if (
                currentTarget.position.x !== this.mouseState.breakingPosition.x ||
                currentTarget.position.y !== this.mouseState.breakingPosition.y ||
                currentTarget.position.z !== this.mouseState.breakingPosition.z
            ) {
                // Si on vise un autre bloc, on arrête
                this.stopBreakingBlock();
                return;
            }

            this.mouseState.breakingProgress += breakSpeed;
            const stageIndex = Math.min(9, Math.floor(this.mouseState.breakingProgress / (creativeBreakTime / 10)));
            this.updateBreakingOverlay(stageIndex);

            if (this.mouseState.breakingProgress >= creativeBreakTime) {
                // Vérifier que le bloc existe toujours avant de le supprimer
                const blockKey = `${this.mouseState.breakingPosition.x},${this.mouseState.breakingPosition.y},${this.mouseState.breakingPosition.z}`;
                if (this.blocks[blockKey]) {
                    this.removeBlock(this.mouseState.breakingPosition.x, this.mouseState.breakingPosition.y, this.mouseState.breakingPosition.z);
                    this.playSound('dig');
                }
                this.stopBreakingBlock();
            }
        }, breakSpeed);
    }

    // Nouvelles méthodes pour les overlays de cassage de blocs
    createBreakingOverlay(position) {
        // Supprimer l'ancien overlay s'il existe
        this.removeBreakingOverlay();

        // Créer un nouveau mesh pour l'overlay de cassage
        const breakingGeometry = this.blockGeometry.clone();
        const breakingMaterial = new THREE.MeshBasicMaterial({
            map: this.breakingTextures[0],
            transparent: true,
            opacity: 0.8,
            depthWrite: false
        });

        const breakingMesh = new THREE.Mesh(breakingGeometry, breakingMaterial);
        breakingMesh.position.set(position.x, position.y, position.z);
        breakingMesh.name = 'breakingOverlay';

        this.scene.add(breakingMesh);
        this.mouseState.breakingMesh = breakingMesh;
    }

    updateBreakingOverlay(stage) {
        if (this.mouseState.breakingMesh) {
            this.mouseState.breakingMesh.material.map = this.breakingTextures[stage];
            this.mouseState.breakingMesh.material.needsUpdate = true;
        }
    }

    removeBreakingOverlay() {
        if (this.mouseState.breakingMesh) {
            this.scene.remove(this.mouseState.breakingMesh);
            if (this.mouseState.breakingMesh.geometry) {
                this.mouseState.breakingMesh.geometry.dispose();
            }
            if (this.mouseState.breakingMesh.material) {
                if (this.mouseState.breakingMesh.material.map) {
                    this.mouseState.breakingMesh.material.map.dispose();
                }
                this.mouseState.breakingMesh.material.dispose();
            }
            this.mouseState.breakingMesh = null;
        }
    }

    stopBreakingBlock() {
        if (this.mouseState.breakingInterval) {
            clearInterval(this.mouseState.breakingInterval);
            this.mouseState.breakingInterval = null;
        }

        this.mouseState.breakingBlock = false;
        this.mouseState.breakingProgress = 0;
        this.mouseState.breakingPosition = null;

        // Supprimer l'overlay de cassage
        this.removeBreakingOverlay();
    }

    placeBlock() {
        // Vérifier si l'inventaire est ouvert - ne pas placer de bloc
        const inventory = document.querySelector('.mc-inventory-container');
        if (inventory && inventory.classList.contains('active')) {
            return; // Ne rien faire si l'inventaire est ouvert
        }

        if (!this.selectedBlock) return;

        // Obtient le bloc ciblé
        const intersectedBlock = this.getTargetedBlock();
        if (intersectedBlock) {
            const { position, face } = intersectedBlock;

            // Calcule la position du nouveau bloc basé sur la face
            const newPosition = {
                x: position.x + face.x,
                y: position.y + face.y,
                z: position.z + face.z
            };

            // Vérifie que le joueur ne se place pas un bloc dedans
            const cameraPosition = this.camera.position.clone();
            const blockPosition = new THREE.Vector3(newPosition.x, newPosition.y, newPosition.z);

            // Calculer les dimensions du bloc (cube 1x1x1)
            const blockMin = blockPosition.clone().subScalar(0.5);
            const blockMax = blockPosition.clone().addScalar(0.5);

            // Vérifier si la caméra est à l'intérieur de ce bloc
            if (
                cameraPosition.x >= blockMin.x && cameraPosition.x <= blockMax.x &&
                cameraPosition.y >= blockMin.y && cameraPosition.y <= blockMax.y &&
                cameraPosition.z >= blockMin.z && cameraPosition.z <= blockMax.z
            ) {
                // La caméra est à l'intérieur du bloc que l'on essaie de placer
                return;
            }

            // Ajoute le bloc
            const success = this.addBlock(this.selectedBlock, newPosition.x, newPosition.y, newPosition.z);

            if (success) {
                this.playSound('place');
            }
        }
    }

    getTargetedBlock() {
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
        const intersects = this.raycaster.intersectObjects(this.scene.children, false);

        // Filtre seulement les blocs à portée et exclut le highlightBox
        for (let i = 0; i < intersects.length; i++) {
            const intersect = intersects[i];

            // Vérifier si l'intersection est à portée
            if (intersect.distance <= MAX_REACH) {
                const object = intersect.object;

                // Vérifie si c'est un bloc (pas le highlightBox et pas l'overlay de cassage)
                if (object !== this.highlightBox && object.name !== 'breakingOverlay') {
                    // Trouve le bloc dans notre dictionnaire
                    for (const [posKey, blockInfo] of Object.entries(this.blocks)) {
                        if (blockInfo.mesh === object) {
                            const [x, y, z] = posKey.split(',').map(Number);

                            // Calcule la normale de la face
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
    }

    // Ajout d'une fonction pour détecter les collisions avec les blocs
    checkCollisions(position) {
        // Taille du joueur (boîte englobante)
        const playerWidth = 0.6; // Un peu moins de 1 bloc
        const playerHeight = 1.8; // Hauteur du joueur (1.8 blocs)

        // Points à vérifier autour du joueur
        const checkPoints = [
            new THREE.Vector3(0, 0, 0), // Centre
            new THREE.Vector3(playerWidth / 2, 0, playerWidth / 2), // Coin avant droit
            new THREE.Vector3(playerWidth / 2, 0, -playerWidth / 2), // Coin arrière droit
            new THREE.Vector3(-playerWidth / 2, 0, playerWidth / 2), // Coin avant gauche
            new THREE.Vector3(-playerWidth / 2, 0, -playerWidth / 2), // Coin arrière gauche
            new THREE.Vector3(0, playerHeight - 0.1, 0) // Tête
        ];

        // Vérifier chaque point
        for (const point of checkPoints) {
            const checkPos = position.clone().add(point);
            const blockX = Math.floor(checkPos.x);
            const blockY = Math.floor(checkPos.y);
            const blockZ = Math.floor(checkPos.z);

            // Vérifier s'il y a un bloc à cette position
            const blockKey = `${blockX},${blockY},${blockZ}`;
            if (this.blocks[blockKey]) {
                return true; // Collision détectée
            }
        }

        return false; // Pas de collision
    }

    updateBlockHighlight() {
        // Cache la surbrillance par défaut
        this.highlightBox.visible = false;

        // Obtient le bloc ciblé
        const intersectedBlock = this.getTargetedBlock();
        if (intersectedBlock) {
            const { position, face } = intersectedBlock;

            if (this.mouseState.rightDown) {
                // Montre où le bloc sera placé
                const newPosition = {
                    x: position.x + face.x,
                    y: position.y + face.y,
                    z: position.z + face.z
                };

                this.highlightBox.position.set(newPosition.x, newPosition.y, newPosition.z);
            } else {
                // Montre le bloc qui sera cassé
                this.highlightBox.position.set(position.x, position.y, position.z);
            }

            this.highlightBox.visible = true;
        }
    }

    generateTerrain() {
        // Dimensions du terrain
        const size = 32;
        const halfSize = size / 2;

        // Génère un terrain plat
        for (let x = -halfSize; x < halfSize; x++) {
            for (let z = -halfSize; z < halfSize; z++) {
                // Surface avec de l'herbe
                this.addBlock('grass', x, 0, z);

                // Couches de terre en dessous
                for (let y = -1; y > -3; y--) {
                    this.addBlock('dirt', x, y, z);
                }

                // Pierre en profondeur
                for (let y = -3; y > -5; y--) {
                    this.addBlock('stone', x, y, z);
                }

                // Roche mère tout en bas
                this.addBlock('bedrock', x, -5, z);
            }
        }

        // Créer une petite île au centre pour le spawn
        const spawnArea = 6;

        for (let x = -spawnArea; x <= spawnArea; x++) {
            for (let z = -spawnArea; z <= spawnArea; z++) {
                // Construire une plate-forme pour le spawn
                if (x === 0 && z === 0) {
                    // Point central - ajouter une ligne de terre vers le haut pour être visible
                    this.addBlock('glowstone', x, 1, z);
                }

                // Créer quelques torches pour éclairer
                if ((Math.abs(x) === spawnArea && Math.abs(z) === spawnArea)) {
                    this.addBlock('glowstone', x, 1, z);
                }
            }
        }

        // Ajouter quelques arbres dans le monde mais pas trop près du spawn
        for (let i = 0; i < 10; i++) {
            const x = Math.floor(Math.random() * size - halfSize);
            const z = Math.floor(Math.random() * size - halfSize);

            // Pas trop près du spawn
            if (Math.abs(x) > spawnArea || Math.abs(z) > spawnArea) {
                this.createTree(x, 1, z);
            }
        }

        // Ajouter quelques structures simples pour l'intérêt
        this.createRandomStructures(halfSize);
    }

    // Crée un arbre à la position donnée
    createTree(x, y, z) {
        const height = 4 + Math.floor(Math.random() * 3);

        // Tronc
        for (let treeY = y; treeY < y + height; treeY++) {
            this.addBlock('oak_log', x, treeY, z);
        }

        // Feuilles
        const leafHeight = 3;
        const leafRadius = 2;

        for (let lx = -leafRadius; lx <= leafRadius; lx++) {
            for (let lz = -leafRadius; lz <= leafRadius; lz++) {
                for (let ly = 0; ly < leafHeight; ly++) {
                    // Calcul de la distance au centre du tronc
                    const dist = Math.sqrt(lx * lx + lz * lz);

                    // Plus on monte dans l'arbre, plus les feuilles se resserrent
                    const maxRadius = leafRadius * (1 - ly / leafHeight * 0.5);

                    if (dist <= maxRadius) {
                        // Un peu d'aléatoire pour donner une forme naturelle
                        if (Math.random() < 0.8) {
                            this.addBlock('oak_leaves', x + lx, y + height - 1 + ly, z + lz);
                        }
                    }
                }
            }
        }
    }

    // Crée des structures aléatoires sur la carte
    createRandomStructures(halfSize) {
        // Petite maison
        const houseX = Math.floor(Math.random() * halfSize);
        const houseZ = Math.floor(Math.random() * halfSize);

        // Base de la maison
        for (let x = -2; x <= 2; x++) {
            for (let z = -2; z <= 2; z++) {
                // Sol
                this.addBlock('oak_planks', houseX + x, 1, houseZ + z);

                // Murs
                if (Math.abs(x) === 2 || Math.abs(z) === 2) {
                    this.addBlock('cobblestone', houseX + x, 2, houseZ + z);
                    this.addBlock('cobblestone', houseX + x, 3, houseZ + z);
                }

                // Toit
                this.addBlock('oak_planks', houseX + x, 4, houseZ + z);
            }
        }

        // Porte
        this.addBlock('oak_planks', houseX + 2, 2, houseZ); // Trou pour la porte

        // Fenêtres
        this.addBlock('glass', houseX, 3, houseZ + 2);
        this.addBlock('glass', houseX, 3, houseZ - 2);

        // Table de craft
        this.addBlock('crafting_table', houseX - 1, 2, houseZ - 1);

        // Torche
        this.addBlock('glowstone', houseX + 1, 2, houseZ + 1);
    }

    addBlock(type, x, y, z) {
        // Vérifie si un bloc existe déjà à cette position
        const position = `${x},${y},${z}`;

        if (this.blocks[position]) {
            return false;
        }

        // Obtient le matériau pour ce type de bloc
        const material = this.materials[type];

        // Crée un nouveau bloc
        const block = new THREE.Mesh(this.blockGeometry, material);

        // Position du bloc
        block.position.set(x, y, z);

        // Ajoute des ombres
        block.castShadow = true;
        block.receiveShadow = true;

        // Ajoute le bloc à la scène
        this.scene.add(block);

        // Stocke le bloc
        this.blocks[position] = {
            type,
            mesh: block
        };

        return true;
    }

    removeBlock(x, y, z) {
        const position = `${x},${y},${z}`;
        const block = this.blocks[position];

        // Vérifier si c'est de la roche mère (indestructible)
        if (block && block.type === 'bedrock') {
            return false;
        }

        if (block) {
            // Supprime le bloc de la scène
            this.scene.remove(block.mesh);

            // Nettoie les ressources
            if (block.mesh.geometry) {
                block.mesh.geometry.dispose();
            }

            // Supprime le bloc
            delete this.blocks[position];

            return true;
        }

        return false;
    }

    clearBlocks() {
        if (!confirm('Êtes-vous sûr de vouloir effacer toute votre création ? Le terrain de base sera conservé.')) return;

        this.playSound('explosion');

        // Parcours tous les blocs
        Object.entries({ ...this.blocks }).forEach(([position, block]) => {
            // Extraire les coordonnées
            const [x, y, z] = position.split(',').map(Number);

            // Si ce n'est pas un bloc du terrain de base ou de la roche mère
            if (y > 0) {
                this.removeBlock(x, y, z);
            }
        });
    }

    saveCreation() {
        // Crée un objet de sauvegarde
        const blockData = {};

        // Parcourt tous les blocs
        Object.entries(this.blocks).forEach(([position, block]) => {
            blockData[position] = block.type;
        });

        const savedData = {
            blocks: blockData,
            timestamp: new Date().toISOString()
        };

        // Sauvegarde dans le localStorage
        localStorage.setItem('minecraft-builder-3d-save', JSON.stringify(savedData));

        this.playSound('achievement');

        // Animation et message de confirmation
        this.showMessage('Création sauvegardée !');
    }

    loadCreation() {
        const savedData = localStorage.getItem('minecraft-builder-3d-save');

        if (!savedData) {
            alert('Aucune sauvegarde trouvée !');
            return;
        }

        try {
            const { blocks } = JSON.parse(savedData);

            // Efface les blocs existants (au-dessus du terrain)
            this.clearBlocks();

            // Ajoute les blocs sauvegardés
            Object.entries(blocks).forEach(([position, type]) => {
                const [x, y, z] = position.split(',').map(Number);

                // Si ce n'est pas un bloc qui ferait partie du terrain de base
                if (y > 0) {
                    this.addBlock(type, x, y, z);
                }
            });

            this.playSound('achievement');

            // Message de confirmation
            this.showMessage('Création chargée !');
        } catch (error) {
            console.error('Erreur lors du chargement de la sauvegarde:', error);
            alert('Erreur lors du chargement de la sauvegarde');
        }
    }

    applyPhysics() {
        if (!this.moveState.flying) {
            // Applique la gravité
            this.velocity.y -= this.gravity;

            // Limites de vitesse de chute
            if (this.velocity.y < -1) {
                this.velocity.y = -1;
            }

            // Détection de collision avec le sol
            this.isGrounded = false;

            // Rayon vers le bas pour vérifier si on est au sol
            const rayDown = new THREE.Raycaster(
                this.camera.position,
                new THREE.Vector3(0, -1, 0),
                0,
                this.playerHeight + 0.1
            );

            const intersects = rayDown.intersectObjects(this.scene.children, false);

            for (let i = 0; i < intersects.length; i++) {
                const object = intersects[i].object;

                // Exclure l'highlight box et les objets non-blocs
                if (object !== this.highlightBox && object.name !== 'breakingOverlay') {
                    this.isGrounded = true;
                    this.velocity.y = 0;
                    break;
                }
            }
        } else {
            // En vol, pas de gravité
            this.velocity.y = 0;
        }
    }

    animate() {
        this.animationFrame = requestAnimationFrame(() => this.animate());

        // Vérifier si l'inventaire est ouvert - ne pas appliquer les mouvements
        const inventory = document.querySelector('.mc-inventory-container');
        const isInventoryOpen = inventory && inventory.classList.contains('active');

        // Mettre à jour la physique seulement si l'inventaire est fermé
        if (!isInventoryOpen) {
            this.applyPhysics();
        }

        // Calcul du vecteur de mouvement
        const moveVector = new THREE.Vector3(0, 0, 0);

        // Ne traiter les mouvements que si l'inventaire est fermé
        if (!isInventoryOpen) {
            if (this.moveState.forward) {
                moveVector.z += 1; // Z/W = AVANT
            }
            if (this.moveState.backward) {
                moveVector.z -= 1; // S = ARRIÈRE
            }
            if (this.moveState.left) {
                moveVector.x -= 1;
            }
            if (this.moveState.right) {
                moveVector.x += 1;
            }

            // Normaliser le vecteur si nécessaire
            if (moveVector.length() > 0) {
                moveVector.normalize();
            }

            // Vitesse selon le mode
            let speed = this.moveSpeed;
            if (this.moveState.sprint) {
                speed *= this.sprintMultiplier;
            }

            // Appliquer la rotation de la caméra au vecteur de mouvement
            // Important: Direction du regard basée sur la rotation et non quaternion
            const cameraDirection = new THREE.Vector3();
            this.camera.getWorldDirection(cameraDirection);
            cameraDirection.y = 0; // Ignorer l'inclinaison verticale pour le mouvement horizontal
            cameraDirection.normalize();

            // Vecteur latéral (perpendiculaire à la direction)
            const cameraSide = new THREE.Vector3(-cameraDirection.z, 0, cameraDirection.x);

            // Calculer le vecteur final avec la bonne orientation
            const finalMoveVector = new THREE.Vector3();

            if (moveVector.z !== 0) {
                finalMoveVector.add(cameraDirection.clone().multiplyScalar(moveVector.z * speed));
            }

            if (moveVector.x !== 0) {
                finalMoveVector.add(cameraSide.clone().multiplyScalar(moveVector.x * speed));
            }

            // Mouvement vertical selon le mode
            if (this.moveState.flying) {
                if (this.moveState.up) {
                    finalMoveVector.y += speed;
                }
                if (this.moveState.down) {
                    finalMoveVector.y -= speed;
                }
            } else {
                // En mode normal, appliquer la gravité/saut
                finalMoveVector.y = this.velocity.y;
            }

            // Position prévue après mouvement
            const nextPosition = this.camera.position.clone().add(finalMoveVector);

            // Vérifier les collisions uniquement si on n'est pas en vol
            if (!this.moveState.flying && this.checkCollisions(nextPosition)) {
                // En cas de collision, essayer juste le mouvement vertical
                const verticalMove = new THREE.Vector3(0, finalMoveVector.y, 0);
                if (!this.checkCollisions(this.camera.position.clone().add(verticalMove))) {
                    this.camera.position.add(verticalMove);
                }
            } else {
                // Pas de collision ou mode vol, appliquer le mouvement complet
                this.camera.position.copy(nextPosition);
            }
        }

        // Mettre à jour la surbrillance du bloc
        this.updateBlockHighlight();

        // Mettre à jour le raycaster pour les interactions
        this.updateRaycaster();

        // Rendu de la scène
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        if (!this.container) return;

        const canvasContainer = this.container.querySelector('.mc-builder-canvas-container');

        this.camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    }

    playSound(type) {
        if (typeof window.playSound === 'function') {
            window.playSound(type);
            return;
        }

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let oscillator = audioContext.createOscillator();
        let gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch (type) {
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

document.addEventListener('DOMContentLoaded', function () {
    window.minecraft3DBuilder = new Minecraft3DBuilder();

    document.addEventListener('contextmenu', function (e) {
        if (window.minecraft3DBuilder.isActive) {
            e.preventDefault();
        }
    });

    const footer = document.querySelector('.footer-info');
    if (footer) {
        const builderLink = document.createElement('a');
        builderLink.id = 'minecraft-builder-toggle';
        builderLink.href = '#';
        builderLink.className = 'builder-link';
        builderLink.innerHTML = '<i class="fas fa-cubes"></i> Mode Minecraft Créatif';
        builderLink.style.display = 'flex';
        builderLink.style.alignItems = 'center';
        builderLink.style.gap = '5px';
        builderLink.style.marginTop = '10px';

        builderLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.minecraft3DBuilder.toggleBuilder();
        });

        footer.appendChild(builderLink);
    }

    const heroSection = document.querySelector('.hero-buttons');
    if (heroSection) {
        const hint = document.createElement('div');
        hint.className = 'minecraft-hint';
        hint.innerHTML = 'Indice: Tapez "CREATE" sur votre clavier pour un monde Minecraft en 3D...';
        hint.style.fontSize = '0.8rem';
        hint.style.opacity = '0.6';
        hint.style.marginTop = '20px';
        hint.style.fontStyle = 'italic';

        heroSection.appendChild(hint);
    }
});