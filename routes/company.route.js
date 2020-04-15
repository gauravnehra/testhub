const express = require("express")
const router = express.Router()
const company_controller = require("../controllers/company.controller")
const auth = require("../middlewares/auth")

router.post("/signup", company_controller.signup)

router.post("/signin", company_controller.signin)

router.post("/signout", company_controller.signout)

router.post("/signoutall", company_controller.signoutall)

router.post("/resetpassword", company_controller.resetpassword)

router.post("/test", company_controller.createtest)

router.delete("/:id", company_controller.deletetest)

router.get("/testresult/:id", company_controller.testresult)

router.get("/", company_controller.dashboard)

module.exports = router // /home/x/Data/testhub/routes/company.route.js