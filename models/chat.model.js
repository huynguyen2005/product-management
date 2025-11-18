const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user_id: String,
    room_chat_id: String,
    content: String,
    images: Array,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
    timestamps: true
}); //Tạo mới 1 cái bộ khung, khuôn mẫu 

const Chat = mongoose.model('Chat', chatSchema, "chats"); //Khởi tạo nó

//Tham số 1: Tên model, tham số 2: tên schema mà định nghĩa ở trên, tham số 3 là tên collection bên trong mongodb

module.exports = Chat;