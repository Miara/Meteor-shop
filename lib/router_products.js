Router.map(function() {
	 this.route('/main/:productsLimit?', {
    name : "homeProducts",
    template: 'mainPage',
    waitOn: function() { 
      var params = getParamsForProductSubscribe(this.params, {});
      return [ 
        Meteor.subscribe('products',params.selectionParam, params.otherParam),
        Meteor.subscribe('categories')]
    },
    data: function() {
      return getDataForProductList(this.params, this.route);
    }
  });

  this.route('category', {
    template: 'category',
    path: '/category/:_id/:productsLimit?',  
    waitOn: function() {
      var params = getParamsForProductSubscribe(this.params, 
        {'categories': this.params._id});
      return [ 
        Meteor.subscribe('products',params.selectionParam, params.otherParam),
        Meteor.subscribe('categories')
      ];
    },
    data: function() { 
      return getDataForProductList(this.params, this.route); 
    }
  });

  this.route('adminProductList', {
    layoutTemplate: 'adminLayout',
    template: 'adminProductList',
    path: '/admin/products/:productsLimit?',
    waitOn: function() { 
      var params = getParamsForProductSubscribe(this.params, {});
      return [ 
        Meteor.subscribe('products',params.selectionParam, params.otherParam),
        Meteor.subscribe('categories')]
    },
    data: function() {
      return getDataForProductList(this.params, this.route);
    }
  });

});



getParamsForProductSubscribe = function(params, selectionParam){
    var mLimit = parseInt(params.productsLimit) || 6; 
    if(!params.productsLimit){
      priceCriteria = { $exists: true };
      sortCriteria = {};
    }
    var otherParam = {limit: mLimit};
    if(!sortCriteria.$exists && !isEmpty(sortCriteria)){
      otherParam.sort = sortCriteria;
    }
    if(!priceCriteria.$exists && !isEmpty(priceCriteria)){
      selectionParam.price = priceCriteria;
    }
    if(params.query.search){
      var reg = ".*"+params.query.search+".*";
      selectionParam.name = {$regex: reg,$options: "i"};
    }

    return { selectionParam : selectionParam, otherParam: otherParam}
}

getDataForProductList = function(params, route){
    var mLimit = parseInt(params.productsLimit) || 6; 
    var hasMore = Products.find().count() === mLimit;
    var pathParams = {productsLimit: mLimit + 6} ;
    if(Router.current().route.getName() === 'category'){
        pathParams._id = params._id;
    }
    var nextPath = route.path(pathParams);

    if(params.query.search){
      nextPath = nextPath + "?search=" + params.query.search;
    }
    return {
      limit: mLimit,
      search: params.query.search,
      nextPath: hasMore ? nextPath : null,
      category: Categories.findOne(params._id)
    }; 
}