const Account = require("../../models/account.model");
const systemConfig = require('../../config/system');
const md5 = require('md5');

module.exports.index = (req, res) => {
    res.render('admin/pages/my-account/index', {
        pageTitle: "Thông tin cá nhân | Admin",
    })
}

module.exports.edit = (req, res) => {
    res.render('admin/pages/my-account/edit', {
        pageTitle: "Cập nhật tài khoản | Admin",
    })
}


module.exports.editMyAccount = async (req, res) => {
    const emailExit = await Account.findOne({
        _id: { $ne: res.locals.user.id },
        email: req.body.email,
        deleted: false
    });
    if(emailExit){
        req.flash("error", `Email ${req.body.email} đã tồn tại!`);
    }else{
        if(req.body.password){
            req.body.password = md5(req.body.password);
        }else{
            delete req.body.password;
        }
        await Account.updateOne({_id: res.locals.user.id}, req.body);
        req.flash("success", `Cập nhật tài khoản thành công`);
    }
    res.redirect(`${systemConfig.preFixAdmin}/my-account/edit`);
}