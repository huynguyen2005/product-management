const Product = require('../../models/product.model.js');
const filterStatusHelper = require('../../helpers/filterStatus.js');
const searchHelper = require('../../helpers/search.js');
const patigationHelper = require('../../helpers/patigation.js');


//[GET] /admin/products
module.exports.index = async (req, res) => {

    //Lọc sản phẩm theo trạng thái
    const filterStatus = filterStatusHelper(req.query);

    let find = {deleted: false};

    if(req.query.status)    find.status = req.query.status;


    //Tìm kiếm sản phẩm
    const objectSearch = searchHelper(req.query);

    if(objectSearch.regex){
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
    const productList = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

    res.render('admin/pages/products/index', {
        title: "Trang san pham",
        products: productList,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

//[PATCH] /admin/products/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status});

    res.redirect(`/admin/products?page=${req.query.page || 1}`); //Chuyển hướng về trang trước khi bấm
}