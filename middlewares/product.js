const Product = require('../models/Product');

const getProduct = async(request, response, next) => {
    let product = null;
    try {
        product = await Product.findById(request.params.id);
        if(!product){
            return response.status(401).json({
                message: 'Product not found'
            });
        }
    } catch (error){
        return response.status(500).json({
            message: error.message
        });
    }
    response.product = product;
    return next();
};

module.exports = getProduct;

const authenticateRequest = ()=>{
    passport.authenticate('jwt', { session: false });
};