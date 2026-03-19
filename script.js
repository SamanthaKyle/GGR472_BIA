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

/*--------------------------------------------------------------------
MOUSE ENTER/LEAVE AND CLICK
--------------------------------------------------------------------*/

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

// Opens the side panel associated with a card by reading the card's data-panel attribute
// and setting the matching panel element's display to 'block' (visible)
function openCardPanel(card) {
    const panelId = card.dataset.panel;
    document.getElementById(panelId).style.display = 'block';
}

// Closes the side panel associated with a card by reading the card's data-panel attribute
// and setting the matching panel element's display to 'none' (hidden)
function closeCardPanel(card) {
    const panelId = card.dataset.panel;
    document.getElementById(panelId).style.display = 'none';
}

/*--------------------------------------------------------------------
EVENT LISTENERS FOR BUTTONS
--------------------------------------------------------------------*/
// Button event listener to export kew gardens stroll to google maps
document.getElementById('bar-crawl-google-maps-btn').addEventListener('click', () => {
    let url = 'https://www.google.com/maps/dir/?api=1&origin=43.669658478714325,-79.30241797077133&destination=43.673316738616506,-79.28492871510936&travelmode=walking&waypoints=43.66941454708757,-79.30199935012045|Castro%27s+Lounge+Toronto|The+Druid+Bar+Toronto';
    window.open(url, '_blank')
});

// Button event listener to export pub crawl to google maps
document.getElementById('bar-crawl-google-maps-btn').addEventListener('click', () => {
    let url = 'https://www.google.com/maps/dir/?api=1&origin=43.669658478714325,-79.30241797077133&destination=43.673316738616506,-79.28492871510936&travelmode=walking&waypoints=43.66941454708757,-79.30199935012045|Castro%27s+Lounge+Toronto|The+Druid+Bar+Toronto';
    window.open(url, '_blank')
});

// Button event listener to export to pub crawl to google maps
document.getElementById('bar-crawl-google-maps-btn').addEventListener('click', () => {
    let url = 'https://www.google.com/maps/dir/?api=1&origin=43.669658478714325,-79.30241797077133&destination=43.673316738616506,-79.28492871510936&travelmode=walking&waypoints=43.66941454708757,-79.30199935012045|Castro%27s+Lounge+Toronto|The+Druid+Bar+Toronto';
    window.open(url, '_blank')
});

// Button event listener to export art walk to google maps
document.getElementById('artwalk-google-maps-btn').addEventListener('click', () => {
    let url = 'https://www.google.com/maps/dir/?api=1&origin=Thought+Fox+Art+Studio+Toronto&destination=Incurable+Collector+Toronto&travelmode=walking&waypoints=Studio+88+Art+Gallery+Toronto|43.66909611178548,-79.28864219251545|43.6681341196406,-79.29728945767154|43.66628356772898,-79.29749104811573';
    window.open(url, '_blank')
});