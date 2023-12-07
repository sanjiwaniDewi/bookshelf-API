const { nanoid } = require("nanoid");
const books = require("./bookshelf");

const addHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    const id = nanoid(16);
    const finished = readPage === pageCount ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };
    if (
        newBook.name !== undefined &&
        newBook.name !== "" &&
        newBook.readPage <= newBook.pageCount
    ) {
        books.push(newBook);
    }
    const isSuccess = books.filter((book) => book.id === newBook.id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    } else if (newBook.name === undefined || newBook.name === "") {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    } else if (newBook.readPage > newBook.pageCount) {
        const response = h.response({
            status: "fail",
            message:
                "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Gagal menambahkan buku, input tidak lengkap",
    });
    response.code(400);
    return response;
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((b) => b.id === bookId)[0];
    if (book !== undefined) {
        const response = h.response({
            status: "success",
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
};

const getAllBookHandler = (request, h) => {
    const newBooks = [];
    const querys = request.query;
    if (querys.reading) {
        const filterBooks = books.filter((b) => b.reading == querys.reading);
        for (const iterator of filterBooks) {
            const { id, name, publisher } = iterator;
            const newData = { id, name, publisher };
            newBooks.push(newData);
        }

        const response = h.response({
            status: "success",
            data: {
                books: newBooks,
            },
        });
        response.code(200);
        return response;
    } else if (querys.name) {
        let names = querys.name.toLowerCase();
        const filterBooks = books.filter((b) =>
            b.name.toLowerCase().includes(names)
        );
        for (const iterator of filterBooks) {
            const { id, name, publisher } = iterator;
            const newData = { id, name, publisher };
            newBooks.push(newData);
        }
        const response = h.response({
            status: "success",
            data: {
                books: newBooks,
            },
        });
        response.code(200);
        return response;
    } else if (querys.finished) {
        const filterBooks = books.filter((b) => b.finished == querys.finished);
        for (const iterator of filterBooks) {
            const { id, name, publisher } = iterator;
            const newData = { id, name, publisher };
            newBooks.push(newData);
        }

        const response = h.response({
            status: "success",
            data: {
                books: newBooks,
            },
        });
        response.code(200);
        return response;
    }
    for (const iterator of books) {
        const { id, name, publisher } = iterator;
        const newData = { id, name, publisher };
        newBooks.push(newData);
    }

    const response = h.response({
        status: "success",
        data: {
            books: newBooks,
        },
    });
    response.code(200);
    return response;
};

const editByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    const updatedAt = new Date().toISOString();
    const finished = readPage === pageCount ? true : false;
    const index = books.findIndex((b) => b.id === bookId);
    if (name === undefined) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message:
                "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    } else if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
            finished,
        };
        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui",
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

const deleteByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((b) => b.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus",
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

module.exports = {
    addHandler,
    getBookByIdHandler,
    getAllBookHandler,
    editByIdHandler,
    deleteByIdHandler,
};
