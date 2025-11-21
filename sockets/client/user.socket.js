const User = require("../../models/user.model");
module.exports = async (res) => {
    const myUserId = res.locals.user.id;

    _io.once("connection", (socket) => {
        //Chức năng gửi yêu cầu
        socket.on("CLIENT_ADD_FRIEND", async (userId) => {
            //Lấy id của ông B cập nhật vào requestFriends của ông A
            //Kiểm tra trong resquestFriends của ông A có ông B chưa
            const exitUserBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            });
            if(!exitUserBinA){
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: {
                        requestFriends: userId
                    }
                });
            }
            //Lấy id của ông A cập nhật vào acceptFriends của ông B
            //Kiểm tra trong acceptFriends của ông B có ông A chưa
            const exitUserAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            });
            if(!exitUserAinB){
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {
                        acceptFriends: myUserId
                    }
                });
            }

            //Gửi về client số lượng lời mời kết bạn và hiển thị số lượng đó sang cho ông B
            const userB = await User.findOne({
                _id: userId
            });
            const acceptFriendsLength = userB.acceptFriends.length;
            socket.broadcast.emit("SERVER_RETURN_ACCEPT_FRIENDS_LENGTH", {
                user_id: userB.id,    //id của ông B
                acceptFriendsLength: acceptFriendsLength //độ dài
            });
            //End 

            
            //Gửi client thông tin của ông A vào danh sách lời mời kết bạn
            const inforUser = await User.findOne({_id: myUserId}).select("id avatar fullName");
            socket.broadcast.emit("SERVER_RETURN_INFOR_ACCEPT_FRIEND", {
                userId: userId,
                inforUser: inforUser
            });

        });

        //Chức năng xóa yêu cầu trong lời mời đã gửi
        socket.on("CLIENT_REMOVE_FRIEND", async (userId) => {
            //Xóa id của ông B trong requestFriends của ông A
            //Tìm xem id của ông B có trong requestFriends của ông A chưa để xóa
            const exitUserBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            });
            if(exitUserBinA){
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: {
                        requestFriends: userId
                    }
                });
            }
            //Xóa id của ông A trong acceptFriends của ông B
            //Tìm xem id của ông A có trong acceptFriends của ông B chưa để xóa
            const exitUserAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            });
            if(exitUserAinB){
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {
                        acceptFriends: myUserId
                    }
                });
            }
            
            
            //Gửi về client số lượng lời mời kết bạn mới và hiển thị số lượng đó ra màn hình ông B
            const userB = await User.findOne({
                _id: userId
            });
            const acceptFriendsLength = userB.acceptFriends.length;
            socket.broadcast.emit("SERVER_RETURN_ACCEPT_FRIENDS_LENGTH", {
                user_id: userB.id,    //id của ông B
                acceptFriendsLength: acceptFriendsLength //độ dài
            });
            //End 


            //Gửi về client là đã xóa ông A trong lời mời kết bạn của ông B
            socket.broadcast.emit("SERVER_RETURN_CANCEL_FRIEND", {
                userIdB: userId,
                userIdA: myUserId
            });
            // End
        });

        //Chức năng xóa yêu cầu trong lời mời kết bạn
        socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
            //Xóa id của ông B trong requestFriends của ông A
            //Tìm xem id của ông B có trong requestFriends của ông A chưa để xóa
            // myUserId: ông B
            //userId: ông A
            const exitUserBinA = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            });
            if(exitUserBinA){
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {
                        requestFriends: myUserId
                    }
                });
            }
            //Xóa id của ông A trong acceptFriends của ông B
            //Tìm xem id của ông A có trong acceptFriends của ông B chưa để xóa
            const exitUserAinB = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            });
            if(exitUserAinB){
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: {
                        acceptFriends: userId
                    }
                });
            }


            //Gửi về client số lượng lời mời kết bạn mới và hiển thị số lượng đó ra màn hình ông B
            const userB = await User.findOne({
                _id: myUserId
            });
            const acceptFriendsLength = userB.acceptFriends.length;
            socket.emit("SERVER_RETURN_ACCEPT_FRIENDS_LENGTH", {
                user_id: userB.id,    //id của ông B
                acceptFriendsLength: acceptFriendsLength //độ dài
            });
            //End 

            
            //Gửi về thông điệp cho ông A sau khi từ chối kết bạn
            socket.broadcast.emit("SERVER_RETURN_TO_A", {
                userIdA: userId,
                userIdB: myUserId
            });
            //End

        });

        //Chức năng chấp nhận yêu cầu trong lời mời kết bạn
        socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
            //Xóa id của ông B trong requestFriends của ông A
            //Tìm xem id của ông B có trong requestFriends của ông A chưa để xóa
            //Thêm id của ông B vào friendList của ông A
            // myUserId: ông B
            //userId: ông A
            const exitUserBinA = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            });
            if(exitUserBinA){
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {
                        friendList: {
                            user_id: myUserId,
                            room_chat_id: ""
                        }
                    },
                    $pull: {
                        requestFriends: myUserId
                    }
                });
            }
            //Xóa id của ông A trong acceptFriends của ông B
            //Tìm xem id của ông A có trong acceptFriends của ông B chưa để xóa
            //Thêm id của ông A vào friendList của ông B
            const exitUserAinB = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            });
            if(exitUserAinB){
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: {
                        friendList: {
                            user_id: userId,
                            room_chat_id: ""
                        }
                    },
                    $pull: {
                        acceptFriends: userId
                    }
                });
            }
        });

        
    });
}