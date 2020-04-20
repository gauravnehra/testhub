const express = require("express")
const router = express.Router()
const company_controller = require("../controllers/company.controller")
const auth = require("../middlewares/auth")

router.post("/signup", company_controller.signup)

router.post("/signin", company_controller.signin)

router.post("/signout", company_controller.signout)

router.post("/signoutall", company_controller.signoutall)

router.post("/resetpassword", company_controller.resetPassword)

// verify user
router.put("/verify/:id", company_controller.verifyAccount)

// create test
router.post("/test", company_controller.createTest)

// add question in created test
router.post("/test/:tid/question", company_controller.addQuestion)

// delete question from test
router.delete("/test/:tid/question/:qid", company_controller.deleteQuestion)

// edit question
router.put("/test/:tid/questin/:qid", company_controller.editQuestion)

// edit test info
router.put("/test/:tid", company_controller.editTest)

// delete test with id
router.delete("/test/:tid", company_controller.deleteTest)

// delete all tests created by company
router.delete("/test", company_controller.deleteAllTests)

// get test with id
router.get("/test/:tid", company_controller.testresult)

// get all tests
router.get("/tests", company_controller.testresult)

router.get("/", company_controller.dashboard)

module.exports = router // /home/x/Data/testhub/routes/company.route.js