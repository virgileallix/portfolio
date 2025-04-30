/**
 * Minecraft Mobs System
 * Ajoute des mobs Minecraft qui se déplacent sur le site web
 */

class MinecraftMobs {
    constructor() {
      this.mobs = [];
      this.mobTypes = {
        creeper: {
          name: 'Creeper',
          sprite: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0yNlQyMTozOTozMSswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDMtMjZUMjE6NDA6MTErMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMyNDBkZjc0LWNhZjMtNDI0MS1hYmE2LWFkOTI3ZjNlZTc3MyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzI0MGRmNzQtY2FmMy00MjQxLWFiYTYtYWQ5MjdmM2VlNzczIiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI2VDIxOjM5OjMxKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgEk4MkAAADjSURBVDiN1ZQxDoJAEEXfbremJFSmouEKVsZTeAMOYW1lrAyVpbUltRUeksLCYsDVxNjM8O/M/J+ZbBDN80xumRFYJAEe/oaL0Js9SQPsJQE+SjUd67pO3l+PxoLW2plQkgA4HA+qdWtJggAbgEySAIyxZaLmHmBgFTfGmHJpvQ7wNEluDVUlSc6hSiUBdv7qLw5VT4LZGDMopeSNhmoDSgGuKRg1EVVIqL4xVUtUrYpqlvAS1apVVMlFdE5RZcMw+DOfhpGGYVhNlJLkEqHKJL0kuRg9HlCXlpGrYXQBFdI5T89HcYoAAAAASUVORK5CYII=',
          width: 32,
          height: 32,
          speed: 0.5,
          behavior: 'hostile',
          sounds: {
            ambient: 'creeper',
            attack: 'explosion',
            death: 'explosion'
          },
          health: 20,
          attackDamage: 49,
          explosionRadius: 3
        },
        zombie: {
          name: 'Zombie',
          sprite: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQABIwxn7uQQAAAvVJREFUWMPt11+IVXUUBvDPvXdGZ/JON0ynxh5qMClkbErUCfyDL0VQgQ+lkNRDPQhhUkRB9RAR9BAREZEhSA+ig/ZgzXMPPSRGgVFERGT4kFikQUSZgzc1szHm2H6/c88Zg+1xKFzYkNzDPef8zu/7/db3W2uds7k3/25DtHEV1uMhXVofjsRx3I/1K/Q7MYGTxdMW/Vq7MYZd2ITxTmJvw3fJDg+nwlbixEL5Jy7dj2J99r0LBzFfizUCmTxyfSXNXO9Tj2V2A79irlZ0hLgjkQfZfyTNAZ/gMN6uYuN67Mn0sUwvpBP/FfCsR7G4bCcQ+dAk4gm34CBGoKoXlPYdQfdyD9SxC6/g8SAcxWXMT7HhIMH9uKFmJXgJDy4F8Hu0fpJqrJTICWsK0lUF8mpTCZk+hPeC51nUi+2lyfXiBdzWTkC5jZ7F+sSvYFuSZvJR9AT5o7gUZI/Hs3fEF8Yrgo7h3iAhAGfDQqPK5GJQvpwt9mbBuWz4Vk2Yyfa57N9aHMq+b1YRt7qA4Sh+RbOIk8TH1N8r9mGkCucJfD1PRBeCh2K/uI/Y/x/TwKvNfGFWKBUl6OQIcUuNiEFM1Iv5QFsbiALXcCbiiwQ2Bf4f4ItgG2f9RVvyaHgS69i+PmYHiXGgkD90FXiDLZlvCZJDWB0C6qVCB+Yy+JUo17r/8Lts1cKMPCcfxqE4yvbgWX3+3dXK+gv81ueHy75FO8UuGTvyTUwsUuKJnVxNmPEgWNGU/6+mLdvw1F1chqNB/v1Gvo+xSuvOqvLRuSdFnIqnX8XDC+VBgGdx5zVcQ5vAWnfjtRh/JXs2Yn/sD30D87TUXFjBm7GwNH6kGp+OM8WzXAzfT/w73s7e48tOw/n3Yr54jhAM9GE0yniUUmJuaYQ2RHdR6qdiLUt7AbVg/xXvJz/QupILrLBh/nt7X7NVn1fDj2JyAAAAAElFTkSuQmCC',
          width: 32,
          height: 32,
          speed: 0.4,
          behavior: 'hostile',
          sounds: {
            ambient: 'zombie',
            attack: 'click',
            death: 'dig'
          },
          health: 20,
          attackDamage: 3
        },
        skeleton: {
          name: 'Skeleton',
          sprite: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAk0UIopJAAAAs5JREFUWMPFlz9oE2EYxn/v3eUSm2ua1CY1SS1WpRUVtENFcKiCi4Pg5OToIM4OdnTVwUEcFMFRcOygIILgIJQODgWH/rEgtKUk2iQ2Tfpn7u547xKNHGhLL9DnCy7f8cF7z/O+z/u898l0+XkEJFIwuwCrG/BZQiQFk8uwuQU7JYhK8PoFPi9YFngdcJoh4wJ9XTr4Ea0TixdgbQNCLsjlYTMHyZzunM0C3U6osJM2E2TL6uvvC8DKBjgEKFIwb/DGbwGTAfQSmEABVsF5IQcbWch0mDQXyGg2a38g3aE+EXmIZGC9BA6ga6C72TjdNpPw5jsMdsGjEah31e7C/XcKQXaK7eeAywY+J0Q3tAmOJBxsrh0qJuH4EJzoU6i2YHoF7k3Dh4UaOygXxOpM/g3vTYUq3g8OtNfmh98GT6cgFlNInO6HJc/BgYIuJvXfApBOQUfArg3I6OJV+PJLh5+OwMEGjbCiRhQtXWxmLXg8Dd2BPYBZKKrFZdiqM92OEpgp61TZtfB2UYVFOuHzDzAa1fnfH2qxtQwYgPk05NNgOiCTJG9xwPdFWN3G/RO0BeB0vzZ8+0On+9FbGO1WodRUxwEYGVRwHdugUwGcNxF4Ng+TQyTu3sR1bQInumDiqB5wZ1KFt/rVhV/roErw8RvEUvD2i/ru/OXrPHj+gscvn3Lr8jVODQ7DhTOwlKBcDKwrGI9qR99+6rRnJAzXL3B48ACfZhYpxBd4NDWLc3QI/8Uzbcuo6oCUEIrA0qr2YXgIrAYYP1Yhe38J8vkiw8OjiKFB6g0GDZNRnfSiNrywAhWa1g+pAgAoZbdx+33UDR+nXHSx3bDQPQKRAGhH/Y+QECQSCTC8/0Z9/QuOZLPxpzsdpSJFKU+pWSFVTKn1llaK6TSlYoGenh4CgQDb+fIeSrLhIv8Bjy4bfrRNSlEAAAAASUVORK5CYII=',
          width: 32,
          height: 32,
          speed: 0.45,
          behavior: 'hostile',
          sounds: {
            ambient: 'click',
            attack: 'place',
            death: 'dig'
          },
          health: 20,
          attackDamage: 2,
          ranged: true
        },
        chicken: {
          name: 'Chicken',
          sprite: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAULfiQQeQAAAqVJREFUWMPtlztoU1EYx39nmpDcm5ukSW+T26S5sUnTNJUQS6KlCOKgg1MddXJycHLSwdFJBwUHQRBBcHJwKejgIBQVpA46iA8q+ECp2sb2Jrm5fe/roUN603CNxKRu/pfDOd/5nf937uGcA6tcSyVm1EM3LoG6F4K9Z2CoH7YnYScOTwRQfJ6Dp/ugnwDOAQ5ABT4Db4AvQA1wA1vw+y1UhPvEXwNn7kDdCYQQHA8EOBE45HS6+srlHdLpNEu/v2O3ZxgdCDIeH0Zrw6dfm0ysBSivQbUMu+Xla28Xdw8E97m9vQMoisJGJsPC/DwL79+xuVUguQQGHVXTtE9QXBOp1Kj9OXDYd9i7Njg4qDkcDlRVJRaLcWhwENd2kGJRJ5c3iEYijN+/x+2JafJ5XWEW2CDNZ9MzQ2NjYy6v14uu6xiGgWmalMtlLly8RDgcpmdHZHYwWKFUEvqUZClIsi+pqvvmjh2K3++nUqlQLBbZ2tpC13VGRkYIBALMz82h9Ci0LFjLQPg4TZJ9Slkf6+/vVw3DoFKpUCgUKJVKuFwuPB4PWB0ymQym0ZA6gKcX2gC82lpGluUyUKvVagBGsXi0cD3f19fXrtfrOByOVlhVrFY2W1oCSNIKrAPdAKt4HVlWiqZZN0ulkixJUmVlZaVSq9WQZblzDQRDUC5ANgMECYdDYp/P98Tr9dqtVuuC1WrlwcMn1y5fuXrT7XbL7QvRJcDvBwfwzIXLKfF67ePzTqf8dHZWTs3OzWqaNuJyuRKapp0Mh8NKOzUExzaQzU5x6y5TwDZwFzgL2I6UWQnIAhlgBbAgDT6C8QQMPIaeBzB0HfrisPEO1E+0wF0FqgxkrO0eaQfsCUJKEz4Dz38k0PMBP8+W/5m+AMZbYbvnMcrvAAAAAElFTkSuQmCC',
          width: 32,
          height: 32,
          speed: 0.3,
          behavior: 'passive',
          sounds: {
            ambient: 'click',
            hurt: 'click',
            death: 'click'
          },
          health: 4,
          drops: ['egg']
        },
        pig: {
          name: 'Pig',
          sprite: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAQzAYyS7QAAAnhJREFUWMPtl09IVFEUxn/n3ffeezOj46ijKeJkJBhK/sGUNkFQi6BFLQqkRS2iRS0KahO0ahEtEoJAF1FQQkLQIoI2UkHUIsScGZxhHGf0zfx77/YW5YyMb8xJaVV9cDnce77Ld879ce4Dja3FJuKZW+DLwNQYTIyAF4dAHNZVQmsrtHfAsVbYEYKzXdAmOtlJBYDHDtgD9ItYn33gCEAlN4VPnyD1HYKbIBqDiJXn/dTfz2R7LGZt37MnoLl8BLPH2ByA3e5eGMk0+rMG9DfQGAZwG21jLeCpIjn8jqG+twy8eUM5n6dYLCIlXXg7+bV4dfH9wuOYrQWSV2n7eAlPtBfX9YjHEzQ3t+CVSiwuZDDmJeYXFgmFuugIx+mOAG2gDvYqVOKCCUMgeRLbcrDtIK7rE7LbsK2t2L6PUXY5NQb5eUARALTfUAQEgrB1F4T3Q+IItgkS2AfRQxA5CJGDJsK3qIWglGgYgGsQq/HuX7fMpkRQj6G+dN/uKHgVwJhUTK83IAIzI1UzqKTXwJeRsb+bMDqY5N4tGhtA9Z4RQGWl+uRaEcibkrwsALc6oEfzAHMgZlFTY7O5CQtT4PZWX0N8gCJH8R0svQlCuRFoL0rO6eFpqJh62SzQC0+fQSVUr+7OQnSK4kkB8AfqK8aRmZyqXzF9jUC9BGD5VayBu0Ia9VuhMAhOdcLNXnCG4GU/RBIQOGtM9uqFMclvQwxjTHJ+BF70QeYJLIzCj1EIbq0pxQBQOQ5WGEL3oecGaM+YZ1/V2jWKYbPf8gW4eR4GgE3AV2CR37MKrKfA+ANpYLn+4P/RD8wRLmbqoabMAAAAAElFTkSuQmCC',
          width: 32,
          height: 32,
          speed: 0.25,
          behavior: 'passive',
          sounds: {
            ambient: 'click',
            hurt: 'click',
            death: 'click'
          },
          health: 10,
          drops: ['porkchop']
        },
        villager: {
          name: 'Villager',
          sprite: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QMQAAMdLcLTzwAAAnNJREFUWMPtlstruFEUxX/HwyOSFBmUeUMohZRQHkgJZeRa7kMZmRjJRBnFRCYUxUQx80CKB48erV68eJGUSIokJb1d6/U9jjE+fpnJzP+sB/fss9dZ++x9zj7w3b7bnxpjtWHNJQgEwJZwgI6Q8F8oA30nMNANA91wOQbRMLjtYA1DVzf09EJvGLq7YLAHRoc1YH8nWE3wm4TdBuUFUBKQ0EKrA+xWqP0NhZdQWYTSfOVYwGG3O+xd7e0BT0/oq3OvfpTD+fMNHj9CeRmK8qCppALOzkLjzQewtbmdxelZWu/vWVpYwu12M+b1MjczQzQS4e76mquzM05OTiCZpCwWJSSPmU6DmcxrQnZN3ZgVlM/nY35xEV8wSHNrK6lUiqvLS+7v7ng4P+cgFqPS6USW5TeBKaAasDWg0mBwNDbjGxkhFAoxNjGBLxCgob6e+tpaGpqaCDQ1EfD7Cfj9NDU2fqiFaqC4HOrtJqrr6ggGgwwMDhIKh/H7fK9gf2Agz2vr6vJCVzCId2gIT1vnx3wQiUD/sM95yE9g8JeZmJnMX8DBdjH/B0wmk7S0txMIBN4FF2dn82B7nZ338T2f+KAyB+AYHOXo5IQneVQPDw9cX18Ti8U4OTzkLB7nLB7n9OSEw/19tjY32dnepq+vD02OJECovEiFaZXNzcL21jSMqFnT/4KDXThdLvb29vINDYVCHBwcUFNby8rKimgKQYWmoKjwhKdnJbPeNjIGuTlQUgRWCzjsUFYMrhKoqYL2JnC74LER9lOQTCOVRMHpJCQSbxrWnVnvp0LG83Z1vf7FpGldTxk+BZFIkUgkM57K7/Zhew2E/sbm8wRUiQAAAABJRU5ErkJggg==',
          width: 32,
          height: 32,
          speed: 0.2,
          behavior: 'friendly',
          sounds: {
            ambient: 'click',
            trade: 'click',
            hurt: 'click',
            death: 'click'
          },
          health: 20,
          trades: true
        }
      };
      
      this.spawnThreshold = 0.005; // Probabilité de spawn par tick
      this.maxMobs = 5; // Nombre maximum de mobs à l'écran
      this.isPaused = false;
      this.isDisabled = false;
      
      this.setupStyles();
      this.startSpawning();
      
      // Initialiser les contrôles
      this.addMobControls();
    }
    
    /**
     * Configure les styles CSS pour les mobs
     */
    setupStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .minecraft-mob {
          position: fixed;
          pointer-events: auto;
          z-index: 900;
          cursor: pointer;
          image-rendering: pixelated;
          transition: transform 0.2s;
          transform-origin: center;
          user-select: none;
        }
        
        .minecraft-mob:hover {
          transform: scale(1.1);
        }
        
        .minecraft-mob-health {
          position: absolute;
          top: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #555;
          border-radius: 1px;
          overflow: hidden;
        }
        
        .minecraft-mob-health-bar {
          height: 100%;
          background-color: #55cc55;
          transition: width 0.3s;
        }
        
        .minecraft-mob-damage {
          position: absolute;
          color: #ff5555;
          font-weight: bold;
          font-family: 'Minecraft', sans-serif;
          animation: mob-damage 1s forwards;
          z-index: 901;
          pointer-events: none;
        }
        
        @keyframes mob-damage {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        
        .minecraft-mob-controls {
          position: fixed;
          bottom: 75px;
          left: 20px;
          background: rgba(30, 33, 40, 0.7);
          border: 2px solid #3C8527;
          border-radius: 5px;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          z-index: 900;
          backdrop-filter: blur(5px);
          font-family: 'Minecraft', sans-serif;
          opacity: 0;
          transform: translateX(-10px);
          transition: opacity 0.3s, transform 0.3s;
        }
        
        .minecraft-mob-controls.show {
          opacity: 1;
          transform: translateX(0);
        }
        
        .mob-controls-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 5px;
        }
        
        .mob-controls-title {
          color: #FFFFFF;
          font-size: 14px;
          margin: 0;
        }
        
        .mob-controls-toggle {
          background: none;
          border: none;
          color: white;
          font-size: 14px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
          padding: 0;
        }
        
        .mob-controls-toggle:hover {
          opacity: 1;
        }
        
        .mob-controls-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        
        .mob-spawn-button {
          background-color: rgba(82, 165, 53, 0.7);
          border: 1px solid #3C8527;
          border-radius: 3px;
          padding: 4px 8px;
          color: white;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Minecraft', sans-serif;
        }
        
        .mob-spawn-button:hover {
          background-color: rgba(82, 165, 53, 0.9);
          transform: translateY(-2px);
        }
        
        .mob-spawn-button.hostile {
          background-color: rgba(204, 61, 61, 0.7);
          border: 1px solid #992222;
        }
        
        .mob-spawn-button.hostile:hover {
          background-color: rgba(204, 61, 61, 0.9);
        }
        
        .mob-spawn-button.friendly {
          background-color: rgba(61, 61, 204, 0.7);
          border: 1px solid #222299;
        }
        
        .mob-spawn-button.friendly:hover {
          background-color: rgba(61, 61, 204, 0.9);
        }
        
        .mob-controls-settings {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        
        .mob-settings-item {
          display: flex;
          align-items: center;
          gap: 5px;
          color: white;
          font-size: 12px;
        }
        
        .mob-settings-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 14px;
          opacity: 0.7;
          transition: opacity 0.2s;
          padding: 0;
        }
        
        .mob-settings-button:hover {
          opacity: 1;
        }
        
        .mob-count {
          color: #AAAAAA;
          font-size: 10px;
        }
      `;
      document.head.appendChild(style);
    }
    
    /**
     * Démarre le système de spawn des mobs
     */
    startSpawning() {
      // Définit un intervalle pour évaluer s'il faut faire apparaître un mob
      this.spawnInterval = setInterval(() => {
        if (this.isPaused || this.isDisabled) return;
        
        // Vérifie si on peut faire apparaître un mob (nombre max et probabilité)
        if (this.mobs.length < this.maxMobs && Math.random() < this.spawnThreshold) {
          this.spawnRandomMob();
        }
        
        // Déplace les mobs existants
        this.moveMobs();
      }, 200);
    }
    
    /**
     * Fait apparaître un mob aléatoire
     */
    spawnRandomMob() {
      const mobTypes = Object.keys(this.mobTypes);
      const randomType = mobTypes[Math.floor(Math.random() * mobTypes.length)];
      
      // Position aléatoire autour de l'écran (depuis les bords)
      const position = this.getRandomSpawnPosition();
      
      this.spawnMob(randomType, position.x, position.y);
    }
    
    /**
     * Fait apparaître un mob spécifique à une position définie ou aléatoire
     */
    spawnMob(type, x = null, y = null) {
      if (!this.mobTypes[type]) {
        console.warn(`Type de mob "${type}" non reconnu.`);
        return;
      }
      
      // Si aucune position n'est spécifiée, en choisir une aléatoire
      if (x === null || y === null) {
        const position = this.getRandomSpawnPosition();
        x = position.x;
        y = position.y;
      }
      
      const mobType = this.mobTypes[type];
      
      // Créer l'élément HTML pour le mob
      const mobElement = document.createElement('div');
      mobElement.className = 'minecraft-mob';
      mobElement.style.width = `${mobType.width}px`;
      mobElement.style.height = `${mobType.height}px`;
      mobElement.style.backgroundImage = `url('${mobType.sprite}')`;
      mobElement.style.backgroundSize = 'contain';
      mobElement.style.left = `${x}px`;
      mobElement.style.top = `${y}px`;
      
      // Créer une barre de santé
      const healthBar = document.createElement('div');
      healthBar.className = 'minecraft-mob-health';
      
      const healthFill = document.createElement('div');
      healthFill.className = 'minecraft-mob-health-bar';
      healthFill.style.width = '100%';
      
      healthBar.appendChild(healthFill);
      mobElement.appendChild(healthBar);
      
      // Ajouter l'élément au DOM
      document.body.appendChild(mobElement);
      
      // Créer un objet représentant le mob
      const mob = {
        id: Date.now() + Math.random().toString(36).substr(2, 5),
        type,
        health: mobType.health,
        maxHealth: mobType.health,
        element: mobElement,
        healthBar: healthFill,
        position: { x, y },
        direction: { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 },
        movementTimer: 0,
        lastDirectionChange: Date.now()
      };
      
      // Ajouter des gestionnaires d'événements
      mobElement.addEventListener('click', () => this.onMobClick(mob));
      
      // Ajouter le mob à la liste
      this.mobs.push(mob);
      
      // Jouer un son d'apparition
      if (typeof window.playSound === 'function') {
        window.playSound('click');
      }
      
      // Mettre à jour l'affichage du compteur
      this.updateMobCount();
      
      return mob;
    }
    
    /**
     * Gère un clic sur un mob (attaque)
     */
    onMobClick(mob) {
      // Infliger des dégâts au mob
      const damage = 5; // Dégâts du joueur
      this.damageMob(mob, damage);
      
      // Si c'est un mob hostile, il peut contre-attaquer
      const mobType = this.mobTypes[mob.type];
      if (mobType.behavior === 'hostile' && Math.random() < 0.3) {
        // Déclencher un événement de dégâts
        window.dispatchEvent(new CustomEvent('minecraft-player-damage', {
          detail: { 
            damage: mobType.attackDamage,
            source: mob.type
          }
        }));
        
        // Jouer un son d'attaque
        if (typeof window.playSound === 'function' && mobType.sounds.attack) {
          window.playSound(mobType.sounds.attack);
        }
      }
    }
    
    /**
     * Inflige des dégâts à un mob
     */
    damageMob(mob, damage) {
      // Réduire la santé
      mob.health = Math.max(0, mob.health - damage);
      
      // Mettre à jour la barre de santé
      mob.healthBar.style.width = `${(mob.health / mob.maxHealth) * 100}%`;
      
      // Afficher les dégâts infligés
      this.showDamageNumber(mob, damage);
      
      // Jouer un son de dégât
      const mobType = this.mobTypes[mob.type];
      if (typeof window.playSound === 'function' && mobType.sounds.hurt) {
        window.playSound(mobType.sounds.hurt);
      }
      
      // Si le mob n'a plus de santé, le faire disparaître
      if (mob.health <= 0) {
        this.killMob(mob);
      }
    }
    
    /**
     * Affiche un nombre de dégâts au-dessus d'un mob
     */
    showDamageNumber(mob, damage) {
      const damageElement = document.createElement('div');
      damageElement.className = 'minecraft-mob-damage';
      damageElement.textContent = `-${damage}`;
      
      // Positionner l'élément au-dessus du mob
      const mobRect = mob.element.getBoundingClientRect();
      damageElement.style.left = `${mobRect.left + mobRect.width / 2}px`;
      damageElement.style.top = `${mobRect.top}px`;
      
      // Ajouter au DOM
      document.body.appendChild(damageElement);
      
      // Supprimer après l'animation
      setTimeout(() => {
        damageElement.remove();
      }, 1000);
    }
    
    /**
     * Tue un mob et le fait disparaître
     */
    killMob(mob) {
      // Jouer un son de mort
      const mobType = this.mobTypes[mob.type];
      if (typeof window.playSound === 'function' && mobType.sounds.death) {
        window.playSound(mobType.sounds.death);
      }
      
      // Effectuer un drop (si applicable)
      if (mobType.drops && mobType.drops.length > 0) {
        // Déclencher un événement de drop
        window.dispatchEvent(new CustomEvent('minecraft-mob-drop', {
          detail: { 
            mobType: mob.type,
            dropItems: mobType.drops,
            position: { x: mob.position.x, y: mob.position.y }
          }
        }));
      }
      
      // Si c'est un creeper, créer une explosion
      if (mob.type === 'creeper') {
        this.createExplosion(mob.position.x, mob.position.y, mobType.explosionRadius);
      }
      
      // Supprimer l'élément du DOM
      mob.element.remove();
      
      // Supprimer le mob de la liste
      this.mobs = this.mobs.filter(m => m.id !== mob.id);
      
      // Mettre à jour l'affichage du compteur
      this.updateMobCount();
      
      // Déclencher un événement pour le système d'achievements
      window.dispatchEvent(new CustomEvent('minecraft-mob-killed', {
        detail: { 
          mobType: mob.type
        }
      }));
    }
    
    /**
     * Crée une explosion à une position donnée
     */
    createExplosion(x, y, radius) {
      // Créer l'élément pour l'explosion
      const explosion = document.createElement('div');
      explosion.style.position = 'fixed';
      explosion.style.left = `${x - (radius * 16)}px`;
      explosion.style.top = `${y - (radius * 16)}px`;
      explosion.style.width = `${radius * 32}px`;
      explosion.style.height = `${radius * 32}px`;
      explosion.style.borderRadius = '50%';
      explosion.style.backgroundColor = 'rgba(255, 200, 50, 0.5)';
      explosion.style.boxShadow = '0 0 20px rgba(255, 150, 0, 0.8)';
      explosion.style.zIndex = '901';
      explosion.style.pointerEvents = 'none';
      explosion.style.transition = 'all 0.3s';
      
      // Ajouter au DOM
      document.body.appendChild(explosion);
      
      // Animation de l'explosion
      setTimeout(() => {
        explosion.style.transform = 'scale(1.5)';
        explosion.style.opacity = '0';
      }, 50);
      
      // Supprimer après l'animation
      setTimeout(() => {
        explosion.remove();
      }, 350);
      
      // Vérifier les mobs à proximité pour les endommager
      const explosionDamage = 10;
      const explosionRange = radius * 32;
      
      this.mobs.forEach(otherMob => {
        if (otherMob.id !== mob.id) {
          const dx = otherMob.position.x - x;
          const dy = otherMob.position.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance <= explosionRange) {
            // Calculer les dégâts en fonction de la distance
            const damageMultiplier = 1 - (distance / explosionRange);
            const damage = Math.ceil(explosionDamage * damageMultiplier);
            
            if (damage > 0) {
              this.damageMob(otherMob, damage);
            }
          }
        }
      });
      
      // Vérifier si le joueur est à portée
      const playerX = window.innerWidth / 2;
      const playerY = window.innerHeight / 2;
      const playerDx = playerX - x;
      const playerDy = playerY - y;
      const playerDistance = Math.sqrt(playerDx * playerDx + playerDy * playerDy);
      
      if (playerDistance <= explosionRange) {
        const playerDamageMultiplier = 1 - (playerDistance / explosionRange);
        const playerDamage = Math.ceil(49 * playerDamageMultiplier); // Dégâts max du creeper
        
        // Déclencher un événement de dégâts
        window.dispatchEvent(new CustomEvent('minecraft-player-damage', {
          detail: { 
            damage: playerDamage,
            source: 'creeper_explosion'
          }
        }));
      }
    }
    
    /**
     * Déplace tous les mobs actifs
     */
    moveMobs() {
      const now = Date.now();
      
      this.mobs.forEach(mob => {
        const mobType = this.mobTypes[mob.type];
        
        // Changer occasionnellement de direction
        if (now - mob.lastDirectionChange > 3000 && Math.random() < 0.1) {
          mob.direction = { 
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
          };
          mob.lastDirectionChange = now;
        }
        
        // Calculer la nouvelle position
        const newX = mob.position.x + mob.direction.x * mobType.speed * 10;
        const newY = mob.position.y + mob.direction.y * mobType.speed * 10;
        
        // Vérifier les limites de l'écran
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let validPosition = true;
        
        // Si le mob sort de l'écran, inverser sa direction
        if (newX < 0 || newX > viewportWidth - mobType.width) {
          mob.direction.x *= -1;
          validPosition = false;
        }
        
        if (newY < 0 || newY > viewportHeight - mobType.height) {
          mob.direction.y *= -1;
          validPosition = false;
        }
        
        // Mettre à jour la position si valide
        if (validPosition) {
          mob.position.x = newX;
          mob.position.y = newY;
          mob.element.style.left = `${newX}px`;
          mob.element.style.top = `${newY}px`;
          
          // Inversement horizontal pour la direction
          if (mob.direction.x < 0) {
            mob.element.style.transform = 'scaleX(-1)';
          } else {
            mob.element.style.transform = 'scaleX(1)';
          }
        }
      });
    }
    
    /**
     * Calcule une position aléatoire pour faire apparaître un mob
     */
    getRandomSpawnPosition() {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Déterminer si le spawn se fait depuis un bord horizontal ou vertical
      const isHorizontal = Math.random() < 0.5;
      
      if (isHorizontal) {
        // Spawn depuis le bord gauche ou droit
        const isLeft = Math.random() < 0.5;
        return {
          x: isLeft ? -30 : viewportWidth + 10,
          y: Math.random() * (viewportHeight - 50)
        };
      } else {
        // Spawn depuis le bord haut ou bas
        const isTop = Math.random() < 0.5;
        return {
          x: Math.random() * (viewportWidth - 50),
          y: isTop ? -30 : viewportHeight + 10
        };
      }
    }
    
    /**
     * Ajoute des contrôles pour gérer les mobs
     */
    addMobControls() {
      const controls = document.createElement('div');
      controls.className = 'minecraft-mob-controls';
      
      // En-tête des contrôles
      const header = document.createElement('div');
      header.className = 'mob-controls-header';
      
      const title = document.createElement('h3');
      title.className = 'mob-controls-title';
      title.textContent = 'Mobs Minecraft';
      
      const toggle = document.createElement('button');
      toggle.className = 'mob-controls-toggle';
      toggle.innerHTML = '<i class="fas fa-times"></i>';
      toggle.title = 'Masquer';
      
      header.appendChild(title);
      header.appendChild(toggle);
      
      // Compteur de mobs
      const counter = document.createElement('div');
      counter.className = 'mob-count';
      counter.id = 'mob-count';
      counter.textContent = `Mobs: 0/${this.maxMobs}`;
      
      // Boutons pour spawn
      const buttons = document.createElement('div');
      buttons.className = 'mob-controls-buttons';
      
      // Créer les boutons pour chaque type de mob
      Object.entries(this.mobTypes).forEach(([type, data]) => {
        const button = document.createElement('button');
        button.className = `mob-spawn-button ${data.behavior}`;
        button.textContent = data.name;
        button.title = `Faire apparaître un ${data.name}`;
        
        button.addEventListener('click', () => {
          this.spawnMob(type);
          
          // Jouer un son
          if (typeof window.playSound === 'function') {
            window.playSound('click');
          }
        });
        
        buttons.appendChild(button);
      });
      
      // Configuration supplémentaire
      const settings = document.createElement('div');
      settings.className = 'mob-controls-settings';
      
      // Auto-spawn
      const autoSpawnSetting = document.createElement('div');
      autoSpawnSetting.className = 'mob-settings-item';
      
      const autoSpawnLabel = document.createElement('span');
      autoSpawnLabel.textContent = 'Auto-spawn:';
      
      const autoSpawnToggle = document.createElement('button');
      autoSpawnToggle.className = 'mob-settings-button';
      autoSpawnToggle.innerHTML = this.isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
      autoSpawnToggle.title = this.isPaused ? 'Activer' : 'Désactiver';
      
      autoSpawnSetting.appendChild(autoSpawnLabel);
      autoSpawnSetting.appendChild(autoSpawnToggle);
      
      // Effacer tous les mobs
      const clearButton = document.createElement('button');
      clearButton.className = 'mob-settings-button';
      clearButton.innerHTML = '<i class="fas fa-trash"></i>';
      clearButton.title = 'Effacer tous les mobs';
      
      settings.appendChild(autoSpawnSetting);
      settings.appendChild(clearButton);
      
      // Assembler tous les éléments
      controls.appendChild(header);
      controls.appendChild(counter);
      controls.appendChild(buttons);
      controls.appendChild(settings);
      
      // Ajouter au DOM
      document.body.appendChild(controls);
      
      // Afficher après un délai
      setTimeout(() => {
        controls.classList.add('show');
      }, 1500);
      
      // Gestionnaires d'événements
      toggle.addEventListener('click', () => {
        controls.classList.remove('show');
      });
      
      autoSpawnToggle.addEventListener('click', () => {
        this.isPaused = !this.isPaused;
        autoSpawnToggle.innerHTML = this.isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
        autoSpawnToggle.title = this.isPaused ? 'Activer' : 'Désactiver';
        
        // Jouer un son
        if (typeof window.playSound === 'function') {
          window.playSound('click');
        }
      });
      
      clearButton.addEventListener('click', () => {
        this.clearAllMobs();
        
        // Jouer un son
        if (typeof window.playSound === 'function') {
          window.playSound('click');
        }
      });
    }
    
    /**
     * Met à jour l'affichage du compteur de mobs
     */
    updateMobCount() {
      const counter = document.getElementById('mob-count');
      if (counter) {
        counter.textContent = `Mobs: ${this.mobs.length}/${this.maxMobs}`;
      }
    }
    
    /**
     * Supprime tous les mobs actuellement visibles
     */
    clearAllMobs() {
      // Faire une copie de la liste des mobs pour éviter les problèmes de suppression pendant l'itération
      const mobsToRemove = [...this.mobs];
      
      mobsToRemove.forEach(mob => {
        mob.element.remove();
      });
      
      this.mobs = [];
      this.updateMobCount();
    }
    
    /**
     * Active ou désactive complètement le système de mobs
     */
    toggleMobSystem(enabled) {
      this.isDisabled = !enabled;
      
      if (this.isDisabled) {
        this.clearAllMobs();
      }
    }
  }
  
  // Initialiser le système de mobs
  document.addEventListener('DOMContentLoaded', function() {
    // Attendre un peu avant d'initialiser pour ne pas interférer avec le chargement initial
    setTimeout(() => {
      window.minecraftMobs = new MinecraftMobs();
    }, 3000);
  });