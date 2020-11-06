const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

function userAuth(req, res, next) {
    const token = req.header('x-auth-token');

    console.log(JWT_SECRET)

    if (!token)
        return res
            .status(401)
            .json({ 
                success: false,
                isTokenError: true, 
                errors:['No token provided']
            });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res
            .status(400)
            .json({ 
                success: false,
                isTokenError: true, 
                errors:['Token is not valid']
            });
    }
}

function teacherAuth(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token)
        return res
            .status(401)
            .json({ 
                success: false,
                isTokenError: true, 
                errors:['No token provided']
            });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded.isTeacher) {
            return res 
                .status(401)
                .json({
                    success: false,
                    isTokenError: false,
                    isAccessError: false,
                    errors: ['Blocked']
                })
        }

        req.user = decoded;
        next();
    } catch (e) {
        res
            .status(400)
            .json({ 
                success: false,
                isTokenError: true, 
                errors: ['Token is not valid']
            });
    }
}

function adminAuth(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token)
        return res
            .status(401)
            .json({ 
                success: false,
                isTokenError: true, 
                errors: ['No token provided']
            });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded.isAdmin) {
            return res 
                .status(401)
                .json({
                    success: false,
                    isTokenError: false,
                    isAccessError: false,
                    errors: ['Blocked']
                })
        }

        req.user = decoded;
        next();
    } catch (e) {
        res
            .status(400)
            .json({ 
                success: false,
                isTokenError: true, 
                errors: ['Token is not valid']
            });
    }
}

module.exports = {
    userAuth,
    teacherAuth,
    adminAuth
}