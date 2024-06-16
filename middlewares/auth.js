const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

const authenticateRequest = (request, response, next) => {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
        if (error) {
            return next(error);
        }
        if (!user) {
            return response.status(401).json({ message: 'Unauthorized' });
        }
        request.user = user;
        next();
    })(request, response, next);
};


const verifyAdminRole = (request, response, next) => {
    if (!request.user || request.user.role != 2) {
        return response.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
    }
    next();
};

module.exports = {
    authenticateRequest,
    verifyAdminRole
};
