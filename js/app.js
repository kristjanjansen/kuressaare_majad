var map = L.map('map', {
  zoomControl: true,
  center: [58.2521, 22.4854],
  zoom: 16,
  attributionControl: false
});

var popup = L.popup({
   minWidth: 20,
   closeButton:false,
   zoomAnimation: false,
   })
   
var currLayer = {}

function main() {

     
    $('#sidebar').html(Mustache.render($('#template_intro').html()));

    var base = new L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      opacity: 0.7
    }).addTo(map);


    function renderPopup(f) {        
           popup
           .setLatLng([f.properties.latlon.coordinates[1],f.properties.latlon.coordinates[0]])
           .setContent(f.properties.address)
           .openOn(map);       
    }
    
    function renderSidebar(f) {
      
      //  map.panTo([f.properties.latlon.coordinates[1],f.properties.latlon.coordinates[0]]); 
        
        map.setZoom(19);
        
        var file = './data/' + f.properties.id + '.json'
        
        $.getJSON(file, function(data) {

            $('#sidebar').html(Mustache.render($('#template_sidebar').html(), data));

        });
        

     } 
    
    var master = omnivore.geojson('./data/_buildings.geojson')
    .on('ready', function() {
        this.setStyle({
            fillColor: '#433',
            fillOpacity: 0.5,
            weight: 0
        })
        this.eachLayer(function(f) {
            f.on('click', function(e) {
               renderSidebar(f.toGeoJSON())
            })
            .on('mouseover', function(e) {
          //     renderPopup(f.toGeoJSON())
            })
        });
        
    })
    .addTo(map)

  }
    


window.onload = main;