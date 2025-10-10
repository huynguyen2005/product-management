//Button status
const buttonList = document.querySelectorAll('[button-status]');

if(buttonList.length > 0){
    let url = new URL(window.location.href);
    buttonList.forEach(item => {
        item.addEventListener("click", () => {
            const status = item.getAttribute('button-status');
            status ? url.searchParams.set('status', status) : url.searchParams.delete('status');
            window.location.href = url;
        });
    });
}
//End Button status



//Form-search
const formSearch = document.querySelector('#form-search');

if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        keyword ? url.searchParams.set('keyword', keyword) : url.searchParams.delete('keyword');
        window.location.href = url;
    });
}
//End Form-search



//Button pagination

const patinationButtonList = document.querySelectorAll('[button-pagination]');
if(patinationButtonList){
    let url = new URL(window.location.href);
    patinationButtonList.forEach(item => {
        item.addEventListener("click", () => {
            const page = item.getAttribute('button-pagination');
            url.searchParams.set("page", page);
            window.location.href = url;
        })
    });
}
//End Button pagination



//Checkbox multi
const checkboxMulti = document.querySelector('[checkbox-multi]');
if(checkboxMulti){
    const checkAll = checkboxMulti.querySelector("input[name='checkall']");
    const checkboxID = checkboxMulti.querySelectorAll("input[name='id']");


    checkAll.addEventListener("click", () => {
        if(checkAll.checked){
            checkboxID.forEach(item => item.checked = true);
        }else{
            checkboxID.forEach(item => item.checked = false);
        }
    });


    checkboxID.forEach(item => {
        item.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

            countChecked === checkboxID.length ? checkAll.checked = true : checkAll.checked = false;
        });
    });
}
//End checkbox multi    



// Form change multi
const formChangeMulti = document.querySelector('[form-change-multi]');

if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        if(inputsChecked.length > 0){

            //Thông báo xác nhận xóa sản phẩm đến client
            const typeChange = e.target.elements.type.value;
            if(typeChange === "delete-all"){
                const isConfirm = confirm("Bạn có chắn chắn muốn xóa những sản phẩm này?");

                if(!isConfirm)   return;
            }

            //Lấy ra danh sách id những sản phẩm muốn thay đổi
            const idsInput = formChangeMulti.querySelector("input[name='ids']");

            let ids = [];
            inputsChecked.forEach(input => {
                const productID = input.value;
                if(typeChange === "change-position"){
                    const position = input
                                    .closest("tr")
                                    .querySelector("input[name='position']").value;
                    ids.push(`${productID}-${position}`);
                }else{
                    ids.push(input.value);
                }
            });
            
            idsInput.value = ids.join(", ");

            formChangeMulti.submit();
        }else{
            alert("Vui lòng chọn ít nhất 1 bản ghi");
        }
    });
}

// End form change multi    


//Delete item
const buttonsDelete = document.querySelectorAll('[button-delete]');
if(buttonsDelete.length > 0){
    const formDeleteProduct = document.querySelector('#form-delete-product');
    const path = formDeleteProduct.getAttribute("data-path");
    const pageCurrent = formDeleteProduct.getAttribute('data-page');

    buttonsDelete.forEach(buttonDelete => {
        buttonDelete.addEventListener("click", () => {
            const confirmTitle = confirm("Bạn chắc chắn muốn xóa sản phẩm này không");
            if(confirmTitle){
                const productID = buttonDelete.getAttribute('data-id');
                const action = `${path}/${productID}?_method=DELETE&page=${pageCurrent}`;
                formDeleteProduct.action = action;
                formDeleteProduct.submit();
            }
        });
    })
}
//End delete item



//Show alert
const showAlert = document.querySelector('[show-alert]');
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector('[close-alert]')

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);

}
//End show alert


//Updload image
const uploadImage = document.querySelector('[upload-image]');
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector('[upload-image-input]');
    const uploadImagePreview = uploadImage.querySelector('[upload-image-preview]');
    const closeImage = uploadImage.querySelector('[close-image]');
    uploadImageInput.addEventListener("change", (e) => {
        const [file] = e.target.files;
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file); //tạo ra một URL tạm thời trỏ tới file đó trong bộ nhớ trình duyệt
            closeImage.textContent = "✕";
        }
        closeImage.addEventListener("click", () => {
            uploadImageInput.value = "";
            uploadImagePreview.src = "";
            closeImage.textContent = "";
        })
    });

}
//End upload image



//Sort 
const sort = document.querySelector('[sort]');
if(sort){
    const select = sort.querySelector('select');
    const url = new URL(window.location.href);
    const btnClear = sort.querySelector('[sort-clear]');
    select.addEventListener('change', () => {
        const value = select.value.split('-');
        const [sortKey, sortValue] = value;
        url.searchParams.set('sortKey', sortKey);
        url.searchParams.set('sortValue', sortValue);
        window.location.href = url;
    });

    const sortKey = url.searchParams.get('sortKey');
    const sortValue = url.searchParams.get('sortValue');
    if(sortKey && sortValue){
        const value = `${sortKey}-${sortValue}`;
        const option = sort.querySelector(`option[value=${value}]`);
        option.selected = true;
    }
    btnClear.addEventListener('click', () => {
        url.searchParams.delete('sortKey');
        url.searchParams.delete('sortValue');
        window.location.href = url;
    });

}
//End sort