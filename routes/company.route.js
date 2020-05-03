const express = require("express")
const router = express.Router()
const company_controller = require("../controllers/company.controller")
const auth = require("../middlewares/auth")

router.post("/signup", company_controller.signup)

router.post("/signin", company_controller.signin)

router.post("/signout", auth, company_controller.signout)

router.post("/signoutall", auth, company_controller.signoutall)

router.post("/resetpassword", auth, company_controller.resetPassword)

// verify user
router.put("/verify/:id", company_controller.verifyAccount)

// create test
router.post("/test", auth, company_controller.createTest)

// add question in created test
router.post("/test/:tid/question", auth, company_controller.addQuestion)

// delete question from test
router.delete("/test/:tid/question/:qid", auth, company_controller.deleteQuestion)

// edit question
router.put("/test/:tid/question/:qid", auth, company_controller.editQuestion)

// edit test info
router.put("/test/:tid", auth, company_controller.editTest)

// delete test with id
router.delete("/test/:tid", auth, company_controller.deleteTest)

// delete all tests created by company
router.delete("/tests", auth, company_controller.deleteAllTests)

// invite candidates to test
router.post("/test/:tid/invite", auth, company_controller.inviteCandidates)

// get test result with id
router.get("/test/:tid/result", auth, company_controller.testresult)

// get detailes result
router.get("/test/:aid/detail", auth, company_controller.detailedResult)

// get test with id
router.get("/test/:tid", auth, company_controller.getTest)

// get all tests
router.get("/tests", auth, company_controller.getAllTests)

router.get("/", auth, company_controller.dashboard)

router.get("/profile", auth, company_controller.profile)

module.exports = router // /home/x/Data/testhub/routes/company.route.js