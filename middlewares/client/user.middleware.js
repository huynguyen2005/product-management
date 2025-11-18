const User = require("../../models/user.model");

module.exports.inforUser = async (req, res, next) => {
    let user;
    if(req.cookies.tokenUser){
        user = await User.findOne({tokenUser: req.cookies.tokenUser, deleted: false});
        res.locals.user = user;
    }
    next();
}