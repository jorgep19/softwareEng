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
    alert("login as username: "+self.userName()+" password: "+self.password());
};

LoginVM.prototype.createAccount = function() {
    var self = this;

    alert("creating account as username: "+self.userName()+" email: "+self.email()+" password: "
        +self.password()+" password-retype: "+self.passwordRetype());
};

ko.applyBindings(new LoginVM());