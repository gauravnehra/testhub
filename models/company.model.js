const mongoose = require('mongoose')
var Schema = mongoose.Schema

let companySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    location: { type: String, required: true},
    domain: { type: String, required: true}
})

module.exports = mongoose.model("Company", companySchema)