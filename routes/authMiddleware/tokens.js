const jwt = require('jsonwebtoken');

function getToken(userId, isTeacher, isAdmin) {
    let token = jwt.sign({
        userId,
        isTeacher,
        isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 3
    })

    return token;
}

module.exports = {
    getToken
}