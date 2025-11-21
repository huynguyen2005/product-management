const User = require("../../models/user.model");
const userSocket = require("../../sockets/client/user.socket");

module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId
    });
    const requestFriends = myUser.requestFriends;
    const acceptFriends = myUser.acceptFriends;
    const friendList = myUser.friendList;

    //Socket
    userSocket(res);
    //End socket

    const users = await User.find({
        $and: [
           { _id: { $ne: userId } },
           { _id: { $nin: requestFriends } },
           { _id: { $nin: acceptFriends }},
           { _id: { $nin: friendList.map(item => item.user_id) }}
        ],
        status: "active",
        deleted: false
    }).select("id avatar fullName");

    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    });
}

module.exports.request = async (req, res) => {
    const userId = res.locals.user.id;
     //Socket
    userSocket(res);
    //End socket
    const myUser = await User.findOne({_id: userId});
    const requestFriends = myUser.requestFriends;

    const users = await User.find({
        _id: {$in: requestFriends},
        status: "active",
        deleted: false
    }).select("id avatar fullName");

    res.render("client/pages/users/request", {
        pageTitle: "Lời mời đã gửi", 
        users: users
    });
}

module.exports.accept = async (req, res) => {
    const userId = res.locals.user.id;
     //Socket
    userSocket(res);
    //End socket
    const myUser = await User.findOne({_id: userId});
    const acceptFriends = myUser.acceptFriends;

    const users = await User.find({
        _id: {$in: acceptFriends},
        status: "active",
        deleted: false
    }).select("id avatar fullName");

    res.render("client/pages/users/accept", {
        pageTitle: "Lời mời kết bạn", 
        users: users
    });
}

module.exports.friends = async (req, res) => {
    const userId = res.locals.user.id;
     //Socket
    userSocket(res);
    //End socket
    const myUser = await User.findOne({_id: userId});
    const friendList = myUser.friendList;

    const users = await User.find({
        _id: { $in: friendList.map(item => item.user_id) },
        status: "active",
        deleted: false
    }).select("id avatar fullName statusOnline");

    res.render("client/pages/users/friends", {
        title: "Danh sách bạn bè", 
        users: users
    });
}