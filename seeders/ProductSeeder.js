// const mongoose = require('mongoose');
// const Product = require('../models/Product');

// const faker = require('faker');
// const connectDatabase = require('../utils/database');
// const products = [];
// for (let i = 0; i < 1000; i++) {
//   products.push({
//     name: faker.commerce.productName(),
//     stock: Math.floor(Math.random() * 100), // Random stock between 0 and 99
//     price: faker.commerce.price(10, 100), // Random price between $10 and $100
//     description: faker.commerce.productDescription(),
//     imageUrl: faker.image.imageUrl(), // Generate random image URL
//     category: faker.commerce.department(),
//   });
// }

// const databaseConnection = connectDatabase();
// await Product.create(products);
// console.log(`${products.length} products successfully seeded!`);
process.exit(0); // Exit process after successful seeding
    