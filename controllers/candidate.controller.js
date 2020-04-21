const http = require('http')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const nodemailer = require('nodemailer')
const Candidate = require('../models/candidate.model')
const Token = require('../models/token.model')
require('dotenv').config()


exports.signup = async (req, res) => {
  // check if account exists
  let candidate = await Candidate.findOne({ email: req.body.email })
  if(candidate) {
    // 409 : Conflict
    return res.status(409).send({ msg: "User already exists with same email id."})
  }

  // create new user(candidate), hash the password
  candidate = new Candidate({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    gender: req.body.gender,
    age: req.body.age,
    location: req.body.location,
    skills: req.body.skills
  })

  // saving user in DB
  candidate.save( async function (err){
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    else {
      let token = new Token({ userId: candidate._id })
      await token.save()
      sendVerifyMail(candidate._id, candidate.email)
      res.status(200).header("authorization", token._id).send({ msg: "Account created successfully." })
    }
  })

};

exports.signin = async (req, res) => {
  // check if account exists with this email
  let candidate = await Candidate.findOne({ email: req.body.email })
  if(!candidate) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }

  // check credentials
  if(!bcrypt.compareSync(req.body.password, candidate.password)) {
    // 403 : Forbidden
    return res.status(403).send({ msg: "Invalid Password." })
  }

  let token = new Token({ userId: candidate._id })
  await token.save()

  res.status(200).header("authorization", token._id).send(candidate);
};

exports.signout = async (req, res) => {
  token = await Token.findByIdAndDelete(req.token._id)
  
  res.status(200).send({ msg: "Signout success" })
};

exports.signoutall = async (req, res) => {
  let tokens = await Token.deleteMany({ userId: req.token.userId })

  res.status(200).send({ msg: "Signout all success" })
};

exports.dashboard = function (req, res) {
    //TODO
};

exports.resetPassword = async (req, res) => {
  let candidate = await Candidate.findById(req.token.userId)
  if(!candidate) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }

  // check credentials
  if(bcrypt.compareSync(req.body.password, candidate.password)) {
    Candidate.findByIdAndUpdate(req.token.userId, { password: bcrypt.hashSync(req.body.newpassword, salt) }, { "new": true }, (err, candidate) => {
      if(err) res.status(500).send({ msg: "Some error occured", err: err})
      res.send({ msg: "Password successfully changed", user: candidate })
    })
  }
  else if(!bcrypt.compareSync(req.body.password, candidate.password)) {
    // 403 : Forbidden
    return res.status(403).send({ msg: "Invalid Password." })
  }

};

exports.verifyAccount = async (req, res) => {
  let candidate = await Candidate.findOne({ email: req.body.email })

  if(!candidate) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }
  
  if(candidate._id != req.params.id) {
    // 421 : Misdirected Request
    return res.status(421).send({ msg: "Wrong URL" })
  }

  if(bcrypt.compareSync(req.body.password, candidate.password)) {
    Candidate.findByIdAndUpdate(req.params.id, { isVerified: true }, (err, candidate) => {
      if(err) res.status(500).send({ msg: "Some error occured", err: err})
      res.send({ msg: "Account verified", user: candidate })
    })
  }
  else if(!bcrypt.compareSync(req.body.password, candidate.password)) {
    // 403 : Forbidden
    return res.status(403).send({ msg: "Invalid Password." })
  }
  
};

exports.updateProfile = async (req, res) => {
  
  Candidate.findByIdAndUpdate(req.token.userId, {
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    location: req.body.location,
    skills: req.body.skills
  },
  { new: true },
  (err, candidate) => {
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    res.send({ msg: "Profile updated successfully", user: candidate })
  })
};

exports.attemptTest = function (req, res) {
    //TODO
};

exports.practicetest = function (req, res) {
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