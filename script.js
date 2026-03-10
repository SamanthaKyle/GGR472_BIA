/*--------------------------------------------------------------------
GGR472 BIA: Non-Mapbox JS code
--------------------------------------------------------------------*/


/*--------------------------------------------------------------------
ADDING INTERACTIVITY TO CARDS
--------------------------------------------------------------------*/

let hoveredCard = null;

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Reset previous card's panel if there was one
        if (hoveredCard !== null) {
            closeCardPanel(hoveredCard);
        }
        hoveredCard = card;
        openCardPanel(card);
    });

    card.addEventListener('mouseleave', () => {
        if (hoveredCard !== null) {
            closeCardPanel(hoveredCard);
        }
        hoveredCard = null;
    });
});

function openCardPanel(card) {
    const panelId = card.closest('[data-panel]').dataset.panel;
    document.getElementById(panelId).style.display = 'block';
}

function closeCardPanel(card) {
    const panelId = card.closest('[data-panel]').dataset.panel;
    document.getElementById(panelId).style.display = 'none';
}

