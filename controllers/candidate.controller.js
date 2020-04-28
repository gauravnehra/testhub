const http = require('http')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const nodemailer = require('nodemailer')
const Candidate = require('../models/candidate.model')
const Test = require('../models/test.model')
const Question = require('../models/question.model')
const Answer = require('../models/answer.model')
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
  candidate.save( async (err) => {
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
  // delete token from DB
  token = await Token.findByIdAndDelete(req.token._id)
  
  res.status(200).send({ msg: "Signout success" })
};

exports.signoutall = async (req, res) => {
  // delete all tokens from DB
  let tokens = await Token.deleteMany({ userId: req.token.userId })

  res.status(200).send({ msg: "Signout all success" })
};

exports.dashboard = function (req, res) {
    //TODO
};

exports.resetPassword = async (req, res) => {
  // check if account exists
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
  // check if user exists
  if(!candidate) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }
  
  if(candidate._id != req.params.id) {
    // 421 : Misdirected Request
    return res.status(421).send({ msg: "Wrong URL" })
  }

  // check password and verify account
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

exports.attemptTest = async (req, res) => {
  // check if user already took test
  let answer = await Answer.findOne({ candidate: req.token.userId, test: req.params.tid })
  let test = await Test.findById(req.params.tid)
  let candidate = await Candidate.findById(req.token.userId)
  if(test.invitedCandidates.indexOf(candidate.email.toString()) < 0) {
    // 403 : Forbidden
    return res.status(403).send({ msg: "You are not authorized to take this test." })
  }
  if(!test) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Sorry, could not find test." })
  }
  if(answer) {
    if(answer.submitted) {
      // 409 : Conflict
      return res.status(409).send({ msg: "Sorry, you already submitted the test."})
    }
    return res.status(200).send({ msg: "You were in the middle of taking your test.", test: test })
  }

  // create new answer document
  answer = new Answer({
    candidate: req.token.userId,
    test: req.params.tid
  })

  answer.save( async (err) => {
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    else {
      res.status(200).send({ msg: "Success", test: test })
    }
  })
};

exports.saveResponse = async (req, res) => {
  let answer = await Answer.findOne({ candidate: req.token.userId, test: req.params.tid })
  if(!answer) {
    return res.status(404).send({ msg: "Some Error Occured" })
  }
  if(answer.submitted) {
    // 409 : Conflict
    return res.status(409).send({ msg: "Sorry, you already submitted the test."})
  }

  // set answer for question
  answer.answers.set(req.params.qid, req.body.userResponse)
  await answer.save()

  res.status(200).send({ msg: "Response saved.", answer: answer })
};

exports.submitTest = async (req, res) => {
  let answer = await Answer.findOne({ candidate: req.token.userId, test: req.params.tid })
  if(!answer) {
    return res.status(404).send({ msg: "Some Error Occured" })
  }
  if(answer.submitted) {
    // 409 : Conflict
    return res.status(409).send({ msg: "Sorry, you already submitted the test."})
  }

  answer.submitted = true;

  // calculate result for MCQs
  let test = await Test.findById(req.params.tid)
  let questions = test.questions
  let maxMarks = 0
  let result = 0
  for(i = 0; i < questions.length; i++) {
    let question = await Question.findById(questions[i])
    if(question.type == 'MCQ') {
      maxMarks = maxMarks + question.score
      if(question.correct == answer.answers.get(question._id.toString())) {
        result = result + question.score
      }
    }
  }

  answer.result = result
  answer.maxMarks = maxMarks

  answer.save( async (err) => {
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    else {
      await Test.findByIdAndUpdate(req.params.tid, { $push: { answers: answer._id } })
      await Candidate.findByIdAndUpdate(req.token.userId, { $pullAll: { assignedtests: [req.params.tid] } })
      let candidate = await Candidate.findById(req.token.userId)
      await Test.findByIdAndUpdate(req.params.tid, { $pullAll: { invitedCandidates: [candidate.email] } })  // removing candidates email from list of invitedCandidates in Test Model
      res.status(200).send({ msg: "Response submitted.", answer: answer })
    }
  })
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