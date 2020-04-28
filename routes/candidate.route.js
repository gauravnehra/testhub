const express = require("express")
const router = express.Router()
const candidate_controller = require("../controllers/candidate.controller")
const auth = require("../middlewares/auth")

router.post("/signup", candidate_controller.signup)

router.post("/signin", candidate_controller.signin)

router.post("/signout", auth, candidate_controller.signout)

router.post("/signoutall", auth, candidate_controller.signoutall)

router.post("/resetpassword", auth, candidate_controller.resetPassword)

// verify user
router.put("/verify/:id", candidate_controller.verifyAccount)

// router.get("/test", candidate_controller.practicetest)

// attempt test with id
router.get("/test/:tid", auth, candidate_controller.attemptTest)

// save question response
router.post("/test/:tid/question/:qid", auth, candidate_controller.saveResponse)

// submit test
router.post("/test/:tid/submit", auth, candidate_controller.submitTest)

// update candidate profile
router.put("/profile", auth, candidate_controller.updateProfile)

router.get("/", auth,candidate_controller.dashboard)

module.exports = router  // /home/x/Data/testhub/routes/candidate.route.js