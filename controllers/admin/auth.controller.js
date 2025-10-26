const Account = require('../../models/account.model');
const md5 = require('md5');

const systemConfig = require('../../config/system');

// [GET] /admin/auth/login
module.exports.login = (req, res) => {
    res.render('admin/pages/auth/login', {
        pageTitle : 'Đăng nhập | Admin'
    })
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const account = await Account.findOne({
        email: email,
        deleted: false
    });

    if(!account){
        req.flash("error", "Email không tồn tại!");
        res.redirect(`${systemConfig.preFixAdmin}/auth/login`);
        return;
    }

    if(md5(password) != account.password){
        req.flash("error", "Sai mật khẩu!");
        res.redirect(`${systemConfig.preFixAdmin}/auth/login`);
        return;
    }

    if(account.status === "inactive"){
        req.flash("error", "Tài khoản đã bị khóa!");
        res.redirect(`${systemConfig.preFixAdmin}/auth/login`);
        return;
    }
    
    res.cookie("token", account.token);
    res.redirect(`${systemConfig.preFixAdmin}/dashboard`);
}

//[GET] /admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.preFixAdmin}/auth/login`);
}