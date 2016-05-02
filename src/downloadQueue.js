var async = require('async')

module.exports = async.queue(function (task, callback) {
    
    console.log(task);

    callback();

}, 1);