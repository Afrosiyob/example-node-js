const { check } = require("express-validator");

const userCreateValidation = [
    check("username", "enter username").isLength({ min: 3 }),
    check("password", "enter password").isLength({ min: 6 }),
];

const authLoginValidation = [
    check("username", "enter username").isLength({ min: 3 }),
    check("password", "enter password").isLength({ min: 6 }),
];

const bookCreateValidation = [check("name", "enter name").isLength({ min: 3 })];

module.exports = {
    userCreateValidation,
    authLoginValidation,
    bookCreateValidation,
};