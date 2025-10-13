const systemConfig = require('../../config/system');
const Role = require('../../models/role.model');

//[GET] /admin/roles
module.exports.index = async (req, res) => {
    const roles = await Role.find({deleted: false});
    res.render('admin/pages/roles/index', {
        roles: roles
    })
}

//[GET] /admin/roles/create
module.exports.create = (req, res) => {
    res.render('admin/pages/roles/create');
}

//[POST] /admin/roles/create
module.exports.createRole = async (req, res) => {
    const role = new Role(req.body);
    await role.save();
    res.redirect(`${systemConfig.preFixAdmin}/roles`);
}

//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const role = await Role.findOne({_id: id}, {deleted: false});
    res.render('admin/pages/roles/edit', {
        role: role
    });
}

//[PATCH] /admin/roles/edit/:id
module.exports.editRole = async (req, res) => {
    const id = req.params.id;
    try {
        await Role.updateOne({_id: id}, req.body);
        req.flash("success", "Cập nhật nhóm quyền thành công");
    } catch (error) {
        req.flash("error", "Cập nhật nhóm quyền thất bại");
    }
    res.redirect(`${systemConfig.preFixAdmin}/roles/edit/${id}`);
}