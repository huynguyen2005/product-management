const User = require("../../models/user.model");
module.exports.requireAuth = async (req, res, next) => {
    const tokenUser = req.cookies.tokenUser;
    if(!tokenUser){
        return res.redirect("/user/login");
    }
    const user = await User.findOne({tokenUser: tokenUser, deleted: false}).select("-password");
    if(!user){
        return res.redirect("/user/login");
    }
    next();
} 