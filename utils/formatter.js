const formatProductObjectData = product=>{
    return {
        name: product.name,
        stock: product.stock,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category
    }
}

module.exports = formatProductObjectData; 