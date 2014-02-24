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

    window.location = "./pages/dashboard.html?e="+self.email();

    // send ajax to login URL
    // and go to pages/dashboard.html"
    /*$.get(
        "loginURL.php",
        "{username:"+self.userName+",password"+self.password+"}",
        function(data) {
            if(data.loginSuccess){
                window.location = "./pages/dashboard.html?u="+self.userName();
            }
            else{
                alert("login error!");
            }
        },
        "html"
    );*/
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