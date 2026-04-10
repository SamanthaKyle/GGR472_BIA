const CARD_TO_INFO = {
    'card-ivan-forrest':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/Ivan_Forrest_GlenStewart_Ravine_Nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/ivan_forrest_glen_stewart_route_cleaned.geojson',
        'center': [-79.29407743073317, 43.67414933330741], // use turf to get center?,
        'route_colour': BRAND_GREEN,
        'node_colours': [BRAND_PEACH, BRAND_PEACH],

    },
    'card-kew':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/Kew_Gardens_Park_Node.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/kew_gardens_route_cleaned.geojson',
        'center': [-79.2984377648393, 43.66840672830028],
        'route_colour': BRAND_GREEN,
        'node_colours': [BRAND_PEACH, BRAND_PEACH],
    },
    'card-pub-crawl':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PubCrawl_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PubCrawl_routes.geojson',
        'center': [-79.293212, 43.671496],
        'route_colour': BRAND_PINK,
        'node_colours': [BRAND_LIGHT_PINK, BRAND_LIGHT_PINK],
    },
    'card-date-night':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/DateNight_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/DateNight_lines.geojson',
        'center': [-79.295706, 43.671042],
        'route_colour': BRAND_PINK,
        'node_colours': [BRAND_LIGHT_PINK, BRAND_LIGHT_PINK],
    },
    'card-artwalk':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/ArtWalk_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/ArtWalk_route.geojson',
        'center': [-79.293947, 43.669808],
        'route_colour': BRAND_PINK,
        'node_colours': [BRAND_LIGHT_PINK, BRAND_LIGHT_PINK],
    },
    'card-page-to-screen':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PageToScreen_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PageToScreen_routes.geojson',
        'center': [-79.292337, 43.671849],
        'route_colour': BRAND_PINK,
        'node_colours': [BRAND_LIGHT_PINK, BRAND_LIGHT_PINK],
    },
    'card-pup-crawl':
    {
        'node_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PupCrawl_nodes.geojson',
        'route_url': 'https://raw.githubusercontent.com/SamanthaKyle/GGR472_BIA/refs/heads/main/data/routes/PupCrawl_routes.geojson',
        'center': [-79.2935, 43.6695],
        'route_colour': BRAND_LIGHT_BLUE,
        'node_colours': [BRAND_LIGHT_BLUE, BRAND_LIGHT_BLUE],
    }
}

function add_nodes(card_id) {
    let url = CARD_TO_INFO[card_id]['node_url'];
    let node_source = card_id + 'node-source';
    let node_layer = card_id + 'node-layer';

    CARD_TO_INFO[card_id]['node_source'] = node_source;
    CARD_TO_INFO[card_id]['node_layer'] = node_layer;

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
    let route_source = card_id + 'route-source';
    let route_layer = card_id + 'route-layer';

    CARD_TO_INFO[card_id]['route_source'] = route_source;
    CARD_TO_INFO[card_id]['route_layer'] = route_layer;

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
    let node_layer = CARD_TO_INFO[card_id]['node_source'];

    let label_layer = card_id + 'label-layer';

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