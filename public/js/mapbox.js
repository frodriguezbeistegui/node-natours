/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFjdW5kb3JvZHJpZ3VlemJlaXN0ZWd1aSIsImEiOiJjbDVkMWZob3owMHRvM2Nxbm5ybXZiMzJpIn0.LWvJ6HPKQkAW4fYMPoVf2Q';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/facundorodriguezbeistegui/cl5d2v7xe000014ql8vztl7ze',
});

const bounds = new mapboxgl.LatLongBounds();

locations.forEach(loc => {
    // Create maker
    const el = document.createElement('div');
    el.className = 'marker';
    // Add marker
    new mapboxgl.Marker({
        element:el,
        anchor: 'bottom'
    }).setLngLat(loc.coodinates).addTo(map);
    // Extend map bounds to include current locatoin
    bounds.extend(loc.coordinates)
})

map.fitBounds(bounds);