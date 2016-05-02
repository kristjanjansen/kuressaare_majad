var fs = require('fs')

module.exports = function(item) {

    if (item.feature.properties.aadress) {
        var data = {
            address: item.feature.properties.aadress,
            photo: item.feature.properties.photo,
            desc: item.feature.properties.desc,
            historic_photos: item.feature.properties.historic_photos
        }
        var filepath = './public/data/' + item.feature.properties.id + '.json'
        fs.writeFileSync(filepath, JSON.stringify(data))
    }

    return item    

}