Meteor.startup(function() {
 if(Meteor.isClient){
      return SEO.config({
        title: 'Internet Shop for master thesis',
        meta: {
          'description': 'Internet Shop for master thesis'
        }
      });
    }
});