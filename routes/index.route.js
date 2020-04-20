var express = require ('express');
var router = express.Router ();
var http = require ('http');
const indexController = require('../controllers/index.controller');


/* GET home page. */

router.get("/", indexController.homePage)

router.get("/signin", indexController.signinPage)

router.get("/signup", indexController.signupPage)

router.get("/delete",indexController.delete)


module.exports = router;