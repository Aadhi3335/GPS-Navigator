let map;
let startMarker = null;
let endMarker = null;
let isSettingStart = false;
let isSettingEnd = false;

document.addEventListener('DOMContentLoaded', () => {
    map = L.map('map').setView([39.8283, -98.5795], 4);
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '©'
    }).addTo(map);

    document.getElementById('set-start').addEventListener('click', () => {
        isSettingStart = true;
        isSettingEnd = false;
    });

    document.getElementById('set-end').addEventListener('click', () => {
        isSettingStart = false;
        isSettingEnd = true;
    });

    map.on('click', function(e) {
        if (isSettingStart) {
            if (startMarker) map.removeLayer(startMarker);
            startMarker = L.marker(e.latlng).addTo(map).bindPopup("Start Point").openPopup();
            isSettingStart = false;
        } else if (isSettingEnd) {
            if (endMarker) map.removeLayer(endMarker);
            endMarker = L.marker(e.latlng).addTo(map).bindPopup("End Point").openPopup();
            isSettingEnd = false;
        }
    });

    document.getElementById('find-path').addEventListener('click', () => {
        if (!startMarker || !endMarker) {
            alert('Please set both start and end points.');
            return;
        }

        const startLatLng = startMarker.getLatLng();
        const endLatLng = endMarker.getLatLng();

        
        L.Routing.control({
            waypoints: [
                L.latLng(startLatLng.lat, startLatLng.lng),
                L.latLng(endLatLng.lat, endLatLng.lng)
            ],
          routeWhileDragging: true
       }).addTo(map).on('routesfound', function(e) {
           // const distance = e.routes[0].summary.totalDistance / 1000; 
           // document.getElementById('result').innerText = `Distance: ${distance.toFixed(2)} km`;
       });
    });
});
