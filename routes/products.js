const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// List all products
router.get('/', async (request, response)=>{
    try {
        response.json({
            products: await Product.find()
        });
    }
    catch (error){
        response.status(500).json({
            message: error.message
        });
    };
});

// Get details of a product
router.get('/:id', (request, response)=>{
    response.json({
        "message":"product id",
        "id": request.params.id
    });
});

// Create a product
router.post('/', async (request, response)=>{
    const product = new Product({
        name: request.body.name,
        stock: request.body.stock,
        description: request.body.description,
        price: request.body.price,
        imageUrl: request.body.imageUrl,
        category: request.body.category
    });

    try {
        await product.save();
        console.log('saving');
        response.status(201).json({
            message: 'Product created successfully',
            product
        });
    }
    catch (error){
        response.status(400).json({
            message: error.message
        });
    }
});

// Update one or more attributes of a product
router.patch('/:id', (req, res)=>{
    
});

// Delete a product
router.delete('/:id', (req, res)=>{
    
});


module.exports = router;