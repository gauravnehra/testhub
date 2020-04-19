const mongoose = require('mongoose')
var Schema = mongoose.Schema

let questionSchema = new Schema({
    question: { type: String, required: true },
    type: { type: String, required: true },  // MCQ or notMCQ
    score: { type: Number, required: true },
    optionA: { type: String, required: false, default: null },
    optionB: { type: String, required: false, default: null },
    optionC: { type: String, required: false, default: null },
    optionD: { type: String, required: false, default: null },
    correct: { type: String, required: false, default: null }
})

module.exports = mongoose.model("Question", questionSchema)