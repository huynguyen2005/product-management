const Role = require('../../models/role.model');
const Account = require('../../models/account.model');
const md5 = require('md5');
const { preFixAdmin } = require('../../config/system');

//[GET] /admin/accounts
module.exports.index = async (req, res) => {
    const accounts = await Account.find({deleted: false}).select('-password -token');
    for(let account of accounts){
        const role = await Role.findOne({_id: account.role_id}, {deleted: false});
        account.role = role;
    }
    res.render('admin/pages/accounts/index', {
        pageTitle: "Danh sách tài khoản",
        accounts: accounts
    });
}

//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({deleted: false});

    res.render('admin/pages/accounts/create', {
        pageTitle: "Thêm tài khoản",
        roles: roles
    });
}

//[POST] /admin/accounts/create
module.exports.createAccount = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    }); 
    if(emailExist){
        req.flash("error", "Email đã tồn tại");
        res.redirect(`${preFixAdmin}/accounts/create`);
    }else{
        req.body.password = md5(req.body.password);
        const account = new Account(req.body);
        await account.save();
        res.redirect(`${preFixAdmin}/accounts`);
    }
}