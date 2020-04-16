const mongoose = require('mongoose')
var Schema = mongoose.Schema

let companySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    location: { type: String, required: true},
    domain: { type: String, required: true},
    createdtests: [{ type: mongoose.Types.ObjectId, ref: 'Test', required: false }],
    isVerified: { type: Boolean, default: false }
})

module.exports = mongoose.model("Company", companySchema)