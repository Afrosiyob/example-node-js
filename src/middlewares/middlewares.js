const { UserModel } = require("../models/user.model");
const { validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { statusError } = require("../res/res");

// Get and send errors
const validationError = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        statusError(res, 400, {
            error: errors.array(),
            message: "please check inputs",
        });
    } else {
        await next();
    }
};

// Check permissions
const setPermissions = (permissions) => async(req, res, next) => {
    const { userId } = req.user;
    const user = await UserModel.findById(userId);
    if (!user) {
        throw Error("NO_ROLE");
    } else {
        const { role } = user;
        if (permissions.includes(role)) {
            await next();
        } else {
            throw Error("NO_PERMESSION");
        }
    }
};

// Check auth and token
const checkAuth = async(req, res, next) => {
    if (req.method === "OPTIONS") {
        await next();
    } else {
        try {
            let token;
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")
            ) {
                token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
            }
            if (!token) {
                await res.status(401).json({ message: "auth error try middleware" });
            } else {
                let decoded = jwt.verify(token, config.get("jwtSecret"));
                req.user = decoded;
                res.setHeader("Last-Modified", new Date().toUTCString());
                await next();
            }
        } catch (error) {
            console.log(error);
            return await res
                .status(401)
                .json({ message: "auth error catch middleware", error });
        }
    }
};

// Set
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public/images`);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

//Init Upload
const upload = multer({
    storage: storage,
}).single("image");

module.exports = {
    validationError,
    setPermissions,
    checkAuth,
    upload,
};