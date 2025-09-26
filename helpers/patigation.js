module.exports = (objectPagination, query, productTotal) => {

    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;


    objectPagination.pageTotal = Math.ceil(productTotal / objectPagination.limitItems);

    return objectPagination;
}