const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    fullName: String,
    organisation: String,
    isTeacher: Boolean,
    grade: {
        type: Number,
        required: false
    },
    featuredContests: [String]
})

module.exports = mongoose.model('User', UserSchema)