const systemConfig = require("../../config/system");

module.exports.createProduct = (req, res, next) => {
    if(!req.body.title){
        req.flash('error', 'Vui lòng nhập tên sản phẩm');
        res.redirect(`${systemConfig.preFixAdmin}/products/create`);
        return;
    }

    next();
}