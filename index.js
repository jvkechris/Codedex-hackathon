 mapboxgl.accessToken = 'pk.eyJ1IjoianZrZWNocmlzIiwiYSI6ImNseWg1aWN6eDAxMHIya3M4dG8xeHlsNDMifQ.72yHrET1FT84q35aJfnr3g';

const map = new mapboxgl.Map({
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-73.99852, 40.68161], // Updated coordinates
  zoom: 15.5,
  container: 'map',
  antialias: true
});

// Add a marker at the specified coordinates
const marker = new mapboxgl.Marker()
  .setLngLat([-73.99852, 40.68161])
  .addTo(map);

// Get the button element
const takeMethere = document.getElementById('tmt');

// Get the map container element
const mapContainer = document.getElementById('map');

// Add a click event listener to the button
takeMethere.addEventListener('click', () => {
  // Toggle the map overlay class
  mapContainer.classList.toggle('map-overlay');

  // Adjust the map size and position
  map.resize();

  // Get the current zoom level
  const currentZoom = map.getZoom();

  // Fit the map to the marker's location
  map.flyTo({
    center: [-73.99852, 40.68161],
    zoom: currentZoom,
    essential: true // this animation is considered essential with respect to prefers-reduced-motion
  });
});

// Locate the user and show the fastest route on page load
navigator.geolocation.getCurrentPosition(function(position) {
  const userLocation = [position.coords.longitude, position.coords.latitude];

  // Check if user is within a certain area
  const destinationLocation = [-73.99852, 40.68161]; // Example destination
  const bounds = mapboxgl.LngLatBounds.convert([
    [-74.1, 40.6],
    [-73.9, 40.8]
  ]); // Example bounding box

  if (bounds.contains(userLocation)) {
    // User is within the area, show the fastest route
    // Add a marker for the user's location
    new mapboxgl.Marker()
      .setLngLat(userLocation)
      .addTo(map);

    // Calculate the fastest route and display it on the map
    const directionsClient = new mapboxgl.DirectionsClient({
      profile: 'driving',
      alternatives: false,
      geometries: 'geojson',
      waypoints: [
        {
          coordinates: userLocation
        },
        {
          coordinates: destinationLocation
        }
      ]
    });

    directionsClient.getDirections((error, response) => {
      if (!error) {
        const route = response.routes[0];
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route.geometry
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      }
    });
  } else {
    // User is outside the area, display a message or do something else
    console.log('User is outside the area');
    alert("Whoa! You aren't in Brooklyn mate!")
  }
});
    const soundScroll = new Audio('scroll_sound.mp3');
const soundTap = new Audio('tap_sound.mp3');

window.addEventListener('scroll', function() {
  soundScroll.play();
});

window.addEventListener('touchstart', function() {
  soundTap.play();
});

window.addEventListener('click', function() {
  soundTap.play();
});
// The End Of Year Date To Countdown Date

document.addEventListener('DOMContentLoaded', () => {
    // Unix timestamp (in seconds) to count down to
    var toDayFromNow = (new Date("July 17, 2024 12:00:00").getTime() / 1000) + (3600 / 60 / 60 / 24) - 1;
    // Set Up FlipDown
    var flipdown = new FlipDown(toDayFromNow)

    // Start The Count Down
    .start()
    // Do Something When The Countdown Ends
    .ifEnded(() => {
        document.querySelector(".flipdown").innerHTML = `<h2>If it's not the 17th, YOU MISSED IT!</h2>`;
    });
});
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const slides = slider.querySelectorAll('.slide');

  // Clone the first slide and append it to the end
  const firstSlide = slides[0].cloneNode(true);
  slider.appendChild(firstSlide);

  // Add hover event listener to each slide
  slides.forEach((slide) => {
    slide.addEventListener('mouseenter', playSound);
  });

  function playSound() {
    const audio = new Audio('scroll_sound.mp3');
    audio.play();
  }
});
 