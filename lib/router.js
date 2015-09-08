Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('home', {
  	template: 'mainPage',
  	path: '/',
    waitOn: function() {
      return [
        Meteor.subscribe('products'),
        Meteor.subscribe('categories')
      ];
    }});

  this.route('adminLogin', {
    layoutTemplate: null,
  	template: 'adminLogin',
  	path: '/admin/login',
	});

  this.route('adminProductList', {
    layoutTemplate: null,
    template: 'adminProductList',
    path: '/admin/products'
  });

  this.route('admin', {
    layoutTemplate: null,
    template: 'adminProductList',
    path: '/admin'
  });


});

var mustBeAdmin = function () {
  if (!Meteor.userId() ) {
    this.redirect('adminLogin');
  }else{
    if(!Meteor.user().profile.isAdmin){
        this.redirect('adminLogin');
        throwError("You are not admin");
        Meteor.logout();
      }
  }
  this.next();
  
}

Router.onBeforeAction(mustBeAdmin, {only: ['adminProductList','admin']});
Router.onBeforeAction(function(){
  clearErrors(); 
  this.next();
});

