Template.manageAccount.events({
    'click #register-btn' : function(event){
        clearErrors();

        var data = {};
        data.username= $('#register-username').val();
        data.password= $('#register-password').val();
        data.password2= $('#register-password2').val();
        data.email= $('#register-email').val();
        data.name= $('#register-name').val();
        data.surname= $('#register-surname').val();
        data.city= $('#register-city').val();
        data.address= $('#register-address').val();
        data.postcode= $('#register-postcode').val();

         Meteor.call('register', data, function(error, result) {
              if (error){
                throwError(error.reason);
              }else{
                var username = $('#register-username').val();
                var password = $('#register-password').val();
                Meteor.loginWithPassword(username, password);
                Router.go('home',{});
              }
        });

    },
    'click #change-btn' : function(event){
        clearErrors();


        //TODO : walidacja po stronie klienta
        var data = {};
        data.email= $('#register-email').val();
        data.name= $('#register-name').val();
        data.surname= $('#register-surname').val();
        data.city= $('#register-city').val();
        data.address= $('#register-address').val();
        data.postcode= $('#register-postcode').val();

         Meteor.call('manageAccount', data, function(error, result) {
              if (error){
                throwError(error.reason);
              }
        });

    }
});
