/*--------------------------------------------------------------------
GGR472 BIA: Non-Mapbox JS code
--------------------------------------------------------------------*/


/*--------------------------------------------------------------------
ADDING INTERACTIVITY TO CARDS
--------------------------------------------------------------------*/

let hoveredCard = null;

const cards = document.querySelectorAll('.mb-3[data-panel]');
const scrollArea = document.querySelector('.scroll-area');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (hoveredCard !== null && hoveredCard !== card) {
            closeCardPanel(hoveredCard);
        }
        hoveredCard = card;
        openCardPanel(card);
    });
});

// Only close when leaving the scroll area entirely
scrollArea.addEventListener('mouseleave', () => {
    if (hoveredCard !== null) {
        closeCardPanel(hoveredCard);
    }
    hoveredCard = null;
});

function openCardPanel(card) {
    const panelId = card.dataset.panel;
    document.getElementById(panelId).style.display = 'block';
}

function closeCardPanel(card) {
    const panelId = card.dataset.panel;
    document.getElementById(panelId).style.display = 'none';
}