var request = require('request')
var _ = require('lodash');
var iconv = require('iconv-lite');

module.exports = function(data, callback) {

    var url = 'http://kristjanjansen.ee/files/kuressaare_data/ajaloolised_majad.geojson'

    request({url: url, encoding: null}, function(err, res, body) {

        data.historicData = JSON.parse(iconv.decode(body, 'ISO-8859-1'))

        callback(null, data)

    })

}