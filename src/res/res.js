const statusOk = (res, { data = null, message = "success message" }) =>
    res.status(200).json({ data, message });

const statusError = (
    res,
    status, { error = "error", message = "error message" }
) => res.status(status).json({ error, message });

module.exports = {
    statusOk,
    statusError,
};