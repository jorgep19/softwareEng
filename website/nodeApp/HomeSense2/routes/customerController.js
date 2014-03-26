var constructor = function() {

    var customerDA = require('./customerDataAccessor.js');
    var customerControllerInstance = {};

    customerControllerInstance.registerUser = function (data, res) {

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

    customerControllerInstance.authenticate = function(req, res) {

        var response = { hasErrors: false, messages: [] };
        console.log(req.body)
        // TODO fully implement this validations
        if(req.body.email.length === 0)
        {
            response.hasErrors = true;
            response.messages.push("Email is required");
        }

        // TODO fully implement this validations
        if(req.body.password.length === 0)
        {
            response.hasErrors = true;
            response.messages.push("Password is required");
        }

        if(!response.hasErrors) {

            customerDA.authenticateCustomer(req, res, function(err, rows){

                 if (rows.length != 0) {
                    req.session.regenerate(function(){

                    req.session.user = rows[0].cusEmail;
                    res.send({ hasErrors: false,
                        messages: ["Logged in as " + req.body.email] } );

                });
                } else {
                    res.send({ hasErrors: true,
                        messages: ["Didn't find account for " + req.body.email] } );
                }
            });
        } else {

            res.send(response);
        }

    }

    return customerControllerInstance;
};

module.exports = constructor();