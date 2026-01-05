document.addEventListener('DOMContentLoaded', function() {
    const playerMiniImages = document.querySelectorAll('.img-player-mini', 'img-player-mini-2');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupContainer = document.querySelector('.popup-container');
    const closeButton = document.querySelector('.close-popup');
    const playerLine = document.querySelector('.player-line');
    const statsContainer = playerLine.querySelector('.statistiques');
    const lienJoueur = playerLine.querySelector('.lien-joueur');
    
    // Fonction pour ouvrir le popup
    function openPopup() {
        // Activer l'overlay et le popup
        popupOverlay.classList.add('active');
        popupContainer.classList.add('active');
        
        // Bloquer le scroll de la page
        document.body.style.overflow = 'hidden';
        
        // Lancer l'animation après un court délai pour que le popup soit visible
        setTimeout(() => {
            playerLine.classList.add('is-revealed');
            lienJoueur.classList.add('is-revealed');
            statsContainer.classList.add('is-animated');
            lienJoueur.classList.add('is-animated');
        }, 100);
    }
    
    // Fonction pour fermer le popup
    function closePopup() {
        // Retirer les classes d'animation
        playerLine.classList.remove('is-revealed');
        lienJoueur.classList.remove('is-revealed');
        statsContainer.classList.remove('is-animated');
        lienJoueur.classList.remove('is-animated');
        
        // Désactiver l'overlay et le popup
        popupOverlay.classList.remove('active');
        popupContainer.classList.remove('active');
        
        // Réactiver le scroll
        document.body.style.overflow = '';
    }
    
    // Ajouter événement de clic sur chaque image miniature
    playerMiniImages.forEach((miniImage) => {
        miniImage.addEventListener('click', function() {
            const playerNumber = this.getAttribute('data-player');
            console.log('Joueur cliqué : ' + playerNumber);
            
            // Ici vous pouvez charger les données du joueur spécifique
            // Pour l'instant, on ouvre le popup avec les données par défaut
            openPopup();
        });
    });
    
    // Fermer le popup avec le bouton X
    closeButton.addEventListener('click', closePopup);
    
    // Fermer le popup en cliquant sur l'overlay
    popupOverlay.addEventListener('click', closePopup);
    
    // Fermer le popup avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
            closePopup();
        }
    });
});