import geopandas as gpd

#Imported the geojson and saved it to inat.
inat = gpd.read_file("emmett_data/inat_beaches.geojson")

#Printed the columns of inat to see what data is available.
# print(inat.columns.tolist())

#Set what columns were important.

important_cols = [
    "id",
    "observed_o",
    "latitude",
    "longitude",
    "scientific",
    "common_nam",
    "iconic_tax",
    "image_url",
    "url",
    "quality_gr",
    "geometry"
]

#Filtered the inat dataframe to only include the important columns.
inat = inat[important_cols]

#Only included research quality observations for better data and pictures possibly, but we can change this.
inat = inat[inat["quality_gr"] == "research"]

#Uncomment this to save it to the emmett_data folder as a geojson file. I already did this, so I commented it out to avoid overwriting the file.
# inat.to_file("emmett_data/inat_beaches_cleaned.geojson", driver="GeoJSON")