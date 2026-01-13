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
        // Cacher toutes les player-lines et réinitialiser leurs animations
        allPlayerLines.forEach(line => {
            line.style.display = 'none';
            line.classList.remove('is-revealed', 'is-animated', 'animate');
            
            // Réinitialiser les délais des étoiles
            const allStars = line.querySelectorAll('.sg-right i');
            allStars.forEach(star => {
                star.style.animationDelay = '';
            });
            
            const stats = line.querySelector('.statistiques');
            const lien = line.querySelector('.lien-joueur');
            if (stats) stats.classList.remove('is-animated');
            if (lien) lien.classList.remove('is-revealed', 'is-animated');
        });
        
        // Trouver et afficher la player-line correspondante
        let selectedLine = allPlayerLines[playerNumber - 1];
        
        if (selectedLine) {
            currentPlayerLine = selectedLine;
            selectedLine.style.display = 'flex';
            
            // Activer l'overlay et le popup
            popupOverlay.classList.add('active');
            popupContainer.classList.add('active');
            
            // Bloquer le scroll de la page
            document.body.style.overflow = 'hidden';
            
            // Lancer les animations après un court délai
            setTimeout(() => {
                selectedLine.classList.add('is-revealed', 'animate');
                
                // Animation des étoiles
                animateStars(selectedLine);
                
                const statsContainer = selectedLine.querySelector('.statistiques');
                const lienJoueur = selectedLine.querySelector('.lien-joueur');
                
                if (lienJoueur) {
                    lienJoueur.classList.add('is-revealed', 'is-animated');
                }
                if (statsContainer) {
                    statsContainer.classList.add('is-animated');
                }
            }, 100);
        }
    }
    
    // Fonction pour animer les étoiles une par une
    function animateStars(playerLine) {
        const allSocialGatherings = playerLine.querySelectorAll('.socialGathering');
        let globalDelay = 4000; // Délai de base en ms (après les autres animations)
        
        // Parcourir chaque catégorie (Beer, Food, Fun) dans l'ordre
        allSocialGatherings.forEach((gathering, gatheringIndex) => {
            const starContainer = gathering.querySelector('.sg-right');
            if (starContainer) {
                const stars = starContainer.querySelectorAll('i');
                
                // Animer chaque étoile de cette catégorie
                stars.forEach((star, starIndex) => {
                    const delay = globalDelay + (starIndex * 100); // 0.2s entre chaque étoile
                    star.style.animationDelay = delay + 'ms';
                });
                
                // Ajouter le temps pour toutes les étoiles de cette catégorie + un petit délai
                globalDelay += (stars.length * 100);
            }
        });
    }
    
    // Fonction pour fermer le popup
    function closePopup() {
        if (currentPlayerLine) {
            // Retirer les classes d'animation
            currentPlayerLine.classList.remove('is-revealed', 'animate');
            
            // Réinitialiser les délais des étoiles
            const allStars = currentPlayerLine.querySelectorAll('.sg-right i');
            allStars.forEach(star => {
                star.style.animationDelay = '';
            });
            
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


// POPUP GALLERY
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.photo-gallery');
    const popupOverlay = document.querySelector('.popup-gallery-overlay');
    const popupContainer = document.querySelector('.popup-gallery-container');
    const popupImage = document.querySelector('.popup-gallery-image');
    const popupCaption = document.querySelector('.popup-gallery-caption');
    const closeButton = document.querySelector('.close-popup-gallery');

    // Ouvrir le popup au clic sur une photo
    galleryImages.forEach((photo) => {
        photo.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('figcaption');
            
            popupImage.src = img.src;
            popupCaption.textContent = caption.textContent;
            
            popupOverlay.classList.add('active');
            popupContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermer le popup avec le bouton X
    closeButton.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
        popupContainer.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Fermer le popup en cliquant sur l'overlay
    popupOverlay.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
        popupContainer.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
            popupOverlay.classList.remove('active');
            popupContainer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});


// BOUTON BACK TO TOP RETOUR EN HAUT DE PAGE...........................................//


document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');

    // Afficher le bouton après avoir scrollé de 300px
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Remonter en haut au clic
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});