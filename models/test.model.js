const mongoose = require('mongoose')
var Schema = mongoose.Schema

let testSchema = new Schema({
    company: { type: mongoose.Types.ObjectId, ref: 'Company' },
    name: { type: String, required: true },
    duration: { type: String, required: false},
    questions: [{ type: mongoose.Types.ObjectId, ref: 'Question', required: false}],
    answers: [{ type: mongoose.Types.ObjectId, ref: 'Answer', required: false }],
    date: { type: Date, default: Date, required: true }
})

module.exports = mongoose.model("Test", testSchema)