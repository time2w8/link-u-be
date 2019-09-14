const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db_pool = require('../mysql');
const encrypt_handler = require('./encrypt-handler');

passport.use('local_signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = req.body;
    //check username
    const check = await db_pool.query('SELECT id FROM users WHERE username = ?', [username])
    if (check[0]) {
        return done(null, true, { message: 'The username is already taken' });
    } else {
        user.password = await encrypt_handler.encript(password);
        const insrt_details = await db_pool.query('INSERT INTO users SET ?', [user]);
        user.id = insrt_details.insertId;
        return done(null, user, { message: 'Succesful signup' });
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