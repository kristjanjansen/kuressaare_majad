var path = require('path');

var _ = require('lodash');

var downloadQueue = require('../src/downloadQueue')

module.exports = function(item) {

    item.feature.properties.historic_plans = []

    if (plans = _.filter(item.data.historicPlans, {'address': item.feature.properties.aadress})) {
        
        plans.forEach(function(plan) {

                var source = path.dirname(plan.url) + '/' + encodeURIComponent(path.basename(plan.url))

                downloadQueue.push({
                    source: source,
                    target: './public/images/plans/' + item.feature.properties.id + '.jpg'
                }, function(err) {})
                
                item.feature.properties.historic_plans.push({
                    'url': './images/plans/' + item.feature.properties.id + '.jpg'
                })
                
        })
    
    }

    return item

}
