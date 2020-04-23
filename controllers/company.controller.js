const http = require ('http')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const nodemailer = require('nodemailer')
const Company = require('../models/company.model')
const Candidate = require('../models/candidate.model')
const Test = require('../models/test.model')
const Question = require('../models/question.model')
const Answer = require('../models/answer.model')
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

exports.signout = async (req, res) => {
  // delete from token from DB
  token = await Token.findByIdAndDelete(req.token._id)
  
  res.status(200).send({ msg: "Signout success" })
};

exports.signoutall = async (req, res) => {
  // delete all tokens from Db
  let tokens = await Token.deleteMany({ userId: req.token.userId })

  res.status(200).send({ msg: "Signout all success" })
};

exports.dashboard = function (req, res) {
    //TODO
};

exports.resetPassword = async (req, res) => {
  // check if user exists
  let company = await Company.findById(req.token.userId)
  if(!company) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }

  // check credentials
  if(bcrypt.compareSync(req.body.password, company.password)) {
    Company.findByIdAndUpdate(req.token.userId, { password: bcrypt.hashSync(req.body.newpassword, salt) }, { "new": true }, (err, company) => {
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
  // check if user exists
  if(!company) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }
  
  if(company._id != req.params.id) {
    // 421 : Misdirected Request
    return res.status(421).send({ msg: "Wrong URL" })
  }

  // check password and verify account
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

exports.createTest = async (req, res) => {
  // create new test
  let test = new Test({
    name: req.body.testName,
    duration: req.body.testDuration
  })

  test.save( async function (err){
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    else {
      await Company.findByIdAndUpdate(req.token.userId, { $push: { createdtests: test._id } })
      res.status(200).send({ msg: "Test created successfully." })
    }
  })
};

exports.addQuestion = async (req, res) => {
  // create a new question
  let question = new Question({
    question: req.body.question,
    type: req.body.type,
    score: req.body.score,
    optionA: req.body.optionA,
    optionB: req.body.optionB,
    optionC: req.body.optionC,
    optionD: req.body.optionD,
    correct: req.body.correct
  })
  // save question in DB and add entry in test
  question.save( async function (err){
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    else {
      await Test.findByIdAndUpdate(req.params.tid, { $push: { questions: question._id } })
      res.status(200).send({ msg: "Question added to test successfully." })
    }
  })
};

exports.deleteQuestion = async (req, res) => {
  Question.findByIdAndDelete(req.params.qid, async (err) => {
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    else {
      await Test.findByIdAndUpdate(req.params.tid, { $pullAll: { questions: [req.params.qid] } })
      res.status(200).send({ msg: "Question deleted successfully." })
    }
  })
};

exports.editQuestion = async (req, res) => {
  Question.findByIdAndUpdate(req.params.qid, {
    question: req.body.question,
    type: req.body.type,
    score: req.body.score,
    optionA: req.body.optionA,
    optionB: req.body.optionB,
    optionC: req.body.optionC,
    optionD: req.body.optionD,
    correct: req.body.correct
  },
  { new: true },
  (err, question) => {
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    res.send({ msg: "Question updated successfully", question: question })
  })
};

exports.editTest = async (req, res) => {
  Test.findByIdAndUpdate(req.params.tid, {
    name: req.body.testName,
    duration: req.body.testDuration
  },
  { new: true },
  (err, test) => {
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    res.send({ msg: "Test updated successfully", test: test })
  })
};

exports.deleteTest = async (req, res) => {
  Test.findByIdAndDelete(req.params.tid, async (err) => {
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    else {
      await Company.findByIdAndUpdate(req.token.userId, { $pullAll: { createdtests: [req.params.tid] } })
      res.status(200).send({ msg: "Test deleted successfully." })
    }
  })
};

exports.deleteAllTests = async (req, res) => {
  let company = await Company.findById(req.token.userId)
  let tests = company.createdtests

  for(i = 0; i < tests.length; i++) {
    await Test.findByIdAndDelete(tests[i])
  }
  Company.findByIdAndUpdate(req.token.userId, { $set: { createdtests: [] } }, function(err){
    if(err) res.status(500).send({ msg: "Some error occured", err: err})
    else res.status(200).send({ msg: "All tests deleted successfully." })
  })
};

exports.inviteCandidates = async (req, res) => {
  test = await Test.findById(req.params.tid)
  // check if test exists
  if(!test) {
    res.status(404).send({ msg: "Test Not Found in DB" })
  }
  let candidatesEmail = req.body.candidates
  // add entry in existing candidate profiles for assigned test
  for(i = 0; i < candidatesEmail.length; i++) {
    let candidate = await Candidate.findOne({ email: candidatesEmail[i] })
    if(candidate) {
      candidate.assignedtests.push(req.params.tid)
      await candidate.save()
    }
  }

  let company = await Company.findById(req.token.userId)
  let companyName = company.name
  // send invite mail to all candidates
  sendInviteMail(candidatesEmail, companyName, req.params.tid)

  res.status(200).send({ msg: "Candidates Invited", linkForTest: "localhost:3000/candidate/test/" + req.params.tid })
};

exports.testresult = async (req, res) => {
  let test = await Test.findById(req.params.tid)
  // check if test exists
  if(!test) {
    res.status(404).send({ msg: "Test Not Found in DB" })
  }
  let answersId = test.answers
  let answers = []
  for(i = 0; i < answersId.length; i++) {
    let answer = await Answer.findById(answersId[i])
    answers.push(answer)
  }

  res.status(200).send(answers)
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

function sendInviteMail(toEmail, by, tid) {
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });

  let link = "localhost:3000/candidate/test/" + tid
  let mailOptions = {
    to : toEmail,
    subject : "testhub - Test Invite",
    html : "You have been invites to a test by " + by + " on testhub. To attempt the test you can either login and take test from dashboard or go to: " + link
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