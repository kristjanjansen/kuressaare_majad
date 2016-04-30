var request = require('request')
var _ = require('lodash');

module.exports = function(data, callback) {

    var url = 'http://kristjanjansen.ee/files/kuressaare_data/ajaloolised_krundiplaanid.json'

    request(url, function(err, res, body) {
        
        data.planData = JSON.parse(body)
        
        callback(null, data)
    
    })

}