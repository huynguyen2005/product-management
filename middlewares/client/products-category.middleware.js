const ProductCategory = require('../../models/product-category.model');
const createTreeHelper = require('../../helpers/createTree');

module.exports.category = async (req, res, next) => {
    const categories = await ProductCategory.find({ deleted: false });
    const newCategories = createTreeHelper.createTree(categories);
    res.locals.layoutProductsCategory = newCategories;
    next();
}