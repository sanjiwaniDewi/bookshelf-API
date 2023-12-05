const {
    addHandler,
    getBookHandler,
    getAllBookHandler,
    editHandler,
    deleteHandler,
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
        handler: getBookHandler,
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: editHandler,
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteHandler,
    },
];

module.exports = routes;
