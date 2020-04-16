const mongoose = require('mongoose')
var Schema = mongoose.Schema

let questionSchema = new Schema({
    question: { type: String, required: true },
    type: { type: String, required: true },  // MCQ or notMCQ
    score: { type: Number, required: true },
    optionA: { type: String, required: false },
    optionB: { type: String, required: false },
    optionC: { type: String, required: false },
    optionD: { type: String, required: false },
    correct: { type: String, required: false }
})

module.exports = mongoose.model("Question", questionSchema)