module.exports = (query) => {
     const filterStatus = [
        {
            name: "Tất cả",
            class: "",
            status: ""
        },
        {
            name: "Hoạt động",
            class: "",
            status: "active"
        },
        {
            name: "Dừng hoạt động",
            class: "",
            status: "inactive"
        }
    ];
    
    if(query.status){
        const index = filterStatus.find(item => item.status === query.status);
        index.class = "active";
    }
    else{
        const index = filterStatus.find(item => item.status === "");
        index.class = "active";
    }

    return filterStatus;
}