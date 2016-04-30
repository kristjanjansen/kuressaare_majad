var request = require('request')
var _ = require('lodash');

module.exports = function(data, callback) {

    var url = 'http://kristjanjansen.ee/files/kuressaare_data/vanalinna_fotod.geojson'

    request(url, function(err, res, body) {
        
        data.historicPhotoData = JSON.parse(body)
        
        callback(null, data)
    
    })

}