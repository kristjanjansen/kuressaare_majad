var _ = require('lodash');

var downloadQueue = require('../src/downloadQueue')

module.exports = function(item) {

    var baseUrl = 'http://gis.kuressaare.ee:8888/failid/Ajaloolised_pildid/'

    item.feature.properties.historic_photos = []

    if (photos = _.filter(item.data.historicPhotoData.features, {'properties': {'asukoht': item.feature.properties.aadress}})) {
        
        photos.forEach(function(photo) {
            
            if (photo.properties.foto) {
                
                var filename = photo.properties.foto.split('\\')[4]
                
                var source = baseUrl + filename
                var target = './images/historic/' + filename

                item.feature.properties.historic_photos.push({
                    'url': source
                })
            
                downloadQueue.push({
                    source: source,
                    target: target
                })

            }
        
        })
    
    }

    return item

}
