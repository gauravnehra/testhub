var express = require ('express');
var router = express.Router ();
var http = require ('http');
const indexController = require('../controllers/index.controller');
const auth = require("../middlewares/auth")


/* GET home page. */

router.get("/", indexController.homePage)

router.get("/signin", indexController.signinPage)

router.get("/companySignup", indexController.companySignupPage)

router.get("/candidateSignup", indexController.candidateSignupPage)

router.get("/companyDashboard",indexController.companyDashboard)

router.get("/addQuestionMCQ/:testId",indexController.addQuestionMCQ)

router.get("/addQuestionSubjective",indexController.addQuestionSubjective)

router.get("/resetPassword", indexController.resetPassword)

router.get("/veriflyEmail", indexController.verifyEmail)

router.get("/createTest", indexController.createTest)

module.exports = router;

