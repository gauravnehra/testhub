const mongoose = require('mongoose')
var Schema = mongoose.Schema

let answerSchema = new Schema({
    candidate: { type: mongoose.Types.ObjectId, ref: 'Candidate', required: true },
    test: { type: mongoose.Types.ObjectId, ref: 'Test', required: true },
    answers: { type: Map, of: String, required: false, default: {} },
    submitted: { type: Boolean, default: false },
    result: { type: Number, required: false }
})

module.exports = mongoose.model("Answer", answerSchema)