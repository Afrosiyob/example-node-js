const { BookModel } = require("../models/book.model");
const { UserModel } = require("../models/user.model");

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
        res.status(200).json({ message: "new book created" });
    }
};

const getBooks = async(req, res) => {
    try {
        let books;
        const { userId } = req.user;
        const { role } = await UserModel.findById(userId);
        if (role === "admin") {
            books = await BookModel.find();
        } else {
            books = await BookModel.find({ owner: userId });
        }
        res.status(200).json({ data: books, message: "all books" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
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