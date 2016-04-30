var async = require('async');

async.waterfall([

    async.apply(require('./src/importHistoricPlans'), {}),
    require('./src/importHistoricBuildings'),
    require('./src/importHistoricPhotos'),
    require('./src/importOsiliana'),
    require('./src/exportBuildings')

], function (err, data) {

    console.log('Done')

})
