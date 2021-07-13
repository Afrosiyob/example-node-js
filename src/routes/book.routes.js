const { Router } = require("express");
const {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
} = require("../controllers/book.controller");
const { checkAuth, validationError } = require("../middlewares/middlewares");
const { bookCreateValidation } = require("../validations/validations");

const router = Router();

router.post(
    "/create",
    checkAuth,
    bookCreateValidation,
    validationError,
    createBook
);
router.get("/", checkAuth, getBooks);
router.get("/:bookId", getBook);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

module.exports = {
    bookRouter: router,
};