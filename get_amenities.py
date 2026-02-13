import geopandas as gpd
import osmnx as ox
from shapely import Polygon

place = 'The Beaches, Toronto, Ontario, Canada'
# bbox = [-79.415703,43.613584,-79.229622,43.713425]

G = ox.graph.graph_from_place(place, network_type='walk')
nodes, edges = ox.convert.graph_to_gdfs(G)

nodes.to_file('walking_network_nodes.geojson', driver='GeoJSON')
edges.to_file('walking_network_edges.geojson', driver = 'GeoJSON')

place_features = ox.features_from_place(place, tags = {"building": True})

cleaned_place_features = place_features[['geometry', 'addr:city', 'addr:housenumber', 'addr:street', "amenity", 'name', 'opening_hours', 'website', 'description', 'cuisine', 'wheelchair', 'outdoor_seating', 'leisure', 'access', 'changing_table']]
# # print(cleaned_place_features['wheelchair'].head(40))
cleaned_place_features.to_file('Beaches_places_features_osmnx.geojson', driver='GeoJSON')

