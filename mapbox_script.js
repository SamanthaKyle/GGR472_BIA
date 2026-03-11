/*--------------------------------------------------------------------
GGR472 BIA: Mapbox JavaScript file for Build Your Adventure Tool
--------------------------------------------------------------------*/


// Define access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtLWt5bGUiLCJhIjoiY21rZTR3NW82MDNjazNscHdvZGRoNTJlYyJ9.gXrPIIVvGXk6SEwdzrbd1g'; //***ADD YOUR PUBLIC ACCESS TOKEN***

// Initialize map
const map = new mapboxgl.Map({
    container: 'my-map', //container id in HTML
    style: 'mapbox://styles/mapbox/dark-v11',  //stylesheet location
    center: [-79.305089, 43.670681],  // starting point, longitude/latitude 43.652652, -79.393014
    zoom: 14 // starting zoom level
});

/*--------------------------------------------------------------------
DEFINE CONSTANTS
--------------------------------------------------------------------*/
const class1_minzoom = 15; // minzoom for class 1 features
const class2_minzoom = 16; //minzoom for class 2 features

const class1_size = 0.065
const class2_size = 0.05

// BRANDING COLOURS

const light_blue = '#b1daf0'
const light_purple = '#d1d8e9'
const peach = '#f8d8aa'
const orange = '#e27237'
const brown = '#9a8f6e'
const taupe = '#b19074'

/*--------------------------------------------------------------------
PRELOAD ICONS
--------------------------------------------------------------------*/
const bike_icon_path = 'https://github.com/SamanthaKyle/GGR472_BIA/blob/main/icons/bike.png?raw=true'
const test_path = 'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png'
//const test_path = 'https://github.com/SamanthaKyle/GGR472_BIA/raw/e24e26c71054470033c8d43eb16b21cdea59fcf6/icons/bike.png'

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
            'line-color': light_purple,
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
            'fill-color': '#187a34',
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
        'paint' : {
            'line-color': light_blue
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
            'fill-color': light_blue // from branding package
        }
    });


    // pedestrian walking edges - NOT ADDED 

    map.addSource('walking-edges', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/main/emmett_data/walking_network_edges_updated.geojson'
    });

    // Bikeshare stations - visible on high zoom value - present in legend
    map.addSource('bikeshare-stations-data', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/bikeshare_cleaned.geojson'
            });
    // Image loading for bikeshare icons
    map.loadImage(
        test_path,
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('cat', image, {sdf:true});

            // Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'bike-icon-layer',
                'type': 'symbol',
                'source': 'bikeshare-stations-data', // reference the data source
                'layout': {
                    'icon-allow-overlap': true,
                    'icon-image': 'cat', // reference the image
                    'icon-size': class1_size
                },
                'paint': {
                    'icon-color': 'white',
                    // 'icon-halo-color': 'red', //update if necessary
                    // 'icon-halo-width': 0.3
                },
                'minzoom': class1_minzoom
            });
        }
    );

    // Circle layer for bikeshare logo
    map.addLayer({
        'id': 'bikeshare-stations-layer',
        'type': 'circle',
        'source': 'bikeshare-stations-data',
        'paint': {
            'circle-radius': 13,
            'circle-color': '#5bb163', //taken from official logo
            'circle-stroke-color': '#346e55', // taken from official logo
            'circle-stroke-width': 2,
            'circle-opacity': 1
        },
        'minzoom': class1_minzoom

    });

    // City of Toronto Parking - visible on high zoom value - present in legend

    map.addSource('city-parking-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/greenp_cleaned.geojson'
    });

    map.loadImage(
        test_path,
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('cat', image, { sdf: true });

            // Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'city-parking-icon-layer',
                'type': 'symbol',
                'source': 'city-parking-data', // reference the data source
                'layout': {
                    'icon-allow-overlap': true,
                    'icon-image': 'cat', // reference the image
                    'icon-size': class1_size
                },
                'paint': {
                    'icon-color': 'black',
                    // 'icon-halo-color': 'red', //update if necessary
                    // 'icon-halo-width': 0.3
                },
                'minzoom': class1_minzoom
            });
        }
    );

    // Circle layer for city parking
    map.addLayer({
        'id': 'city-parking-layer',
        'type': 'circle',
        'source': 'city-parking-data',
        'paint': {
            'circle-radius': 13,
            'circle-color': '#5bb163', //taken from official logo
            'circle-stroke-color': '#346e55', // taken from official logo
            'circle-stroke-width': 2,
            'circle-opacity': 1
        },
        'minzoom': class1_minzoom

    });

    // Benches - visible on extra high zoom - present in legend

    map.addSource('benches-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/aziza_geojsons_cleaned/benches.geojson'
    })

    map.loadImage(
        test_path,
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('cat', image, { sdf: true });

            // Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'benches-icon-layer',
                'type': 'symbol',
                'source': 'benches-data', // reference the data source
                'layout': {
                    'icon-allow-overlap': true,
                    'icon-image': 'cat', // reference the image
                    'icon-size': class2_size
                },
                'paint': {
                    'icon-color': taupe,
                    // 'icon-halo-color': 'red', //update if necessary
                    // 'icon-halo-width': 0.3
                },
                'minzoom': class2_minzoom
            });
        }
    );

    // Bike Rings - visible on extra high zoom - present in legend

    map.addSource('bike-ring-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/aziza_geojsons_cleaned/bike_rings.geojson'
    })

    map.loadImage(
        test_path,
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('cat', image, { sdf: true });

            // Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'bike-ring-icon-layer',
                'type': 'symbol',
                'source': 'bike-ring-data', // reference the data source
                'layout': {
                    'icon-allow-overlap': true,
                    'icon-image': 'cat', // reference the image
                    'icon-size': class2_size
                },
                'paint': {
                    'icon-color': orange,
                    // 'icon-halo-color': 'red', //update if necessary
                    // 'icon-halo-width': 0.3
                },
                'minzoom': class2_minzoom
            });
        }
    );

    // Public Washrooms - visible on extra high zoom - present in legend

    map.addSource('washrooms-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/aziza_geojsons_cleaned/public_washrooms.geojson'
    })

    map.loadImage(
        test_path,
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('cat', image, { sdf: true });

            // Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'washrooms-icon-layer',
                'type': 'symbol',
                'source': 'washrooms-data', // reference the data source
                'layout': {
                    'icon-allow-overlap': true,
                    'icon-image': 'cat', // reference the image
                    'icon-size': class2_size
                },
                'paint': {
                    'icon-color': 'white',
                    'icon-halo-color': 'grey', //update if necessary
                    'icon-halo-width': 0.3
                },
                'minzoom': class2_minzoom
            });
        }
    );

    // ROUTES - visible on hover or click

    map.addSource('ivan-gardens-route-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/ivan_forrest_glen_stewart_route_cleaned.geojson'
    })

    map.addLayer({ 
        'id': 'ivan-gardens-route-layer',
        'type': 'line',
        'source': 'ivan-gardens-route-data',
        'paint': {
            'line-color' : peach,
            'line-width' : 3
        },
        'layout' : {
            'visibility' :'none'
        }
    })

    map.addSource('ivan-gardens-node-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/Ivan_Forrest_GlenStewart_Ravine_Nodes.geojson'
    })

    map.addLayer({
        'id': 'ivan-gardens-node-layer',
        'type': 'circle',
        'source': 'ivan-gardens-node-data',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-color': peach,
            'circle-stroke-width': 0.3,
        },
        'layout' : {
            'visibility' :'none'
        }
    })

    map.addSource('kew-gardens-route-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/emmett_data/routes/kew_gardens_route_cleaned.geojson'
    })

    map.addLayer({
        'id': 'kew-gardens-route-layer',
        'type': 'line',
        'source': 'kew-gardens-route-data',
        'paint': {
            'line-color': peach,
            'line-width': 3
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
        'source': 'kew-gardens-node-data',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-color': peach,
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

});

/*--------------------------------------------------------------------
EVENT LISTENERS FOR MAP CHANGES
--------------------------------------------------------------------*/

function toggle_card(e, route_layer_id, node_layer_id, layer_center) {
    //alert('mouse entered the thing')
    const visibility = map.getLayoutProperty(
        route_layer_id, 'visibility'
    )

    if (visibility == 'visible') { // if this card route is already visible
        // turn off visibility of route and nodes
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
        // and zoom to full extent
        map.flyTo({
            center: [-79.305089, 43.670681],  // starting point, longitude/latitude 43.652652, -79.393014
            zoom: 14,
            essential: true
        })

    } else { // if this card route is being selected
        // set the route and node layers to visible
        map.setLayoutProperty(
            route_layer_id,
            'visibility',
            'visible'
        )
        map.setLayoutProperty(
            node_layer_id,
            'visibility',
            'visible'
        )
        //fly to the extent of this route
        map.flyTo({
            center: layer_center,
            zoom: 15,
            essential: true
        })

    }
    
}

// Ivan Forrest Listeners
document.getElementById('card-ivan-forrest').addEventListener("mouseenter", (e) => {
    toggle_card(e, 'ivan-gardens-route-layer', 'ivan-gardens-node-layer', [-79.29407743073317, 43.67414933330741])
});

document.getElementById('card-ivan-forrest').addEventListener("mouseleave", (e) => {
    toggle_card(e, 'ivan-gardens-route-layer', 'ivan-gardens-node-layer', [-79.29407743073317, 43.67414933330741])
});

document.getElementById('card-kew').addEventListener("mouseenter", (e) => {
    toggle_card(e, 'kew-gardens-route-layer', 'kew-gardens-node-layer', [-79.2984377648393, 43.66840672830028])
});

document.getElementById('card-kew').addEventListener("mouseleave", (e) => {
    toggle_card(e, 'kew-gardens-route-layer', 'kew-gardens-node-layer', [-79.2984377648393, 43.66840672830028])
});

/*--------------------------------------------------------------------
EXAMPLE FILTERS
Data expressions: get, has
Conditional expressions: ==, >=, (etc.), any, all
--------------------------------------------------------------------*/
// //Filter data shown in layer
// 'filter': ['>=', ['get', 'capacity'], 1000]  //Only shows points with capacity >= 1000
// 'filter': ['==', ['get', 'name'], 'Horseshoe Tavern']
// 'filter': ['has', 'opentimes']
// 'filter': ['!', ['has', '...']]

// 'filter': ['any',    //ANY expression returns true if any inputs are met (OR)
//     ['==', ['get', 'name'], 'Horseshoe Tavern'],
//     ['==', ['get', 'name'], 'The Axis Club']] //returns features with name = "Horseshoe Tavern" or "The Axis Club"

// 'filter': ['all',    //ALL expression returns true if all inputs are met (AND)
//     ['==', ['get', 'name'], 'Horseshoe Tavern'],
//     ['==', ['get', 'name'], 'The Axis Club']] //returns features with name = "Horseshoe Tavern" or "The Axis Club"



/*--------------------------------------------------------------------
EXAMPLE APPLICATION OF CATEGORICAL COLOUR SCHEME
Data expressions: get
Ramp/scale expression: step
--------------------------------------------------------------------*/
//Changing colour of marker based on categories
//Uses step and get expressions
// [
//     'step', // STEP expression produces stepped results based on value pairs
//     ['get', 'capacity'], // GET expression retrieves property value from 'capacity' data field
//     '#800026', // Colour assigned to any values < first step
//     150, '#bd0026', // Colours assigned to values >= each step
//     500, '#e31a1c',
//     1000, '#fc4e2a',
//     2500, '#fd8d3c'
// ]



/*--------------------------------------------------------------------
EXAMPLE UPDATE OF MARKER SIZE BASED ON DATA VALUE AND ZOOM
Data expressions: get
Ramp/scale expression: interpolate (type: linear)
Camera expression: zoom
Maths expressions: /, *
--------------------------------------------------------------------*/
//Set marker size to (capacity/20) using Maths expressions
//['*', ['get', 'capacity'], 0.05]
//['/', ['get', 'capacity'], 20]

//Change marker size on zoom
//Uses interpolate operator to define linear relationship between zoom level and circle size
// [
//     'interpolate', //INTERPOLATE expression produces continuous results by interplating between value pairs
//     ['linear'], //linear interpolation between stops but could be exponential ['exponential', base] where base controls rate at which output increases
//     ['zoom'], //ZOOM expression changes appearance with zoom level
//     8, 1, // when zoom level is 8 or less, circle radius will be 1px
//     12, 10 // when zoom level is 12 or greater, circle radius will be 10px
// ]

// [
//     'interpolate', //INTERPOLATE expression produces continuous results by interplating between value pairs
//     ['linear'], //linear interpolation between stops but could be exponential ['exponential', base] where base controls rate at which output increases
//     ['zoom'], //zoom expression changes appearance with zoom level
//     10, 5, // when zoom is 10 (or less), radius will be 5px
//     12, ['/',['get', 'capacity'],20] // when zoom is 12 (or greater), radius will be capacity/20
// ]


