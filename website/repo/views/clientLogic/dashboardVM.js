/**
 * Created by jorgep on 2/23/14.
 */
function LoginVM() {
    var self = this;

    // could also be te user's email
    self.userName = ko.observable("");
    self.email = ko.observable("");
    self.password = ko.observable("");
    self.passwordRetype = ko.observable("");
    self.successFeedback = ko.observable(false);
}



LoginVM.prototype.createAccount = function() {
    var self = this;

    /*$.ajax({
     url: "http://homesense.abovotec.com/api/customer/register?cusEmail="+self.email()+"&cusFrist=x&cusLast=y&cusMI=z"
     })
     .fail(function() { alert("failed to register"); })
     .done(function( data ) { alert("created your account :)"); });*/

    self.successFeedback(true);

    setTimeout(function(){ window.location = "dashboard.html?e="+self.email(); },3000);
};

ko.applyBindings(new LoginVM());