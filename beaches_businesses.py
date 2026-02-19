import geopandas as gpd
import osmnx as ox
from shapely import Polygon

#Used Sam's code for the first part here.
place = 'The Beaches, Toronto, Ontario, Canada'
# bbox = [-79.415703,43.613584,-79.229622,43.713425]

G = ox.graph.graph_from_place(place, network_type='walk')
nodes, edges = ox.convert.graph_to_gdfs(G)

#Used Claude for help finding additional tags to add.
tags = {
    "amenity": True,
    "shop": True,
    "tourism": True,
    "leisure": True,
    "restaurant": True,
    "cafe": True,
    "bar": True
}

#Set features to a variable.
place_features = ox.features_from_place(place, tags=tags)

#Set important columns.
important_cols = [
    'geometry',
    'addr:housenumber', 
    'addr:street',
    'amenity', 
    'shop',
    'name', 
    'opening_hours',
    'wheelchair',
    'outdoor_seating',
    'website',
    'leisure',
    'cuisine',
    'access',
    'changing_table'
]

#Filter the place features to only include the important columns and save as a new GeoJSON file.
cleaned_place_features = place_features[important_cols]
#Uncomment the code below to save the cleaned place features to a new GeoJSON file (already done so no need to re-do unless you want to).
#cleaned_place_features.to_file('emmett_data/Beaches_places_features_updated.geojson', driver='GeoJSON')