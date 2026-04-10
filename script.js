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
// Button event listeners: open each themed route in Google Maps
// Each URL uses the Directions API with hardcoded coordinates or place name strings
// as waypoints. 'travelmode=walking' is set for all routes.
// '_blank' opens the link in a new tab to keep the map app in view.

// May need to play around with using coordinates and/or place name strings for waypoints to get them all to work properly.

// Button event listener to export kew gardens stroll to google maps
document.getElementById('kew-gardens-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=43.670023,-79.299771&destination=43.670023,-79.2997718&travelmode=walking&waypoints=43.6693425,-79.297661|43.6684888,-79.2977055|43.6679937,-79.2977183|43.66628356772898,-79.29749104811573|43.6690367,-79.2993947';
    window.open(url, '_blank')
});

// Button event listener to export ivan forrest / glen stewart ravine hike to google maps
document.getElementById('ivan-forrest-glen-stewart-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=43.6717645,-79.292627&destination=43.6718343,-79.291883&travelmode=walking&waypoints=43.6729269,-79.2934019|43.6745413,-79.2945794|43.6744551,-79.2953531|43.6767289,-79.291398|43.6750966,-79.2933699|43.6735383,-79.293611';
    window.open(url, '_blank')
});

// Button event listener to export pub crawl to google maps
document.getElementById('bar-crawl-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=43.669658478714325,-79.30241797077133&destination=43.673316738616506,-79.28492871510936&travelmode=walking&waypoints=43.66941454708757,-79.30199935012045|Castro%27s+Lounge+Toronto|The+Druid+Bar+Toronto|Outrigger+Toronto';
    window.open(url, '_blank')
});

// Button event listener to export art walk to google maps
document.getElementById('artwalk-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=Thought+Fox+Art+Studio+Toronto&destination=Incurable+Collector+Toronto&travelmode=walking&waypoints=Studio+88+Art+Gallery+Toronto|43.66909611178548,-79.28864219251545|43.66628356772898,-79.29749104811573|43.6681341196406,-79.29728945767154';
    window.open(url, '_blank')
});

// Button event listener to export date night to google maps
document.getElementById('date-night-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=Beachwood+Flower+Shop+1916+Queen+St+E+Toronto&destination=Fox+Theatre+2236+Queen+St+E+Toronto&travelmode=walking&waypoints=Hanji+Gifts+1952+Queen+St+E+Toronto|Shop+Makers+The+Beaches+1984+Queen+St+E+Toronto|43.672121,-79.292585|Arts+on+Queen+2198+Queen+St+E+Toronto|Ed%27s+Real+Scoop+2224+Queen+St+E+Toronto';
    window.open(url, '_blank')
});

// Button event listener to export page to screen to google maps
document.getElementById('page-to-screen-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=43.67016879048933,-79.29848340735208&destination=Fox+Theatre+Toronto&travelmode=walking&waypoints=43.66987490917481,-79.29866420836301|43.670002184627094,-79.29785126569573|43.67176434692246,-79.29262763537818|Judy%27s+Beach+Café+Toronto';
    window.open(url, '_blank')
});

// Button event listener to export pub crawl to google maps
document.getElementById('pup-crawl-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=RAW+101+-+RAW+Food+For+Dogs+and+Cats,+2186+Queen+St+E,+Toronto,+ON+M4E+1E6&destination=The+Petninsula+%E2%80%93+Lavakan+Pet+Spa(Self-Serve+Dog+Wash)+M4L+1J3,+Ontario,+Toronto,+Queen+St+E&travelmode=walking&waypoints=43.670201,-79.297930|Kew+Gardens+Dog+Park,+Toronto,+ON+M4E+2N8';
    window.open(url, '_blank')
});