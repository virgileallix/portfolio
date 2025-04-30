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