var constructor = function() {

    var customerDA = require('./customerDataAccessor.js');
    var piControllerInstance = {};

    piControllerInstance.registerUser = function (data, res) {

        var response = { hasErrors: false, messages: [] };

        // TODO fully implement this validations
        if(data.email.length === 0)
        {
            response.hasErrors = true;
            response.messages.push("Email is required");
        }

        // TODO fully implement this validations
        if(data.password.length === 0)
        {
            response.hasErrors = true;
            response.messages.push("Password is required");
        }

        if(!response.hasErrors)
        {
            customerDA.insertUserToDb(data, response, function(err, response, result)
            {
                if(err && err.code == 'ER_DUP_ENTRY')
                {
                    response.hasErrors = true;
                    response.messages.push("An account for " + data.email + " already exists");

                    console.log(response);
                }
                else if(err)
                {
                    response.hasErrors = true;
                    console.log(err);
                    response.messages.push("something went wrong");
                }
                else
                {
                    response.messages.push("Account for " + data.email + "successfully created");
                }


                res.send(response);
            });
        }
        else
        {
            res.send(response);
        }
    };

    piControllerInstance.update = function(data, res) {
        // TODO implement;
    };

    piControllerInstance.recordData = function(data, res) {
        // TODO implement;
    };

    piControllerInstance.dbcheck = function(data, res) {
        piDA.dbCheck(data, res);
    };

    return piControllerInstance;
};

module.exports = constructor();