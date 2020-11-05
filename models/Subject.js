const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name: String,
    contests: [String]
})

module.exports = mongoose.model('Subject', SubjectSchema)