const {
    addHandler,
    getBookByIdHandler,
    getAllBookHandler,
    editByIdHandler,
    deleteByIdHandler,
} = require("./handler");
const routes = [
    {
        method: "POST",
        path: "/books",
        handler: addHandler,
    },
    {
        method: "GET",
        path: "/books",
        handler: getAllBookHandler,
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getBookByIdHandler,
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: editByIdHandler,
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteByIdHandler,
    },
];

module.exports = routes;
