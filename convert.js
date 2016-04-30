var async = require('async');

async.waterfall([

    async.apply(require('./src/getPlanData'), {}),
    require('./src/getHistoricData'),
    require('./src/getHistoricPhotoData'),
    require('./src/getOsilianaData'),
    require('./src/setBuildingData')

], function (err, data) {

    console.log('Done')

})
