const mongoose = require('mongoose');
const generateHelper = require("../helpers/generate.js");
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    tokenUser: {
        type: String,
        default: generateHelper.generateRandomString(10)
    },
    password: String,
    status: {
        type: String,
        default: "active"
    },
    requestFriends: Array, //Lời mời đã gửi
    acceptFriends: Array,   //Lời mời đã nhận
    friendList: [   //Danh sách bạn bè
        {
            user_id: String,
            room_chat_id: String
        }
    ],
    statusOnline: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
}, {
    timestamps: true
}); //Tạo mới 1 cái bộ khung, khuôn mẫu 

const User = mongoose.model('User', userSchema, "users"); //Khởi tạo nó

//Tham số 1: Tên model, tham số 2: tên schema mà định nghĩa ở trên, tham số 3 là tên collection bên trong mongodb

module.exports = User;