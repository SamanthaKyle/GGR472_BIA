# GGR472_BIA
BIA project code library

# Data collection and cleaning and API sourcing:

## Emmett:

### As of Feb 20, 2026:
- Check emmett_data for more information and clarification on changes made
- Added emmett_data
- Sourced and cleaned: DEM, Bikeshare Data, Green P data, 2 Nature-based trails, iNaturalist data, Business data
- Cleaned Aziza's files (see aziza_geojsons_cleaned for cleaned geojsons and and aziza_shapefiles_raw for the un-altered versions)
- Added python files to show cleaning work: beaches_businesses.py, get_aziza_geojsons.py, greenp_bikeshare_cleaning.py, inaturalist_cleaning.py
- Added walking netowrk edges updated in emmett_data with grades and weights to add route weight that favours Queen street east, and elevation for route difficulty (work shown in integrating_DEM_to_network.py)
- Created 2 Nature-based trails and made them into GeoJSONs after cleaning in GeoJSON.io (as shown in self_created_routes_p1.py and self_created_routes_p2.py)

## Juliette:

- Sorted out Mapbox geocoding options for Beaches businesses
- Sorted out which aspects of project will need APIs: routing, iNaturalist, weather data, water quality, strava, and google maps all do not need API keys; business hours will if using Google Places.
- Sourced out potential servers for 'Message in a Bottle" idea
