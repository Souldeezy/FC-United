document.addEventListener('DOMContentLoaded', function() {
    const playerImages = document.querySelectorAll('.img-player');
    
    playerImages.forEach((playerImage) => {
        playerImage.addEventListener('click', function() {
            const playerLine = playerImage.closest('.player-line');
            const statsContainer = playerLine.querySelector('.statistiques');
            
            if (statsContainer) {
                statsContainer.classList.add('is-animated');
            }
        });
    });
});
