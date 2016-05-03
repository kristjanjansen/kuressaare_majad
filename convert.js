var async = require('async');

console.log('Starting conversion...')

async.waterfall([

    async.apply(require('./src/importHistoricPlans'), {}),
    require('./src/importHistoricBuildings'),
    require('./src/importHistoricPhotos'),
    require('./src/importOsiliana'),
    require('./src/exportBuildings')

], function (err) {

    console.log('Done')

})
