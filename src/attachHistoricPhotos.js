var _ = require('lodash');

var downloadQueue = require('../src/downloadQueue')

module.exports = function(item) {

    var baseUrl = 'http://gis.kuressaare.ee:8888/failid/Ajaloolised_pildid/'

    item.feature.properties.historic_photos = []

    if (photos = _.filter(item.data.historicPhotoData.features, {'properties': {'asukoht': item.feature.properties.aadress}})) {
        
        photos.forEach(function(photo) {
            
            if (photo.properties.foto) {
                
                var filename = photo.properties.foto.split('\\')[4]

                item.feature.properties.historic_photos.push({
                    'url': './images/historic/' + filename
                })
            
                downloadQueue.push({
                    source: baseUrl + filename,
                    target: './public/images/historic/' + filename
                })

            }
        
        })
    
    }

    return item

}
