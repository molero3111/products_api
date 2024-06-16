const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const formatProductObjectData = require('../utils/formatter');
const { authenticateRequest, verifyAdminRole } = require('../middlewares/auth');
const getProduct = require('../middlewares/product');

router.use(authenticateRequest);

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
router.get('/:id', getProduct, (request, response)=>{
    response.json(formatProductObjectData(response.product));
});

// Create a product
router.post('/', async (request, response)=>{
    const product = new Product(formatProductObjectData(request.body));

    try {
        await product.save();
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
router.patch('/:id', getProduct, async (request, response) => {
    const product = response.product;

    const fieldsToUpdate = Object.keys(request.body);
    for (const field of fieldsToUpdate) {
        product[field] = request.body[field];
    }
  
    try {
      await product.save();
      response.json({
        message: 'Product updated successfully',
        product
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  });
  

// Delete a product
router.delete('/:id', [verifyAdminRole, getProduct], async(request, response)=>{
    try {
        const product = formatProductObjectData(response.product);
        await response.product.deleteOne();
        response.json({
            message: 'Product deleted successfully',
            product
        });
    }
    catch (error){
        response.status(500).json({
            message: error.message
        });
    };
});


module.exports = router;