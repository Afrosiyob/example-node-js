const { UserModel } = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash")
const config = require("config");

const authLogin = async(req, res) => {
    const { username, password } = req.body
    const checkUser = await UserModel.findOne({ username })
    if (!checkUser) {
        res.status(400).json({ message: "this username wrong" })
    } else {
        const isMatchPassword = await bcrypt.compare(password, checkUser.password)
        if (!isMatchPassword) {
            res.status(400).json({ message: "password incorrect" })
        } else {
            const token = jwt
                .sign({ userId: checkUser.id },
                    config.get("jwtSecret"), { expiresIn: "1h" }
                )
            res
                .status(200)
                .json({
                    token,
                    data: _.pick(checkUser, ["username", "role"]),
                    message: "user info"
                })
        }
    }
}

const authMe = async(req, res) => {
    const { userId } = req.user
    const checkUser = await UserModel.findById(userId)
    if (!checkUser) {
        res
            .status(401)
            .json({
                message: "auth error"
            })
    } else {
        res
            .status(200)
            .json({
                data: _.pick(checkUser, ["username", "role"]),
                message: "auth info"
            })
    }
}

module.exports = {
    authLogin,
    authMe
}