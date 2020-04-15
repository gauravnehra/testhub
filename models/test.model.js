const mongoose = require('mongoose')
var Schema = mongoose.Schema

let testSchema = new Schema({
    name: { type: String, required: true },
    //questions
    //result
})

module.exports = mongoose.model("Test", testSchema)