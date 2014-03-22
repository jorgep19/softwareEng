var piController = {

    verify : function (data) {
        return { boom: data.code || "invalidCode" , custId: "foo", deviceId: "bar" };
    },

    update: function(data) {
        return
    },

    updateSettings: function(data) {

    },

    recordData: function(data) {

    }
};

module.exports = piController;