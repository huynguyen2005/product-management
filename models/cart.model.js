const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: String,
    products: [
        {
            product_id: String,
            quantity: Number
        }
    ]
}, {
    timestamps: true
}); //Tạo mới 1 cái bộ khung, khuôn mẫu 

const Cart = mongoose.model('Cart', cartSchema, "carts"); //Khởi tạo nó

//Tham số 1: Tên model, tham số 2: tên schema mà định nghĩa ở trên, tham số 3 là tên collection bên trong mongodb

module.exports = Cart;