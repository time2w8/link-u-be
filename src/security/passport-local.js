const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db_pool = require('../mysql');
const encrypt_handler = require('./encrypt-handler');

passport.use('local_signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = req.body;
    //check username
    var check = await db_pool.query('SELECT id FROM users WHERE username = ?', [username]);
    if (check[0]) {
        return done(null, true, { message: 'The username is already taken' });
    } else {
        check = await db_pool.query('SELECT id FROM users WHERE email = ?', [req.body.email]);
        if (check[0]) {
            return done(null, true, { message: 'The email is already taken' });
        } else {
            user.password = await encrypt_handler.encript(password);
            const insrt_details = await db_pool.query('INSERT INTO users SET ?', [user]);
            user.id = insrt_details.insertId;
            return done(null, user, { message: 'Succesful signup' });
        }
    }
}));

passport.use('local_login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const users = await db_pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users[0]) {
            const authentication = await encrypt_handler.isValidPassword(password, users[0].password);
            if (authentication) {
                return done(null, users[0], { message: 'Succesful Login' });
            } else {
                return done(null, true, { message: 'Incorrect password' });
            }
        } else {
            return done(null, true, { message: 'Incorrect username' });
        }
    } catch (error) {
        done(error);
    }
}))

passport.use('verify_token', new JWTStrategy({
    secretOrKey: process.env.TOKEN_KEY || 'top_secret',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return done(null, token);
    } catch (error) {
        done(error);
    }
}))