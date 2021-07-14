const handleErrors = async(err, req, res, next) => {
    const { message } = err;
    switch (message) {
        case "no role":
            res.status(403).json({ error: message });
        case "no permession":
            res.status(403).json({ error: message });
        case "PASSWORD_INCORRECT":
            res.status(400).json({ error: message, message: "password incorrect" });
        case "NO_USER":
            res.status(400).json({ error: message, message: "no user" });
        case "SAME_NAME":
            res
                .status(400)
                .json({ error: message, message: `please enter other name` });
        default:
            console.log(message);
            res.status(500).json({ message: "server error" });
    }
    next(err);
};

module.exports = {
    handleErrors,
};