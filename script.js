document.addEventListener('DOMContentLoaded', function() {
    const playerMiniImages = document.querySelectorAll('.img-player-mini');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupContainer = document.querySelector('.popup-container');
    const closeButton = document.querySelector('.close-popup');
    const allPlayerLines = document.querySelectorAll('.player-line');
    
    // Variable pour stocker la player-line actuellement active
    let currentPlayerLine = null;
    
    // Fonction pour ouvrir le popup avec un joueur spécifique
    function openPopup(playerNumber) {
        // Cacher toutes les player-lines
        allPlayerLines.forEach(line => {
            line.style.display = 'none';
            line.classList.remove('is-revealed', 'is-animated');
            const stats = line.querySelector('.statistiques');
            const lien = line.querySelector('.lien-joueur');
            if (stats) stats.classList.remove('is-animated');
            if (lien) lien.classList.remove('is-revealed', 'is-animated');
        });
        
        // Trouver et afficher la player-line correspondante
        // On utilise l'attribut data-player-id ou on compte
        let selectedLine = allPlayerLines[playerNumber - 1];
        
        if (selectedLine) {
            currentPlayerLine = selectedLine;
            selectedLine.style.display = 'flex';
            
            // Activer l'overlay et le popup
            popupOverlay.classList.add('active');
            popupContainer.classList.add('active');
            
            // Bloquer le scroll de la page
            document.body.style.overflow = 'hidden';
            
            // Récupérer les éléments de cette player-line
            const statsContainer = selectedLine.querySelector('.statistiques');
            const lienJoueur = selectedLine.querySelector('.lien-joueur');
            
            // Lancer l'animation après un court délai
            setTimeout(() => {
                selectedLine.classList.add('is-revealed');
                if (lienJoueur) {
                    lienJoueur.classList.add('is-revealed');
                }
                if (statsContainer) {
                    statsContainer.classList.add('is-animated');
                }
                if (lienJoueur) {
                    lienJoueur.classList.add('is-animated');
                }
            }, 100);
        }
    }
    
    // Fonction pour fermer le popup
    function closePopup() {
        if (currentPlayerLine) {
            // Retirer les classes d'animation
            currentPlayerLine.classList.remove('is-revealed');
            const stats = currentPlayerLine.querySelector('.statistiques');
            const lien = currentPlayerLine.querySelector('.lien-joueur');
            if (stats) stats.classList.remove('is-animated');
            if (lien) lien.classList.remove('is-revealed', 'is-animated');
            
            // Cacher la player-line
            currentPlayerLine.style.display = 'none';
        }
        
        // Désactiver l'overlay et le popup
        popupOverlay.classList.remove('active');
        popupContainer.classList.remove('active');
        
        // Réactiver le scroll
        document.body.style.overflow = '';
        
        currentPlayerLine = null;
    }
    
    // Ajouter événement de clic sur chaque image miniature
    playerMiniImages.forEach((miniImage) => {
        miniImage.addEventListener('click', function() {
            const playerNumber = this.getAttribute('data-player');
            console.log('Joueur cliqué : ' + playerNumber);
            openPopup(parseInt(playerNumber));
        });
    });
    
    // Fermer le popup avec le bouton X
    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }
    
    // Fermer le popup en cliquant sur l'overlay
    if (popupOverlay) {
        popupOverlay.addEventListener('click', closePopup);
    }
    
    // Fermer le popup avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
            closePopup();
        }
    });

    // ========================================
    // ANIMATION AU SCROLL - OUR STORY + OUR RULES
    // ========================================
    
    const ourStoryParagraphs = document.querySelectorAll('.our-story p');
    
    if (ourStoryParagraphs.length > 0) {
        // Créer l'Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // L'élément est visible, ajouter la classe d'animation
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2 // Se déclenche quand 20% de l'élément est visible
        });
        
        // Observer TOUS les paragraphes des sections our-story
        ourStoryParagraphs.forEach(paragraph => {
            observer.observe(paragraph);
        });
    }
});


// APPARITION BARRE NAVIGATION...........................................//
//.......................................................................//

document.addEventListener('DOMContentLoaded', function() {
    const navBar = document.querySelector('.barre-nav');
    
    // Attendre 2 secondes (2000ms) avant de faire apparaître la barre
    setTimeout(() => {
        navBar.classList.add('visible');
    }, 2000);
});
