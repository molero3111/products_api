const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const jwtSecret = process.env.JWT_SECRET_KEY

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwtPayload, done) => {
            try {
                const user = await User.findById(jwtPayload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (error) {
                console.error(error);
                return done(error, false);
            }
        })
    );
};
