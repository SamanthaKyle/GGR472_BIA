import json
import geopandas as gpd
import osmnx as ox
import networkx as nx

#Used Claude to help run shortest path, using ox.plot_graph_route, extracting node ID, and saving
#nodes as JSONs.

#Use GPD read_file to import the edited geojsons.
edited_nodes_kg = gpd.read_file("emmett_data/routes/Kew_Gardens_Park_Node.geojson")
edited_nodes_ifgsr = gpd.read_file("emmett_data/routes/Ivan_Forrest_GlenStewart_Ravine_Nodes.geojson")

#Extract the node IDs in order from the properties to ensure the shortest cost path is perfect later.
manual_nodes_kg = [int(row["node"]) for _, row in edited_nodes_kg.iterrows()]
manual_nodes_ifgsr = [int(row["node"]) for _, row in edited_nodes_ifgsr.iterrows()]

#Run a shortest path between consecutive nodes for both routes.
full_route_kg = []
for u, v in zip(manual_nodes_kg[:-1], manual_nodes_kg[1:]):
    try:
        segment = nx.shortest_path(G, u, v, weight="length")
        if full_route_kg:
            full_route_kg.extend(segment[1:])
        else:
            full_route_kg.extend(segment)
    except nx.NetworkXNoPath:
        print(f"No path found between {u} and {v}, skipping")

full_route_ifgsr = []
for u, v in zip(manual_nodes_ifgsr[:-1], manual_nodes_ifgsr[1:]):
    try:
        segment = nx.shortest_path(G, u, v, weight="length")
        if full_route_ifgsr:
            full_route_ifgsr.extend(segment[1:])
        else:
            full_route_ifgsr.extend(segment)
    except nx.NetworkXNoPath:
        print(f"No path found between {u} and {v}, skipping")        

#Uncomment one line below at a time while commenting everything else to make sure everything worked out.
#fig, ax = ox.plot_graph_route(G, full_route_kg, route_color="red", route_linewidth=4, node_size=0, bgcolor="white")
#fig, ax = ox.plot_graph_route(G, full_route_ifgsr, route_color="red", route_linewidth=4, node_size=0, bgcolor="white")


#Uncomment to save the cleaned routes for later computation, along with their respective JSONs.
#I already did this, so it should be fine
#route_gdf_kg = ox.routing.route_to_gdf(G, full_route_kg)
#route_gdf_kg.to_file("emmett_data/routes/kew_gardens_route_cleaned.geojson", driver="GeoJSON")

#route_gdf_ifgsr = ox.routing.route_to_gdf(G, full_route_ifgsr)
#route_gdf_ifgsr.to_file("emmett_data/routes/ivan_forrest_glen_stewart_route_cleaned.geojson", driver="GeoJSON")

#with open("emmett_data/routes/kew_gardens_nodes_cleaned.json", "w") as f:
#    json.dump(full_route_kg, f)
    
#with open("emmett_data/routes/ivan_forrest_glen_stewart_nodes_cleaned.json", "w") as f:
#    json.dump(full_route_ifgsr, f)