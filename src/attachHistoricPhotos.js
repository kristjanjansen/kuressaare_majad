var _ = require('lodash');

var path = require('path');

var downloadQueue = require('../src/downloadQueue')

module.exports = function(item) {

    item.feature.properties.historic_photos = []

    if (photos = _.filter(item.data.historicPhotoData.features, {'properties': {'asukoht': item.feature.properties.aadress}})) {
        
        photos.forEach(function(photo) {
                        
            if (photo.properties.foto) {
                
                var filename = path.basename(photo.properties.foto)
            
                downloadQueue.push({
                    source: photo.properties.foto,
                    target: './public/images/historic/' + filename
                }, function(err) {})
                
                item.feature.properties.historic_photos.push({
                    'url': './images/historic/' + filename
                })
            
            }
        
        })
    
    }

    return item

}
