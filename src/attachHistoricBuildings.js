var _ = require('lodash');

module.exports = function(item) {

    if (historic = _.find(item.data.historicData.features, {'properties': {'aadress': item.feature.properties.aadress}})) {
        item.feature.properties.desc = historic.properties.selgitus
    }
    return item

}
