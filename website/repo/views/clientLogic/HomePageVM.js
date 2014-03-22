function LoginVM() {
    var self = this;

    // could also be te user's email
    self.userName = ko.observable("");
    self.email = ko.observable("");
    self.password = ko.observable("");
    self.passwordRetype = ko.observable("");
    self.successFeedback = ko.observable(false);
}

LoginVM.prototype.doLogin = function(){
    var self = this;

    $.ajax({
        type: "POST",
        url: "localhost:8080/login",
        data: { email : self.email(), password: self.password }
    });
};

LoginVM.prototype.createAccount = function() {
    var self = this;

    /*$.ajax({
        url: "http://homesense.abovotec.com/api/customer/register?cusEmail="+self.email()+"&cusFrist=x&cusLast=y&cusMI=z"
    })
     http://homesense.abovotec.com/api/sensor/get_sensor_data/?email=indera@gmail.com&pass=pass&device=RasPi_Garage&sensor=TempSens1
    .fail(function() { alert("failed to register"); })
    .done(function( data ) { alert("created your account :)"); });*/

    self.successFeedback(true);

    setTimeout(function(){ window.location = "dashboard.html?e="+self.email(); }, 1000);
};

ko.applyBindings(new LoginVM());