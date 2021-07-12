const { Router } = require("express")
const { authLogin, authMe } = require("../controllers/auth.controller")
const { validationError, checkAuth, setPermissions } = require("../middlewares/middlewares")
const { authLoginValidation } = require("../validations/validations")

const router = Router()

router.post("/login", authLoginValidation, validationError, authLogin)
router.get("/me", checkAuth, setPermissions("admin"), authMe)

module.exports = {
    authRouter: router
}