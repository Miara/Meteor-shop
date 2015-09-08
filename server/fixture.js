if(Products.find().count() === 0){

	var kat1 = Categories.insert({
		name: "Kobiety",
		subCategories: [],
		mainCategory: true

	});

	var kat2 = Categories.insert({
		name: "Mężczyźni",
		subCategories: [],
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
		path: 'nike_long.jpg',
		price: 150,
		category: kat2
	});

	Products.insert({
		name: 'Adidas Black Green',
		path: 'adidas_black_green.jpg',
		price: 220,
		category: kat2
	});

	Products.insert({
		name: 'Adidas_white',
		path: 'adidas_white.jpg',
		price: 190,
		category: kat2
	});

	Products.insert({
		name: 'Nike Lemon',
		path: 'nike_lemon.jpg',
		price: 200,
		category: kat2
	});

	Products.insert({
		name: 'Nike Red',
		path: 'nike_red.jpg',
		price: 200,
		category: kat1
	});
}