const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");
const { statusOk } = require("../res/res");

const authLogin = async(req, res) => {
    const { username, password } = req.body;
    const checkUser = await UserModel.findOne({ username });
    if (!checkUser) {
        throw Error("NO_USER");
    } else {
        const isMatchPassword = await bcrypt.compare(password, checkUser.password);
        if (!isMatchPassword) {
            throw Error("PASSWORD_INCORRECT");
        } else {
            const token = jwt.sign({ userId: checkUser.id },
                config.get("jwtSecret"), { expiresIn: "1h" }
            );
            statusOk(res, {
                data: { token, user_info: _.pick(checkUser, ["username", "role"]) },
                message: "user info new",
            });
        }
    }
};

const authMe = async(req, res) => {
    const { userId } = req.user;
    const checkUser = await UserModel.findById(userId);
    if (!checkUser) {
        throw Error("Can't find user");
    } else {
        statusOk(res, {
            data: _.pick(checkUser, ["username", "role"]),
            message: "auth info new",
        });
    }
};

module.exports = {
    authLogin,
    authMe,
};