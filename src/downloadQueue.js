var fs = require('fs')

var async = require('async')
var request = require('request')
var sharp = require('sharp')

var concurrency = 10

module.exports = async.queue(function (payload, callback) {
    
    var req = request(payload.source, function(err) { 
        if (err) {
            console.log('Error ' + payload.source)
            callback();
        }
    })

    req.on('response', function (res) {
        if (res.statusCode === 200) {
            req
                .pipe(sharp().resize(500).on('error', function(err) { console.log(err) }))
                .pipe(fs.createWriteStream(payload.target))
                
        }
        else {
            console.log('No 200 ' + payload.source)
        }
    })

    req.on('end', function() { 
        callback();
    })

}, 50);