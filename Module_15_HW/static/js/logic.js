// URL of the JSON data
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetch the JSON data using d3.json()
d3.json(url).then(function(data) {
  // Store the data in a variable or use it for further processing
  const earthquakeData = data;

  const myMap = L.map('map').setView([40.7128, -74.0060], 10);



// Add the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(myMap);

  // Iterate over the earthquake data and plot markers
  earthquakeData.features.forEach(function(feature) {
    const coordinates = feature.geometry.coordinates;
    const magnitude = feature.properties.mag;
    const depth = coordinates[2];

    // Customize the marker size and color based on magnitude and depth
    const markerOptions = {
      radius: magnitude * 5, // Adjust the scale factor as needed
      fillColor: getColor(depth),
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };

    // Create a circle marker for each earthquake on the map
    const marker = L.circleMarker([coordinates[1], coordinates[0]], markerOptions);

    // Bind a popup to each marker with additional information about the earthquake
    marker.bindPopup(`<b>Magnitude:</b> ${magnitude}<br><b>Depth:</b> ${depth} km`);

    // Add the marker to the map
    marker.addTo(myMap);
  });
  
  // Function to determine the marker fill color based on depth
  function getColor(depth) {
    // Customize the color scale based on your preferences
    if (depth < 10) {
      return '#00ff00'; // Green
    } else if (depth < 30) {
      return '#ffff00'; // Yellow
    } else if (depth < 50) {
      return '#ff9900'; // Orange
    } else {
      return '#ff0000'; // Red
    }
  }
})
.catch(function(error) {
  // Handle any error that occurred during the data retrieval
  console.error("Error retrieving JSON data:", error);
});
