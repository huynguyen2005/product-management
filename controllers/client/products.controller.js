const Product = require('../../models/product.model');

// [GET] /product
module.exports.index = async (req, res) => {

    const productList = await Product.find({
        status: "active",
        deleted: "false"
    });

    const newProductList = productList.map(item => {
        item.priceNew = (item.price - (item.price*item.discountPercentage)/100).toFixed(0);
        return item;
    });

    // console.log(productList);

    res.render('client/pages/products/index.pug', {
        title: "Trang danh sách sản phẩm",
        products: newProductList
    });
};

module.exports.edit = (req, res) => {
    res.render('client/pages/products/index.pug');
};

module.exports.create = (req, res) => {
    res.render('client/pages/products/index.pug');
};
