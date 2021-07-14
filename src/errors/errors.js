const handleErrors = async(err, req, res, next) => {
    const { message } = err;
    switch (message) {
        case "NO_ROLE":
            res.status(403).json({ error: message });
        case "NO_PERMESSION":
            res.status(403).json({ error: message });
        case "PASSWORD_INCORRECT":
            res.status(400).json({ error: message, message: "password incorrect" });
        case "NO_USER":
            res.status(400).json({ error: message, message: "no user" });
        case "SAME_NAME":
            res
                .status(400)
                .json({ error: message, message: `please enter other name` });
        case "NO_FILE":
            res.status(400).json({
                error: message,
                message: "please enter file",
            });
        case "SAME_USERNAME":
            res.status(400).json({ error: message, message: "enter other username" });
        default:
            console.log(message);
            res.status(500).json({ message: "server error new" });
    }
    next(err);
};

module.exports = {
    handleErrors,
};