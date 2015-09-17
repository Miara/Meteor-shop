if(Products.find().count() === 0){

	var nike_kobiety = Categories.insert({
		name: "Nike",
		subCategories: [],
		categoryLevel: 2

	});


	var nike_mezczyzni = Categories.insert({
			name: "Nike",
			subCategories: [],
			categoryLevel: 2

		});

	var adidas_mezczyzni = Categories.insert({
			name: "Adidas",
			subCategories: [],
			categoryLevel: 2

		});

	var kobiety = Categories.insert({
		name: "Women",
		subCategories: [nike_kobiety],
		categoryLevel: 1

	});

	var mezczyzni = Categories.insert({
		name: "Men",
		subCategories: [nike_mezczyzni,adidas_mezczyzni],
		categoryLevel: 1

	});

	var root_category = Categories.insert({
		name: "root",
		subCategories: [kobiety,mezczyzni],
		categoryLevel: 0

	});
	


	Accounts.createUser({
            username: 'admin',
            email: 'admin@shop.com',
            password: 'admin',
            profile : {
            	isAdmin: true
        	}
        });

	Accounts.createUser({
            username: 'miara',
            email: 'miara@shop.com',
            password: 'miara',
            profile : {
            	isAdmin: false
        	}
        });


	Products.insert({
		name: 'Nike Long',
		path: 'images/nike_long.jpg',
		price: 150,
		categories: [root_category,mezczyzni,nike_mezczyzni]
	});

	Products.insert({
		name: 'Adidas Black Green',
		path: 'images/adidas_black_green.jpg',
		price: 220,
		categories: [root_category,mezczyzni,adidas_mezczyzni]
	});

	Products.insert({
		name: 'Adidas_white',
		path: 'images/adidas_white.jpg',
		price: 190,
		categories: [root_category,mezczyzni,adidas_mezczyzni]
	});

	Products.insert({
		name: 'Nike Lemon',
		path: 'images/nike_lemon.jpg',
		price: 200,
		categories: [root_category,mezczyzni,nike_mezczyzni]
	});

	Products.insert({
		name: 'Nike Red',
		path: 'images/nike_red.jpg',
		price: 200,
		categories: [root_category,kobiety,nike_kobiety]
	});
}