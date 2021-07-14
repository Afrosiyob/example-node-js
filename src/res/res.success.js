const statusOk = (
    res, { data = "success data", message = "success message" }
) => res.status(200).json({ data, message });

module.exports = {
    statusOk,
};