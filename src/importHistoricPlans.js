var googlespreadsheet = require("google-spreadsheet");
var _ = require('lodash');

module.exports = function(data, callback) {

    var sheet = new googlespreadsheet('1cE49G1WVsi0q3_fJ-7rJq9SGXfWqnsVTHNawkXHJ1ho');

    sheet.getCells(1, function(err, cells) {

        data.historicPlans = _(cells)
            .map(function(cell) {
                return cell.value.replace(/\s+/g, ' ')
            })
            .chunk(2)
            .tail()
            .map(function(row) {
                return _.zipObject(['address', 'url'], row)
            })
            .value()

        callback(null, data)

    })

}
