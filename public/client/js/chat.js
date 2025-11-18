//icon
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
//end icon

//Viewerjs
import Viewer from 'https://unpkg.com/viewerjs/dist/viewer.esm.js';
//End viewerjs

//- file-upload-with-preview
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

// Lưu các file tạm
let filesArray = [];

fileInput.addEventListener("change", (e) => {
    const newFiles = Array.from(e.target.files);
    filesArray = filesArray.concat(newFiles); // thêm vào danh sách
    renderPreview();
});

function renderPreview() {
    preview.innerHTML = ""; // xóa preview cũ

    filesArray.forEach((file, index) => {
        const wrapper = document.createElement("div");
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";
        wrapper.style.margin = "5px";

        const img = document.createElement("img");
        img.style.maxWidth = "50px";
        img.style.border = "1px solid #ccc";
        img.src = URL.createObjectURL(file);

        // Nút xóa
        const btn = document.createElement("button");
        btn.innerText = "×";
        btn.style.position = "absolute";
        btn.style.top = "0";
        btn.style.right = "0";
        btn.style.color = "black";
        btn.style.border = "none";
        btn.style.borderRadius = "50%";
        btn.style.cursor = "pointer";
        btn.style.width = "20px";
        btn.style.height = "20px";

        btn.addEventListener("click", () => {
            filesArray.splice(index, 1); 
            renderPreview();
        });

        wrapper.appendChild(img);
        wrapper.appendChild(btn);
        preview.appendChild(wrapper);
    });
}
//- end file-upload-with-preview


//MESSAGE_SEND_FROM_CLIENT
const formChat = document.querySelector(".chat .inner-form");
if (formChat) {
    const input = formChat.querySelector("input");
    formChat.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = input.value ? input.value : "";
        const images = filesArray;
        if (content || images.length > 0) {
            socket.emit("MESSAGE_FROM_CLIENT", {
                content: content,
                images: images
            });

            filesArray = [];
            renderPreview();
            input.value = "";
            
            socket.emit("MESSAGE_TYPING_FROM_CLIENT", "hidden");
        }
    });
}
//End MESSAGE_SEND_FROM_CLIENT


//MESSAGE_FROM_SERVER
//Lấy data mà server đã trả về
socket.on("MESSAGE_FROM_SERVER", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const innerBody = document.querySelector(".chat .inner-body");
    const listTyping = document.querySelector(".inner-list-typing");
    const div = document.createElement("div");

    let inforSender = '';
    let htmlContent = "";
    let htmlImages = "";

    if (data.user_id === myId) {
        div.classList.add("inner-outgoing");
    } else {
        div.classList.add("inner-incoming");
        inforSender = `<div class="inner-name">${data.fullName}</div>`;
    }

    if(data.content){
        htmlContent = `<div class="inner-content">${data.content}</div>`;
    }

    if(data.images.length > 0){
        htmlImages += '<div class="inner-images">';
        for (const image of data.images) {
            htmlImages += `<img src="${image}">`;
        }
        htmlImages += "</div>";
    }
    div.innerHTML = `
        ${inforSender}
        ${htmlContent}
        ${htmlImages}
    `;
    innerBody.insertBefore(div, listTyping);
    const gallery = new Viewer(div);
    innerBody.scrollTop = innerBody.scrollHeight;
});
//End MESSAGE_FROM_SERVER


//Scroll chat to bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
//End Scroll chat to bottom


//Emoji-picker
//show
const btnIcon = document.querySelector(".btn-icon");
if (btnIcon) {
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(btnIcon, tooltip);

    btnIcon.onclick = () => {
        tooltip.classList.toggle('shown');
    };
}
//end show


//Show typing
var typingTimeout;
const showTyping = () => {
    socket.emit("MESSAGE_TYPING_FROM_CLIENT", "show");
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        socket.emit("MESSAGE_TYPING_FROM_CLIENT", "hidden");
    }, 3000);
}
//End show typing


//choose a icon
const emojiPicker = document.querySelector('emoji-picker');
if (emojiPicker) {
    const input = document.querySelector(".chat .inner-foot input[name='content']");
    emojiPicker.addEventListener('emoji-click', (event) => {
        const icon = event.detail.unicode;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        input.value = input.value.slice(0, start) + icon + input.value.slice(end);

        input.focus();
        input.setSelectionRange(start + icon.length, start + icon.length);

        showTyping();
    });
}
//end choose a icon
//End emoji-picker



//typing
const listTyping = document.querySelector(".inner-list-typing");
if (listTyping) {
    const input = document.querySelector(".chat .inner-foot input[name='content']");
    var typingTimeout;
    input.addEventListener("keyup", () => {
        showTyping();
    });
    socket.on("MESSAGE_TYPING_FROM_SERVER", (data) => {
        if (data.type == "show") {
            const exitTyping = listTyping.querySelector(`[user_id="${data.user_id}"]`);
            if (!exitTyping) {
                const div = document.createElement("div");
                div.classList.add("box-typing");
                div.setAttribute("user_id", data.user_id);
                div.innerHTML = `
                    <div class="inner-name">${data.fullName}</div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                `;
                listTyping.appendChild(div);
                bodyChat.scrollTop = bodyChat.scrollHeight;
            }
        }
        else {
            const boxTypingRemove = listTyping.querySelector(`[user_id="${data.user_id}"]`);
            if (boxTypingRemove) {
                listTyping.removeChild(boxTypingRemove);
            }
        }
    });
}
//end typing


//Viewerjs
const bodyChatPriviewImage = document.querySelector(".chat .inner-body");
if(bodyChatPriviewImage){
    const gallery = new Viewer(bodyChatPriviewImage);
}
//End viewerjs