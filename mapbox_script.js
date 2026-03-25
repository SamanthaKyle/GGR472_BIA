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
    style: 'mapbox://styles/sam-kyle/cmmz1k1a4000o01qm7s9sevt1',
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

const ROUTE_OPACITY = 0.7;
const NODE_OPACITY = 1;
// Esri color ramps - Esri Purple 2
// #73377eff,#9753a3ff,#b983c3ff,#daafe1ff,#eac5f0ff
// const colors = ["#73377eff", "#9753a3ff", "#b983c3ff", "#daafe1ff", "#eac5f0ff"];
// // Esri color ramps - Garden Grass
// // #4d8c8cff,#6fa9aaff,#99c5b6ff,#cbe0b2ff,#e3f1d2ff
// const colors = ["#4d8c8cff", "#6fa9aaff", "#99c5b6ff", "#cbe0b2ff", "#e3f1d2ff"];

// // Esri color ramps - Heatmap 16
// // #b397b3ff,#bd84bdff,#c672c6ff,#d05fd0ff,#d94cd9ff,#e339e3ff,#ec26ecff,#f613f6ff,#ff00ffff,#ff3bbfff,#ff7580ff,#ffb040ff,#ffea00ff
// const colors = ["#b397b3ff", "#bd84bdff", "#c672c6ff", "#d05fd0ff", "#d94cd9ff", "#e339e3ff", "#ec26ecff", "#f613f6ff", "#ff00ffff", "#ff3bbfff", "#ff7580ff", "#ffb040ff", "#ffea00ff"];

// BRANDING COLOURS
const BRAND_WHITE = '#e8f8ff'
const BRAND_LIGHT_BLUE = '#a6ddf4'
const BRAND_YELLOW = '#ffebb5'
const BRAND_PINK = '#d90368'
const BRAND_LIGHT_PINK = '#f385b9'
const BRAND_GREEN = '#04a777'
const BRAND_DARK_BLUE = '#000f4d'
const BRAND_LIGHT_PURPLE = '#d1d8e9'
const BRAND_PEACH = '#f8d8aa'
const BRAND_ORANGE = '#e27237'
const BRAND_BROWN = '#9a8f6e'
const BRAND_TAUPE = '#b19074'

// list of existing card ids (for event listeners)
const CARD_IDS = ['card-ivan-forrest', 'card-kew', 'card-pub-crawl', 'card-date-night', 'card-artwalk', 'card-page-to-screen']

// dictionary mapping card id's to their corresponding route layer, node layer, and center point
// this will allow for event listeners to be automatically created with a smaller amount of code
// useful as we expect to create many many more cards in the coming weeks
const CARD_ID_TO_LAYER_INFO = {
    'card-ivan-forrest':
        { 'node_source_id': 'ivan-gardens-node-data', 'route_layer_id': 'ivan-gardens-route-layer', 'node_layer_id': 'ivan-gardens-node-layer', 'center': [-79.29407743073317, 43.67414933330741] },
    'card-kew':
        {'node_source_id': 'kew-gardens-node-data', 'route_layer_id': 'kew-gardens-route-layer', 'node_layer_id': 'kew-gardens-node-layer', 'center': [-79.2984377648393, 43.66840672830028] },
    'card-pub-crawl':
        {'node_source_id': 'pubcrawl-node-data', 'route_layer_id': 'pubcrawl-route-layer', 'node_layer_id': 'pubcrawl-node-layer', 'center': [-79.293212, 43.671496] },
    'card-date-night':
        {'node_source_id': 'datenight-node-data', 'route_layer_id': 'datenight-route-layer', 'node_layer_id': 'datenight-node-layer', 'center': [-79.295706, 43.671042] },
    'card-artwalk':
        {'node_source_id': 'artwalk-node-data', 'route_layer_id': 'artwalk-route-layer', 'node_layer_id': 'artwalk-node-layer', 'center': [-79.293947, 43.669808] },
    'card-page-to-screen':
        { 'node_source_id': 'pagetoscreen-node-data', 'route_layer_id': 'pagetoscreen-route-layer', 'node_layer_id': 'pagetoscreen-node-layer', 'center': [-79.292337, 43.671849] }
}

/*--------------------------------------------------------------------
PRELOAD ICONS
--------------------------------------------------------------------*/
//const test_path = 'https://github.com/SamanthaKyle/GGR472_BIA/blob/main/icons/bike.png?raw=true'
const test_path = 'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png'
//const test_path = 'https://github.com/SamanthaKyle/GGR472_BIA/blob/main/icons/bike2.png?raw=true'
//const test_path = 'https://github.com/SamanthaKyle/GGR472_BIA/raw/e24e26c71054470033c8d43eb16b21cdea59fcf6/icons/bike.png'
//const test_path = 'https://github.com/SamanthaKyle/GGR472_BIA/blob/039c6dfaa6153fba0cdcc629656ce893675b8e09/images/beaches_n_cream.png?raw=true'

// map.addSource('test-source-id', {
//     type: 'image',
//     url: 'https://github.com/SamanthaKyle/GGR472_BIA/blob/main/icons/bike.png?raw=true'
// });

// const image = new Image(30,30);
// image.src = 'https://github.com/SamanthaKyle/GGR472_BIA/blob/main/icons/bike.png?raw=true'
// const images = ['myImage', image]

// console.log('MADE IMAGE', images)

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
            'line-color': BRAND_WHITE,
            'line-width': 1
        }
    });

    // Greenspaces poly - always visible - not present in legend
    map.addSource('green-spaces-poly', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/main/emmett_data/aziza_geojsons_cleaned/green_spaces.geojson'
        //'https://smith-lg.github.io/ggr472-wk6-demo/data/torontomusicvenues.geojson'
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

    // Tributaries - default visible - not on legend

    map.addSource('tributaries-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/main/emmett_data/aziza_geojsons_cleaned/tributaries.geojson'
    })

    map.addLayer({
        'id': 'tributaries-layer',
        'type': 'line',
        'source': 'tributaries-data',
        'paint': {
            'line-color': BRAND_LIGHT_BLUE
        }
    });

    // water bodies - default visible - not on legend
    map.addSource('waterbodies-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/main/emmett_data/aziza_geojsons_cleaned/waterbodies.geojson'
    })

    map.addLayer({
        'id': 'waterbodies-layer',
        'type': 'fill',
        'source': 'waterbodies-data',
        'paint': {
            'fill-color': BRAND_LIGHT_BLUE // from branding package
        }
    });

    // pedestrian walking edges - NOT ADDED 
    // map.addSource('walking-edges', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/main/emmett_data/walking_network_edges_updated.geojson'
    // });

    console.log(map.getStyle().layers);
    //map.getStyle().layers[0]['paint'] = {'icon-color': 'red'};
    console.log(map.getStyle().layers);
    // let bikes2 = map.getStyle().layers[2]['id']
    // console.log(bikes)
    // map.addPaintProperty(bikes, 'icon-color', 'red')
    // map.setLayoutProperty(bikes, 'visibility', 'none');
    // map.setPaintProperty(bikes2, 'icon-color', 'red');
    //map.setLayoutProperty(bikes2, 'visibility', 'none');

    //map.setPaintProperty(bikes, 'fill-color', 'red');//{'icon-color': 'white', 'icon-halo-color': 'red', 'icon-halo-width': 0.3})
    //map.setPaintProperty('waterbodies-layer', 'fill-color','red')


    // Bikeshare stations - visible on high zoom value - present in legend
    // map.addSource('bikeshare-stations-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/bikeshare_cleaned.geojson'
    // });

    // map.addSource('bike-test', {
    //     type: 'vector',
    //     url: 'mapbox://sam-kyle.ce6jclwa'
    // })

    // map.addLayer({
    //     'id': 'test-bike-layer',
    //     'type': 'symbol',

    // })
    // Image loading for bikeshare icons
    // map.addImage('bike', 'test-source-id', {sdf:true});
    // map.addImage('tes', 'myImage');
    // map.addLayer({
    //     'id': 'bike-icon-layer',
    //     'type': 'symbol',
    //     'source': 'bikeshare-stations-data', // reference the data source
    //     'layout': {
    //         // 'icon-allow-overlap': true,
    //         'icon-image': 'tes', // reference the image
            
    //         // 'icon-size': CLASS_1_SIZE
    //     }
    //     ,images: { images },
    //     // 'paint': {
    //     //     //'icon-color': 'white',
    //     //     // 'icon-halo-color': 'red', //update if necessary
    //     //     // 'icon-halo-width': 0.3
    //     // },
    //     //'minzoom': CLASS_1_MINZOOM
    // });
    // map.loadImage(
    //     test_path,
    //     (error, image) => {
    //         if (error) throw error;

    //         // Add the image to the map style.
    //         map.addImage('cat', image, { sdf: true });

    //         // Add a layer to use the image to represent the data.
    //         map.addLayer({
    //             'id': 'bike-icon-layer',
    //             'type': 'symbol',
    //             'source': 'bikeshare-stations-data', // reference the data source
    //             'layout': {
    //                 'icon-allow-overlap': true,
    //                 'icon-image': 'cat', // reference the image
    //                 'icon-size': CLASS_1_SIZE
    //             },
    //             'paint': {
    //                 'icon-color': 'white',
    //                 // 'icon-halo-color': 'red', //update if necessary
    //                 // 'icon-halo-width': 0.3
    //             },
    //             'minzoom': CLASS_1_MINZOOM
    //         });
    //     }
    // );

    // // Circle layer for bikeshare logo
    // map.addLayer({
    //     'id': 'bikeshare-stations-layer',
    //     'type': 'circle',
    //     'source': 'bikeshare-stations-data',
    //     'paint': {
    //         'circle-radius': 13,
    //         'circle-color': '#5bb163', //taken from official logo
    //         'circle-stroke-color': '#346e55', // taken from official logo
    //         'circle-stroke-width': 2,
    //         'circle-opacity': 1
    //     },
    //     'minzoom': CLASS_1_MINZOOM

    // });

    // City of Toronto Parking - visible on high zoom value - present in legend

    // map.addSource('city-parking-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/greenp_cleaned.geojson'
    // });

    // map.loadImage(
    //     test_path,
    //     (error, image) => {
    //         if (error) throw error;

    //         // Add the image to the map style.
    //         map.addImage('cat', image, { sdf: true });

    //         // Add a layer to use the image to represent the data.
    //         map.addLayer({
    //             'id': 'city-parking-icon-layer',
    //             'type': 'symbol',
    //             'source': 'city-parking-data', // reference the data source
    //             'layout': {
    //                 'icon-allow-overlap': true,
    //                 'icon-image': 'cat', // reference the image
    //                 'icon-size': CLASS_1_SIZE
    //             },
    //             'paint': {
    //                 'icon-color': 'black',
    //                 // 'icon-halo-color': 'red', //update if necessary
    //                 // 'icon-halo-width': 0.3
    //             },
    //             'minzoom': CLASS_1_MINZOOM
    //         });
    //     }
    // );

    // Circle layer for city parking
    // map.addLayer({
    //     'id': 'city-parking-layer',
    //     'type': 'circle',
    //     'source': 'city-parking-data',
    //     'paint': {
    //         'circle-radius': 13,
    //         'circle-color': '#5bb163', //taken from official logo
    //         'circle-stroke-color': '#346e55', // taken from official logo
    //         'circle-stroke-width': 2,
    //         'circle-opacity': 1
    //     },
    //     'minzoom': CLASS_1_MINZOOM

    // });

    // Benches - visible on extra high zoom - present in legend

    // map.addSource('benches-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/aziza_geojsons_cleaned/benches.geojson'
    // })

    // map.loadImage(
    //     test_path,
    //     (error, image) => {
    //         if (error) throw error;

    //         // Add the image to the map style.
    //         map.addImage('cat', image, { sdf: true });

    //         // Add a layer to use the image to represent the data.
    //         map.addLayer({
    //             'id': 'benches-icon-layer',
    //             'type': 'symbol',
    //             'source': 'benches-data', // reference the data source
    //             'layout': {
    //                 'icon-allow-overlap': true,
    //                 'icon-image': 'cat', // reference the image
    //                 'icon-size': CLASS_2_SIZE
    //             },
    //             'paint': {
    //                 'icon-color': BRAND_YELLOW,
    //                 // 'icon-halo-color': 'red', //update if necessary
    //                 // 'icon-halo-width': 0.3
    //             },
    //             'minzoom': CLASS_2_MINZOOM
    //         });
    //     }
    // );

    // Bike Rings - visible on extra high zoom - present in legend

    // map.addSource('bike-ring-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/aziza_geojsons_cleaned/bike_rings.geojson'
    // })

    // map.loadImage(
    //     test_path,
    //     (error, image) => {
    //         if (error) throw error;

    //         // Add the image to the map style.
    //         map.addImage('cat', image, { sdf: true });

    //         // Add a layer to use the image to represent the data.
    //         map.addLayer({
    //             'id': 'bike-ring-icon-layer',
    //             'type': 'symbol',
    //             'source': 'bike-ring-data', // reference the data source
    //             'layout': {
    //                 'icon-allow-overlap': true,
    //                 'icon-image': 'cat', // reference the image
    //                 'icon-size': CLASS_2_SIZE
    //             },
    //             'paint': {
    //                 'icon-color': BRAND_ORANGE,
    //                 // 'icon-halo-color': 'red', //update if necessary
    //                 // 'icon-halo-width': 0.3
    //             },
    //             'minzoom': CLASS_2_MINZOOM
    //         });
    //     }
    // );

    // Public Washrooms - visible on extra high zoom - present in legend

    // map.addSource('washrooms-data', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/aziza_geojsons_cleaned/public_washrooms.geojson'
    // })

    // map.loadImage(
    //     test_path,
    //     (error, image) => {
    //         if (error) throw error;

    //         // Add the image to the map style.
    //         map.addImage('cat', image, { sdf: true });

    //         // Add a layer to use the image to represent the data.
    //         map.addLayer({
    //             'id': 'washrooms-icon-layer',
    //             'type': 'symbol',
    //             'source': 'washrooms-data', // reference the data source
    //             'layout': {
    //                 'icon-allow-overlap': true,
    //                 'icon-image': 'cat', // reference the image
    //                 'icon-size': CLASS_2_SIZE
    //             },
    //             'paint': {
    //                 'icon-color': 'white',
    //                 'icon-halo-color': 'grey', //update if necessary
    //                 'icon-halo-width': 0.3
    //             },
    //             'minzoom': CLASS_2_MINZOOM
    //         });
    //     }
    // );

    // ROUTES - visible on hover or click

    map.addSource('ivan-gardens-route-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/ivan_forrest_glen_stewart_route_cleaned.geojson'
    })

    map.addLayer({
        'id': 'ivan-gardens-route-layer',
        'slot': 'top',
        'type': 'line',
        'source': 'ivan-gardens-route-data',
        'paint': {
            'line-color': BRAND_GREEN,
            'line-width': 3,
            'line-opacity': ROUTE_OPACITY,
        },
        'layout': {
            'visibility': 'none'
        }
    })

    map.addSource('ivan-gardens-node-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/Ivan_Forrest_GlenStewart_Ravine_Nodes.geojson'
    })

    map.addLayer({
        'id': 'ivan-gardens-node-layer',
        'type': 'circle',
        'slot': 'top',
        'source': 'ivan-gardens-node-data',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-color': BRAND_PEACH,
            'circle-stroke-width': 0.3,
            'circle-color': BRAND_PEACH,
            'circle-opacity': NODE_OPACITY
        },
        'layout': {
            'visibility': 'none'
        }
    })

    map.addSource('kew-gardens-route-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/kew_gardens_route_cleaned.geojson'
    })

    map.addLayer({
        'id': 'kew-gardens-route-layer',
        'type': 'line',
        'slot': 'top',
        'source': 'kew-gardens-route-data',
        'paint': {
            'line-color': BRAND_GREEN,
            'line-width': 3,
            'line-opacity': ROUTE_OPACITY
        },
        'layout': {
            'visibility': 'none'
        }
    })

    map.addSource('kew-gardens-node-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/Kew_Gardens_Park_Node.geojson'
    })
    map.addLayer({
        'id': 'kew-gardens-node-layer',
        'type': 'circle',
        'slot': 'top',
        'source': 'kew-gardens-node-data',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-color': BRAND_PEACH,
            'circle-color': BRAND_PEACH,
            'circle-opacity': NODE_OPACITY,
            'circle-stroke-width': 0.3,
        },
        'layout': {
            'visibility': 'none'
        }
    })
    // map.addLayer({
    //     'id': 'basketball-courts',
    //     'type': 'fill',
    //     'source': 'basketball-courts-poly',
    //     'paint': {
    //         'fill-color': '#a3995d',
    //         'fill-opacity': 1
    //     }
    // });

    // Draw GeoJSON points
    // map.addLayer({
    //     'id': 'toronto-mus-pnts',
    //     'type': 'circle',
    //     'source': 'toronto-mus',
    //     'paint': {
    //         'circle-radius': [
    //             'interpolate', //INTERPOLATE expression produces continuous results by interplating between value pairs
    //             ['linear'], //linear interpolation between stops but could be exponential ['exponential', base] where base controls rate at which output increases
    //             ['zoom'], //zoom expression changes appearance with zoom level
    //             10, 5, // when zoom is 10 (or less), radius will be 5px
    //             12, ['/', ['get', 'capacity'], 20] // when zoom is 12 (or greater), radius will be capacity/20
    //         ],
    //         'circle-color': [
    //             'step', // STEP expression produces stepped results based on value pairs
    //             ['get', 'capacity'], // GET expression retrieves property value from 'capacity' data field
    //             '#800026', // Colour assigned to any values < first step
    //             150, '#bd0026', // Colours assigned to values >= each step
    //             500, '#e31a1c',
    //             1000, '#fc4e2a',
    //             2500, '#fd8d3c'
    //         ]
    //     }
    // });

    // Draw GeoJSON labels using 'name' property
    // map.addLayer({
    //     'id': 'toronto-mus-labels',
    //     'type': 'symbol',
    //     'source': 'toronto-mus',
    //     'layout': {
    //         'text-field': ['get', 'name'],
    //         'text-variable-anchor': ['bottom'],
    //         'text-radial-offset': 0.5,
    //         'text-justify': 'auto'
    //     },
    //     'paint': {
    //         'text-color': 'blue'
    //     }
    // });

    // map.addLayer({
    //     'id': 'feature_labels',
    //     'type': 'symbol',
    //     'source': 'features',
    //     // 'layout': {
    //     //     'text-field': ['get', 'name'],
    //     //     'text-variable-anchor': ['bottom'],
    //     //     'text-radial-offset': 0.5,
    //     //     'text-justify': 'auto'
    //     // },
    //     // 'paint': {
    //     //     'text-color': 'blue'
    //     // }
    // });
    map.addSource('artwalk-route-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/ArtWalk_route.geojson'
    });

    map.addLayer({
        'id': 'artwalk-route-layer',
        'type': 'line',
        'slot': 'top',
        'source': 'artwalk-route-data',
        'paint': {
            'line-color': BRAND_PINK,
            'line-width': 3,
            'line-opacity': ROUTE_OPACITY
        },
        'layout': {
            'visibility': 'none'
        }
    });

    map.addSource('artwalk-node-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/ArtWalk_nodes.geojson'
    });

    map.addLayer({
        'id': 'artwalk-node-layer',
        'type': 'circle',
        'slot': 'top',
        'source': 'artwalk-node-data',
        'paint': {
            'circle-radius': 8,
            'circle-stroke-color': BRAND_LIGHT_PINK,
            'circle-color': BRAND_LIGHT_PINK,
            'circle-opacity': NODE_OPACITY,
            'circle-stroke-width': 0.3,
        },
        'layout': {
            'visibility': 'none'
        }
    });

    map.addSource('pubcrawl-route-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PubCrawl_routes.geojson'
    });

    map.addLayer({
        'id': 'pubcrawl-route-layer',
        'type': 'line',
        'slot': 'top',
        'source': 'pubcrawl-route-data',
        'paint': {
            'line-color': BRAND_PINK,
            'line-width': 3,
            'line-opacity': ROUTE_OPACITY
        },
        'layout': {
            'visibility': 'none'
        }
    });

    map.addSource('pubcrawl-node-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PubCrawl_nodes.geojson'
    });

    map.addLayer({
        'id': 'pubcrawl-node-layer',
        'type': 'circle',
        'slot': 'top',
        'source': 'pubcrawl-node-data',
        'paint': {
            'circle-radius': 8,
            'circle-stroke-color': BRAND_LIGHT_PINK,
            'circle-color': BRAND_LIGHT_PINK,
            'circle-opacity': NODE_OPACITY,
            'circle-stroke-width': 0.3,
        },
        'layout': {
            'visibility': 'none'
        }
    });

    map.addSource('datenight-route-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/DateNight_lines.geojson'
    });

    map.addLayer({
        'id': 'datenight-route-layer',
        'type': 'line',
        'slot': 'top',
        'source': 'datenight-route-data',
        'paint': {
            'line-color': BRAND_PINK,
            'line-width': 3,
            'line-opacity': ROUTE_OPACITY
        },
        'layout': {
            'visibility': 'none'
        }
    });

    map.addSource('datenight-node-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/DateNight_nodes.geojson'
    });

    map.addLayer({
        'id': 'datenight-node-layer',
        'type': 'circle',
        'slot': 'top',
        'source': 'datenight-node-data',
        'paint': {
            'circle-radius': 8,
            'circle-stroke-color': BRAND_LIGHT_PINK,
            'circle-color': BRAND_LIGHT_PINK,
            'circle-opacity': NODE_OPACITY,
            'circle-stroke-width': 0.3,
        },
        'layout': {
            'visibility': 'none'
        }
    });

    map.addSource('pagetoscreen-route-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PageToScreen_routes.geojson'
    });

    map.addLayer({
        'id': 'pagetoscreen-route-layer',
        'type': 'line',
        'slot': 'top',
        'source': 'pagetoscreen-route-data',
        'paint': {
            'line-color': BRAND_PINK,
            'line-width': 3,
            'line-opacity': ROUTE_OPACITY
        },
        'layout': {
            'visibility': 'none'
        }
        
    });

    map.addSource('pagetoscreen-node-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/PageToScreen_nodes.geojson'
    });

    map.addLayer({
        'id': 'pagetoscreen-node-layer',
        'type': 'circle',
        'slot': 'top',
        'source': 'pagetoscreen-node-data',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-color': BRAND_LIGHT_PINK,
            'circle-color': BRAND_LIGHT_PINK,
            'circle-opacity': NODE_OPACITY,
            'circle-stroke-width': 0.3,
        },
        'layout': {
            'visibility': 'none'
        }
    });

    
    for (let i = 0; i < CARD_IDS.length; i++) {
        let card_id = CARD_IDS[i];
        let node_id = CARD_ID_TO_LAYER_INFO[card_id]['node_layer_id'];
        let node_source_id = CARD_ID_TO_LAYER_INFO[card_id]['node_source_id'];
        map.addLayer({
            'id': node_id + '-label',
            'type': 'symbol',
            'slot': 'top',
            'source': node_source_id,
            'minzoom': 15,
            // 'paint': {
            //     'line-color': BRAND_YELLOW,
            //     'line-width': 3
            // },
            'paint' : {
                'text-color': BRAND_WHITE,
                'text-halo-color': BRAND_PINK,
                'text-halo-width': 0.1
            },
            'layout': {
                'text-field' : '{name}',
                'text-anchor': 'top',
                'text-offset' : [0, 0.5],
                'visibility': 'none'
            }
        });
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
        node_layer_id + '-label',
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
        node_layer_id + '-label',
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

for (let i = 0; i < CARD_IDS.length; i++) { // over the list of card id's

    // fetch their information here for cleanliness
    let card_id = CARD_IDS[i];
    let route_id = CARD_ID_TO_LAYER_INFO[card_id]['route_layer_id'];
    let node_id = CARD_ID_TO_LAYER_INFO[card_id]['node_layer_id'];
    let center = CARD_ID_TO_LAYER_INFO[card_id]['center'];

    // mouse enters a card -> toggle layer visibility
    document.getElementById(card_id).addEventListener("mouseenter", (e) => {
        if (click_selected_node_id != node_id) {
            // IF THIS LAYER IS NOT CURRENTLY CLICK-SELECTED
            // HOVER-SELECT IT
            make_route_visible(route_id, node_id, center);
            fly_to_layer_extent(center);
            hover_selected_node_id = node_id;
            hover_selected_route_id = route_id;
        } else {
            fly_to_layer_extent(center);
        }
    });

    // mouse leaves a card -> toggle layer visibility
    document.getElementById(card_id).addEventListener("mouseleave", (e) => {
        if (click_selected_node_id != node_id) {
            // NOT CURRENTLY CLICK-SELECTED -> WE ARE EXITING A HOVER
            make_route_invisible(route_id, node_id);
            //fly_to_default_extent();
            fly_to_layer_extent(CURRENT_CENTER);
            hover_selected_node_id = 'none';
            hover_selected_route_id = 'none';
        }

    });

    // click -> previously selected route becomes invisible and deselected, clicked route becomes selected, visible, and centered
    document.getElementById(card_id).addEventListener("click", (e) => {
        if (click_selected_node_id == node_id) {
            // THIS IS ALREADY CLICKED -> DESELECT IT
            make_route_invisible(route_id, node_id);
            click_selected_node_id = 'none';
            click_selected_route_id = 'none';
            // do not change extent
        } else {
            // THIS IS NOT ALREADY CLICKED -> SELECT IT
            make_route_visible(route_id, node_id, center);
            make_route_invisible(click_selected_route_id, click_selected_node_id)
            fly_to_layer_extent(center);
            click_selected_route_id = route_id;
            click_selected_node_id = node_id;
            CURRENT_CENTER = center;
        }

    });

    // NOW THE NODES

    map.on('mouseenter', node_id, (e) => {
        popup = make_popup(e)
    });

    map.on('mouseleave', node_id, () => {
        // get rid of popups when mouse leaves
        popup.remove();
    });

    map.on('touchstart', node_id, (e) => {
        popup = make_popup(e)
        console.log('MAP LISTENER NODE')
    })

    map.on('touchend', () => { //new_routes[i]['node_layer_id'],
        // get rid of popups when mouse leaves
        popup.remove();
    });
}
