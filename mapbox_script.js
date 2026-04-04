/*--------------------------------------------------------------------
GGR472 BIA: Mapbox JavaScript file for Build Your Adventure Tool
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

// list of existing card ids (for event listeners)
const CARD_IDS = ['card-ivan-forrest', 'card-kew', 'card-pub-crawl', 'card-date-night', 'card-artwalk', 'card-page-to-screen', 'card-pup-crawl']

// dictionary mapping card id's to their corresponding route layer, node layer, and center point
// this will allow for event listeners to be automatically created with a smaller amount of code
// useful as we expect to create many many more cards in the coming weeks
// const CARD_ID_TO_LAYER_INFO = {
//     'card-ivan-forrest':
//     {
//         'node_source_id': 'ivan-gardens-node-data',
//         'route_layer_id': 'ivan-gardens-route-layer',
//         'node_layer_id': 'ivan-gardens-node-layer',
//         'center': [-79.29407743073317, 43.67414933330741]
//     },
//     'card-kew':
//     {
//         'node_source_id': 'kew-gardens-node-data',
//         'route_layer_id': 'kew-gardens-route-layer',
//         'node_layer_id': 'kew-gardens-node-layer',
//         'center': [-79.2984377648393, 43.66840672830028]
//     },
//     'card-pub-crawl':
//     {
//         'node_source_id': 'pubcrawl-node-data',
//         'route_layer_id': 'pubcrawl-route-layer',
//         'node_layer_id': 'pubcrawl-node-layer',
//         'center': [-79.293212, 43.671496]
//     },
//     'card-date-night':
//     {
//         'node_source_id': 'datenight-node-data',
//         'route_layer_id': 'datenight-route-layer',
//         'node_layer_id': 'datenight-node-layer',
//         'center': [-79.295706, 43.671042]
//     },
//     'card-artwalk':
//     {
//         'node_source_id': 'artwalk-node-data',
//         'route_layer_id': 'artwalk-route-layer',
//         'node_layer_id': 'artwalk-node-layer',
//         'center': [-79.293947, 43.669808]
//     },
//     'card-page-to-screen':
//     {
//         'node_source_id': 'pagetoscreen-node-data',
//         'route_layer_id': 'pagetoscreen-route-layer',
//         'node_layer_id': 'pagetoscreen-node-layer',
//         'center': [-79.292337, 43.671849]
//     },
//     'card-pup-crawl':
//     {
//         'node_source_id': 'pupcrawl-node-data',
//         'route_layer_id': 'pupcrawl-route-layer',
//         'node_layer_id': 'pupcrawl-node-layer',
//         'center': [-79.2935, 43.6695]
//     }
// }

const CARD_TO_INFO = {
    'card-ivan-forrest':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/Ivan_Forrest_GlenStewart_Ravine_Nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/ivan_forrest_glen_stewart_route_cleaned.geojson',
        'center': [-79.29407743073317, 43.67414933330741], // use turf to get center?,
        'route_colour': BRAND_GREEN,
        'node_colours': [BRAND_PEACH, BRAND_PEACH],
        'node_layer': 'card-ivan-forrest-node-layer',
        'route_layer': 'card-ivan-forrest-route-layer',
        'label_layer': 'card-ivan-forrest-node-layer'

    },
    'card-kew':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/Kew_Gardens_Park_Node.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/kew_gardens_route_cleaned.geojson',
        'center': [-79.2984377648393, 43.66840672830028],
        'route_colour': BRAND_GREEN,
        'node_colours': [BRAND_PEACH, BRAND_PEACH],
        'node_layer': 'card-kew-node-layer',
        'route_layer': 'card-kew-route-layer',
        'label_layer': 'card-kew-node-layer'
    },
    'card-pub-crawl':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PubCrawl_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PubCrawl_routes.geojson',
        'center': [-79.293212, 43.671496],
        'route_colour': BRAND_PINK,
        'node_colours': [BRAND_LIGHT_PINK, BRAND_LIGHT_PINK],
        'node_layer': 'card-pub-crawl-node-layer',
        'route_layer': 'card-pub-crawl-route-layer',
        'label_layer': 'card-pub-crawl-node-layer'
    },
    'card-date-night':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/DateNight_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/DateNight_lines.geojson',
        'center': [-79.295706, 43.671042],
        'route_colour': BRAND_PINK,
        'node_colours': [BRAND_LIGHT_PINK, BRAND_LIGHT_PINK],
        'node_layer': 'card-date-night-node-layer',
        'route_layer': 'card-date-night-route-layer',
        'label_layer': 'card-date-night-node-layer'
    },
    'card-artwalk':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/ArtWalk_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/ArtWalk_route.geojson',
        'center': [-79.293947, 43.669808],
        'route_colour': BRAND_PINK,
        'node_colours': [BRAND_LIGHT_PINK, BRAND_LIGHT_PINK],
        'node_layer': 'card-artwalk-node-layer',
        'route_layer': 'card-artwalk-route-layer',
        'label_layer': 'card-artwalk-node-layer'
    },
    'card-page-to-screen':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PageToScreen_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PageToScreen_routes.geojson',
        'center': [-79.292337, 43.671849],
        'route_colour': BRAND_PINK,
        'node_colours': [BRAND_LIGHT_PINK, BRAND_LIGHT_PINK],
        'node_layer': 'card-page-to-screen-node-layer',
        'route_layer': 'card-page-to-screen-route-layer',
        'label_layer': 'card-page-to-screen-node-layer'
    },
    'card-pup-crawl':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PupCrawl_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PupCrawl_routes.geojson',
        'center': [-79.2935, 43.6695],
        'route_colour': BRAND_LIGHT_BLUE,
        'node_colours': [BRAND_LIGHT_BLUE, BRAND_LIGHT_BLUE],
        'node_layer': 'card-pup-crawl-node-layer',
        'route_layer': 'card-pup-crawl-route-layer',
        'label_layer': 'card-pup-crawl-node-layer'
    }
}

function add_nodes(card_id) {
    let url = CARD_TO_INFO[card_id]['node_url'];
    let node_layer = CARD_TO_INFO[card_id]['node_layer'];
    let node_source = card_id + '-node-source';

    CARD_TO_INFO[card_id]['node_source'] = node_source;
    //CARD_TO_INFO[card_id]['node_layer'] = node_layer;

    map.addSource(node_source, {
        type: 'geojson',
        data: url
    });

    map.addLayer({
        'id': node_layer,
        'type': 'circle',
        //'slot': 'top',
        'source': node_source,
        'paint': {
            'circle-radius': 5,
            'circle-stroke-color': CARD_TO_INFO[card_id]['node_colours'][0],
            'circle-stroke-width': 0.5,
            'circle-color': CARD_TO_INFO[card_id]['node_colours'][1],
            'circle-opacity': NODE_OPACITY
        },
        'layout': {
            'visibility': 'none'
        }
    });
};

function add_route(card_id) {
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
            'visibility': 'none'
        }
    });

}

function add_labels(card_id) {
    let node_source = CARD_TO_INFO[card_id]['node_source'];
    let node_layer = CARD_TO_INFO[card_id]['node_layer'];

    let label_layer = node_layer + '-label-layer';

    CARD_TO_INFO[card_id]['label_layer'] = label_layer;

    map.addLayer({
        'id': label_layer,
        'type': 'symbol',
        'slot': 'top',
        'source': node_source,
        'minzoom': 15,
        // 'paint': {
        //     'line-color': BRAND_YELLOW,
        //     'line-width': 3
        // },
        'paint': {
            'text-color': BRAND_WHITE,//BRAND_LIGHT_PINK,
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

    // Neighbourhood outline - always visible - not present in legends
    map.addSource('beaches-poly', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/main/emmett_data/aziza_geojsons_cleaned/neighbourhood.geojson'
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

    // Greenspaces poly - always visible - not present in legend
    map.addSource('green-spaces-poly', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/main/emmett_data/aziza_geojsons_cleaned/green_spaces.geojson'
    });

    map.addLayer({
        'id': 'green-spaces',
        'type': 'fill',
        'source': 'green-spaces-poly',
        'paint': {
            'fill-color': '#41c767',
            'fill-opacity': 0.3
        }
    });

    // map.addSource('ivan-gardens-route-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/ivan_forrest_glen_stewart_route_cleaned.geojson'
    // })

    // map.addLayer({
    //     'id': 'ivan-gardens-route-layer',
    //     'slot': 'bottom',
    //     'type': 'line',
    //     'source': 'ivan-gardens-route-data',
    //     'paint': {
    //         'line-color': ROUTE_GREEN,
    //         'line-width': 5,
    //         'line-opacity': ROUTE_OPACITY,
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // })

    // map.addSource('ivan-gardens-node-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/Ivan_Forrest_GlenStewart_Ravine_Nodes.geojson'
    // })

    // map.addLayer({
    //     'id': 'ivan-gardens-node-layer',
    //     'type': 'circle',
    //     //'slot': 'top',
    //     'source': 'ivan-gardens-node-data',
    //     'paint': {
    //         'circle-radius': 5,
    //         'circle-stroke-color': BRAND_PEACH,
    //         'circle-stroke-width': 0.5,
    //         'circle-color': BRAND_PEACH,
    //         'circle-opacity': NODE_OPACITY
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // })

    // map.addSource('kew-gardens-route-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/kew_gardens_route_cleaned.geojson'
    // })

    // map.addLayer({
    //     'id': 'kew-gardens-route-layer',
    //     'type': 'line',
    //     //'slot': 'top',
    //     'source': 'kew-gardens-route-data',
    //     'paint': {
    //         'line-color': ROUTE_GREEN,
    //         'line-width': 5,
    //         'line-opacity': ROUTE_OPACITY
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // })

    // map.addSource('kew-gardens-node-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/Kew_Gardens_Park_Node.geojson'
    // })
    // map.addLayer({
    //     'id': 'kew-gardens-node-layer',
    //     'type': 'circle',
    //     //'slot': 'top',
    //     'source': 'kew-gardens-node-data',
    //     'paint': {
    //         'circle-radius': 5,
    //         'circle-stroke-color': BRAND_PEACH,
    //         'circle-color': BRAND_PEACH,
    //         'circle-opacity': NODE_OPACITY,
    //         'circle-stroke-width': 0.5,
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // })
    // // map.addLayer({
    // //     'id': 'basketball-courts',
    // //     'type': 'fill',
    // //     'source': 'basketball-courts-poly',
    // //     'paint': {
    // //         'fill-color': '#a3995d',
    // //         'fill-opacity': 1
    // //     }
    // // });

    // // Draw GeoJSON points
    // // map.addLayer({
    // //     'id': 'toronto-mus-pnts',
    // //     'type': 'circle',
    // //     'source': 'toronto-mus',
    // //     'paint': {
    // //         'circle-radius': [
    // //             'interpolate', //INTERPOLATE expression produces continuous results by interplating between value pairs
    // //             ['linear'], //linear interpolation between stops but could be exponential ['exponential', base] where base controls rate at which output increases
    // //             ['zoom'], //zoom expression changes appearance with zoom level
    // //             10, 5, // when zoom is 10 (or less), radius will be 5px
    // //             12, ['/', ['get', 'capacity'], 20] // when zoom is 12 (or greater), radius will be capacity/20
    // //         ],
    // //         'circle-color': [
    // //             'step', // STEP expression produces stepped results based on value pairs
    // //             ['get', 'capacity'], // GET expression retrieves property value from 'capacity' data field
    // //             '#800026', // Colour assigned to any values < first step
    // //             150, '#bd0026', // Colours assigned to values >= each step
    // //             500, '#e31a1c',
    // //             1000, '#fc4e2a',
    // //             2500, '#fd8d3c'
    // //         ]
    // //     }
    // // });

    // // Draw GeoJSON labels using 'name' property
    // // map.addLayer({
    // //     'id': 'toronto-mus-labels',
    // //     'type': 'symbol',
    // //     'source': 'toronto-mus',
    // //     'layout': {
    // //         'text-field': ['get', 'name'],
    // //         'text-variable-anchor': ['bottom'],
    // //         'text-radial-offset': 0.5,
    // //         'text-justify': 'auto'
    // //     },
    // //     'paint': {
    // //         'text-color': 'blue'
    // //     }
    // // });

    // // map.addLayer({
    // //     'id': 'feature_labels',
    // //     'type': 'symbol',
    // //     'source': 'features',
    // //     // 'layout': {
    // //     //     'text-field': ['get', 'name'],
    // //     //     'text-variable-anchor': ['bottom'],
    // //     //     'text-radial-offset': 0.5,
    // //     //     'text-justify': 'auto'
    // //     // },
    // //     // 'paint': {
    // //     //     'text-color': 'blue'
    // //     // }
    // // });
    // map.addSource('artwalk-route-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/ArtWalk_route.geojson'
    // });

    // map.addLayer({
    //     'id': 'artwalk-route-layer',
    //     'type': 'line',
    //     //'slot': 'top',
    //     'source': 'artwalk-route-data',
    //     'paint': {
    //         'line-color': BRAND_PINK,
    //         'line-width': 5,
    //         'line-opacity': ROUTE_OPACITY
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // });

    // map.addSource('artwalk-node-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/ArtWalk_nodes.geojson'
    // });

    // map.addLayer({
    //     'id': 'artwalk-node-layer',
    //     'type': 'circle',
    //     //'slot': 'top',
    //     'source': 'artwalk-node-data',
    //     'paint': {
    //         'circle-radius': 8,
    //         'circle-stroke-color': BRAND_LIGHT_PINK,
    //         'circle-color': BRAND_LIGHT_PINK,
    //         'circle-opacity': NODE_OPACITY,
    //         'circle-stroke-width': 0.5,
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // });

    // map.addSource('pubcrawl-route-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PubCrawl_routes.geojson'
    // });

    // map.addLayer({
    //     'id': 'pubcrawl-route-layer',
    //     'type': 'line',
    //     //'slot': 'top',
    //     'source': 'pubcrawl-route-data',
    //     'paint': {
    //         'line-color': BRAND_PINK,
    //         'line-width': 5,
    //         'line-opacity': ROUTE_OPACITY
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // });

    // map.addSource('pubcrawl-node-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PubCrawl_nodes.geojson'
    // });

    // map.addLayer({
    //     'id': 'pubcrawl-node-layer',
    //     'type': 'circle',
    //     //'slot': 'top',
    //     'source': 'pubcrawl-node-data',
    //     'paint': {
    //         'circle-radius': 8,
    //         'circle-stroke-color': BRAND_LIGHT_PINK,
    //         'circle-color': BRAND_LIGHT_PINK,
    //         'circle-opacity': NODE_OPACITY,
    //         'circle-stroke-width': 0.5,
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // });

    // map.addSource('datenight-route-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/DateNight_lines.geojson'
    // });

    // map.addLayer({
    //     'id': 'datenight-route-layer',
    //     'type': 'line',
    //     //'slot': 'top',
    //     'source': 'datenight-route-data',
    //     'paint': {
    //         'line-color': BRAND_PINK,
    //         'line-width': 5,
    //         'line-opacity': ROUTE_OPACITY
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // });

    // map.addSource('datenight-node-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/DateNight_nodes.geojson'
    // });

    // map.addLayer({
    //     'id': 'datenight-node-layer',
    //     'type': 'circle',
    //     //'slot': 'top',
    //     'source': 'datenight-node-data',
    //     'paint': {
    //         'circle-radius': 8,
    //         'circle-stroke-color': BRAND_LIGHT_PINK,
    //         'circle-color': BRAND_LIGHT_PINK,
    //         'circle-opacity': NODE_OPACITY,
    //         'circle-stroke-width': 0.5,
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // });

    // map.addSource('pagetoscreen-route-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PageToScreen_routes.geojson'
    // });

    // map.addLayer({
    //     'id': 'pagetoscreen-route-layer',
    //     'type': 'line',
    //     //'slot': 'top',
    //     'source': 'pagetoscreen-route-data',
    //     'paint': {
    //         'line-color': BRAND_PINK,
    //         'line-width': 5,
    //         'line-opacity': ROUTE_OPACITY
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }

    // });

    // map.addSource('pagetoscreen-node-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PageToScreen_nodes.geojson'
    // });

    // map.addLayer({
    //     'id': 'pagetoscreen-node-layer',
    //     'type': 'circle',
    //     //'slot': 'top',
    //     'source': 'pagetoscreen-node-data',
    //     'paint': {
    //         'circle-radius': 5,
    //         'circle-stroke-color': BRAND_LIGHT_PINK,
    //         'circle-color': BRAND_LIGHT_PINK,
    //         'circle-opacity': NODE_OPACITY,
    //         'circle-stroke-width': 0.5,
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // });
    // map.addSource('pupcrawl-route-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PupCrawl_routes.geojson'
    // });

    // map.addLayer({
    //     'id': 'pupcrawl-route-layer',
    //     'type': 'line',
    //     'source': 'pupcrawl-route-data',
    //     'paint': {
    //         'line-color': BRAND_LIGHT_BLUE,
    //         'line-width': 5,
    //         'line-opacity': ROUTE_OPACITY
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // });

    // map.addSource('pupcrawl-node-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PupCrawl_nodes.geojson'
    // });

    // map.addLayer({
    //     'id': 'pupcrawl-node-layer',
    //     'type': 'circle',
    //     'source': 'pupcrawl-node-data',
    //     'paint': {
    //         'circle-radius': 8,
    //         'circle-stroke-color': BRAND_LIGHT_BLUE,
    //         'circle-color': BRAND_LIGHT_BLUE,
    //         'circle-opacity': NODE_OPACITY,
    //         'circle-stroke-width': 0.5,
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // });

    // for (let i = 0; i < CARD_IDS.length; i++) {
    //     let card_id = CARD_IDS[i];
    //     let node_id = CARD_ID_TO_LAYER_INFO[card_id]['node_layer_id'];
    //     let node_source_id = CARD_ID_TO_LAYER_INFO[card_id]['node_source_id'];
    //     map.addLayer({
    //         'id': node_id + '-label',
    //         'type': 'symbol',
    //         'slot': 'top',
    //         'source': node_source_id,
    //         'minzoom': 15,
    //         // 'paint': {
    //         //     'line-color': BRAND_YELLOW,
    //         //     'line-width': 3
    //         // },
    //         'paint': {
    //             'text-color': BRAND_LIGHT_PINK,
    //             'text-halo-color': 'black',
    //             'text-halo-width': 0.1
    //         },
    //         'layout': {
    //             'text-field': '{name}',
    //             'text-anchor': 'top',
    //             'text-offset': [0, 0.5],
    //             'visibility': 'none'
    //         }
    //     });
    // }

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


function make_route_visible(route_layer_id, node_layer_id, layer_center) {
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
    map.flyTo({
        center: DEFAULT_CENTER,
        zoom: 14,
        essential: true
    })
}

function fly_to_layer_extent(layer_center, zoom = 15) {
    map.flyTo({
        center: layer_center,
        zoom: zoom,
        essential: true
    })
}

function make_popup(e) {
    let this_node = e.features[0];
    let this_html = ''

    if (this_node.properties.img) {
        path = this_node.properties.img;
        this_html += '<img src =' + path + 'width="200" height = "100"><br><br>';
    }

    this_html += "<h6>" + this_node.properties.name + "</h6>"
    this_html += '<h8>' + this_node.properties.desc + '<h8>'

    if (e.features[0].properties.address) {
        this_html += '<br><p>' + this_node.properties.address + '<p>'
    }
    popup = new mapboxgl.Popup({ "closeButton": false })
        .setLngLat(e.lngLat) // Use method to set coordinates of popup based on mouse click location
        .setHTML(this_html)
        .addTo(map);

    return popup;
}

/*--------------------------------------------------------------------
EVENT LISTENERS FOR MAP CHANGES
--------------------------------------------------------------------*/

// DEFAULT CENTER to view full beaches map
const DEFAULT_CENTER = [-79.305089, 43.670681];
let CURRENT_CENTER = DEFAULT_CENTER;

// this ensures only one route/node combination is selected at a time


// map.on('click', (e) => {
//     new mapboxgl.Popup()
//         .setLngLat(e.lngLat)
//         .setHTML(e.lngLat)
//         .addTo(map);
// })
map.once('idle', () =>{
    heatmap_layer = map.getStyle().layers[83]['id'];
    map.setLayoutProperty(
        heatmap_layer,
        'visibility',
        'none'
    )

    for (let card_id in CARD_TO_INFO) {
        let route_layer = CARD_TO_INFO[card_id]['route_layer'];
        let node_layer = CARD_TO_INFO[card_id]['node_layer'];
        let center = CARD_TO_INFO[card_id]['center'];

        // mouse enters a card -> toggle layer visibility
        document.getElementById(card_id).addEventListener("mouseenter", (e) => {
            console.log(card_id, node_layer)
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
            if (click_selected_node_id == node_layer) {
                // THIS IS ALREADY CLICKED -> DESELECT IT
                make_route_invisible(route_id, node_layer);

                // heat map specifications
                if (node_layer == CARD_TO_INFO['card-ivan-forrest']['node_layer'] || node_layer == CARD_TO_INFO['card-kew']['node_layer']) {//CARD_ID_TO_LAYER_INFO['card-ivan-forrest']['node_layer_id'] || node_id == CARD_ID_TO_LAYER_INFO['card-kew']['node_layer_id']) {
                    // make heatmap invisible
                }

                click_selected_node_id = 'none';
                click_selected_route_id = 'none';
                // do not change extent
            } else {
                // THIS IS NOT ALREADY CLICKED -> SELECT IT
                make_route_visible(route_layer, node_layer, center);
                if (node_layer == CARD_TO_INFO['card-ivan-forrest']['node_layer'] || node_layer == CARD_TO_INFO['card-kew']['node_layer']) {
                    // make heatmap visible
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

        map.on('mouseenter', node_layer, (e) => {
            popup = make_popup(e)
        });

        map.on('mouseleave', node_layer, () => {
            // get rid of popups when mouse leaves
            popup.remove();
        });

        map.on('touchstart', node_layer, (e) => {
            popup = make_popup(e)
            console.log('MAP LISTENER NODE')
        })

        map.on('touchend', () => { //new_routes[i]['node_layer_id'],
            // get rid of popups when mouse leaves
            popup.remove();
        });

    }
});


// for (let i = 0; i < CARD_IDS.length; i++) { // over the list of card id's

//     // fetch their information here for cleanliness
//     let card_id = CARD_IDS[i];
//     let route_id = CARD_ID_TO_LAYER_INFO[card_id]['route_layer_id'];
//     let node_id = CARD_ID_TO_LAYER_INFO[card_id]['node_layer_id'];
//     let center = CARD_ID_TO_LAYER_INFO[card_id]['center'];

//     // mouse enters a card -> toggle layer visibility
//     document.getElementById(card_id).addEventListener("mouseenter", (e) => {
//         if (click_selected_node_id != node_id) {
//             // IF THIS LAYER IS NOT CURRENTLY CLICK-SELECTED
//             // HOVER-SELECT IT
//             make_route_visible(route_id, node_id, center);
//             fly_to_layer_extent(center);
//             hover_selected_node_id = node_id;
//             hover_selected_route_id = route_id;
//         } else {
//             fly_to_layer_extent(center);
//         }
//     });

//     // mouse leaves a card -> toggle layer visibility
//     document.getElementById(card_id).addEventListener("mouseleave", (e) => {
//         if (click_selected_node_id != node_id) {
//             // NOT CURRENTLY CLICK-SELECTED -> WE ARE EXITING A HOVER
//             make_route_invisible(route_id, node_id);
//             //fly_to_default_extent();
//             fly_to_layer_extent(CURRENT_CENTER);
//             hover_selected_node_id = 'none';
//             hover_selected_route_id = 'none';
//         }

//     });

//     // click -> previously selected route becomes invisible and deselected, clicked route becomes selected, visible, and centered
//     document.getElementById(card_id).addEventListener("click", (e) => {
//         if (click_selected_node_id == node_id) {
//             // THIS IS ALREADY CLICKED -> DESELECT IT
//             make_route_invisible(route_id, node_id);
//             if (node_id == CARD_ID_TO_LAYER_INFO['card-ivan-forrest']['node_layer_id'] || node_id == CARD_ID_TO_LAYER_INFO['card-kew']['node_layer_id']) {
//                 // make heatmap invisible
//             }
//             click_selected_node_id = 'none';
//             click_selected_route_id = 'none';
//             // do not change extent
//         } else {
//             // THIS IS NOT ALREADY CLICKED -> SELECT IT
//             make_route_visible(route_id, node_id, center);
//             if (node_id == CARD_ID_TO_LAYER_INFO['card-ivan-forrest']['node_layer_id'] || node_id == CARD_ID_TO_LAYER_INFO['card-kew']['node_layer_id']) {
//                 // make heatmap visible
//             }
//             make_route_invisible(click_selected_route_id, click_selected_node_id)
//             fly_to_layer_extent(center);
//             click_selected_route_id = route_id;
//             click_selected_node_id = node_id;
//             CURRENT_CENTER = center;
//         }

//     });

//     // NOW THE NODES

//     map.on('mouseenter', node_id, (e) => {
//         popup = make_popup(e)
//     });

//     map.on('mouseleave', node_id, () => {
//         // get rid of popups when mouse leaves
//         popup.remove();
//     });

//     map.on('touchstart', node_id, (e) => {
//         popup = make_popup(e)
//         console.log('MAP LISTENER NODE')
//     })

//     map.on('touchend', () => { //new_routes[i]['node_layer_id'],
//         // get rid of popups when mouse leaves
//         popup.remove();
//     });
// }
