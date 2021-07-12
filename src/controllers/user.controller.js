const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");

const createUser = async(req, res) => {
    try {
        const { username, password } = req.body
        const checkUsername = await UserModel.findOne({ username })
        if (checkUsername) {
            res.status(400).json({ message: "enter other username" })
        } else {
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new UserModel({
                username,
                password: hashedPassword
            })
            await newUser.save();
            res.status(200).json({
                message: "new user created"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "server error" })
    }
}

const getUsers = async(req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error, message: "server error" })
    }
}

const getUser = async(req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error, message: "server error" })
    }
}

const updateUser = async(req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error, message: "server error" })
    }
}

const deleteUser = async(req, res) => {
    try {

    } catch (error) {
        console.log(500)
        res.status(500).json({ error: error, message: "server error" })
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}