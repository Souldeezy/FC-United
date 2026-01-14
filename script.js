document.addEventListener('DOMContentLoaded', function() {
    const playerMiniImages = document.querySelectorAll('.img-player-mini');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupContainer = document.querySelector('.popup-container');
    const closeButton = document.querySelector('.close-popup');
    const allPlayerLines = document.querySelectorAll('.player-line');
    
    let currentPlayerLine = null;
    
    function openPopup(playerNumber) {
        allPlayerLines.forEach(line => {
            line.style.display = 'none';
            line.classList.remove('is-revealed', 'is-animated', 'animate');
            
            const allStars = line.querySelectorAll('.sg-right i');
            allStars.forEach(star => {
                star.style.animationDelay = '';
            });
            
            const stats = line.querySelector('.statistiques');
            const lien = line.querySelector('.lien-joueur');
            if (stats) stats.classList.remove('is-animated');
            if (lien) lien.classList.remove('is-revealed', 'is-animated');
        });
        
        let selectedLine = allPlayerLines[playerNumber - 1];
        
        if (selectedLine) {
            currentPlayerLine = selectedLine;
            selectedLine.style.display = 'flex';
            
            popupOverlay.classList.add('active');
            popupContainer.classList.add('active');
            
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                selectedLine.classList.add('is-revealed', 'animate');
                
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
    
    function animateStars(playerLine) {
        const allSocialGatherings = playerLine.querySelectorAll('.socialGathering');
        let globalDelay = 4000;
        
        allSocialGatherings.forEach((gathering, gatheringIndex) => {
            const starContainer = gathering.querySelector('.sg-right');
            if (starContainer) {
                const stars = starContainer.querySelectorAll('i');
                
                stars.forEach((star, starIndex) => {
                    const delay = globalDelay + (starIndex * 100);
                    star.style.animationDelay = delay + 'ms';
                });
                
                globalDelay += (stars.length * 100);
            }
        });
    }
    
    function closePopup() {
        if (currentPlayerLine) {
            currentPlayerLine.classList.remove('is-revealed', 'animate');
            
            const allStars = currentPlayerLine.querySelectorAll('.sg-right i');
            allStars.forEach(star => {
                star.style.animationDelay = '';
            });
            
            const stats = currentPlayerLine.querySelector('.statistiques');
            const lien = currentPlayerLine.querySelector('.lien-joueur');
            if (stats) stats.classList.remove('is-animated');
            if (lien) lien.classList.remove('is-revealed', 'is-animated');
            
            currentPlayerLine.style.display = 'none';
        }
        
        popupOverlay.classList.remove('active');
        popupContainer.classList.remove('active');
        
        document.body.style.overflow = '';
        
        currentPlayerLine = null;
    }
    
    playerMiniImages.forEach((miniImage) => {
        miniImage.addEventListener('click', function() {
            const playerNumber = this.getAttribute('data-player');
            console.log('Joueur cliqué : ' + playerNumber);
            openPopup(parseInt(playerNumber));
        });
    });
    
    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }
    
    if (popupOverlay) {
        popupOverlay.addEventListener('click', closePopup);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
            closePopup();
        }
    });
});

// APPARITION BARRE NAVIGATION
document.addEventListener('DOMContentLoaded', function() {
    const navBar = document.querySelector('.barre-nav');
    
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

    closeButton.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
        popupContainer.classList.remove('active');
        document.body.style.overflow = '';
    });

    popupOverlay.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
        popupContainer.classList.remove('active');
        document.body.style.overflow = '';
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
            popupOverlay.classList.remove('active');
            popupContainer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// BOUTON BACK TO TOP
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// CAROUSEL OUR STORY (uniquement la première section)
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('#ourStory .story-slide');
    const arrowLeft = document.querySelector('.carousel-arrow-left[data-carousel="story"]');
    const arrowRight = document.querySelector('.carousel-arrow-right[data-carousel="story"]');
    const indicators = document.querySelectorAll('.carousel-indicators[data-carousel="story"] .indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }
        
        if (arrowRight) arrowRight.addEventListener('click', nextSlide);
        if (arrowLeft) arrowLeft.addEventListener('click', prevSlide);
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
});

// ANIMATION AU SCROLL - STORY CAROUSEL + SPONSORS
document.addEventListener('DOMContentLoaded', function() {
    const storyCarousel = document.querySelector('#ourStory .story-carousel');
    const carouselIndicators = document.querySelector('.carousel-indicators[data-carousel="story"]');
    const sponsorsParagraph = document.querySelector('.sponsors-paragraph');
    const sponsorsContainer = document.querySelector('.sponsors-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    if (storyCarousel) observer.observe(storyCarousel);
    if (carouselIndicators) observer.observe(carouselIndicators);
    if (sponsorsParagraph) observer.observe(sponsorsParagraph);
    if (sponsorsContainer) observer.observe(sponsorsContainer);
});