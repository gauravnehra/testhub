var express = require ('express');
var router = express.Router ();
var http = require ('http');
const indexController = require('../controllers/index.controller');
const auth = require("../middlewares/auth")


/* GET home page. */

router.get("/", indexController.homePage)

router.get("/signin", indexController.signinPage)

router.get("/signup", indexController.signupPage)

router.get("/companydashboard",indexController.companyDashboard)

router.get("/candidatedashboard",indexController.candidateDashboard)

router.get("/companyprofile", indexController.companyProfile)

router.get("/candidateprofile", indexController.candidateProfile)

router.get("/createtest", indexController.createTest)

router.get("/addquestion/:tid", indexController.addQuestion)

router.get("/companyresetpassword", indexController.companyResetPassword)

router.get("/candidateresetpassword", indexController.candidateResetPassword)

router.get("/company/verifypage/:id", indexController.verifyEmailCompany)

router.get("/candidate/verifypage/:id", indexController.verifyEmailCandidate)

router.get("/edittest/:tid", indexController.editTest)

router.get("/editquestion/:tid/:qid/:question/:type/:optionA/:optionB/:optionC/:optionD/:correct/:score", indexController.editQuestion)

router.get("/alltests", indexController.viewAllTests)

router.get("/invite/:tid", indexController.invite)

router.get("/viewresults/:tname/:tid", indexController.viewResults)

router.get("/attempttest/:tid", indexController.attemptTest)

module.exports = router;

