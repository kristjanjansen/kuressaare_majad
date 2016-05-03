var _ = require('lodash');

var downloadQueue = require('../src/downloadQueue')

function cleanPath(filename) {

    return filename
        .replace(/Ãµ/g, 'o')
        .replace(/Ã¤/g, 'a')
        .replace(/Ã¶/g, 'o')
        .replace(/Ã¼/g, 'u')

}

module.exports = function(item) {

    var baseUrl = 'http://gis.kuressaare.ee:8888/failid/Ajaloolised_pildid/'

    item.feature.properties.historic_photos = []

    if (photos = _.filter(item.data.historicPhotoData.features, {'properties': {'asukoht': item.feature.properties.aadress}})) {
        
        photos.forEach(function(photo) {
            
            if (photo.properties.foto) {
                
                var filename = cleanPath(photo.properties.foto.split('\\')[4])
            
                downloadQueue.push({
                    source: baseUrl + filename,
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
