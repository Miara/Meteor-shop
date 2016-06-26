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
  	template: 'mainPage',
  	path: '/',
    data: function(){ return this.params.query;},
    waitOn: function() {
      return [
        Meteor.subscribe('products'),
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

  this.route('category', {
    template: 'category',
    data: function() { 
      return {
        category: Categories.findOne(this.params._id),
        search: this.params.query.search
      }; 
    },
    path: '/category/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('products'),
        Meteor.subscribe('categories')
      ];
    }});

  this.route('productItem', {
    template: 'productItem',
    data: function() { return Products.findOne(this.params._id); },
    path: '/products/:_id',
    waitOn: function() {
      return [
          Meteor.subscribe('products'),
          Meteor.subscribe('categories'),
          Meteor.subscribe('attributes')
      ];
    }});


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

  this.route('adminProductList', {
    layoutTemplate: 'adminLayout',
    template: 'adminProductList',
    path: '/admin/products',
    waitOn: function() {
      return [
        Meteor.subscribe('products'),
        Meteor.subscribe('categories')
      ];
  }});

  this.route('adminProductEdit', {
    layoutTemplate: 'adminLayout',
    template: 'adminProductEdit',
    data: function() { return Products.findOne(this.params._id); },
    path: '/admin/products/:_id/edit',
    waitOn: function() {
      return [
        Meteor.subscribe('products'),
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

  this.route('admin', {
    layoutTemplate: 'adminLayout',
    template: 'adminProductList',
    path: '/admin',
    waitOn: function() {
      return [
        Meteor.subscribe('products'),
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
  if(isEmpty(getOrder()) || 
    isEmpty(getOrder().payment || 
    isEmpty(getOrder().delivery))){
      this.redirect('cart');
  }
  this.next();
}

Router.onBeforeAction(orderHasField, {only: ['orderSummary']});
Router.onBeforeAction(beforeManageAccount, {only: ['manageAccount']});
Router.onBeforeAction(beforeRegister, {only: ['registerUser']});
Router.onBeforeAction(mustBeAdmin, {only: ['adminProductList','admin']});
Router.onBeforeAction(function(){
  clearErrors(); 
  this.next();
});

