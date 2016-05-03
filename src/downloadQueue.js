var fs = require('fs')

var async = require('async')
var _ = require('lodash');
var request = require('request')
var sharp = require('sharp')

var concurrency = 5

module.exports = async.queue(function (payload, callback) {
    
    callback = _.once(callback)
    
    var req = request(payload.source, function(err) { 
        if (err) {
            //this.emit('error', 'Request error' + payload.source);
        }
    })

    req.on('response', function (res) {
        if (res.statusCode === 200) {
            req
                .pipe(sharp().resize(500).on('error', function(err) { 
                    this.emit('error', 'Resize error ' + payload.source);
                }))
                .pipe(fs.createWriteStream(payload.target))
                
        }
        else {
            this.emit('error', 'Response error ' + payload.source);
        }
    })

    req.on('error', function(err) { 
        callback(err)
    })

    req.on('end', function() { 
        callback();
    })

}, concurrency);