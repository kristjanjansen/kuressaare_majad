var _ = require('lodash');

module.exports = function(item) {

    if (photo = _.find(item.data.historicPhotoData.features, {'properties': {'asukoht': item.feature.properties.aadress}})) {
        // console.log(photo.properties)
    }
    return item

}
