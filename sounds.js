// Fichier de gestion des sons pour les easter eggs Minecraft

// Bibliothèque de sons
const SOUNDS = {
    // Sons d'interface
    click: {
      src: 'https://raw.githubusercontent.com/MCResourcePile/MCResourcePile.github.io/master/assets/minecraft/sounds/random/click.ogg',
      volume: 0.5
    },
    achievement: {
      src: 'https://raw.githubusercontent.com/MCResourcePile/MCResourcePile.github.io/master/assets/minecraft/sounds/random/levelup.ogg',
      volume: 0.5
    },
    pop: {
      src: 'https://raw.githubusercontent.com/MCResourcePile/MCResourcePile.github.io/master/assets/minecraft/sounds/random/pop.ogg',
      volume: 0.4
    },
    
    // Sons d'entités
    creeper: {
      src: 'https://raw.githubusercontent.com/MCResourcePile/MCResourcePile.github.io/master/assets/minecraft/sounds/random/fuse.ogg',
      volume: 0.4
    },
    explosion: {
      src: 'https://raw.githubusercontent.com/MCResourcePile/MCResourcePile.github.io/master/assets/minecraft/sounds/random/explode.ogg',
      volume: 0.3
    },
    
    // Sons d'ambiance
    portal: {
      src: 'https://raw.githubusercontent.com/MCResourcePile/MCResourcePile.github.io/master/assets/minecraft/sounds/portal/portal.ogg',
      volume: 0.3
    },
    thunder: {
      src: 'https://raw.githubusercontent.com/MCResourcePile/MCResourcePile.github.io/master/assets/minecraft/sounds/ambient/weather/thunder1.ogg',
      volume: 0.3
    }
  };
  
  // Cache des sons pour éviter de recharger les sons à chaque utilisation
  const audioCache = {};
  
// Version simplifiée sans dépendances externes
function playSound(type) {
  console.log(`Son joué: ${type}`);
  // Version silencieuse mais fonctionnelle qui ne génère pas d'erreurs
}

window.playSound = playSound;
  
  // Fonction pour jouer une musique ambiante (avec fondu)
  function playAmbientMusic(type, duration = -1, fadeIn = 1000, fadeOut = 1000) {
    if (!SOUNDS[type]) {
      console.error(`Son de type "${type}" non trouvé.`);
      return;
    }
    
    // Créer un nouvel élément audio pour les musiques ambiantes
    const audio = new Audio(SOUNDS[type].src);
    audio.volume = 0;
    audio.loop = duration === -1;
    
    // Fondu d'entrée
    audio.play().then(() => {
      // Augmenter progressivement le volume
      const fadeInStep = SOUNDS[type].volume / (fadeIn / 50);
      let currentVolume = 0;
      
      const fadeInInterval = setInterval(() => {
        currentVolume += fadeInStep;
        if (currentVolume >= SOUNDS[type].volume) {
          currentVolume = SOUNDS[type].volume;
          clearInterval(fadeInInterval);
        }
        audio.volume = currentVolume;
      }, 50);
      
      // Si une durée est spécifiée, arrêter la musique après la durée
      if (duration > 0) {
        setTimeout(() => {
          // Fondu de sortie
          const fadeOutStep = audio.volume / (fadeOut / 50);
          const fadeOutInterval = setInterval(() => {
            currentVolume -= fadeOutStep;
            if (currentVolume <= 0) {
              currentVolume = 0;
              clearInterval(fadeOutInterval);
              audio.pause();
            }
            audio.volume = currentVolume;
          }, 50);
        }, duration - fadeOut);
      }
    }).catch(error => {
      console.error(`Erreur lors de la lecture de la musique ambiante "${type}":`, error);
    });
    
    // Retourner l'élément audio pour permettre de l'arrêter plus tard
    return audio;
  }
  
  // Fonction pour arrêter une musique ambiante avec fondu
  function stopAmbientMusic(audio, fadeOut = 1000) {
    if (!audio) return;
    
    const initialVolume = audio.volume;
    const fadeOutStep = initialVolume / (fadeOut / 50);
    let currentVolume = initialVolume;
    
    const fadeOutInterval = setInterval(() => {
      currentVolume -= fadeOutStep;
      if (currentVolume <= 0) {
        currentVolume = 0;
        clearInterval(fadeOutInterval);
        audio.pause();
      }
      audio.volume = currentVolume;
    }, 50);
  }
  
  // Précharger les sons fréquemment utilisés
  function preloadSounds() {
    const commonSounds = ['click', 'achievement', 'pop'];
    commonSounds.forEach(type => {
      if (SOUNDS[type]) {
        audioCache[type] = new Audio(SOUNDS[type].src);
        audioCache[type].volume = SOUNDS[type].volume;
        // Charger le son sans le jouer
        audioCache[type].load();
      }
    });
  }
  
  // Initialiser le système de sons
  document.addEventListener('DOMContentLoaded', function() {
    preloadSounds();
  });
  
  // Exporter les fonctions pour les utiliser dans d'autres fichiers
  window.playSound = playSound;
  window.playAmbientMusic = playAmbientMusic;
  window.stopAmbientMusic = stopAmbientMusic;