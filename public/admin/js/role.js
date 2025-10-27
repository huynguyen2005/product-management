//Permissions
const tablePermissions = document.querySelector('[table-permissions]');
if (tablePermissions) {
    const buttonSubmit = document.querySelector('[button-submit]');
    const formPermissions = document.querySelector('[form-permissions]');
    if (buttonSubmit) {
        buttonSubmit.addEventListener("click", () => {
            const permissions = [];
            const rows = tablePermissions.querySelectorAll("[data-name]");
            rows.forEach(row => {
                const name = row.getAttribute('data-name');
                if (name === "id") {
                    const inputs = row.querySelectorAll('input');
                    inputs.forEach(input => {
                        const id = input.value;
                        permissions.push({
                            id: id,
                            permissions: []
                        })
                    });
                } else {
                    const inputs = row.querySelectorAll('input');
                    inputs.forEach((input, index) => {
                        if (input.checked) {
                            permissions[index].permissions.push(name);
                        }
                    });
                }
            });
            const inputPermissions = formPermissions.querySelector('input');
            inputPermissions.value = JSON.stringify(permissions);
            formPermissions.submit();
        });
    }

}
//End permission


//Permissions Data Default
const dataRecords = document.querySelector('[data-records]');
if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute('data-records'));
    const tablePermissions = document.querySelector('[table-permissions]');
    records.forEach((record, index) => {
        const permissions = record.permissions;
        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name=${permission}]`);
            const input = row.querySelectorAll('input')[index];
            input.checked = true;
        });
    });
}
//End permissions data default