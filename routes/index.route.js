var express = require ('express');
var router = express.Router ();
var http = require ('http');
const indexController = require('../controllers/index.controller');
const auth = require("../middlewares/auth")


/* GET home page. */

router.get("/", indexController.homePage)

router.get("/signin", indexController.signinPage)

router.get("/companysignup", indexController.companySignupPage)

router.get("/candidatesignup", indexController.candidateSignupPage)

router.get("/companydashboard",indexController.companyDashboard)

router.get("/companyprofile", indexController.companyProfile)

router.get("/createtest", indexController.createTest)

router.get("/addquestion/:tid", indexController.addQuestion)

router.get("/resetpassword", indexController.resetPassword)

router.get("/veriflyemail", indexController.verifyEmail)

module.exports = router;

