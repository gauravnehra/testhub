const http = require ('http')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const nodemailer = require('nodemailer')
const Company = require('../models/company.model')
const Token = require('../models/token.model')
require('dotenv').config()


exports.signup = async (req, res) => {
  // check if account exists
  let company = await Company.findOne({ email: req.body.email })
  if(company) {
    // 409 : Conflict
    return res.status(409).send({ msg: "User already exists with same email id."})
  }

  // create new user(company), hash the password
  company = new Company({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    location: req.body.location,
    domain: req.body.domain
  })

  // saving user in DB
  company.save( async function (err){
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    else {
      let token = new Token({ userId: company._id })
      await token.save()
      sendVerifyMail(company._id, company.email)
      res.status(200).header("authorization", token._id).send({ msg: "Account created successfully." })
    }
  })

};

exports.signin = async (req, res) => {
  // check if account exists with this email
  let company = await Company.findOne({ email: req.body.email })
  if(!company) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }

  // check credentials
  if(!bcrypt.compareSync(req.body.password, company.password)) {
    // 403 : Forbidden
    return res.status(403).send({ msg: "Invalid Password." })
  }

  let token = new Token({ userId: company._id })
  await token.save()
  res.status(200).header("authorization", token._id).send(company);
};

exports.signout = function (req, res) {
  //TODO
};

exports.signoutall = function (req, res) {
  //TODO
};

exports.dashboard = function (req, res) {
    //TODO
};

exports.resetpassword = async (req, res) => {
  let token = await Token.findById(req.header("authorization"))
  console.log(token.userId)
  let company = await Company.findById(token.userId)
  if(!company) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }

  // check credentials
  if(bcrypt.compareSync(req.body.password, company.password)) {
    Company.findByIdAndUpdate(token.userId, { password: bcrypt.hashSync(req.body.newpassword, salt) }, { "new": true }, (err, company) => {
      if(err) res.status(500).send({ msg: "Some error occured", err: err})
      res.send({ msg: "Password successfully changed", user: company })
    })
  }
  else if(!bcrypt.compareSync(req.body.password, company.password)) {
    // 403 : Forbidden
    return res.status(403).send({ msg: "Invalid Password." })
  }

};

exports.verifyAccount = async (req, res) => {
  let company = await Company.findOne({ email: req.body.email })
  console.log(company)
  if(!company) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }
  
  if(company._id != req.params.id) {
    // 421 : Misdirected Request
    return res.status(421).send({ msg: "Wrong URL" })
  }

  if(bcrypt.compareSync(req.body.password, company.password)) {
    Company.findByIdAndUpdate(req.params.id, { isVerified: true }, (err, company) => {
      if(err) res.status(500).send({ msg: "Some error occured", err: err})
      res.send({ msg: "Account verified", user: company })
    })
  }
  else if(!bcrypt.compareSync(req.body.password, company.password)) {
    // 403 : Forbidden
    return res.status(403).send({ msg: "Invalid Password." })
  }
  
};

exports.createtest = function (req, res) {
    //TODO
};

exports.deletetest = function (req, res) {
    //TODO
};

exports.testresult = function (req, res) {
    //TODO
};

function sendVerifyMail(toId, toEmail) {
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });

  let link = "localhost:3000/company/verify/" + toId;
  let mailOptions = {
    to : toEmail,
    subject : process.env.EMAIL_SUB,
    html : process.env.EMAIL_MSG + " " + link
  }

  smtpTransport.sendMail(mailOptions, function(err, msg){
    if(err) {
      console.log(err);
    }
    else {
      console.log("mail sent");
    }
  });
}