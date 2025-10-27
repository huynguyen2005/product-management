const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');


mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String, // vd về slug sản phẩm 1
    product_category_id: {
        type: String,
        default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { 
        type: String, 
        slug: "title", //san-pham-1
        unique: true
    },
    createBy: {
        account_id: String,
        createAt: {
            type: Date,
            default: Date.now
        }
    },
    deleteBy: {
        account_id: String,
        deleteAt: Date
    },
    updateBy: [
        {
            account_id: String,
            updateAt: Date
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    }
}); //Tạo mới 1 cái bộ khung, khuôn mẫu 

const Product = mongoose.model('Product', productSchema, "products"); //Khởi tạo nó

//Tham số 1: Tên model, tham số 2: tên schema mà định nghĩa ở trên, tham số 3 là tên collection bên trong mongodb

module.exports = Product;