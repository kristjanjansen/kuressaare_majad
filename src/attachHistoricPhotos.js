/*

[ { type: 'Feature',
    properties: 
     { id: null,
       asukoht: 'Tolli 27',
       foto: 'Y:\\pildid\\FOTOGALERII_arhitektid\\Uus kaust_vanad fotod\\Tolli27_Saksasalongklubi.jpg',
       aasta: null,
       pildistami: 310,
       selgitus: 'Saksa Salongklubi, hÃ¤vinenud 1917' },
    geometry: { type: 'Point', coordinates: [Object] } } ]
=
*/

var _ = require('lodash');

module.exports = function(item) {

    var baseUrl = 'http://gis.kuressaare.ee:8888/failid/Ajaloolised_pildid/'

    item.feature.properties.historic_photos = []

    if (photos = _.filter(item.data.historicPhotoData.features, {'properties': {'asukoht': item.feature.properties.aadress}})) {
        
        photos.forEach(function(photo) {
            
            if (photo.properties.foto) {
                
                item.feature.properties.historic_photos.push({
                    'url': baseUrl + photo.properties.foto.split('\\')[4]
                })
            
            }
        
        })
    
    }

    return item

}
