/*--------------------------------------------------------------------
GGR472 BIA: Non-Mapbox JS code
--------------------------------------------------------------------*/


/*--------------------------------------------------------------------
ADDING INTERACTIVITY TO CARDS
--------------------------------------------------------------------*/
// Set the hovered status variables to null, but keep them as let to allow them to be changed
let hoveredCard = null;
let pinnedCard = null;
let closeTimeout = null;

// Create const varibles representing the scroll area and cards
const cards = document.querySelectorAll('.mb-3[data-panel]');
const scrollArea = document.querySelector('.scroll-area');

// Create a for loop for mouse entering and clicking on a card
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        clearTimeout(closeTimeout);

        if (hoveredCard !== null && hoveredCard !== card) {
            closeCardPanel(hoveredCard);
        }
        hoveredCard = card;
        openCardPanel(card);
    });

    card.addEventListener('click', () => {
        if (pinnedCard !== null && pinnedCard !== card) {
            closeCardPanel(pinnedCard);
        }
        pinnedCard = card;
        openCardPanel(card);
    });
});

// Only close when leaving the scroll area entirely
scrollArea.addEventListener('mouseleave', () => {
    closeTimeout = setTimeout(() => {
        if (hoveredCard !== null && hoveredCard !== pinnedCard) {
            closeCardPanel(hoveredCard);
        }
        hoveredCard = null;
    }, 300);
});

// Keep panel open when mouse enters it, close when it leaves (unless pinned)
document.querySelectorAll('.side-panel').forEach(panel => {
    panel.addEventListener('mouseenter', () => {
        clearTimeout(closeTimeout);
    });

    panel.addEventListener('mouseleave', () => {
        closeTimeout = setTimeout(() => {
            if (hoveredCard !== null && hoveredCard !== pinnedCard) {
                closeCardPanel(hoveredCard);
                hoveredCard = null;
            }
        }, 300);
    });

    // Click anywhere on panel to unpin/close it
    panel.addEventListener('click', () => {
        if (pinnedCard !== null) {
            closeCardPanel(pinnedCard);
            pinnedCard = null;
        }
    });
});

function openCardPanel(card) {
    const panelId = card.dataset.panel;
    document.getElementById(panelId).style.display = 'block';
}

function closeCardPanel(card) {
    const panelId = card.dataset.panel;
    document.getElementById(panelId).style.display = 'none';
}