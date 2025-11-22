const mongoose = require('mongoose');

const roomChatSchema = new mongoose.Schema({
    title: String,
    avatar: String,
    typeRoom: String,
    status: String,
    users: [
        {
            user_id: String,
            role: String
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
}, {
    timestamps: true
}); //Tạo mới 1 cái bộ khung, khuôn mẫu 

const RoomChat = mongoose.model('RoomChat', roomChatSchema, "room-chat"); //Khởi tạo nó

//Tham số 1: Tên model, tham số 2: tên schema mà định nghĩa ở trên, tham số 3 là tên collection bên trong mongodb

module.exports = RoomChat;