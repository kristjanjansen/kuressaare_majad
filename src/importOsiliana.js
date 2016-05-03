var googlespreadsheet = require("google-spreadsheet");
var _ = require('lodash');

module.exports = function(data, callback) {

    var sheet = new googlespreadsheet('1CgC9NsWqBHAiOUkhjuGigW2uMYeIiosgImFVvOIn208');

    sheet.getCells(1, function(err, cells) {

        data.osilianaData = _(cells)
            .map(function(cell) {
                return cell.value.replace(/\s+/g, ' ')
            })
            .chunk(4)
            .tail()
            .map(function(row) {
                return _.zipObject(['address', 'lot_id', 'address_old', 'path'], row)
            })
            .value()

        callback(null, data)

    })

}
