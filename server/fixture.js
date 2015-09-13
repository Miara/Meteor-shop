if(Products.find().count() === 0){

	var nike_kobiety = Categories.insert({
		name: "Nike",
		subCategories: [],

	});


	var nike_mezczyzni = Categories.insert({
			name: "Nike",
			subCategories: [],

		});

	var adidas_mezczyzni = Categories.insert({
			name: "Adidas",
			subCategories: [],

		});

	var kobiety = Categories.insert({
		name: "Kobiety",
		subCategories: [nike_kobiety],
		mainCategory: true

	});

	var mezczyzni = Categories.insert({
		name: "Mężczyźni",
		subCategories: [nike_mezczyzni,adidas_mezczyzni],
		mainCategory: true

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
		categories: [mezczyzni,nike_mezczyzni]
	});

	Products.insert({
		name: 'Adidas Black Green',
		path: 'images/adidas_black_green.jpg',
		price: 220,
		categories: [mezczyzni,adidas_mezczyzni]
	});

	Products.insert({
		name: 'Adidas_white',
		path: 'images/adidas_white.jpg',
		price: 190,
		categories: [mezczyzni,adidas_mezczyzni]
	});

	Products.insert({
		name: 'Nike Lemon',
		path: 'images/nike_lemon.jpg',
		price: 200,
		categories: [mezczyzni,nike_mezczyzni]
	});

	Products.insert({
		name: 'Nike Red',
		path: 'images/nike_red.jpg',
		price: 200,
		categories: [kobiety,nike_kobiety]
	});
}