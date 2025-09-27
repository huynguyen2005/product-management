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
            const idsInput = formChangeMulti.querySelector("input[name='ids']");

            let ids = [];
            inputsChecked.forEach(item => {
                ids.push(item.value);
            });
            
            idsInput.value = ids.join(", ");

            formChangeMulti.submit();
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