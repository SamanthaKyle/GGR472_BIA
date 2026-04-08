import osmnx as ox

place = 'The Beaches, Toronto, Ontario, Canada'

# G = ox.graph.graph_from_place(place, network_type='walk')
# nodes, edges = ox.convert.graph_to_gdfs(G)

# nodes.to_file('data/files_for_future/walking_network_nodes.geojson', driver='GeoJSON')
# edges.to_file('data/files_for_future/walking_network_edges.geojson', driver = 'GeoJSON')

place_features = ox.features_from_place(place, tags = {"amenity": True})


keepers = ['geometry', 'addr:housenumber', 'addr:street', 'amenity', 'name',
            'opening_hours', 'website', 'wheelchair', 'cuisine', 'outdoor_seating',
              'drink:coffee', 'shop', 'official_name', 'parking', 'location']

place_features = place_features[keepers]
cleaned_features = place_features.rename(columns = {'addr:street': 'street', 'addr:housenumber': 'housenumber', 'drink:coffee' : 'coffee'})

cleaned_features.to_file('data/files_for_future/amenities_proper.geojson', driver = 'GeoJSON')

