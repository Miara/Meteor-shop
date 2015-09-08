Session.set("isSignUp", false);

Template.dropdownMenu.events({
    'click #login-sign-in': function(event){
        clearErrors();
        var username = $('#login-username').val();
        var password = $('#login-password').val();
        Meteor.loginWithPassword(username, password, function(error){
        	if (Meteor.user()) {
                $('li.dropdown').removeClass('open');
            } else {
                throwError(error.reason);
            }
        });
        
    },
    'click #signup-link': function(event){
        Session.set("isSignUp", true);
    },

    'click #login-cancel': function(event){
        Session.set("isSignUp", false);
    },

    'click #login-sign-up' : function(event){
        clearErrors();
        var username = $('#login-username').val();
        var password = $('#login-password').val();
        var password2 = $('#login-password2').val();

         Meteor.call('register', {username: username, 
            password: password, password2: password2}, function(error, commentId) {
              if (error){
                throwError(error.reason);
              }
        });

         Meteor.loginWithPassword(username, password);
    }
});

Template.dropdownMenu.isSignIn = function(){
    var result = Session.get("isSignUp");

    if(result === undefined){
        return true;
    }else{
        return !result;
    }
}