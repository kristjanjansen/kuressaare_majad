var request = require('request')
var _ = require('lodash');

var config = require('../config.json')

module.exports = function(data, callback) {

    var url = config.historicPhotosUrl

    request(url, function(err, res, body) {
        
        data.historicPhotoData = JSON.parse(body)
        
        callback(null, data)
    
    })

}