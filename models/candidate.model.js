const mongoose = require('mongoose')
var Schema = mongoose.Schema

let candidateSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true }, // use M or F
    age: { type: Number, required: true },
    location: { type: String, required: true },
    skills: [{ type: String, required: false}],
    assignedtests: [{ type: mongoose.Types.ObjectId, ref: 'Test', required: false }],
    isVerified: { type: Boolean, default: false }
})

module.exports = mongoose.model("Candidate", candidateSchema)