module.exports.newProduct = (products) => {
    const newProduct = products.map(item => {
        item.priceNew = (item.price - (item.price*item.discountPercentage)/100).toFixed(0);
        return item;
    });
    return newProduct;
}

module.exports.newPriceProduct = (product) => {
    product.priceNew = (product.price - (product.price*product.discountPercentage)/100).toFixed(0);
}