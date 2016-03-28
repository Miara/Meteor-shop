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
        
    }
});

