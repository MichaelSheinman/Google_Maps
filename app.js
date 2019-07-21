
// This code shows all the default listings 
function showListings() {
    if (counter === 0) {
        counter += 1;
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
            var popup = marker.bindPopup("<img width=200px src='building.jpeg'/>");   // showing a random image 
        }
    }
}
// This function will loop through the listings and hide them all.
function hideListings() {
    counter = 0;
    layerGroup.clearLayers();
}  

var map;
var counter = 0;
var layerGroup;
var maps = ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"]
// Third map is cool, not used yet though 

// Set up the project 
function setMap(layoutMap) {   
    map = L.map('map', {
        center: [40.741, -73.998],
        zoom: 13})
    layerGroup = L.layerGroup().addTo(map);        
    var z = L.tileLayer(layoutMap, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c']
    })
    z.addTo(map)
    var drawnItems = new L.FeatureGroup();
     map.addLayer(drawnItems);
     var drawControl = new L.Control.Draw({
         draw: {
             // not needed for now
             circle: false,
             rectangle: false,
             line: false,
             marker: false
         },
         edit: {
             featureGroup: drawnItems
         }
     });
     map.addControl(drawControl);

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


let land = document.getElementById('land');
land.addEventListener('click', function() {
    map.remove();
    setMap(maps[0]);
})

let view = document.getElementById('view');
view.addEventListener('click', function() {
    map.remove();
    setMap(maps[1]);
})


map.on('draw:created', function (e) {
    console.log("here");
});
