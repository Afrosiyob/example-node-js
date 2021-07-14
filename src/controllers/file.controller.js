const { FileModel } = require("../models/file.model");
const fs = require("fs");
const config = require("config");

const fileUpload = async(req, res) => {
    if (!req.file) {
        throw Error("NO_FILE");
    } else {
        const newFile = new FileModel({
            src: req.file.filename,
        });
        await newFile.save();
        // res.status( 200 ).json( req.file );
        statusOk(res, {
            data: req.file,
            message: "uploaded file",
        });
    }
};

const fileDelete = async(req, res) => {
    const { filename } = req.body;
    fs.unlink(`./public/images/${filename}`, (error) => {
        if (error) {
            console.log(error);
        } else {
            statusOk(res, {
                message: "file deleted",
            });
        }
    });
};

module.exports = {
    fileUpload,
    fileDelete,
};