var _ = require('lodash');

var downloadQueue = require('../src/downloadQueue')

module.exports = function(item) {

    item.feature.properties.historic_plans = []

    if (plans = _.filter(item.data.historicPlans, {'address': item.feature.properties.aadress})) {
        
        plans.forEach(function(plan) {
            
                item.feature.properties.historic_plans.push({
                    'url': './images/plans/' + item.feature.properties.id + '.jpg'
                })
            
                downloadQueue.push({
                    source: plan.url,
                    target: './public/images/plans/' + item.feature.properties.id + '.jpg'
                })
        
        })
    
    }

    return item

}
