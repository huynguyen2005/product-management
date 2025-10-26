const systemConfig = require('../../config/system');

module.exports.loginPost = (req, res, next) => {
    if(!req.body.email){
        req.flash("error", "Vui lòng nhập email");
        res.redirect(`${systemConfig.preFixAdmin}/auth/login`);
        return;
    }
    if(!req.body.password){
        req.flash("error", "Vui lòng nhập password");
        res.redirect(`${systemConfig.preFixAdmin}/auth/login`);
        return;
    }
    next();
}