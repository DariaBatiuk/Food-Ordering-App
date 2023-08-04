const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
const _ = require('lodash');
const { MONGODB_URI } = require('./config/settings');

async function main() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();

    const productsCollection = client.db('food-ordering').collection('products');
    const categoriesCollection = client.db('food-ordering').collection('categories');

    const categories = ['breakfast', 'lunch', 'dinner', 'drinks'].map((category) => ({
      name: category,
    }));
    await categoriesCollection.insertMany(categories);

    const imageUrls = [
      'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/1_mfgcb5.png',
      'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/2_afbbos.png',
      'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/3_iawvqb.png',
    ];

    const products = [];
    for (let i = 0; i < 10; i += 1) {
      const newProduct = {
        name: faker.commerce.productName(),
        adjective: faker.commerce.productAdjective(),
        desciption: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: _.sample(categories),
        imageUrl: _.sample(imageUrls),
      };
      products.push(newProduct);
    }
    await productsCollection.insertMany(products);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main();
