var request = require('request')
var jsonstream = require('JSONStream')
var iconv = require('iconv-lite');
var es = require('event-stream')
var _ = require('lodash');

var fs = require('fs')
var path = require('path')

var attachHistoricData = require('../src/attachHistoricData')
var attachHistoricPhotoData = require('../src/attachHistoricPhotoData')
var exportBuilding = require('../src/exportBuilding')

module.exports = function(data, callback) {

    var url = 'http://kristjanjansen.ee/files/kuressaare_data/Linna_majad.geojson'

    request(url)
        .pipe(iconv.decodeStream('latin1'))
        .pipe(jsonstream.parse('features.*'))
        .pipe(es.mapSync(function(feature) { return {data: data, feature: feature} }))
        .pipe(es.mapSync(attachHistoricData))
        .pipe(es.mapSync(attachHistoricPhotoData))
        .pipe(es.mapSync(exportBuilding))
        .pipe(es.mapSync(function(item) { 
            item.feature.properties = { 'address': item.feature.properties.aadress }
            return item.feature
        }))
        .pipe(jsonstream.stringify('{"type":"FeatureCollection","features":[',',',']}'))
        .pipe(fs.createWriteStream('./public/data/buildings.geojson'))
        .on('end', function() {
            callback(null, null)
        })

}
