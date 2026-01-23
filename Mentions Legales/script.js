// APPARITION BARRE NAVIGATION.........................................................................................................................................//
//.....................................................................................................................................................................//
//.....................................................................................................................................................................//

document.addEventListener('DOMContentLoaded', function() {
    const navBar = document.querySelector('.barre-nav');
    
    // Attendre 2 secondes (2000ms) avant de faire apparaître la barre
    setTimeout(() => {
        navBar.classList.add('visible');
    }, 2000);
});



// BOUTON BACK TO TOP..................................................................................................................................................//
//.....................................................................................................................................................................//
//.....................................................................................................................................................................//

document.addEventListener('DOMContentLoaded', function() {
    const backToTopContainer = document.querySelector('.back-to-top-container');
    const backToTopButton = document.querySelector('.back-to-top');

    // Afficher le bouton après avoir scrollé de 300px
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopContainer.classList.add('visible');
        } else {
            backToTopContainer.classList.remove('visible');
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

// MENU HAMBURGER MOBILE...............................................................................................................................................//
//.....................................................................................................................................................................//
//.....................................................................................................................................................................//

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.links-header a');

    if (hamburger && navMenu && navOverlay) {
        // Ouvrir/Fermer le menu
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Fermer en cliquant sur l'overlay
        navOverlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Fermer en cliquant sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});

// HEADER SCROLL EFFECT (SEMI TRANSPARENT DOWN / NORMAL UP)............................................................................................................//
//.....................................................................................................................................................................//
//.....................................................................................................................................................................//

let lastScrollY = window.scrollY;
const navBar = document.querySelector('.barre-nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollY && currentScroll > 100) {
    // SCROLL DOWN
    navBar.classList.add('is-scrolling-down');
    navBar.classList.remove('is-scrolling-up');
  } else {
    // SCROLL UP
    navBar.classList.add('is-scrolling-up');
    navBar.classList.remove('is-scrolling-down');
  }

  lastScrollY = currentScroll;
});