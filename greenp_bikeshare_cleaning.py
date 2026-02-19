import geopandas as gpd

#Load the green P and bikeshare data to variables.
greenp = gpd.read_file("emmett_data/greenp_beaches.geojson")
bikeshare = gpd.read_file("emmett_data/bikeshare_beaches.geojson")

#Uncomment the code below and comment everything else out to see the columns of each gdf.
#print(bikeshare.columns.tolist())
#print(greenp.columns.tolist())

#Set the important columns to variables related to their respective gdfs.
important_cols_gp = [
    "OBJECTID",
    "id",
    "address",
    "lat",
    "lng",
    "geometry"
]

important_cols_bs = [
    "OBJECTID",
    "station_id",
    "name",
    "address",
    "lat",
    "lon",
    "capacity",
    "geometry"
]

#Subset the gdfs to only include the important columns.
greenp_cleaned = greenp[important_cols_gp]
bikeshare_cleaned = bikeshare[important_cols_bs]

#Uncomment the code below to save these to the data file (this has already been done, so no
#need to run it again unless you want to overwrite the existing files).
#bikeshare_cleaned.to_file("emmett_data/bikeshare_cleaned.geojson", driver="GeoJSON")
#greenp_cleaned.to_file("emmett_data/greenp_cleaned.geojson", driver="GeoJSON")