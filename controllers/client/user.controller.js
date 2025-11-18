const User = require("../../models/user.model");
const md5 = require("md5");

//[GET] /user/login
module.exports.login = (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    });
}

//[POST] /user/login
module.exports.loginPost = async (req, res) => {
    const exitEmail = await User.findOne({email: req.body.email, deleted: false});
    if(!exitEmail){
        req.flash("error", "Tài khoản không tồn tại");
        return res.redirect("/user/login");
    }
    if(exitEmail.password != md5(req.body.password)){
        req.flash("error", "Sai mật khẩu");
        return res.redirect("/user/login"); 
    }
    if(exitEmail.status === "inactive"){
        req.flash("error", "Tài khoản không hoạt động");
        return res.redirect("/user/login"); 
    }
    res.cookie("tokenUser", exitEmail.tokenUser);
    res.redirect("/");
}

//[GET] /user/register
module.exports.register = (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký"
    });
}

//[POST] /user/register
module.exports.registerPost = async (req, res) => {
    const exitEmail = await User.findOne({email: req.body.email, deleted: false});
    if(exitEmail){
        req.flash("error", "Email đã tồn tại");
        return res.redirect("/user/register");
    }
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

//[GET] /user/logout
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}