const Product = require('../../models/product.model');
const ProductCategory = require('../../models/product-category.model');
const productHelper = require('../../helpers/product');
const subCategoryHelper = require('../../helpers/subCategory');

// [GET] /products
module.exports.index = async (req, res) => {

    const products = await Product.find({status: "active", deleted: "false"})
                                    .sort({position : "desc"});

    const newProductList = productHelper.newProduct(products);

    // console.log(productList);

    res.render('client/pages/products/index.pug', {
        title: "Trang danh sách sản phẩm",
        products: newProductList
    });
};

//[GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory, 
        deleted: false, 
        status: "active"
    });
    
    //Lấy ra mảng các id danh mục thuộc danh mục cha 
    const subIdCategory = (await subCategoryHelper.subCategory(category.id)).map(item => item.id);
    //End

    const products = await Product.find({
        product_category_id: { $in : [category.id, ...subIdCategory]},
        status: "active",
        deleted: false
    }).sort({position: "desc"});

    const newProductList = productHelper.newProduct(products);

    res.render('client/pages/products/index', {
        title: category.title,
        products : newProductList
    });
}

//[GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
    try{
        const find = {
            slug: req.params.slugProduct,
            deleted: false,
            status: "active"
        };

        const product = await Product.findOne(find);

        if(!product){
            return;
        }

        productHelper.newPriceProduct(product);
        const category = await ProductCategory.findOne({_id: product.product_category_id, deleted: false});
        product.category = category.title;

        res.render("client/pages/products/detail", {
            title: product.title,
            product: product
        });
    }
    catch(error){
        res.redirect('/products');
    }
}
