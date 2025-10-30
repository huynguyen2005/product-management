const Product = require('../../models/product.model');
const productHelper = require('../../helpers/product');

//[GET] /
module.exports.index = async (req, res) => {

    //Lấy ra sản phẩm nổi bật
    const featuredProducts = await Product.find({
        featured: "1",
        status: "active",
        deleted: false
    }).limit(3);
    const newFeaturedProducts = productHelper.newProduct(featuredProducts);
    //End

    //Lấy ra sản phẩm bán chạy
    const latestProducts = await Product.find({
        status: "active",
        deleted: false,
    }).sort({position: "desc"}).limit(3);
    const newLatestProducts = productHelper.newProduct(latestProducts);
    //End


    res.render('client/pages/home/index', {
        title: "Trang chủ",
        featuredProducts: newFeaturedProducts,
        latestProducts: newLatestProducts
    });
};
