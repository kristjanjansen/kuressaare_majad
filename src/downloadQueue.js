var fs = require('fs')

var async = require('async')
var request = require('request')
var sharp = require('sharp')

var concurrency = 10

module.exports = async.queue(function (payload, callback) {
    
    var req = request(payload.source, function(err) { 
        if (err) {}
    })

    req.on('response', function (res) {
        if (res.statusCode === 200) {
            req
                .pipe(sharp().resize(500))
                .pipe(fs.createWriteStream(payload.target))
        }
    })

    req.on('end', function() { 
        callback();
    })

}, 30);