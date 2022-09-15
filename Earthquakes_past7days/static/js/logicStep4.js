// Add console.log to check to see if our code is working.
console.log("working");

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    // mapbox/outdoors-v11
    // mapbox/light-v10
    // mapbox/dark-v10
    // mapbox/satellite-v9
    // mapbox/satellite-streets-v11

    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // mapbox/outdoors-v11
    // mapbox/light-v10
    // mapbox/dark-v10
    // mapbox/satellite-v9
    id: 'mapbox/satellite-streets-v11',

    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
  };

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
  };

// Create the map object with a center and zoom level.
let myMap = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

L.control.layers(baseMaps, overlays).addTo(myMap);

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
    console.log("geo check");  
// Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {

    // We turn each feature into a circleMarker on the map.
    
    pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<hr>Location: " + feature.properties.place);
      }
    }).addTo(earthquakes);
   
    // This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
    function styleInfo(feature) {
        return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
        }
    }
    // This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
          }
          if (magnitude > 4) {
            return "#ea822c";
          }
          if (magnitude > 3) {
            return "#ee9c00";
          }
          if (magnitude > 2) {
            return "#eecc00";
          }
          if (magnitude > 1) {
            return "#d4ee00";
          }
          return "#98ee00";
    }
    function getRadius(magnitude) {
        if (magnitude === 0) {
        return 1;
        }
        return magnitude * 4;
    }
});









// // Add console.log to check to see if our code is working.
// console.log("working");

// // Create the map object with a center and zoom level.
// // let map = L.map('mapid').setView([40.7, -94.5], 4);

// // Create the map object with a center and zoom level.
// // let myMap = L.map("mapid", {
// //     center: [
// //       40.7, -94.5
// //     ],
// //     zoom: 4
// //   });

// // let myMap = L.map("mapid", {
// //   center: [
// //     34.0522,-118.2437
// //   ],
// //   zoom: 14
// // });

// // let myMap = L.map('mapid').setView([36.1733, -120.1794],5);


// // // let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// // //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// // //     maxZoom: 18,
// // //     id: 'mapbox/streets-v11',
// // //     // mapbox/outdoors-v11
// // //     // mapbox/light-v10
// // //     // mapbox/dark-v10
// // //     // mapbox/satellite-v9
// // //     // mapbox/satellite-streets-v11

// // //     tileSize: 512,
// // //     zoomOffset: -1,
// // //     accessToken: API_KEY
// // // // Then we add our 'graymap' tile layer to the map.
// // // }).addTo(myMap);


// // // We create the tile layer that will be the background of our map.
// // // let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// // // attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// // //     maxZoom: 18,
// // //     accessToken: API_KEY
// // // });

// // // // Then we add our 'graymap' tile layer to the map.
// // // streets.addTo(myMap);

// // // //  Add a marker to the map for Los Angeles, California.
// // // // let marker = L.marker([34.0522, -118.2437]).addTo(myMap);
// // // let marker = L.circle([34.0522, -118.2437], {
// // //   radius: 100
// // // }).addTo(myMap);

// // var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// //   maxZoom: 5,
// //   id: 'mapbox/light-v10',
// //   // id: 'mapbox/satellite-streets-v11',
// //   // id: 'mapbox/dark-v10',
// //   // id: 'mapbox/streets-v11',
// //   accessToken: API_KEY
// // }).addTo(myMap);

// // // let marker = L.circle([34.0522, -118.2437], {
// // //     radius: 300, //this is meters
// // //     color: "black",
// // //     fillColor: "yellow",
// // //     opacity: 50,
// // // }).addTo(myMap);

// // // let marker = L.circleMarker([34.0522, -118.2437], {
// // //   radius: 300, // this is pixel
// // //   color: "black",
// // //   fillColor: "yellow",
// // //   opacity: 50,
// // // }).addTo(myMap);

// // // Get data from cities.js
// // // let cityData = cities;

// // // Loop through the cities array and create one marker for each city.
// // // cityData.forEach(function(city) {
// // //   console.log(city)
// // //   L.marker(city.location)
// // //   .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString + "</h3>")
// // //   .addTo(myMap);
// // //  });

// // // cityData.forEach(function(city) {
// // //   console.log(city.population.toLocaleString)
// // //   L.circleMarker(city.location, {
// // //     radius: city.population/200000, // this is pixel
// // //     color: "orange",
// // //     fillColor: "orange",
// // //     opacity: 50,
// // //     weight: 4,
// // //   })
// // //   .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
// // //   .addTo(myMap);
// // //  });

// // // Coordinates for each point to be used in the line.
// // // let line = [
// // //   [33.9416, -118.4085],
// // //   [37.6213, -122.3790]
// // // ]; 

// // // Coordinates for each point to be used in the polyline.
// // // let line = [
// // //   [33.9416, -118.4085],
// // //   [37.6213, -122.3790],
// // //   [40.7899, -111.9791],
// // //   [47.4502, -122.3088]
// // // ];

// // // // Create a polyline using the line coordinates and make the line red.
// // // L.polyline(line, {
// // //   color: "yellow"
// // // }).addTo(myMap);

// // let airports = [{
// //   location: [37.6213, -122.3790],
// //   name: "SFO",
  
// // },
// // {
// //   location: [38.8561,-104.6737],
// //   name: "DEN",
// // },
// // {
// //   location: [30.1975,-97.6664],
// //   name: "AUS",
// // },
// // {
// //   location: [43.6777,-79.6248],
// //   name: "YYZ",
// // },
// // {
// //   location: [40.6413,-73.7781],
// //   name: "JFK",
// // }
// // ];

// // let line = []

// // // Coordinates for each point to be used in the polyline.
// // airports.forEach(function(airport) {
// //   console.log(airport.location)
// //   // line = line.push(airport.location);
// //   line.push(airport.location);
// // });

// // // Create a polyline using the line coordinates and make the line red.
// // L.polyline(line, {
// //   color: "blue",
// //   weight: 4,
// //   opacity: 0.5,
// //   dashArray: 7
// // }).addTo(myMap);



// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// // Create the map object with center at the San Francisco airport.
// // let myMap = L.map('mapid').setView([37.5, -122.5], 10);
// // var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// //   maxZoom: 20,
// //   // id: 'mapbox/light-v10',
// //   // id: 'mapbox/satellite-streets-v11',
// //   // id: 'mapbox/dark-v10',
// //   // id: 'mapbox/streets-v11',
// //   id: 'mapbox/navigation-night-v1',
// //   accessToken: API_KEY
// // }).addTo(myMap);

// // // Grabbing our GeoJSON data.
// // // L.geoJSON(sanFranAirport).addTo(myMap);


// // // Grabbing our GeoJSON data.
// // // L.geoJSON(sanFranAirport, {
// // //   // We turn each feature into a marker on the map.
// // //   pointToLayer: function(feature, latlng) {
// // //   console.log(feature);
// // //   return L.marker(latlng)
// // //   .bindPopup("<h2>" + feature.properties.name + "</h2>"+ "<hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>")
// // //   }

// // // }).addTo(myMap);

// // L.geoJSON(sanFranAirport, {
// //   onEachFeature: function(feature, layer) {
// //     console.log(layer);
// //     layer.bindPopup("<h2> Airport code: " + feature.properties.faa + "</h2>"+ "<hr> <h3> Airport name: " + feature.properties.name  + "</h3>");
// //    }
// // }).addTo(myMap);


// // Create the map object with center and zoom level.
// let myMap = L.map('mapid').setView([30, 30], 2);
// var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 20,
//   // id: 'mapbox/light-v10',
//   // id: 'mapbox/satellite-streets-v11',
//   // id: 'mapbox/dark-v10',
//   // id: 'mapbox/streets-v11',
//   id: 'mapbox/navigation-night-v1',
//   accessToken: API_KEY
// }).addTo(myMap);

// // Accessing the airport GeoJSON URL
// // let airportData = "https://raw.githubusercontent.com/jstowe16/Mapping_Earthquakes/main/majorAirports.json";
// // let airportData = "https://raw.githubusercontent.com/jstowe16/Mapping_Earthquakes/tree/Mapping_GeoJSON_Point/majorAirports.json";
// // let airportData = d3.json(majorAirports);


// // Store our API endpoint inside queryUrl
// let airportData = "static/js/data/majorAirports.json";

// // console.log(airportData);
// // // Grabbing our GeoJSON data.
// // d3.json(airportData).then(function(data) {
// //   console.log(data);
// // // Creating a GeoJSON layer with the retrieved data.
// // L.geoJSON(data).addTo(myMap);
// // });

// // Perform a GET request to the query URL
// d3.json(airportData, function(data) {
//   console.log("geo")
//   console.log(data);
  
//     // Send the data.features object to the createFeatures function 
//     createFeatures(data.features);
//   });
  
//   //  Create the createFeatures function to hold the data.features object
//   function createFeatures(airData) {
  
//     // Define a function we want to run once for each feature in the features array
//     // Give each feature a popup describing the place and time of the earthquake
//     function onEachFeature(features, layer) {
//       layer.bindPopup("<h2> Airport code: " + features.properties.faa 
//       + "</h2><hr><h3>Airport name: " + feature.properties.name + "<h3>");
//     }
  
//     // Create a GeoJSON layer containing the features array on the earthquakeData object
//     // Run the onEachFeature function once for each piece of data in the array
//     var airports = L.geoJSON(airData, {
//       onEachFeature: onEachFeature
//     });
  
//     // Send our neighborhoods layer to the createMap function
//     createMap(airports);
//   }
//   function createMap(airports) {

//     // Define streetmap and darkmap layers
//     var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//       maxZoom: 20,
//       // id: 'mapbox/light-v10',
//       // id: 'mapbox/satellite-streets-v11',
//       // id: 'mapbox/dark-v10',
//       // id: 'mapbox/streets-v11',
//       id: 'mapbox/navigation-night-v1',
//       accessToken: API_KEY
//     });
  
//     // Create our map, giving it the streetmap and earthquakes layers to display on load
//     var myMap = L.map('mapid').setView([30, 30], 2);
 
//   }

