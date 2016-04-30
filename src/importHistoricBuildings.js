var request = require('request')
var _ = require('lodash');

module.exports = function(data, callback) {

    var url = 'http://kristjanjansen.ee/files/kuressaare_data/ajaloolised_majad.geojson'

    request(url, function(err, res, body) {
        data.historicData = JSON.parse(body)
        //data.historicData = JSON.stringify(_.take(data.historicData.features))
        callback(null, data)
    })

}