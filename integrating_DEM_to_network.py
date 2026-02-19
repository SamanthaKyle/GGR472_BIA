import geopandas as gpd
from shapely import Polygon
import osmnx as ox
import rasterio

place = 'The Beaches, Toronto, Ontario, Canada'

#Used Sam's code as as baseline here. Generate a graph and then get the nodes and edges of the network stored to geodataframes.
G = ox.graph.graph_from_place(place, network_type='walk')
nodes, edges = ox.convert.graph_to_gdfs(G)

#Uncomment this code below and comment everything else to make sure the TIFF file is in ESPG: 4326 before proceeding.
# with rasterio.open("emmett_data/Beaches_DEM_WGS84_Files/Beaches_DEM_WGS84.tif") as dem:
#     print(dem.crs)

#Used Claude to figure out how to add DEM to graph. The line below adds elevation to the nodes.
G = ox.elevation.add_node_elevations_raster(G, "emmett_data/Beaches_DEM_WGS84_Files/Beaches_DEM_WGS84.tif")

#Used Claude to figure out how to add elevation to the edges (performed in the below code).
G = ox.elevation.add_edge_grades(G)

#Function that calculates the elevation gain between nodSes (on edges) to determine if the route is easy, moderate, or difficult.
def get_route_stats(G, route_nodes):
    total_distance = 0
    total_elevation_gain = 0
    total_elevation_loss = 0

    for u, v in zip(route_nodes[:-1], route_nodes[1:]):
        edge_data = G.get_edge_data(u, v, 0)
        length = edge_data.get("length", 0)
        grade = edge_data.get("grade", 0)

        total_distance += length
        elevation_change = grade * length

        if elevation_change > 0:
            total_elevation_gain += elevation_change
        else:
            total_elevation_loss += abs(elevation_change)

    return {
        "distance_m": round(total_distance),
        "elevation_gain_m": round(total_elevation_gain),
        "elevation_loss_m": round(total_elevation_loss)
    }

#Uncomment this code below and comment everything else to ensure that the elevation (noted in grade and grade_abs) 
#is included as a column in the edges file.
# nodes, edges = ox.convert.graph_to_gdfs(G)
# print(edges.head(10))

#Uncomment this code below to save the new edges file with the stored elevation data.
#edges.to_file('walking_network_edges_elevation.geojson', driver='GeoJSON')