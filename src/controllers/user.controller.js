const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { statusOk } = require("../res/res");

const createUser = async(req, res) => {
    const { username, password } = req.body;
    const checkUsername = await UserModel.findOne({ username });
    if (checkUsername) {
        throw Error("SAME_USERNAME");
        // res.status(400).json({ message: "enter other username" });
    } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new UserModel({
            username,
            password: hashedPassword,
        });
        await newUser.save();
        statusOk(res, {
            message: "new user success created",
        });
    }
};

const getUsers = async(req, res) => {
    try {} catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "server error" });
    }
};

const getUser = async(req, res) => {
    try {} catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "server error" });
    }
};

const updateUser = async(req, res) => {
    try {} catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "server error" });
    }
};

const deleteUser = async(req, res) => {
    try {} catch (error) {
        console.log(500);
        res.status(500).json({ error: error, message: "server error" });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};