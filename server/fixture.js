if(Products.find().count() === 0){

	var attr_weight = Attributes.insert({
		name : "weight",
		type : "numeric",
		min: 0,
		max: 100,
		unit: "kg",
		hidden: false,
		values: []
	});

	var attr_dim = Attributes.insert({
		name:"dimension",
		type: "text",
		min: 0,
		max: 100,
		hidden: false,
		values: []
	});

	var empty = Attributes.insert({
		name:"",
		type: "text",
		hidden: false,
		values: [],
		adding:  true
	});

	var nike_kobiety = Categories.insert({
		name: "Nike",
		subCategories: [],
		categoryLevel: 2,
		attributes : [attr_weight]

	});


	var nike_mezczyzni = Categories.insert({
			name: "Nike",
			subCategories: [],
			categoryLevel: 2,
			attributes : [attr_weight]

		});

	var adidas_mezczyzni = Categories.insert({
			name: "Adidas",
			subCategories: [],
			categoryLevel: 2,
			attributes : [attr_weight]

		});

	var everlast_mezczyzni = Categories.insert({
			name: "Everlast",
			subCategories: [],
			categoryLevel: 2,
			attributes : [attr_weight,attr_dim]

		});

	var kobiety = Categories.insert({
		name: "Women",
		subCategories: [nike_kobiety],
		categoryLevel: 1,
		attributes : [attr_weight]

	});

	var mezczyzni = Categories.insert({
		name: "Men",
		subCategories: [nike_mezczyzni,adidas_mezczyzni,everlast_mezczyzni],
		categoryLevel: 1,
		attributes : [attr_weight]

	});

	var root_category = Categories.insert({
		name: "root",
		subCategories: [kobiety,mezczyzni],
		categoryLevel: 0,
		attributes : [attr_weight]

	});



	var orderId = Orders.insert({
      sum: 0
    });
	var userId = Accounts.createUser({
            username: 'admin',
            email: 'admin@shop.com',
            password: 'admin',
            profile : {
            	isAdmin: true,
            	order: orderId
        	}
        });

	Orders.update(orderId,{$set: {"userId": userId}});


	orderId = Orders.insert({
      sum: 0
    });
	userId = Accounts.createUser({
            username: 'miara',
            email: 'miara@shop.com',
            password: 'miara',
            profile : {
            	isAdmin: false,
            	order: orderId
        	}
        });
	Orders.update(orderId,{$set: {"userId": userId}});



	orderId = Orders.insert({
      sum: 0
    });
	userId = Accounts.createUser({
            username: 'olga',
            email: 'olga@shop.com',
            password: 'olga',
            profile : {
            	isAdmin: false,
            	order: orderId
        	}
        });
	Orders.update(orderId,{$set: {"userId": userId}});

	Products.insert({
		name: 'Nike Long',
		path: 'images/nike_long.jpg',
		price: 150,
		categories: [root_category,mezczyzni,nike_mezczyzni],
		attributes: 
		[{
			name : "weight",
			value: 8,
			unit: "kg" 
		}]
	});

	Products.insert({
		name: 'Adidas Black Green',
		path: 'images/adidas_black_green.jpg',
		price: 220,
		categories: [root_category,mezczyzni,adidas_mezczyzni],
		attributes: 
		[{
			name : "weight",
			value: 8,
			unit: "kg" 
		}]
	});

	Products.insert({
		name: 'Adidas_white',
		path: 'images/adidas_white.jpg',
		price: 190,
		categories: [root_category,mezczyzni,adidas_mezczyzni],
		attributes: 
		[{
			name : "weight",
			value: 5,
			unit: "kg" 
		}]
	});

	Products.insert({
		name: 'Nike Lemon',
		path: 'images/nike_lemon.jpg',
		price: 200,
		categories: [root_category,mezczyzni,nike_mezczyzni],
		attributes: 
		[{
			name : "weight",
			value: 6,
			unit: "kg" 
		}]
	});

	Products.insert({
		name: 'Nike Red',
		path: 'images/nike_red.jpg',
		price: 200,
		categories: [root_category,kobiety,nike_kobiety],
		attributes: 
		[{
			name : "weight",
			value: 3,
			unit: "kg" 
		}]
	});


	Products.insert({
		name: 'Punching bag',
		path: 'images/worek.jpg',
		price: 439,
		categories: [root_category,mezczyzni,everlast_mezczyzni],
		attributes: 
		[{
			name : "weight",
			value: 6,
			unit: "kg" 
		},
		{
			name : "dimension",
			value: "20cm x 120cm x 40cm"
		}]
	});
}