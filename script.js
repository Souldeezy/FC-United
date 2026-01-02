// On attend que toute la page soit chargée
document.addEventListener('DOMContentLoaded', function() {

    // On sélectionne l'image sur laquelle on veut cliquer
    const playerImage = document.querySelector('.img-player');

    // On sélectionne le conteneur des stats que l'on veut animer
    const statsContainer = document.querySelector('.statistiques');

    // On vérifie que les deux éléments existent pour éviter les erreurs
    if (playerImage && statsContainer) {

        // On ajoute un "écouteur d'événement" qui attend un clic sur l'image
        playerImage.addEventListener('click', function() {
            
            // Quand on clique, on ajoute la classe 'is-animated' au conteneur des stats
            statsContainer.classList.add('is-animated');
            
            // On peut aussi ajouter un curseur "pointer" pour montrer que l'image est cliquable
            playerImage.style.cursor = 'pointer';

        });
    } else {
        console.error("Erreur : Impossible de trouver '.img-player' ou '.statistiques'.");
    }

});
