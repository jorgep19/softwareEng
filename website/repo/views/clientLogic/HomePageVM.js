function LoginVM() {
    var self = this;

    // could also be te user's email
    self.userName = ko.observable("");
    self.email = ko.observable("");
    self.password = ko.observable("");
    self.passwordRetype = ko.observable("");
}

LoginVM.prototype.doLogin = function(){
    var self = this;

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

    $.ajax({
        url: "http://homesense.abovotec.com/customer/register?cusEmail="+self.email()+"&cusFrist=x&cusLast=y&cusMI=z"
    }).done(function( data ) {
            if ( console && console.log ) {
                console.log( "Sample of data:", data.slice( 0, 100 ) );
            }
        });
};

ko.applyBindings(new LoginVM());