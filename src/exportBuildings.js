var request = require('request')
var jsonstream = require('JSONStream')
var iconv = require('iconv-lite');
var es = require('event-stream')
var _ = require('lodash');

var fs = require('fs')
var path = require('path')

var attachHistoricBuildings = require('../src/attachHistoricBuildings')
var attachHistoricPhotos = require('../src/attachHistoricPhotos')
var attachId = require('../src/attachId')
var exportBuilding = require('../src/exportBuilding')

module.exports = function(data, callback) {

    var url = 'http://kristjanjansen.ee/files/kuressaare_data/Linna_majad.geojson'

    request(url)
        .pipe(iconv.decodeStream('latin1'))
        .pipe(jsonstream.parse('features.*'))
        .pipe(es.mapSync(function(feature) { return {data: data, feature: feature} }))
        .pipe(es.mapSync(attachHistoricBuildings))
        .pipe(es.mapSync(attachHistoricPhotos))
        .pipe(es.mapSync(attachId))
        .pipe(es.mapSync(exportBuilding))
        .pipe(es.mapSync(function(item) { 
            item.feature.properties = { 'id': item.feature.properties.id }
            return item.feature
        }))
        .pipe(jsonstream.stringify('{"type":"FeatureCollection","features":[',',',']}'))
        .pipe(fs.createWriteStream('./public/data/_buildings.geojson'))
        .on('end', function() {
            callback(null, null)
        })

}
