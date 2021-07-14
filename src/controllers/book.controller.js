const { BookModel } = require("../models/book.model");
const { UserModel } = require("../models/user.model");
const { statusOk } = require("../res/res");
const _ = require("lodash");
const createBook = async(req, res) => {
    const { name } = req.body;
    const checkBook = await BookModel.findOne({ name });
    if (checkBook) {
        throw Error("SAME_NAME");
    } else {
        const newBook = new BookModel({
            name,
            owner: req.user.userId,
        });
        await newBook.save();
        statusOk(res, {
            data: _.pick(newBook, ["name", "owner"]),
            message: "new book created",
        });
    }
};

const getBooks = async(req, res) => {
    let books;
    const { userId } = req.user;
    const { role } = await UserModel.findById(userId);
    if (role === "admin") {
        books = await BookModel.find();
    } else {
        books = await BookModel.find({ owner: userId });
    }
    statusOk(res, {
        data: books,
        message: "all books",
    });
};

const getBook = async(req, res) => {
    try {} catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
};

const updateBook = async(req, res) => {
    try {} catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
};

const deleteBook = async(req, res) => {
    try {} catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
};