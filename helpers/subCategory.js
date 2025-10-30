const ProductCategory = require('../models/product-category.model');

module.exports.subCategory = async (parentId) => {
    const getSubCategory = async (parentId) => {
        const subs = await ProductCategory.find({
            parent_id: parentId,
            status: "active",
            deleted: false
        });
        let allSub = [...subs];
        for (const sub of allSub) {
            const childs = await getSubCategory(sub.id);
            allSub = allSub.concat(childs);
        }
        return allSub;
    }
    const result = await getSubCategory(parentId);
    return result;
}