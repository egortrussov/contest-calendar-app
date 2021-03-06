const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    fullName: String,
    organisation: String,
    isTeacher: Boolean,
    grade: {
        type: Number,
        required: false
    },
    featuredContests: {
        type: [String],
        default: []
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
})

module.exports = mongoose.model('User', UserSchema)