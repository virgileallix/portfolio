/**
 * Minecraft Drops and Loots System
 * Système de drops d'objets style Minecraft pour le site web
 */

class MinecraftDrops {
    constructor() {
      this.drops = [];
      this.itemTypes = {
        // Matériaux de base
        dirt: { name: 'Terre', sprite: 'dirt', rarity: 'common', stackSize: 64 },
        cobblestone: { name: 'Pierre taillée', sprite: 'cobblestone', rarity: 'common', stackSize: 64 },
        oak_log: { name: 'Bûche de chêne', sprite: 'oak_log', rarity: 'common', stackSize: 64 },
        oak_planks: { name: 'Planches de chêne', sprite: 'oak_planks', rarity: 'common', stackSize: 64 },
        stick: { name: 'Bâton', sprite: 'stick', rarity: 'common', stackSize: 64 },
        
        // Minerais
        coal: { name: 'Charbon', sprite: 'coal', rarity: 'common', stackSize: 64 },
        iron_ore: { name: 'Minerai de fer', sprite: 'iron_ore', rarity: 'uncommon', stackSize: 64 },
        gold_ore: { name: 'Minerai d\'or', sprite: 'gold_ore', rarity: 'uncommon', stackSize: 64 },
        diamond: { name: 'Diamant', sprite: 'diamond', rarity: 'rare', stackSize: 64 },
        emerald: { name: 'Émeraude', sprite: 'emerald', rarity: 'rare', stackSize: 64 },
        
        // Objets craftés
        iron_ingot: { name: 'Lingot de fer', sprite: 'iron_ingot', rarity: 'uncommon', stackSize: 64 },
        gold_ingot: { name: 'Lingot d\'or', sprite: 'gold_ingot', rarity: 'uncommon', stackSize: 64 },
        
        // Outils
        wooden_pickaxe: { name: 'Pioche en bois', sprite: 'wooden_pickaxe', rarity: 'uncommon', stackSize: 1 },
        stone_pickaxe: { name: 'Pioche en pierre', sprite: 'stone_pickaxe', rarity: 'uncommon', stackSize: 1 },
        iron_pickaxe: { name: 'Pioche en fer', sprite: 'iron_pickaxe', rarity: 'rare', stackSize: 1 },
        diamond_pickaxe: { name: 'Pioche en diamant', sprite: 'diamond_pickaxe', rarity: 'epic', stackSize: 1 },
        
        // Nourriture
        apple: { name: 'Pomme', sprite: 'apple', rarity: 'common', stackSize: 64, foodValue: 4 },
        bread: { name: 'Pain', sprite: 'bread', rarity: 'common', stackSize: 64, foodValue: 5 },
        cooked_beef: { name: 'Steak', sprite: 'cooked_beef', rarity: 'uncommon', stackSize: 64, foodValue: 8 },
        golden_apple: { name: 'Pomme dorée', sprite: 'golden_apple', rarity: 'epic', stackSize: 64, foodValue: 4, effects: ['regeneration'] },
        
        // Drops de mobs
        string: { name: 'Ficelle', sprite: 'string', rarity: 'common', stackSize: 64 },
        feather: { name: 'Plume', sprite: 'feather', rarity: 'common', stackSize: 64 },
        leather: { name: 'Cuir', sprite: 'leather', rarity: 'common', stackSize: 64 },
        bone: { name: 'Os', sprite: 'bone', rarity: 'common', stackSize: 64 },
        gunpowder: { name: 'Poudre à canon', sprite: 'gunpowder', rarity: 'uncommon', stackSize: 64 },
        egg: { name: 'Œuf', sprite: 'egg', rarity: 'common', stackSize: 16 },
        porkchop: { name: 'Côtelette de porc', sprite: 'porkchop', rarity: 'common', stackSize: 64, foodValue: 3 },
        
        // Autres
        experience_orb: { name: 'Orbe d\'expérience', sprite: 'xp_orb', rarity: 'special', stackSize: 1, xpValue: 1 }
      };
      
      // Définir les tables de loot pour différents blocs et mobs
      this.lootTables = {
        // Blocs
        stone: [
          { item: 'cobblestone', chance: 1.0, count: { min: 1, max: 1 } }
        ],
        grass_block: [
          { item: 'dirt', chance: 1.0, count: { min: 1, max: 1 } }
        ],
        oak_log: [
          { item: 'oak_log', chance: 1.0, count: { min: 1, max: 1 } }
        ],
        coal_ore: [
          { item: 'coal', chance: 1.0, count: { min: 1, max: 2 } },
          { item: 'experience_orb', chance: 0.5, count: { min: 1, max: 3 } }
        ],
        iron_ore: [
          { item: 'iron_ore', chance: 1.0, count: { min: 1, max: 1 } },
          { item: 'experience_orb', chance: 0.7, count: { min: 2, max: 5 } }
        ],
        gold_ore: [
          { item: 'gold_ore', chance: 1.0, count: { min: 1, max: 1 } },
          { item: 'experience_orb', chance: 0.8, count: { min: 3, max: 7 } }
        ],
        diamond_ore: [
          { item: 'diamond', chance: 1.0, count: { min: 1, max: 1 } },
          { item: 'experience_orb', chance: 1.0, count: { min: 5, max: 10 } }
        ],
        
        // Mobs
        zombie: [
          { item: 'rotten_flesh', chance: 0.8, count: { min: 0, max: 2 } },
          { item: 'iron_ingot', chance: 0.05, count: { min: 1, max: 1 } },
          { item: 'experience_orb', chance: 1.0, count: { min: 3, max: 5 } }
        ],
        skeleton: [
          { item: 'bone', chance: 0.8, count: { min: 0, max: 2 } },
          { item: 'arrow', chance: 0.5, count: { min: 0, max: 2 } },
          { item: 'experience_orb', chance: 1.0, count: { min: 3, max: 5 } }
        ],
        creeper: [
          { item: 'gunpowder', chance: 0.8, count: { min: 0, max: 2 } },
          { item: 'experience_orb', chance: 1.0, count: { min: 3, max: 5 } }
        ],
        chicken: [
          { item: 'feather', chance: 0.7, count: { min: 0, max: 2 } },
          { item: 'egg', chance: 0.3, count: { min: 0, max: 1 } },
          { item: 'experience_orb', chance: 1.0, count: { min: 1, max: 3 } }
        ],
        pig: [
          { item: 'porkchop', chance: 0.8, count: { min: 1, max: 3 } },
          { item: 'experience_orb', chance: 1.0, count: { min: 1, max: 3 } }
        ]
      };
      
      // Ajouter les styles
      this.addDropsStyles();
      
      // Configurer les écouteurs d'événements
      this.setupEventListeners();
    }
    
    /**
     * Ajoute les styles CSS pour les drops
     */
    addDropsStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .minecraft-item-drop {
          position: fixed;
          width: 20px;
          height: 20px;
          pointer-events: none;
          z-index: 900;
          image-rendering: pixelated;
          transition: transform 0.2s;
          transform-origin: center;
          animation: itemBob 1s infinite alternate ease-in-out;
        }
        
        .minecraft-item-drop.collected {
          animation: itemCollect 0.5s forwards;
        }
        
        .minecraft-xp-orb {
          position: fixed;
          width: 12px;
          height: 12px;
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAwV+LyWlwAAAc1JREFUKMxVkD9oU1EUxn/n3vvuS2KjtcXYpCVpTAMOLlKkgmAXNxehIDgUSqFCdRKKDnUoKIgu4qCDiyAIdnAQHCS4VEGQUBwc0qFDbaM2KbGI+ZKXPO+9e50MKR44y3f4zu93jrAJu7E6GYwNk6O32/f3f7X7Xf8fc6XqxGD4DWBy0JQOOYv/L5RL1YfJ0eKNnclwXcQAOOfOJvE2xQCr64tvVCY0Mje5t7ClsOPPz/7X/g+/+lO5tDQKjGjmrQaYYrF4Z0thh93KBHcBrHUHx3Zm9m2KWOtpA8hkOsPGxuDh3r3Jdytfs1cmDiW3fK+G1Xa1MzBfgC3L+kFjYzybtc+LI27pwwdz9eSo73faapXI/TmT8oq7Vlu8+Hm5+rSYD/b/+Nl8/fFja71cXrn17ctEaOoMrDkGMlDZoVGvUJvB7C5zt5T59eaJ89UcXCp/7kyH6eJRc+BQfrQ3kSiEOxtqQoT4hwgSx0EtCLcFmdQrZ17fy14/dXs8/EB9hTGZUXdMPfc8nQEJcKpqG2HS/aMSGnRE8+mh5LF74YsHs1MXRG+KiBeL4Btx2pEoEeG9FvPXDplrcbQh0QpwpLX21jj3HuR8LC/NwvpvAAAAAElFTkSuQmCC');
          background-size: contain;
          background-repeat: no-repeat;
          pointer-events: none;
          z-index: 900;
          opacity: 0.9;
          animation: xpOrb 1.5s infinite alternate ease-in-out;
        }
        
        .minecraft-xp-orb.collected {
          animation: xpCollect 0.5s forwards;
        }
        
        .minecraft-item-popup {
          position: fixed;
          bottom: 150px;
          right: 20px;
          background: rgba(20, 21, 25, 0.8);
          border: 2px solid #3C8527;
          border-radius: 5px;
          padding: 8px 12px;
          color: white;
          font-family: 'Minecraft', sans-serif;
          font-size: 14px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.3s, transform 0.3s;
          animation: popupFade 3s forwards;
        }
        
        .minecraft-item-popup-icon {
          width: 24px;
          height: 24px;
          background-size: contain;
          background-repeat: no-repeat;
          image-rendering: pixelated;
        }
        
        .minecraft-item-popup-text {
          display: flex;
          flex-direction: column;
        }
        
        .minecraft-item-popup-name {
          font-weight: bold;
        }
        
        .minecraft-item-popup-count {
          font-size: 12px;
          opacity: 0.8;
        }
        
        /* Sprites d'items */
        .dirt { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAgWDXRBHAAAAHVJREFUOMtj/P//PwMlgIlUDQPDAMb///8zUWrA/5aSZUwsOUUoGfKfEYcL2JiJcwEzOzteAxiwGJDz5x8KxqaBsf0vjkhhZPz/j4EJSxgQ4wUmhjFh2I1BaLSRGv+EwxlZIzGuwBuITPgMYCVkAM5AJGQAAMhqOr9P+n3/AAAAAElFTkSuQmCC'); }
        .cobblestone { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAkaLh3rLwAAAHRJREFUOMvtkUEOgCAMBLcYfY2vIfFfPMGnGV+j3vQEYogEMHrwZJN2N+n2UCGZFN4IBrFAfOSUgAJUoB1UHNkJoMlv7gReazQVA0HA+M5aS7ZxJdj4wQFX4JuQf1kxA7MPWU9+gCU4QOD6TjsYQefHdz4B/qJ1Pz7LqiAAAAAASUVORK5CYII='); }
        .oak_log { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAgWDXRBHAAAAL1JREFUOMutk00KwjAQRl8MJSfJCdwUehdBXLUX6A16El2J7vQOXoVSN0IXgiYQJ52JDfRnowOTzXz5eMy8gQTVej0o6/sL0AFm8TMDdqs4DQCmOI4ppfQT0nUdxphzEttaS5qmhGFI0zSUUooGGPXdgTGYHdI50tqDlJK+7+n7nsPhAMBut+N0OvHI8yi9b3fLqlpIQFVVdF1HlmVkWUYQBOR5zmazWV7YWktZllhrAVgul+dI/sL/C9/+iTeNhE23iDFBWQAAAABJRU5ErkJggg=='); }
        .oak_planks { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAYnN/TYxQAAAG1JREFUOMtj/P//PwMlgIlUDYPBAEZGRsb/DAwMLOQagvUWmJiYSHIBExMTI14DOLAYwMnF9Z8BTRMujXgBMysr41/wIjA0MbGBRf4S8MJ/dA2M+AxgZGTEGw0D5glGRkYGVmINGFgvYAEAZg4wEWWI/YQAAAAASUVORK5CYII='); }
        .stick { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAkLEBY7JwAAAGBJREFUOMvtkkEKwCAMBCehf8vfU+jf8m9evcWiNFhKDz0MLIoZcQWWc0pvdxIXMtNIkogcqnbuEEkNuK3vHi5G1eF3c92DpyXoA1be8SWo8GogQLl24HEAbz8Cm/4mGyjAIDGGDnhDKgAAAABJRU5ErkJggg=='); }
        .coal { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAgcDhf5YgAAAGtJREFUOMvt0sENgCAMheGfuoGjMAobwAZlE0dxFEdwA6zNSSMnvRKTvuQlkJAvBwqh8nfHgKGPRTNgwohyOAGc2DBFG2a0a6ynhFPUYiX7cBIu+Lz3WYONeNJBiYfNQ5kNGZOSEh0GtCoP6Ro2pzR55dq/CAAAAABJRU5ErkJggg=='); }
        .diamond { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAgerE29SAAAAHZJREFUOMvVkjEOgCAMRZsYl47ewdHVCzKwuXsGV0/jaCLewVEPoBMsiJEYN19CaJu+9ENLgZ97TAAAEHS9DMSNTxayD54EX2MPSgL8RGsBAFXVRmYwUzLEBFnb22BvUUTkzCDO3b+Q50dsiXODTKDXm9wS/8gNLWU2u+z9emUAAAAASUVORK5CYII='); }
        .iron_ingot { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAUcYUvCbQAAAI5JREFUOMvVkkEKgzAQRZ+BLOwo6Ene/wStG29iF4UsAkrI/y7EllIhmx0Y5s/MZ/4MIwT+3dgBnG73B2CWcIkjAOR5jud5kJvuXhAw6bru2MYYUUoBIEkSiqIgiiLquibPcyzLkmVZcF13n8mPJBVF0d9Fn2VZw7quaK1JkoQwDLFtG6UUruvyoxQ+lncD4A1+1C2aBxYUmwAAAABJRU5ErkJggg=='); }
        .iron_pickaxe { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAclxX+fwQAAAKRJREFUOMvVksENgzAQBGc5ygvRQy4NUAjpg4KgluuDOmiENkhHqSFFGfHgIyT4JSedYs/O3J2NI/zbs3UAJWV9BwhJJweSuQCYppnT6cRut+N8vlLXNVpr1HW9WCB7vA23xgbVUZ0lC8hOkoxIWXOPJL2pSinM88zj8WCapkV8I6ICAq21aMWaXgNnZ0SMeGm4KMqA0nkEFx8A8rXz2H1H1Qj8+vwGDCM/CluFjCUAAAAASUVORK5CYII='); }
        .apple { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAcfnKWHBAAAAJxJREFUOMvdk7ENwjAQRZ+NEWIBCkoWQFSwAIJqBWZIR8EiLmCJFLAEPQVdRJOGiCjiAglZwrqz7t7f5/8vwx2QCx0RoLc71wFCkgH4JkcCaFtDXdd0XZc2HMcR5xxVVT0AhFz7gdIYIuLlXYDbF+KDVa4BVX/QrDdgQcvMzgGY2SmOqjcnGgV4XmdwHcAhG9DlBgjgm8EM/JJ93pz4A9xGNzLHuFMYiwAAAABJRU5ErkJggg=='); }
        .xp_orb { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAwV+LyWlwAAANhJREFUOMutUjsSgjAUfCSGxkIvAJ12dugJaD2JnW1q6byBJVU4AIUNNwEv4QHss2NJflBgZ8tNspvdb3ffLiHAn8YcAMp9ewOQKNgWfQAQQoAQAgCwWm8xLPsn+w+rJ1ZFjmw9H3TdOeCcIooiRFGEPE9RKQXOOY6nK/I8RVEUELGA+7S7E9f1fBqELkOaJuirHrfmjvb5QBwnUFLBGAMlJZo6wELNL5yQkJKMEABASr4BALJKpP1M7+eC49YYHLbbC77UrG1MAGUsjgMAmsPRbTbO+vmd0Aj3N/YGCWFAGgr1FHMAAAAASUVORK5CYII='); }
        
        /* Animations */
        @keyframes itemBob {
          0% { transform: translateY(0); }
          100% { transform: translateY(-5px); }
        }
        
        @keyframes itemCollect {
          0% { transform: scale(1) rotate(0deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes xpOrb {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-3px) scale(1.2); }
        }
        
        @keyframes xpCollect {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes popupFade {
          0% { opacity: 0; transform: translateX(20px); }
          10% { opacity: 1; transform: translateX(0); }
          80% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-20px); }
        }
      `;
      document.head.appendChild(style);
    }
    
    /**
     * Configure les écouteurs d'événements
     */
    setupEventListeners() {
      // Écouter les événements de casse de bloc
      window.addEventListener('minecraft-block-broken', (e) => {
        const { blockType, position } = e.detail;
        this.generateDrop(blockType, position);
      });
      
      // Écouter les événements de mort de mob
      window.addEventListener('minecraft-mob-killed', (e) => {
        const { mobType, position } = e.detail;
        this.generateMobDrop(mobType, position);
      });
      
      // Écouter les événements de drops spécifiques
      window.addEventListener('minecraft-mob-drop', (e) => {
        const { mobType, dropItems, position } = e.detail;
        
        if (dropItems && dropItems.length > 0) {
          dropItems.forEach(itemType => {
            // Générer le drop avec une position légèrement décalée
            const randomOffsetX = (Math.random() - 0.5) * 40;
            const randomOffsetY = (Math.random() - 0.5) * 40;
            
            const dropPosition = {
              x: position.x + randomOffsetX,
              y: position.y + randomOffsetY
            };
            
            this.createItemDrop(itemType, dropPosition, 1);
          });
        }
      });
      
      // Cliquer sur la page pour collecter les items
      document.addEventListener('click', (e) => {
        this.collectNearbyItems(e.clientX, e.clientY);
      });
      
      // Nettoyer les items trop anciens
      setInterval(() => {
        this.cleanupOldDrops();
      }, 10000);
    }
    
    /**
     * Génère un drop basé sur le type de bloc cassé
     */
    generateDrop(blockType, position) {
      // Vérifier si ce type de bloc a une table de loot
      const lootTable = this.lootTables[blockType];
      if (!lootTable) return;
      
      // Parcourir la table de loot et générer les items selon les probabilités
      lootTable.forEach(lootEntry => {
        const { item, chance, count } = lootEntry;
        
        // Vérifier si l'item doit être généré (selon la probabilité)
        if (Math.random() <= chance) {
          // Déterminer la quantité
          const itemCount = Math.floor(Math.random() * (count.max - count.min + 1)) + count.min;
          
          if (itemCount > 0) {
            // Générer l'item avec une position légèrement décalée
            const randomOffsetX = (Math.random() - 0.5) * 30;
            const randomOffsetY = (Math.random() - 0.5) * 30;
            
            const dropPosition = {
              x: position.x + randomOffsetX,
              y: position.y + randomOffsetY
            };
            
            this.createItemDrop(item, dropPosition, itemCount);
          }
        }
      });
    }
    
    /**
     * Génère un drop basé sur le type de mob tué
     */
    generateMobDrop(mobType, position) {
      // Vérifier si ce type de mob a une table de loot
      const lootTable = this.lootTables[mobType];
      if (!lootTable) return;
      
      // Parcourir la table de loot et générer les items selon les probabilités
      lootTable.forEach(lootEntry => {
        const { item, chance, count } = lootEntry;
        
        // Vérifier si l'item doit être généré (selon la probabilité)
        if (Math.random() <= chance) {
          // Déterminer la quantité
          const itemCount = Math.floor(Math.random() * (count.max - count.min + 1)) + count.min;
          
          if (itemCount > 0) {
            // Générer l'item avec une position légèrement décalée
            const randomOffsetX = (Math.random() - 0.5) * 40;
            const randomOffsetY = (Math.random() - 0.5) * 40;
            
            const dropPosition = {
              x: position.x + randomOffsetX,
              y: position.y + randomOffsetY
            };
            
            this.createItemDrop(item, dropPosition, itemCount);
          }
        }
      });
    }
    
    /**
     * Crée un drop d'item à une position donnée
     */
    createItemDrop(itemType, position, count) {
      // Vérifier si l'item existe
      if (!this.itemTypes[itemType] && itemType !== 'experience_orb') {
        console.warn(`Type d'item inconnu: ${itemType}`);
        return;
      }
      
      // Créer l'élément DOM pour l'item
      let dropElement;
      
      if (itemType === 'experience_orb') {
        // Cas spécial: orbes d'XP
        dropElement = document.createElement('div');
        dropElement.className = 'minecraft-xp-orb';
        
        // Propriétés spécifiques de l'XP
        dropElement.dataset.itemType = 'experience_orb';
        dropElement.dataset.xpValue = count;
      } else {
        // Items normaux
        dropElement = document.createElement('div');
        dropElement.className = 'minecraft-item-drop';
        
        // Appliquer la texture
        const itemSprite = this.itemTypes[itemType].sprite;
        dropElement.classList.add(itemSprite);
        
        // Stocker les données de l'item
        dropElement.dataset.itemType = itemType;
        dropElement.dataset.itemCount = count;
      }
      
      // Positionner l'item
      dropElement.style.left = `${position.x}px`;
      dropElement.style.top = `${position.y}px`;
      
      // Ajouter au DOM
      document.body.appendChild(dropElement);
      
      // Ajouter à la liste des drops
      const drop = {
        element: dropElement,
        itemType: itemType,
        count: count,
        position: position,
        createdAt: Date.now()
      };
      
      this.drops.push(drop);
      
      // Jouer un son
      if (typeof window.playSound === 'function') {
        if (itemType === 'experience_orb') {
          window.playSound('click');
        } else {
          window.playSound('pop');
        }
      }
      
      return drop;
    }
    
    /**
     * Collecte les items proches d'une position
     */
    collectNearbyItems(x, y, radius = 50) {
      // Parcourir tous les drops
      for (let i = this.drops.length - 1; i >= 0; i--) {
        const drop = this.drops[i];
        
        // Calculer la distance entre la position et le drop
        const dx = drop.position.x - x;
        const dy = drop.position.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Si le drop est assez proche, le collecter
        if (distance <= radius) {
          this.collectItem(drop, i);
        }
      }
    }
    
    /**
     * Collecte un item spécifique
     */
    collectItem(drop, index) {
      // Marquer l'élément comme collecté pour l'animation
      drop.element.classList.add('collected');
      
      // Jouer un son
      if (typeof window.playSound === 'function') {
        if (drop.itemType === 'experience_orb') {
          window.playSound('xp');
        } else {
          window.playSound('pop');
        }
      }
      
      // Afficher la notification
      this.showItemPopup(drop);
      
      // Dispatcher un événement pour le système d'inventory
      window.dispatchEvent(new CustomEvent('minecraft-item-collected', {
        detail: { 
          itemType: drop.itemType,
          count: drop.count
        }
      }));
      
      // Supprimer l'élément après l'animation
      setTimeout(() => {
        if (drop.element.parentNode) {
          drop.element.parentNode.removeChild(drop.element);
        }
        
        // Supprimer de la liste des drops
        if (index !== undefined) {
          this.drops.splice(index, 1);
        } else {
          const dropIndex = this.drops.findIndex(d => d === drop);
          if (dropIndex !== -1) {
            this.drops.splice(dropIndex, 1);
          }
        }
      }, 500);
    }
    
    /**
     * Affiche une notification d'item collecté
     */
    showItemPopup(drop) {
      // Créer l'élément de popup
      const popup = document.createElement('div');
      popup.className = 'minecraft-item-popup';
      
      // Créer l'icône
      const iconElement = document.createElement('div');
      iconElement.className = 'minecraft-item-popup-icon';
      
      if (drop.itemType === 'experience_orb') {
        iconElement.classList.add('xp_orb');
      } else {
        const itemSprite = this.itemTypes[drop.itemType].sprite;
        iconElement.classList.add(itemSprite);
      }
      
      // Créer le texte
      const textElement = document.createElement('div');
      textElement.className = 'minecraft-item-popup-text';
      
      const nameElement = document.createElement('div');
      nameElement.className = 'minecraft-item-popup-name';
      
      const countElement = document.createElement('div');
      countElement.className = 'minecraft-item-popup-count';
      
      // Définir le contenu
      if (drop.itemType === 'experience_orb') {
        nameElement.textContent = 'Orbe d\'expérience';
        countElement.textContent = `+${drop.count} XP`;
      } else {
        const itemData = this.itemTypes[drop.itemType];
        nameElement.textContent = itemData ? itemData.name : drop.itemType;
        countElement.textContent = `x${drop.count}`;
      }
      
      // Assembler les éléments
      textElement.appendChild(nameElement);
      textElement.appendChild(countElement);
      
      popup.appendChild(iconElement);
      popup.appendChild(textElement);
      
      // Ajouter au DOM
      document.body.appendChild(popup);
      
      // Supprimer après l'animation
      setTimeout(() => {
        popup.remove();
      }, 3000);
    }
    
    /**
     * Nettoie les drops trop anciens
     */
    cleanupOldDrops() {
      const now = Date.now();
      const timeout = 30000; // 30 secondes
      
      for (let i = this.drops.length - 1; i >= 0; i--) {
        const drop = this.drops[i];
        
        if (now - drop.createdAt > timeout) {
          // Supprimer l'élément
          if (drop.element.parentNode) {
            drop.element.parentNode.removeChild(drop.element);
          }
          
          // Supprimer de la liste
          this.drops.splice(i, 1);
        }
      }
    }
    
    /**
     * Crée un drop d'item manuellement
     */
    createCustomDrop(itemType, count, x, y) {
      // Vérifier si l'item existe
      if (!this.itemTypes[itemType] && itemType !== 'experience_orb') {
        console.warn(`Type d'item inconnu: ${itemType}`);
        return;
      }
      
      // Créer le drop
      const position = { x, y };
      return this.createItemDrop(itemType, position, count);
    }
  }
  
  // Initialiser le système de drops
  document.addEventListener('DOMContentLoaded', function() {
    // Attendre un peu avant d'initialiser
    setTimeout(() => {
      window.minecraftDrops = new MinecraftDrops();
    }, 3000);
  });