const { faker } = require('@faker-js/faker');
const MongoClient = require("mongodb").MongoClient;
const _ = require("lodash");


async function main() {
	const url = "mongodb://localhost://27017";
	const client = new MongoClient(url);

	try {
		await client.connect();

		const productsCollection = client.db("food-ordering").collection("products");
		const categoriesCollection = client.db("food-ordering").collection("categories");

		productsCollection.drop();
		let categories = ['breakfast', 'lunch', 'dinner', 'drinks'].map((category) => {return {name: category}});
		await categoriesCollection.insertMany(categories);

		let imagesUrls =[
			'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/1_mfgcb5.png',
			'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/2_afbb0s.png',
			'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/3_iawvqb.png'
		];

		let products = [];
		for (let i = 0;  i<10; i+=1) {
			let newProuct = {
				name: faker.commerce.productName(),
				adjective: faker.commerce.productAdjective(),
				descripton: faker.commerce.description(),
				price: faker.commerce.price(),
				category: _.sample(categories),
				imageUrl: _.sample(imagesUrls)
			};
			products.push(newProuct);
		}
		await productsCollection.insertMany(products);
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}	
}

main();