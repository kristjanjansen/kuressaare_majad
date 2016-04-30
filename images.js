// ogr2ogr -t_srs EPSG:4326 -f "GeoJSON" vanalinna_fotod.geojson vanalinna_fotod.shp

var fs = require('fs')
var path = require('path')

var request = require('request')
var jsonstream = require('JSONStream')
var iconv = require('iconv-lite');
var sharp = require('sharp')
var es = require('event-stream')

var buildingsData = 'http://kristjanjansen.ee/files/kuressaare_data/Linna_majad.geojson'
var historicData = 'http://kristjanjansen.ee/files/kuressaare_data/vanalinna_fotod.geojson'
var plansData = 'http://kristjanjansen.ee/files/kuressaare_data/ajaloolised_krundiplaanid.json'

function cleanPath(filepath) {

    return 'http://gis.kuressaare.ee:8888/failid/Ajaloolised_pildid/' + filepath
        .split('\\')[4]
        .replace(/Ãµ/g, 'o')
        .replace(/Ã¤/g, 'a')
        .replace(/Ã¶/g, 'o')
        .replace(/Ã¼/g, 'u')

}

function download(data, callback) {

        var req = request(data.src, function(err) { 
            if (err) {}
        })

        req.on('response', function (res) {
            if (res.statusCode === 200) {
                req.pipe(sharp().resize(300))
                    .pipe(fs.createWriteStream(data.tgt))
            }
        })

        req.on('end', function() { 
            callback(null, data) 
        })

}

// Download building photos

request({url: buildingsData, encoding: null})
    .pipe(iconv.decodeStream('latin1'))
    .pipe(jsonstream.parse('features.*.properties.foto_pikk'))
    .pipe(es.mapSync(encodeURI))
    .pipe(es.mapSync(function(data) { return { src: data, tgt: './public/images/buildings/' + path.basename(data)} }))
    .pipe(es.map(download))
    .pipe(es.mapSync(function(data) { console.log(data) }))

// Download historic photos

request({url: historicData, encoding: null})
    .pipe(iconv.decodeStream('latin1'))
    .pipe(jsonstream.parse('features.*.properties.foto'))
    .pipe(es.mapSync(cleanPath))
    .pipe(es.mapSync(function(data) { return { src: data, tgt: './public/images/historic/' + path.basename(data)} }))
    .pipe(es.map(download))
    .pipe(es.mapSync(function(data) { console.log(data) }))

// Download plans

request(plansData)
    .pipe(jsonstream.parse('*.url'))
    .pipe(es.mapSync(encodeURI))
    .pipe(es.mapSync(function(data) { return { src: data, tgt: './public/images/plans/' + path.basename(data)} }))
    .pipe(es.map(download))
    .pipe(es.mapSync(function(data) { console.log(data) }))

