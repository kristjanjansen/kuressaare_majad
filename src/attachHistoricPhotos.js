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
