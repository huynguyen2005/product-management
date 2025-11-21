//Kích vào nút kết bạn
const btnAddFriendList = document.querySelectorAll("[btn-add-friend]");
if (btnAddFriendList.length > 0) {
    btnAddFriendList.forEach(btnAdd => {
        btnAdd.addEventListener("click", () => {
            const userId = btnAdd.getAttribute("btn-add-friend");
            btnAdd.closest(".box-user").classList.add("add");
            socket.emit("CLIENT_ADD_FRIEND", userId);
        });
    });
}
//End 

//Kích vào nút hủy kết bạn
const btnCancelFriendList = document.querySelectorAll("[btn-cancel-friend]");
if (btnCancelFriendList.length > 0) {
    btnCancelFriendList.forEach(btnCancel => {
        btnCancel.addEventListener("click", () => {
            const userId = btnCancel.getAttribute("btn-cancel-friend");
            btnCancel.closest(".box-user").classList.remove("add");
            socket.emit("CLIENT_REMOVE_FRIEND", userId);
        });
    });
}
//End 

//Hàm nút từ chối kết bạn
const btnRefuse = (btn) => {
    btn.addEventListener("click", () => {
        const userId = btn.getAttribute("btn-refuse-friend");
        btn.closest(".box-user").classList.add("refuse");
        socket.emit("CLIENT_REFUSE_FRIEND", userId);
    });
}
//End

//Kích vào nút xóa kết bạn
const btnRefuseFriendList = document.querySelectorAll("[btn-refuse-friend]");
if (btnRefuseFriendList.length > 0) {
    btnRefuseFriendList.forEach(btn => {
        btnRefuse(btn);
    });
}
//End 


//Hàm nút chấp nhận 
const btnAccept = (btn) => {
    btn.addEventListener("click", () => {
        const userId = btn.getAttribute("btn-accept-friend");
        btn.closest(".box-user").classList.add("accept");
        socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
}
//End



//Kích vào nút chấp nhận
const btnAcceptFriendList = document.querySelectorAll("[btn-accept-friend]");
if (btnAcceptFriendList.length > 0) {
    btnAcceptFriendList.forEach(btn => {
        btnAccept(btn);
    });
}
//End 



//Lấy dữ liệu số lượng lời mời kết bạn và hiển thị lên màn hình
const badgeUsersAccept = document.querySelector("[badge-users-accept]");
if (badgeUsersAccept) {
    const userId = badgeUsersAccept.getAttribute("badge-users-accept");
    socket.on("SERVER_RETURN_ACCEPT_FRIENDS_LENGTH", (data) => {
        if (data.user_id === userId) {
            badgeUsersAccept.innerHTML = data.acceptFriendsLength;
        }
    });
}
//End


//Trang lời mời kết bạn
const dataAcceptFriend = document.querySelector("[data-accept-friend]");
if (dataAcceptFriend) {
    const userId = dataAcceptFriend.getAttribute("data-accept-friend");

    // Hiển thị thông tin ông A trong lời mời kết bạn của ông B realtime
    socket.on("SERVER_RETURN_INFOR_ACCEPT_FRIEND", (data) => {
        if (data.userId === userId) {
            let div = document.createElement("div");
            div.classList.add(".col-6");
            div.setAttribute("data-user-in-accept-friend", data.inforUser._id)

            div.innerHTML = `
                <div class="box-user">
                    <div class="inner-avatar">
                        <img 
                            src="${data.inforUser.avatar ? data.inforUser.avatar : '/client/images/logo.svg'}"
                            alt="${data.inforUser.fullName}"
                        >
                    </div>

                    <div class="inner-info">
                        <div class="inner-name">
                            ${data.inforUser.fullName}
                        </div>
                    </div>
                    <div class="inner-buttons">
                        <button 
                            class="btn btn-sm btn-primary mr-1" 
                            btn-accept-friend="${data.inforUser._id}"
                        >
                            Chấp nhận
                        </button>

                        <button 
                            class="btn btn-sm btn-secondary mr-1" 
                            btn-refuse-friend="${data.inforUser._id}"
                        >
                            Xóa
                        </button>

                        <button 
                            class="btn btn-sm btn-secondary mr-1" 
                            btn-deleted-friend 
                            disabled
                        >
                            Đã xóa
                        </button>

                        <button 
                            class="btn btn-sm btn-secondary mr-1" 
                            btn-accepted-friend 
                            disabled
                        >
                            Đã chấp nhận
                        </button>
                    </div>
                </div>
            `;

            dataAcceptFriend.appendChild(div);

            //Đồng ý kết bạn
            const btnAcceptFriend = div.querySelector("[btn-accept-friend]");
            if (btnAcceptFriend) {
                btnAccept(btnAcceptFriend);
            }

            //Từ chối kết bạn
            const btnRefuseFriend = div.querySelector("[btn-refuse-friend]");
            if (btnRefuseFriend) {
                btnRefuse(btnRefuseFriend);
            }
        }
    });

    //Xóa thông tin ông A trong lời mời kết bạn của ông B realtime
    socket.on("SERVER_RETURN_CANCEL_FRIEND", (data) => {
        if (data.userIdB === userId) { 
            const divUser = document.querySelector(`[data-user-in-accept-friend="${data.userIdA}"]`);
            if (divUser) {
                dataAcceptFriend.removeChild(divUser);
            }
        }
    });
    //End
}
//End


//Trang danh sách người dùng
const dataNoFriend = document.querySelector("[data-no-friend]");
if(dataNoFriend){
    const userId = dataNoFriend.getAttribute("data-no-friend");
    //Server trả về thông tin sau khi từ chối kết bạn
    socket.on("SERVER_RETURN_TO_A", (data) => {
        if(data.userIdA === userId){
            const divUser = document.querySelector(`[data-user-in-no-friend="${data.userIdB}"]`);
            if(divUser){
                const boxUser = divUser.querySelector(".box-user");
                boxUser.classList.remove("add");
            }
        }
    });
}
//End



// SERVER_RETURN_STATUS_ONLINE
const dataFriends = document.querySelector("[data-friends]");
if(dataFriends){
    socket.on("SERVER_RETURN_STATUS_ONLINE", (data) => {
        const divUser = dataFriends.querySelector(`[data-user-in-friends="${data.userId}"]`);
        if(divUser){
            dataFriends.querySelector("[status]").setAttribute("status", data.statusOnline);
        }
    });
}
// End SERVER_RETURN_STATUS_ONLINE