const mongoose = require('mongoose')
var Schema = mongoose.Schema

let testSchema = new Schema({
    name: { type: String, required: true },
    duration: { type: String, required: false},
    questions: [{ type: mongoose.Types.ObjectId, ref: 'Question', required: false}]
})

module.exports = mongoose.model("Test", testSchema)