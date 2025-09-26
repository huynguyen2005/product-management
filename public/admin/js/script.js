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
