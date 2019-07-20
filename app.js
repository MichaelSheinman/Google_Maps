function showListings() {
    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var marker = L.marker(position, {riseOnHover:true}).addTo(layerGroup);
        marker.on('mouseover', function(e) {
            e.target._icon.src = 'yellow_icon.png'
        })
        marker.on('mouseout', function(e) {
            e.target._icon.src = 'http://cdn.leafletjs.com/leaflet/v0.7.7/images/marker-icon.png'
        })
        var popup = marker.bindPopup(position[0].toString() + '\n\n' + position[1].toString());
    }
}
// This function will loop through the listings and hide them all.
function hideListings() {
    layerGroup.clearLayers();
}  

var map = L.map('map', {
    center: [40.741, -73.998],
    zoom: 13
})

var layerGroup = L.layerGroup().addTo(map);

var maps = ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"]

function setMap(layoutMap) {            
    L.tileLayer(layoutMap, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c']
    }).addTo(map)
}

setMap(maps[1])

var locations = [
    {title: 'Park Ave Penthouse', location: [40.7713024, -73.9632393]},
    {title: 'Chelsea Loft', location: [40.7444883, -73.9949465]},
    {title: 'Union Square Open Floor Plan', location: [40.7347062, 40.7347062]},
    {title: 'East Village Hip Studio', location: [40.7281777, -73.9895759]},
    {title: 'TriBeCa Artsy Bachelor Pad', location: [40.7195264, -74.0089934]},
    {title: 'Chinatown Homey Space', location: [40.7180628, -73.9961237]}
];


document.getElementById('show-listings').addEventListener('click', showListings)    
document.getElementById('hide-listings').addEventListener('click', hideListings)    

