var piDataAccessor = {

    verify : function (data) {
        return { boom: data.code, custID: "foo", deviceID: "bar" };
    }
};

module.exports = piDataAccessor;