var piDA = require('./piDataAccessor.js');

var piController = {

    verify : function (data) {
        return piDA.verify(data);
    },

    update: function(data) {
        return
    },

    updateSettings: function(data) {

    },

    recordData: function(data) {

    },

    dbcheck: function(data, res) {
        piDA.dbCheck(data, res)
    }
};

module.exports = piController;