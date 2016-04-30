var _ = require('lodash');

module.exports = function(item) {

    if (photo = _.find(item.data.historicPhotoData.features, {'properties': {'asukoht': item.feature.properties.aadress}})) {
        item.feature.description2 = photo.properties.selgitus
    }
    return item

}
