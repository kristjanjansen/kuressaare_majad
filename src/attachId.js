module.exports = function(item) {

    if (item.feature.properties.aadress) {
        
        item.feature.properties.id = item.feature.properties.aadress
            .toLowerCase()
            .replace(/\//g,'-')
            .replace(/\s+/g,'-')

    }
    
    return item    

}