const express = require("express")
const router = express.Router()
const candidate_controller = require("../controllers/candidate.controller")
const auth = require("../middlewares/auth")

router.post("/candidate/signup", candidate_controller.signup)

router.post("/candidate/signin", candidate_controller.signin)

router.post("/candidate/signout", candidate_controller.signout)

router.post("/candidate/signoutall", candidate_controller.signoutall)

router.post("/candidate/resetpassword", candidate_controller.resetpassword)

router.post("/candidate/practicetest", candidate_controller.practicetest)

router.post("/candidate/attempttest/:id", candidate_controller.attempttest)

router.post("/candidate/updateprofile", candidate_controller.attempttest)

router.get("/", candidate_controller.dashboard)

module.exports = router  // /home/x/Data/testhub/routes/candidate.route.js