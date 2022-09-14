// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([40.7, -94.5], 4);

// Create the map object with a center and zoom level.
// let myMap = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// let myMap = L.map("mapid", {
//   center: [
//     34.0522,-118.2437
//   ],
//   zoom: 14
// });

let myMap = L.map('mapid').setView([36.1733, -120.1794],5);


// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     // mapbox/outdoors-v11
//     // mapbox/light-v10
//     // mapbox/dark-v10
//     // mapbox/satellite-v9
//     // mapbox/satellite-streets-v11

//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// // Then we add our 'graymap' tile layer to the map.
// }).addTo(myMap);


// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(myMap);

// //  Add a marker to the map for Los Angeles, California.
// // let marker = L.marker([34.0522, -118.2437]).addTo(myMap);
// let marker = L.circle([34.0522, -118.2437], {
//   radius: 100
// }).addTo(myMap);

var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 5,
  id: 'mapbox/light-v10',
  // id: 'mapbox/satellite-streets-v11',
  // id: 'mapbox/dark-v10',
  // id: 'mapbox/streets-v11',
  accessToken: API_KEY
}).addTo(myMap);

// let marker = L.circle([34.0522, -118.2437], {
//     radius: 300, //this is meters
//     color: "black",
//     fillColor: "yellow",
//     opacity: 50,
// }).addTo(myMap);

// let marker = L.circleMarker([34.0522, -118.2437], {
//   radius: 300, // this is pixel
//   color: "black",
//   fillColor: "yellow",
//   opacity: 50,
// }).addTo(myMap);

// Get data from cities.js
// let cityData = cities;

// Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//   console.log(city)
//   L.marker(city.location)
//   .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString + "</h3>")
//   .addTo(myMap);
//  });

// cityData.forEach(function(city) {
//   console.log(city.population.toLocaleString)
//   L.circleMarker(city.location, {
//     radius: city.population/200000, // this is pixel
//     color: "orange",
//     fillColor: "orange",
//     opacity: 50,
//     weight: 4,
//   })
//   .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//   .addTo(myMap);
//  });

// Coordinates for each point to be used in the line.
// let line = [
//   [33.9416, -118.4085],
//   [37.6213, -122.3790]
// ]; 

// Coordinates for each point to be used in the polyline.
// let line = [
//   [33.9416, -118.4085],
//   [37.6213, -122.3790],
//   [40.7899, -111.9791],
//   [47.4502, -122.3088]
// ];

// // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//   color: "yellow"
// }).addTo(myMap);

let airports = [{
  location: [37.6213, -122.3790],
  name: "SFO",
  
},
{
  location: [38.8561,-104.6737],
  name: "DEN",
},
{
  location: [30.1975,-97.6664],
  name: "AUS",
},
{
  location: [43.6777,-79.6248],
  name: "YYZ",
},
{
  location: [40.6413,-73.7781],
  name: "JFK",
}
];

let line = []

// Coordinates for each point to be used in the polyline.
airports.forEach(function(airport) {
  console.log(airport.location)
  // line = line.push(airport.location);
  line.push(airport.location);
});

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: "blue",
  weight: 4,
  opacity: 0.5,
  dashArray: 7
}).addTo(myMap);