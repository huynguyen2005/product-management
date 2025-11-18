const Chat = require("../../models/chat.model");
const uploadToCloudinaryHelper = require("../../helpers/uploadToCloudinary");

module.exports = (res) => {
    _io.once('connection', (socket) => {
        socket.on("MESSAGE_FROM_CLIENT", async (data) => {
            let images = [];

            for (const imageBuffer of data.images) {
                const link = await uploadToCloudinaryHelper(imageBuffer);
                images.push(link);
            }

            // Lưu vào db
            const chat = new Chat({
                user_id: res.locals.user.id,
                content: data.content,
                images: images
            });
            await chat.save();

            //Trả data về client
            _io.emit("MESSAGE_FROM_SERVER", {
                user_id: res.locals.user.id,
                fullName: res.locals.user.fullName,
                content: data.content,
                images: images
            });
        });

        socket.on("MESSAGE_TYPING_FROM_CLIENT", (type) => {
            socket.broadcast.emit("MESSAGE_TYPING_FROM_SERVER", {
                user_id: res.locals.user.id,
                fullName: res.locals.user.fullName,
                type: type
            });
        });
    });
}