const User = require("../../models/user.model");

module.exports.inforUser = async (req, res, next) => {
    res.locals.user = ""
    if(req.cookies.tokenUser){
        const user = await User.findOne({tokenUser: req.cookies.tokenUser, deleted: false});
        res.locals.user = user;
    }
    next();
}