Template.adminLogin.events({
    'click #login-sign-in': function(event){
        var username = $('#login-username').val();
        var password = $('#login-password').val();
        Meteor.loginWithPassword(username, password, function(error){
        	if (!Meteor.userId()) {
                throwError(error.reason);
            }else if(Meteor.user().username != "admin"){
                throwError("This user is not admin");
            }
        });
        Meteor.setTimeout(function(){ 
                Router.go('adminProductList'); 
            console.log('test');}, 1000
        ); 
         
    }
});