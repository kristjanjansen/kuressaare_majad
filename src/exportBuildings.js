var request = require('request')
var jsonstream = require('JSONStream')
var es = require('event-stream')
var _ = require('lodash');

var fs = require('fs')
var path = require('path')

var attachId = require('../src/attachId')
var attachHistoricBuildings = require('../src/attachHistoricBuildings')
var attachHistoricPhotos = require('../src/attachHistoricPhotos')
var filterBuildings = require('../src/filterBuildings')
var attachBuildingPhotos = require('../src/attachBuildingPhotos')
var exportBuilding = require('../src/exportBuilding')

module.exports = function(data, callback) {

    var url = 'http://kristjanjansen.ee/files/kuressaare_data/Linna_majad.geojson'

    request({url: url, encoding: null})
        .pipe(jsonstream.parse('features.*'))
        .pipe(es.mapSync(function(feature) { return {data: data, feature: feature} }))
        .pipe(es.mapSync(attachId))
        .pipe(es.mapSync(attachHistoricBuildings))
        .pipe(es.mapSync(attachHistoricPhotos))
        .pipe(es.map(filterBuildings))
        .pipe(es.mapSync(attachBuildingPhotos))
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
