/*--------------------------------------------------------------------
GGR472 BIA: Mapbox JavaScript file for Build Your Adventure Tool

Written by Samantha Kyle and Emmett Young
April 10th, 2026

Instructions down below for adding new cards to the map.
--------------------------------------------------------------------*/


// Define access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtLWt5bGUiLCJhIjoiY21rZTR3NW82MDNjazNscHdvZGRoNTJlYyJ9.gXrPIIVvGXk6SEwdzrbd1g'; //***ADD YOUR PUBLIC ACCESS TOKEN***

// Initialize map
const map = new mapboxgl.Map({
    container: 'my-map', //container id in HTML
    //style: 'mapbox://styles/mapbox/dark-v11',  //stylesheet location
    //style: 'mapbox://styles/sam-kyle/cmmxorjrn008z01s6ga49hva8',
    //style: 'mapbox://styles/sam-kyle/cmmz1k1a4000o01qm7s9sevt1',
    style: 'mapbox://styles/sam-kyle/cmnfdfvnx007s01ryd30jccvf',
    center: [-79.305089, 43.670681],  // starting point, longitude/latitude 43.652652, -79.393014
    zoom: 14 // starting zoom level
});

/*--------------------------------------------------------------------
DEFINE CONSTANTS FOR LAYER STYLING
--------------------------------------------------------------------*/
const CLASS_1_MINZOOM = 15; // minzoom for class 1 features
const CLASS_2_MINZOOM = 16; //minzoom for class 2 features

const CLASS_1_SIZE = 0.065;
const CLASS_2_SIZE = 0.05;

const ROUTE_OPACITY = 1;
const NODE_OPACITY = 1;

// BRANDING COLOURS
const BRAND_WHITE = '#e8f8ff'
const BRAND_LIGHT_BLUE = '#a6ddf4'
const BRAND_YELLOW = '#ffebb5'
const BRAND_PINK = '#d90368'
const BRAND_LIGHT_PINK = '#f385b9'
const BRAND_GREEN = '#04a777'
const ROUTE_GREEN = '#41c767'
const BRAND_DARK_BLUE = '#000f4d'

// OLD BRAND COLOURS
const BRAND_LIGHT_PURPLE = '#d1d8e9'
const BRAND_PEACH = '#f8d8aa'
const BRAND_ORANGE = '#e27237'
const BRAND_BROWN = '#9a8f6e'
const BRAND_TAUPE = '#b19074'

// DEFAULT CENTER to view full beaches map
const DEFAULT_CENTER = [-79.305089, 43.670681];
let CURRENT_CENTER = DEFAULT_CENTER;

/*--------------------------------------------------------------------
DEFINE CONSTANTS FOR CARD INFORMATION
--------------------------------------------------------------------*/

/*
HOW TO ADD NEW CARDS/ROUTES
- create a new entry in the dictionary below (CARD_TO_INFO)
    - the dictionary key must be the html-id used for the new card
    - fill out all necessary fields [node_url, route_url, center, route_colour, node_colours, route_layer, node_layer, label_layer]
    - the layer values are just the same names that will be used in the later stage of creating the layers
    - in node_colours, the 0th element is the fill colour, and the 1st element is an outline colour

    If you want this route to behave like the existing nature routes (Kew Gardens and Ivan Forrest), there is one more line to update down below in the card event listeners (line 538)
        this will control whether or not the iNaturalist heatmap becomes visible alongside the route

*/

const CARD_TO_INFO = {
    'card-ivan-forrest':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/Ivan_Forrest_GlenStewart_Ravine_Nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/ivan_forrest_glen_stewart_route_cleaned.geojson',
        'center': [-79.29407743073317, 43.67414933330741],
        'route_colour': BRAND_LIGHT_BLUE,
        'node_colours': [BRAND_PEACH, BRAND_PEACH],
        'node_layer': 'card-ivan-forrest-node-layer',
        'route_layer': 'card-ivan-forrest-route-layer',
        'label_layer': 'card-ivan-forrest-node-layer'

    },
    'card-kew':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/Kew_Gardens_Park_Node.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/kew_gardens_route_cleaned.geojson',
        'center': [-79.2984377648393, 43.66840672830028],
        'route_colour': BRAND_GREEN,
        'node_colours': [BRAND_PEACH, BRAND_PEACH],
        'node_layer': 'card-kew-node-layer',
        'route_layer': 'card-kew-route-layer',
        'label_layer': 'card-kew-node-layer'
    },
    'card-pub-crawl':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PubCrawl_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PubCrawl_routes.geojson',
        'center': [-79.293212, 43.671496],
        'route_colour': BRAND_TAUPE,
        'node_colours': [BRAND_LIGHT_PINK, BRAND_LIGHT_PINK],
        'node_layer': 'card-pub-crawl-node-layer',
        'route_layer': 'card-pub-crawl-route-layer',
        'label_layer': 'card-pub-crawl-node-layer'
    },
    'card-date-night':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/DateNight_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/DateNight_lines.geojson',
        'center': [-79.295706, 43.671042],
        'route_colour': BRAND_LIGHT_PINK,
        'node_colours': [BRAND_PINK, BRAND_PINK],
        'node_layer': 'card-date-night-node-layer',
        'route_layer': 'card-date-night-route-layer',
        'label_layer': 'card-date-night-node-layer'
    },
    'card-artwalk':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/ArtWalk_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/ArtWalk_route.geojson',
        'center': [-79.293947, 43.669808],
        'route_colour': BRAND_ORANGE,
        'node_colours': [BRAND_LIGHT_PINK, BRAND_LIGHT_PINK],
        'node_layer': 'card-artwalk-node-layer',
        'route_layer': 'card-artwalk-route-layer',
        'label_layer': 'card-artwalk-node-layer'
    },
    'card-page-to-screen':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PageToScreen_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PageToScreen_routes.geojson',
        'center': [-79.292337, 43.671849],
        'route_colour': BRAND_YELLOW,
        'node_colours': [BRAND_LIGHT_PINK, BRAND_LIGHT_PINK],
        'node_layer': 'card-page-to-screen-node-layer',
        'route_layer': 'card-page-to-screen-route-layer',
        'label_layer': 'card-page-to-screen-node-layer'
    },
    'card-pup-crawl':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PupCrawl_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PupCrawl_routes.geojson',
        'center': [-79.2935, 43.6695],
        'route_colour': BRAND_LIGHT_BLUE,
        'node_colours': [BRAND_LIGHT_BLUE, BRAND_LIGHT_BLUE],
        'node_layer': 'card-pup-crawl-node-layer',
        'route_layer': 'card-pup-crawl-route-layer',
        'label_layer': 'card-pup-crawl-node-layer'
    },
    'card-clothing-crawl':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/ClothingCrawl_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/ClothingCrawl_routes.geojson',
        'center': [-79.2935, 43.6695],
        'route_colour': BRAND_PEACH,
        'node_colours': [BRAND_PEACH, BRAND_PEACH],
        'node_layer': 'card-clothing-crawl-node-layer',
        'route_layer': 'card-clothing-crawl-route-layer',
        'label_layer': 'card-clothing-crawl-node-layer'
    },
    'card-health-walk':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/Health_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/Health_route.geojson',
        'center': [-79.2935, 43.6695],
        'route_colour': BRAND_GREEN,
        'node_colours': [BRAND_GREEN, BRAND_GREEN],
        'node_layer': 'card-health-walk-node-layer',
        'route_layer': 'card-health-walk-route-layer',
        'label_layer': 'card-health-walk-node-layer'
    }
}

/*--------------------------------------------------------------------
DEFINE FUNCTIONS FOR SOURCE and LAYER CREATION
--------------------------------------------------------------------*/

function add_nodes(card_id) {
    /*
    card_id: html-id of the card these nodes belong to


    This function creates the mapbox-gl-js Source and Layer features for a given card's nodes.
    */
    let url = CARD_TO_INFO[card_id]['node_url'];
    let node_layer = CARD_TO_INFO[card_id]['node_layer'];
    let node_source = card_id + '-node-source';

    CARD_TO_INFO[card_id]['node_source'] = node_source;

    map.addSource(node_source, {
        type: 'geojson',
        data: url
    });

    map.addLayer({
        'id': node_layer,
        'type': 'circle',
        'source': node_source,
        'paint': {
            'circle-radius': 5,
            'circle-stroke-color': CARD_TO_INFO[card_id]['node_colours'][0],
            'circle-stroke-width': 0.5,
            'circle-color': CARD_TO_INFO[card_id]['node_colours'][1],
            'circle-opacity': NODE_OPACITY
        },
        'layout': {
            'visibility': 'none' // default is not visible - becomes visible only on interactions
        }
    });
};

function add_route(card_id) {
    /*
    card_id: html-id of the card this route belongs to


    This function creates the mapbox-gl-js Source and Layer features for a given card's route.
    */
    let url = CARD_TO_INFO[card_id]['route_url'];
    let route_layer = CARD_TO_INFO[card_id]['route_layer'];
    let route_source = card_id + '-route-source';

    CARD_TO_INFO[card_id]['route_source'] = route_source;

    map.addSource(route_source, {
        type: 'geojson',
        data: url
    });

    map.addLayer({
        'id': route_layer,
        'slot': 'bottom',
        'type': 'line',
        'source': route_source,
        'paint': {
            'line-color': CARD_TO_INFO[card_id]['route_colour'],
            'line-width': 5,
            'line-opacity': ROUTE_OPACITY,
        },
        'layout': {
            'visibility': 'none' // default is not visible - becomes visible only on interactions
        }
    });

}

function add_labels(card_id) {
    /*
    card_id: html-id of the card this label feature belongs to


    This function creates the mapbox-gl-js Label layer for a given card
    */
    let node_source = CARD_TO_INFO[card_id]['node_source'];
    let node_layer = CARD_TO_INFO[card_id]['node_layer'];

    let label_layer = node_layer + '-label-layer';

    CARD_TO_INFO[card_id]['label_layer'] = label_layer;

    map.addLayer({
        'id': label_layer,
        'type': 'symbol',
        'slot': 'top', // ensure it is always above other map features
        'source': node_source, // label information stored in the node source
        'minzoom': 15,
        'paint': {
            'text-color': BRAND_WHITE,
            'text-halo-color': 'black',
            'text-halo-width': 0.1
        },
        'layout': {
            'text-field': '{name}',
            'text-anchor': 'top',
            'text-offset': [0, 0.5],
            'visibility': 'none'
        }
    });
}

/*--------------------------------------------------------------------
ADD CONTROLS, INTERACTIVITY, AND GEOCODER
--------------------------------------------------------------------*/

// Add navigation and fullscreen controls to the map.
map.addControl(new mapboxgl.NavigationControl(), 'top-right');
map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

// Add geocoder control to the map, which allows users to search for locations in the GTA
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    region: "Ontario",
    placeholder: 'Search for a location in GTA',
    bbox: [-79.6393, 43.5810, -79.1158, 43.8554]
});

// Append geocoder to the geocoder-container div in HTML
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

// Add event listener which returns map view to full screen on button click using flyTo method
document.getElementById('returnbutton').addEventListener('click', () => {
    map.flyTo({
        center: [-79.305089, 43.670681],
        zoom: 14,
        essential: true
    });
});

/*--------------------------------------------------------------------
LOAD GEOJSON DATA AND ADD LAYERS TO MAP
--------------------------------------------------------------------*/

map.on('load', () => {
    // Add datasource from neighbourhood GeoJSON - default visible layers

    // Neighbourhood outline - always visible
    map.addSource('beaches-poly', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/main/data/aziza_geojsons_cleaned/neighbourhood.geojson'
    });

    map.addLayer({
        'id': 'beaches-outline',
        'type': 'line',
        'source': 'beaches-poly',
        'paint': {
            'line-color': BRAND_ORANGE,
            'line-width': 1
        }
    });

    // Greenspaces poly - always visible
    map.addSource('green-spaces-poly', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/main/data/aziza_geojsons_cleaned/green_spaces.geojson'
    });

    map.addLayer({
        'id': 'green-spaces',
        'type': 'fill',
        'slot': 'bottom',
        'source': 'green-spaces-poly',
        'paint': {
            'fill-color': '#41c767',
            'fill-opacity': 0.2
        }
    });

    // iterate over all the cards in the dictionary, and create route, nodes, and labels
    for (let card_id in CARD_TO_INFO) {
        add_route(card_id);
        add_nodes(card_id);
        add_labels(card_id);
    }
});

/*--------------------------------------------------------------------
FUNCTIONS FOR EVENT LISTENERS FOR MAP CHANGES
--------------------------------------------------------------------*/
let selected_route_layer_id = 'none';
let selected_node_layer_id = 'none';
let click_selected_route_id = 'none';
let click_selected_node_id = 'none';

let hover_selected_route_id = 'none';
let hover_selected_node_id = 'none';
let popup = 'none';


function make_route_visible(route_layer_id, node_layer_id) {
    /*
    route_layer_id: id of mapbox route layer feature to turn visible
    node_layer_id: id of mapbox node layer feature to turn visible


    This function changes the 'visibility' properties of a matching route, node, and label layer
    */
    map.setLayoutProperty(
        route_layer_id,
        'visibility',
        'visible'
    )
    map.setLayoutProperty(
        node_layer_id,
        'visibility',
        'visible'
    );

    map.setLayoutProperty(
        node_layer_id + '-label-layer',
        'visibility', 'visible'
    )
}

function make_route_invisible(route_layer_id, node_layer_id) {
    /*
   route_layer_id: id of mapbox route layer feature to turn invisible
   node_layer_id: id of mapbox node layer feature to turn vinisible


   This function changes the 'visibility' properties of a matching route, node, and label layer
   */
    map.setLayoutProperty(
        route_layer_id,
        'visibility',
        'none'
    )
    map.setLayoutProperty(
        node_layer_id,
        'visibility',
        'none'
    )
    map.setLayoutProperty(
        node_layer_id + '-label-layer',
        'visibility', 'none'
    )
}

function fly_to_default_extent() {
    /*
    returns view to default extent (see all the Beaches neighbourhood)
   */
    map.flyTo({
        center: DEFAULT_CENTER,
        zoom: 14,
        essential: true
    })
}

function fly_to_layer_extent(layer_center, zoom = 15) {
    /*
    layer_center: the coordinates of a layer's centerpoint
    zoom: zoom level for the layer object. Default value is 15
    */
    map.flyTo({
        center: layer_center,
        zoom: zoom,
        essential: true
    })
}

function make_popup(e) {
    /*
    e: map object that has been interacted with
    */
    let this_node = e.features[0];
    let this_html = '' // using this string accumulator variable to be responsive to different combinations of parameters

    if (this_node.properties.img) {
        // if there is an image property, include it in the popup
        path = this_node.properties.img;
        this_html += '<img src =' + path + 'width="200" height = "100"><br><br>';
    }

    if (this_node.properties.name) {
        this_html += "<h6>" + this_node.properties.name + "</h6>"
    }

    if (this_node.properties.desc) {
        this_html += '<h8>' + this_node.properties.desc + '</h8>'
    }


    if (e.features[0].properties.address) {
        this_html += '<br><p>' + this_node.properties.address + '<p>'
    }

    // if the popup would be empty, do not create it
    if (this_html == '') {
        return null
    }

    popup = new mapboxgl.Popup({ "closeButton": false })
        .setLngLat(e.lngLat) // Use method to set coordinates of popup based on mouse click location
        .setHTML(this_html)
        .addTo(map);

    return popup;
}


map.once('idle', () => {

    // heatmap_layer is treated differently since it loads in with the Style
    heatmap_layer = map.getStyle().layers[83]['id'];
    map.setLayoutProperty(
        heatmap_layer,
        'visibility',
        'none'
    )

    /*--------------------------------------------------------------------
    EVENT LISTENERS FOR CARD INTERACTIONS (CLICK, HOVER)
    --------------------------------------------------------------------*/

    // iterate over the card information dictionary to create identical event listeners for all cards
    for (let card_id in CARD_TO_INFO) {
        let route_layer = CARD_TO_INFO[card_id]['route_layer'];
        let node_layer = CARD_TO_INFO[card_id]['node_layer'];
        let center = CARD_TO_INFO[card_id]['center'];

        // mouse enters a card -> toggle layer visibility
        document.getElementById(card_id).addEventListener("mouseenter", (e) => {
            /*
                if mouse enters a card ->
                    if it is NOT the card of the currently selected route, set this route to the hover-selected route, toggle visibility, and fly to extent
                    if it is the card of the currently selected route, go back to layer extent
            */
            if (click_selected_node_id != node_layer) {
                // IF THIS LAYER IS NOT CURRENTLY CLICK-SELECTED
                // HOVER-SELECT IT
                make_route_visible(route_layer, node_layer, center);
                fly_to_layer_extent(center);
                hover_selected_node_id = node_layer;
                hover_selected_route_id = route_layer;
            } else {
                fly_to_layer_extent(center);
            }
        });

        // mouse leaves a card -> toggle layer visibility
        document.getElementById(card_id).addEventListener("mouseleave", (e) => {
            /*
                if mouse leaves a card ->
                    if it is NOT the card of the currently selected route, remove route from the screen and suppose there is no hover select occurring
                    if it is the card of the currently selected route, do NOTHING
            */
            if (click_selected_node_id != node_layer) {
                // NOT CURRENTLY CLICK-SELECTED -> WE ARE EXITING A HOVER
                make_route_invisible(route_layer, node_layer);
                //fly_to_default_extent();
                fly_to_layer_extent(CURRENT_CENTER);
                hover_selected_node_id = 'none';
                hover_selected_route_id = 'none';
            }

        });

        document.getElementById(card_id).addEventListener("click", (e) => {
            /*
                if card is clicked -> this card is now SELECTED and the route is also click-SELECTED
                    if it is the card of the currently selected route, de-select it and toggle visibility
                    otherwise, select the card and route and toggle visibility and update state variables
            */
            if (click_selected_node_id == node_layer) {
                // THIS IS ALREADY CLICKED -> DESELECT IT
                make_route_invisible(route_id, node_layer);

                click_selected_node_id = 'none';
                click_selected_route_id = 'none';
                // do not change extent
            } else {
                // THIS IS NOT ALREADY CLICKED -> SELECT IT
                make_route_visible(route_layer, node_layer, center); /*********************************************************************************** MODIFY HERE IF ADDING NATURE ROUTES ********************************/
                if (node_layer == CARD_TO_INFO['card-ivan-forrest']['node_layer'] || node_layer == CARD_TO_INFO['card-kew']['node_layer']) {
                    // only the two nature routes require showing the heatmap
                    map.setLayoutProperty(
                        heatmap_layer,
                        'visibility',
                        'visible'
                    )
                } else {
                    map.setLayoutProperty(
                        heatmap_layer,
                        'visibility',
                        'none'
                    )
                }
                make_route_invisible(click_selected_route_id, click_selected_node_id)
                fly_to_layer_extent(center);
                click_selected_route_id = route_layer;
                click_selected_node_id = node_layer;
                CURRENT_CENTER = center;
            }

        });
        /*--------------------------------------------------------------------
        EVENT LISTENERS FOR MAP INTERACTIONS
        --------------------------------------------------------------------*/

        map.on('mouseenter', node_layer, (e) => {
            /*
                when hovering over a node, make a popup and update the state variable so that there is only ever one popup
            */
            popup = make_popup(e)
        });

        map.on('mouseleave', node_layer, () => {
            /*
                when no longer hovering over a node, delete the existing popup (there is only ever one)
            */
            popup.remove();
        });

        map.on('touchstart', node_layer, (e) => {
            /*
                when a node is TOUCHED (touch-screen), make the popup
            */
            popup = make_popup(e)
        })

        map.on('touchend', () => {
            // get rid of popups when no longer touching
            popup.remove();
        });

    }
});

/*--------------------------------------------------------------------
    EVENT LISTENERS FOR MAP ICONS
    --------------------------------------------------------------------*/

map.on('click', "public-washrooms-d9mine", (e) => {
    console.log('click washroom')
    let this_icon = e.features[0]
    let this_html = ''

    this_html += "<h8><b> Washroom Information </b></h8>"

    if (this_icon.properties.hours) {
        this_html += '<p> Hours: ' + this_icon.properties.hours
    }
    if (this_icon.properties.accessible) {
        this_html += 'Accessibility: ' + this_icon.properties.accessible + '</p>'
    }
    popup = new mapboxgl.Popup({ "closeButton": true })
        .setLngLat(e.lngLat) // Use method to set coordinates of popup based on mouse click location
        .setHTML(this_html)
        .addTo(map);
});
