const express = require("express")
const router = express.Router()
const company_controller = require("../controllers/company.controller")
const auth = require("../middlewares/auth")

router.post("/company/signup", company_controller.signup)

router.post("/company/signin", company_controller.signin)

router.post("/company/signout", company_controller.signout)

router.post("/company/signoutall", company_controller.signoutall)

router.post("/company/resetpassword", company_controller.resetpassword)

router.post("/company/createtest", company_controller.createtest)

router.post("/company/deletetest", company_controller.deletetest)

router.post("/company/testresult/:id", company_controller.testresult)

router.get("/", company_controller.dashboard)

module.exports = router // /home/x/Data/testhub/routes/company.route.js