/*--------------------------------------------------------------------
GGR472 BIA: Non-Mapbox JS code
--------------------------------------------------------------------*/
// This file contains the interactive JavaScript code for the GGR472 BIA project 
// that is not related to the Mapbox map. This includes the interactivity for the
// cards and side panels, as well as the event listeners for the buttons that export
// the routes to Google Maps. The code is organized into sections with comments for 
// clarity and ease of navigation. Each section contains detailed comments explaining
// the purpose and functionality of the code within it. This structure allows for
// easy maintenance and future updates to the project, as well as providing a clear 
// understanding of how the different components of the application work together.

// For adding the corresponding map layers and card dictionary entry, see 
// mapbox_script.js.

/*--------------------------------------------------------------------
ADDING INTERACTIVITY TO CARDS
--------------------------------------------------------------------*/
// The state variables below track which card is currently hovered, which is 
// pinned (clicked), and whether a close delay is pending. Keeping these 
// separate allows hover and click behaviours to coexist without interfering 
// with each other.

// To add a new card, give it a data-panel attribute matching the id of its
// corresponding side panel element. No changes to this section of the file 
// are needed to add new cards - just make sure to give them the correct 
// class and data-panel attributes in the HTML, and the event listeners in the
// next section will pick them up automatically. 

// Set the hovered status variables to null, but keep them as let to allow them to be changed.
let hoveredCard = null;
let pinnedCard = null;
let closeTimeout = null;

// Create const variables representing the scroll area and cards.
const cards = document.querySelectorAll('.mb-3[data-panel]');
const scrollArea = document.querySelector('.scroll-area');

/*--------------------------------------------------------------------
MOUSE ENTER/LEAVE AND CLICK
--------------------------------------------------------------------*/
// Hover opens a panel temporarily; clicking pins it open until the user clicks
// elsewhere or clicks the panel itself to dismiss it. The 300ms delay on close
// prevents flickering when the mouse briefly passes between the card and panel.

// If you want to change the close delay, adjust the timeout value (in ms) in
// both setTimeout calls below — one on the scroll area mouseleave and one on 
// the panel mouseleave. Keep them consistent.

// Create a for loop for mouse entering and clicking on a card. This attaches 
// hover and click listeners to each card.
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

// Only close when leaving the scroll area entirely.
// Short delay before closing so the panel doesn't flicker if the user briefly exits the 
// scroll area.
scrollArea.addEventListener('mouseleave', () => {
    closeTimeout = setTimeout(() => {
        if (hoveredCard !== null && hoveredCard !== pinnedCard) {
            closeCardPanel(hoveredCard);
        }
        hoveredCard = null;
    }, 300);
});

// Keep panel open when mouse enters it, close when it leaves (unless pinned).
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
// and setting the matching panel element's display to 'block' (visible).
function openCardPanel(card) {
    const panelId = card.dataset.panel;
    document.getElementById(panelId).style.display = 'block';
}

// Closes the side panel associated with a card by reading the card's data-panel attribute
// and setting the matching panel element's display to 'none' (hidden).
function closeCardPanel(card) {
    const panelId = card.dataset.panel;
    document.getElementById(panelId).style.display = 'none';
}

/*--------------------------------------------------------------------
EVENT LISTENERS FOR BUTTONS
--------------------------------------------------------------------*/
// Button event listeners: open each themed route in Google Maps
// Each URL uses the Directions API with hardcoded coordinates or place name strings
// as waypoints. 'travelmode=walking' is set for all routes. Origin and destinatation
// refer to the starting and endpoints of the route, while waypoints refer to the 
// stops along the way. '_blank' opens the link in a new tab to keep the map app 
// in view.

// To add a new link to a route, use an event listener for click and assign it to 
// the button's id. Then, create the URL for the route using the Google Maps 
// Directions API demonstrated below. May need to play around with using 
// coordinates and/or place name strings for waypoints to get them all 
// to work properly.

// Note, this should be the only section of the existing script.js file that needs to 
// be updated to add new routes.

// Button event listener to export kew gardens stroll to google maps.
document.getElementById('kew-gardens-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=43.670023,-79.299771&destination=43.670023,-79.2997718&travelmode=walking&waypoints=43.6693425,-79.297661|43.6684888,-79.2977055|43.6679937,-79.2977183|43.66628356772898,-79.29749104811573|43.6690367,-79.2993947';
    window.open(url, '_blank')
});

// Button event listener to export ivan forrest / glen stewart ravine hike to google maps.
document.getElementById('ivan-forrest-glen-stewart-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=43.6717645,-79.292627&destination=43.6718343,-79.291883&travelmode=walking&waypoints=43.6729269,-79.2934019|43.6745413,-79.2945794|43.6744551,-79.2953531|43.6767289,-79.291398|43.6750966,-79.2933699|43.6735383,-79.293611';
    window.open(url, '_blank')
});

// Button event listener to export pub crawl to google maps.
document.getElementById('bar-crawl-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=43.669658478714325,-79.30241797077133&destination=43.673316738616506,-79.28492871510936&travelmode=walking&waypoints=43.66941454708757,-79.30199935012045|Castro%27s+Lounge+Toronto|The+Druid+Bar+Toronto|Outrigger+Toronto';
    window.open(url, '_blank')
});

// Button event listener to export art walk to google maps.
document.getElementById('artwalk-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=Thought+Fox+Art+Studio+Toronto&destination=Incurable+Collector+Toronto&travelmode=walking&waypoints=Studio+88+Art+Gallery+Toronto|43.66909611178548,-79.28864219251545|43.66628356772898,-79.29749104811573|43.6681341196406,-79.29728945767154';
    window.open(url, '_blank')
});

// Button event listener to export date night to google maps.
document.getElementById('date-night-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=Beachwood+Flower+Shop+1916+Queen+St+E+Toronto&destination=Fox+Theatre+2236+Queen+St+E+Toronto&travelmode=walking&waypoints=Hanji+Gifts+1952+Queen+St+E+Toronto|Shop+Makers+The+Beaches+1984+Queen+St+E+Toronto|43.672121,-79.292585|Arts+on+Queen+2198+Queen+St+E+Toronto|Ed%27s+Real+Scoop+2224+Queen+St+E+Toronto';
    window.open(url, '_blank')
});

// Button event listener to export page to screen to google maps.
document.getElementById('page-to-screen-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=43.67016879048933,-79.29848340735208&destination=Fox+Theatre+Toronto&travelmode=walking&waypoints=43.66987490917481,-79.29866420836301|43.670002184627094,-79.29785126569573|43.67176434692246,-79.29262763537818|Judy%27s+Beach+Café+Toronto';
    window.open(url, '_blank')
});

// Button event listener to export pub crawl to google maps.
document.getElementById('pup-crawl-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=RAW+101+-+RAW+Food+For+Dogs+and+Cats,+2186+Queen+St+E,+Toronto,+ON+M4E+1E6&destination=The+Petninsula+%E2%80%93+Lavakan+Pet+Spa(Self-Serve+Dog+Wash)+M4L+1J3,+Ontario,+Toronto,+Queen+St+E&travelmode=walking&waypoints=43.670201,-79.297930|Kew+Gardens+Dog+Park,+Toronto,+ON+M4E+2N8';
    window.open(url, '_blank')
});
// Button event listener to export clothing crawl to google maps
document.getElementById('clothing-crawl-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=Marias+Vintage+Boutique,+2238+Queen+St+E,+Toronto,+ON+M4E+1G2&destination=Dot+%26+Bea,+1926+Queen+St+E,+Toronto,+ON+M4L+1H5&travelmode=walking&waypoints=Boa+Boutique,+2116B+Queen+St+E,+Toronto,+ON+M4E+1E2|Charming+Parrot,+1978+Queen+St+E,+Toronto,+ON+M4L+1H8';
    window.open(url, '_blank')
});
// Button event listener to export health walk to google maps
document.getElementById('health-walk-google-maps-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let url = 'https://www.google.com/maps/dir/?api=1&origin=Beaches+Hot+Yoga,+1911+Queen+St+E,+Toronto,+ON+M4L+1H3&destination=The+Haven+Cafe,+2256+Queen+St+E,+Toronto,+ON+M4E+3K3&travelmode=walking&waypoints=43.6699699,-79.2863279|43.6676716,-79.2965422|After+Glow,+2034+Queen+St+E,+Toronto,+ON+M4L+1J4|Heal+Wellness,+1938+Queen+St+E,+Toronto,+ON+M4L+1H6|Farmacia+Health+Bar,+2096+Queen+St+E,+Toronto,+ON+M4E+1E1';
    window.open(url, '_blank')
});
