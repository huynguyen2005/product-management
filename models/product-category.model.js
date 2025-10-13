const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');


mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema({
    title: String, 
    parent_id: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { 
        type: String, 
        slug: "title", 
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
}); //Tạo mới 1 cái bộ khung, khuôn mẫu 

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, "product-category"); //Khởi tạo nó

//Tham số 1: Tên model, tham số 2: tên schema mà định nghĩa ở trên, tham số 3 là tên collection bên trong mongodb

module.exports = ProductCategory;