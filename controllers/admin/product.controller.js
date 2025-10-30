const Product = require('../../models/product.model.js');
const ProductCategory = require('../../models/product-category.model.js');
const Account = require('../../models/account.model.js');
const systemConfig = require("../../config/system");

const filterStatusHelper = require('../../helpers/filterStatus.js');
const searchHelper = require('../../helpers/search.js');
const patigationHelper = require('../../helpers/patigation.js');
const createTreeHelper = require('../../helpers/createTree.js');

//[GET] /admin/products
module.exports.index = async (req, res) => {

    //Lọc sản phẩm theo trạng thái
    const filterStatus = filterStatusHelper(req.query);

    let find = { deleted: false };

    if (req.query.status) find.status = req.query.status;


    //Tìm kiếm sản phẩm
    const objectSearch = searchHelper(req.query);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    //Pagination
    const productTotal = await Product.countDocuments(find);

    let objectPagination = patigationHelper(
        {
            currentPage: 1,
            limitItems: 4
        },
        req.query,
        productTotal
    );

    //End Pagination

    //Sort 
    const sort = {};
    req.query.sortKey && req.query.sortValue ? sort[req.query.sortKey] = req.query.sortValue : sort["position"] = "desc";
    //End sort
    const productList = await Product.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);


    for (const product of productList) {
        const user = await Account.findOne({ _id: product.createBy.account_id }).select('-password');
        if (user) {
            product.userFullName = user.fullName;
        }

        const updateBy = product.updateBy.slice(-1)[0];
        if (updateBy) {
            const userUpdeted = await Account.findOne({ _id: updateBy.account_id }).select('-password');
            updateBy.userFullName = userUpdeted.fullName;
        }
    }

    res.render('admin/pages/products/index', {
        title: "Trang san pham",
        products: productList,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const id = req.params.id;

        const updateBy = {
            account_id: res.locals.user.id,
            updateAt: Date.now()
        }

        await Product.updateOne({ _id: id }, {
            status: status,
            $push: { updateBy: updateBy }
        });

        req.flash('success', 'Cập nhật trạng thái sản phẩm thành công');
    } catch (e) {
        req.flash('error', 'Cập nhật trạng thái sản phẩm thất bại');
    }

    res.redirect(`/admin/products?page=${req.query.page || 1}`); //Chuyển hướng về trang trước khi bấm
}


//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    const updateBy = {
        account_id: res.locals.user.id,
        updateAt: Date.now()
    }

    const deleteBy = {
        account_id: res.locals.user.id,
        deleteAt: Date.now()
    }
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active", $push: { updateBy: updateBy } });
            req.flash('success', 'Cập nhật trạng thái sản phẩm thành công');
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive", $push: { updateBy: updateBy } });
            req.flash('success', 'Cập nhật trạng thái sản phẩm thành công');
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deleteBy: deleteBy
            });
            req.flash('success', `Đã xóa thành công ${ids.length} sản phẩm`);
            break;
        case "change-position":
            for (let item of ids) {
                const [id, position] = item.split('-');
                await Product.updateOne({ _id: id }, { position: parseInt(position), $push: { updateBy: updateBy } });
                req.flash('success', `Đã đổi vị trí thành công ${ids.length} sản phẩm`);
            }
        default:
            break;
    }

    res.redirect(`/admin/products?page=${req.query.page || 1}`);
}


//[DELETE] /admin/products/delete/:id
module.exports.deleteProduct = async (req, res) => {
    const productID = req.params.id;

    //Xóa cứng sản phẩm
    // await Product.deleteOne({_id: productID});

    //Xóa mềm
    await Product.updateOne({ _id: productID }, {
        deleted: true,
        deleteBy: {
            account_id: res.locals.user.id,
            deleteAt: Date.now()
        }
    });

    res.redirect(`/admin/products/?page=${req.query.page || 1}`);
}


//[GET] /admin/products/create
module.exports.create = async (req, res) => {
    const categories = await ProductCategory.find({ deleted: false });
    const newCategories = createTreeHelper.createTree(categories);
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm",
        categories: newCategories
    });
}

//[POST] /admin/products/create
module.exports.createProduct = async (req, res) => {
    if (res.locals.role.permissions.includes("products_create")) {
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);

        if (req.body.position) {
            req.body.position = parseInt(req.body.position);
        } else {
            const countProduct = await Product.countDocuments();
            req.body.position = countProduct + 1;
        }

        const createBy = {
            account_id: res.locals.user.id,
        }
        req.body.createBy = createBy;
        const product = new Product(req.body); //Tạo mới 1 product nhưng chưa lưu
        await product.save(); //phương thức save() để lưu vào db

        res.redirect(`${systemConfig.preFixAdmin}/products`);
    }
    else{
        return;
    }
}


//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {

    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find);

        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        });
    }
    catch (error) {

        res.redirect(`${systemConfig.preFixAdmin}/products`);
    }
}


//[PATCH] /admin/products/edit/:id
module.exports.editProduct = async (req, res) => {
    try {
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        req.body.position = parseInt(req.body.position);

        const updateBy = {
            account_id: res.locals.user.id,
            updateAt: Date.now()
        }
        await Product.updateOne({ _id: req.params.id }, {
            ...req.body,
            $push: { updateBy: updateBy }
        });

        req.flash('success', 'Cập nhật sản phẩm thành công');
        res.redirect(`${systemConfig.preFixAdmin}/products/edit/${req.params.id}`);
    }
    catch (error) {
        res.redirect(`${systemConfig.preFixAdmin}/products`);
    }
}


//[GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {

    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find);
        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    }
    catch (error) {
        res.redirect(`${systemConfig.preFixAdmin}/products`);
    }
}