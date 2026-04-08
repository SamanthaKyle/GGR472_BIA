import geopandas as gdf

network = gdf.read_file('walking_network.geojson')
print(network['geometry'])

features = gdf.read_file('Beaches_places_features_osmnx.geojson')

print(features.columns)
ax = features.plot()
ax.figure.savefig('test features name')

