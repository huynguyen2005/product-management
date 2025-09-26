//Change status
const buttonsChangeStatus = document.querySelectorAll('[button-change-status]');
if(buttonsChangeStatus.length > 0){
    const statusChangeForm = document.querySelector('#form-change-status');
    const path = statusChangeForm.getAttribute('data-path');
    const currentPage = statusChangeForm.getAttribute('data-page');

    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute('data-status');
            const id = button.getAttribute('data-id');
            
            let statusChange = statusCurrent === "active" ? "inactive" : "active";
            
            const action = path + `/${statusChange}/${id}?_method=PATCH&page=${currentPage}`;
            statusChangeForm.setAttribute("action", action);
            
            statusChangeForm.submit();
        });
    }); 
}
    
//End change status


