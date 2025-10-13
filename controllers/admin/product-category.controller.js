const ProductCategory = require('../../models/product-category.model');
const createTreeHelper = require('../../helpers/createTree');
const config = require('../../config/system');

//[GET] /admin/product-category
module.exports.index = async (req, res) => {
    const categories = await ProductCategory.find({ deleted: false });
    const newCategories = createTreeHelper.createTree(categories);
    res.render('admin/pages/product-category/index', {
        pageTitle: 'Danh mục sản phẩm',
        categories: newCategories
    });
}

//[GET] /admin/product-category/create
module.exports.create = async (req, res) => {
    const categories = await ProductCategory.find({ deleted: false });
    const newCategories = createTreeHelper.createTree(categories);
    res.render('admin/pages/product-category/create', {
        pageTitle: 'Thêm danh mục sản phẩm',
        categories: newCategories
    });
}

//[POST] /admin/product-category/create
module.exports.createCategory = async (req, res) => {
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }else{
        const cntCategories = await ProductCategory.countDocuments({ deleted: false });
        req.body.position = cntCategories + 1;
    }
    const productCategory = new ProductCategory(req.body);
    await productCategory.save();
    res.redirect('/admin/product-category');
}

//[GET] /admin/product-category/edit
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const category = await ProductCategory.findOne({_id: id}, {deleted: false});
    
    const categories = await ProductCategory.find({deleted: false});
    const newCategories = createTreeHelper.createTree(categories);
    res.render('admin/pages/product-category/edit', {
        pageTitle: 'Chỉnh sửa danh mục sản phẩm',
        category: category,
        categories: newCategories
    })
}

//[PATCH] /admin/product-category/edit/:id
module.exports.editCategory = async (req, res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position)
    await ProductCategory.updateOne({_id: id}, req.body);
    res.redirect(`${config.preFixAdmin}/product-category/edit/${id}`);
}

