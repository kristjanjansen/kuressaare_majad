module.exports = function(item, callback) {

    if (item.feature.properties.desc || item.feature.properties.historic_photos.length) {
    
        callback(null, item)
    
    } else {
    
        callback()
    
    }
    
}