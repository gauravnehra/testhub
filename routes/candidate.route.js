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
router.get("/test/:id", candidate_controller.attemptTest)

// update candidate profile
router.put("/profile", candidate_controller.updateProfile)

router.get("/", candidate_controller.dashboard)

module.exports = router  // /home/x/Data/testhub/routes/candidate.route.js