const Product = require('../../models/product.model');

// [GET] /product
module.exports.index = async (req, res) => {

    const productList = await Product.find({status: "active", deleted: "false"})
                                    .sort({position : "desc"});

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


//[GET] /products/:slug
module.exports.detail = async (req, res) => {
    try{
        const find = {
            slug: req.params.slug,
            deleted: false,
            status: "active"
        };

        const product = await Product.findOne(find);

        product.priceNew = (product.price - (product.price*product.discountPercentage)/100).toFixed(0);

        res.render("client/pages/products/detail", {
            title: product.title,
            product: product
        });
    }
    catch(error){
        res.redirect('/products');
    }
}
