var request = require('request')
var _ = require('lodash');
var iconv = require('iconv-lite');

var config = require('../config.json')

module.exports = function(data, callback) {

    var url = config.historicPhotosUrl

    request({url: url, encoding: null}, function(err, res, body) {
        
        data.historicPhotoData = JSON.parse(iconv.decode(body, 'ISO-8859-1'))
        
        callback(null, data)
    
    })

}