var _ = require('lodash');

var downloadQueue = require('../src/downloadQueue')

module.exports = function(item) {

        item.feature.properties.photo = './images/buildings/' + item.feature.properties.id + '.jpg'

        downloadQueue.push({
            source: encodeURI(item.feature.properties.foto_pikk),
            target: './public/images/buildings/' + item.feature.properties.id + '.jpg'
        })


    return item

}
