const RoomChat = require("../../models/room-chat.model");
const User = require("../../models/user.model");

//[GET] /rooms-chat/
module.exports.index = async (req, res) => {
    const roomsChatList = await RoomChat.find({
        typeRoom: "group",
        "users.user_id": res.locals.user.id,
        deleted: false
    });

    console.log(res.locals.user.id);

    res.render("client/pages/rooms-chat/index", {
        pageTitle: "Nhóm chat",
        roomsChatList: roomsChatList
    })
}

//[GET] /rooms-chat/create
module.exports.create = async (req, res) => {
    const friendList = res.locals.user.friendList;
    for (const friend of friendList) {
        const inforUser = await User.findOne({
            _id: friend.user_id,
            deleted: false
        }).select("fullName avatar");
        friend.inforUser = inforUser;
    }

    res.render("client/pages/rooms-chat/create", {
        pageTitle: "Tạo phòng chat",
        friendList: friendList
    });
}

//[POST] /rooms-chat/create
module.exports.createPost = async (req, res) => {
    const title = req.body.title;
    const userIds = req.body.userId;
    const rooms_chat = {
        title: title,
        typeRoom: "group",
        users: [],
    };
    for (const userId of userIds) {
        rooms_chat.users.push({
            user_id: userId,
            role: "user"
        });
    }
    rooms_chat.users.push({
        user_id: res.locals.user.id,
        role: "superAdmin"
    });
    
    const roomsChat = new RoomChat(rooms_chat);
    await roomsChat.save();
    res.redirect("/rooms-chat");
}