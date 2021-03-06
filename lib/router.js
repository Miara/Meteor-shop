Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
    return [
      Meteor.subscribe('orderPositions'),
      Meteor.subscribe('orders')
    ] }
});

Router.map(function() {
  this.route('home', {
  	template: 'loading',
  	path: '/',
    waitOn: function() {
      return [
        Meteor.subscribe('products',{}),
        Meteor.subscribe('categories')
      ];
    }});

  this.route('manageAccount', {
    template: 'manageAccount',
    path: '/user/manage',
    waitOn: function() {
      return [ Meteor.subscribe('categories') ];
    }});

  this.route('registerUser', {
    template: 'manageAccount',
    path: '/user/register',
    data: function(){ return {register: true}},
    waitOn: function() {
      return [ Meteor.subscribe('categories') ];
    }});
  

  this.route('productItem', {
    template: 'productItem',
    data: function() { return Products.findOne(this.params._id); },
    path: '/products/:_id',
    waitOn: function() {
      return [
          Meteor.subscribe('products',{_id: this.params._id}),
          Meteor.subscribe('categories'),
          Meteor.subscribe('attributes')
      ];
    },
    onAfterAction: function() {
      if (!Meteor.isClient) {
        return;
      }
      var product = Products.findOne(this.params._id);
      SEO.set({
        title: product.name,
        meta: {
          'description': product.description
        },
        og: {
          'title': 'Product: ' + product.name
        }
      });
    }
  });


  this.route('cart', {
    template: 'cart',
    path: '/cart',
    waitOn: function() {
      return [
          Meteor.subscribe('orderPositions'),
          Meteor.subscribe('categories'),
          Meteor.subscribe('deliveryOptions'),
          Meteor.subscribe('paymentOptions'),
          Meteor.subscribe('orders')
      ];
    }});

  this.route('orderSummary', {
    template: 'orderSummary',
    path: '/order/summary',
    waitOn: function() {
      return [
          Meteor.subscribe('orderPositions'),
          Meteor.subscribe('categories'),
          Meteor.subscribe('deliveryOptions'),
          Meteor.subscribe('paymentOptions'),
          Meteor.subscribe('orders')
      ];
    }});

  this.route('confirm', {
    template: 'confirm',
    path: '/order/confirm',
    waitOn: function() {
      return [ Meteor.subscribe('categories') ];
    }});

  this.route('adminLogin', {
    layoutTemplate: null,
  	template: 'adminLogin',
  	path: '/admin/login',
	});

  this.route('adminProductEdit', {
    layoutTemplate: 'adminLayout',
    template: 'adminProductEdit',
    data: function() { return Products.findOne(this.params._id); },
    path: '/admin/products/:_id/edit',
    waitOn: function() {
      return [
        Meteor.subscribe('products',{}),
        Meteor.subscribe('categories'),
        Meteor.subscribe('attributes')
      ];
    }
  });

  this.route('adminProductNew', {
    layoutTemplate: 'adminLayout',
    template: 'adminProductEdit',
    path: '/admin/products/new',
    waitOn: function() {
      return [
        Meteor.subscribe('categories')
      ];
    }
  });


  this.route('adminAttributeList', {
    layoutTemplate: 'adminLayout',
    template: 'adminAttributeList',
    path: '/admin/attributes',
    waitOn: function() {
      return [
        Meteor.subscribe('attributes')
      ];
  }});

  this.route('adminAttributeEdit', {
    layoutTemplate: 'adminLayout',
    template: 'adminAttributeEdit',
    data: function() { return Attributes.findOne(this.params._id); },
    path: '/admin/attributes/:_id/edit',
    waitOn: function() {
      return [
        Meteor.subscribe('attributes'),
        Meteor.subscribe('categories')
      ];
    }
  });

  this.route('adminAttributeNew', {
    layoutTemplate: 'adminLayout',
    template: 'adminAttributeEdit',
    data: function() { return Attributes.findOne({adding: true}); },
    path: '/admin/attributes/new',
    waitOn: function() {
      return [
        Meteor.subscribe('attributes'),
        Meteor.subscribe('categories')
      ];
    }
  });

  this.route('adminCategories', {
    layoutTemplate: 'adminLayout',
    template: 'adminCategories',
    path: '/admin/categories',
    waitOn: function() {
      return [ 
        Meteor.subscribe('categories'),
        Meteor.subscribe('attributes')
      ];
  }});


  this.route('adminOrderList', {
    layoutTemplate: 'adminLayout',
    template: 'adminOrderList',
    path: '/admin/orders',
    waitOn: function() {
      return [ 
        Meteor.subscribe('categories'),
        Meteor.subscribe('orders')
      ];
  }});

  this.route('adminOrderEdit', {
    layoutTemplate: 'adminLayout',
    template: 'adminOrderEdit',
    data: function() { return Orders.findOne(this.params._id); },
    path: '/admin/orders/:_id/edit',
    waitOn: function() {
      return [ 
        Meteor.subscribe('categories'),
        Meteor.subscribe('orders'),
        Meteor.subscribe('orderPositions'),
        Meteor.subscribe('deliveryOptions'),
        Meteor.subscribe('paymentOptions')
      ];
  }});


  this.route('adminSettings', {
    layoutTemplate: 'adminLayout',
    template: 'adminSettings',
    path: '/admin/settings',
    data: function() { return Settings.findOne(); },
    waitOn: function() {
      return [ 
        Meteor.subscribe('settings'),
        Meteor.subscribe('paymentOptions'),
        Meteor.subscribe('deliveryOptions')
      ];
  }});

  this.route('admin', {
    layoutTemplate: 'adminLayout',
    template: 'loading',
    path: '/admin',
    waitOn: function() {
      return [
        Meteor.subscribe('products',{}),
      ];
    }
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

var beforeManageAccount = function(){
  if(!Meteor.userId()){
    this.redirect('home');
  }
  this.next();
}

var beforeRegister = function(){
  if(Meteor.userId()){
    this.redirect('home');
  }
  this.next();
}

var orderHasField = function(){
  if( isEmpty(getOrder()) || 
      isEmpty(getOrder().payment) || 
      isEmpty(getOrder().delivery) ){
      if(isOrderConfirmed === false){
        this.redirect('cart');
      }
  }
  this.next();
}

var redirectRoot = function(){
  this.redirect('homeProducts')
  this.next();
}


var redirectAdmin = function(){
  this.redirect('adminProductList')
  this.next();
}

var adjustAdminPanelHeight = function(){
  height = $('#main').height();
  if($('.sidebar nav').height() < height){
    $('.sidebar nav').height(height);
  }
}

var adminSites = [
    'adminProductList','admin', 'adminProductEdit',
    'adminAttributeList','adminAttributeEdit',
    'adminAttributeNew','adminCategories','adminOrderList',
    'adminOrderEdit','adminSettings'
  ];

Router.onBeforeAction(redirectRoot, {only: ['home']});
Router.onBeforeAction(redirectAdmin, {only: ['admin']});
Router.onBeforeAction(orderHasField, {only: ['orderSummary']});
Router.onBeforeAction(beforeManageAccount, {only: ['manageAccount']});
Router.onBeforeAction(beforeRegister, {only: ['registerUser']});
Router.onBeforeAction(mustBeAdmin, {only: adminSites});
Router.onBeforeAction(function(){
  clearErrors(); 
  this.next();
});

Router.onAfterAction(adjustAdminPanelHeight, {only: adminSites} );



