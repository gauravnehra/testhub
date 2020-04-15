const mongoose = require('mongoose')
var Schema = mongoose.Schema
//var SkillSchema = new Schema({ skill: String })

let candidateSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    gender: { type: String, required: true }, // use M or F
    location: { type: String, required: true},
    //skills : { type: [SkillSchema], required: false }
    //assigned tests
})

module.exports = mongoose.model("Candidate", candidateSchema)