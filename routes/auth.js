const express = require("express")
const passport = require('passport')
const LocalStrategy = require('passport-local')
const router = express.Router()
const crypto = require('node:crypto');
// const {createClient} = require('redis');
// // const redisJson= require("@redis/json")
// const redisClient = createClient()
// redisClient.connect().then(console.log('connected'));
// redisClient.on('error', (err) => console.log('Redis Client Error', err));

passport.use(new LocalStrategy(
    { passReqToCallback: true },
    async function (req, username, password, done) {
        console.log("password(Local);;", password);
        console.log("username(Local);;", username);
        console.log('req.session;;', req.session);
        return done(null, { username: username, password: password });
        // await redisClient.connect()
        // let user = JSON.parse(await redisClient.get(username));
        // console.log("userInRedis;;", user);
        // if (!user) { return done(null, false, { message: 'Incorrect username or password.' }) }
        // crypto.pbkdf2(password, user.salt, 100000, 32, 'sha256', function (err, derivedKey) {
        //     console.log("derivedkey;;", derivedKey.toString('hex'));
        //     console.log('user.hashedPassword;;', user.hashedPassword);
        //     if (err) { return done(err) };
        //     if (derivedKey.toString('hex') === user.hashedPassword) {
        //         //await redisClient.quit()
        //         console.log('You Are Logged In');
        //         return done(null, user)
        //     } else {
        //         return done(null, false)
        //     }
        // })
    })
)


passport.serializeUser(function (user, done) {
    console.log("serializeUser;;", user);
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    console.log("deserializeUser;;", user);
    done(null, user)
})

router.get('/login', function (req, res, next) {
    res.render('login')
})

router.post('/login/password',
    passport.authenticate('local', {
        failureRedirect: '/login',
        successReturnToOrRedirect: '/home',
        session: true
    })
)

router.get('/signup', function (req, res) {
    res.render('signup')
})

router.post('/signup', function (req, res, next) {
    // redisClient.on('error', (err) => console.log('Redis Client Error:::::'));
    let password = req.body.password;
    let salt = crypto.randomBytes(16).toString('hex');
    console.log("salt(signUp);;", salt);
    crypto.pbkdf2(password, salt, 100000, 32, 'sha256', async function (err, derivedKey) {
        if (err) { next(err) };
        // await redisClient.connect()
        console.log("derivedKey(signUp)", derivedKey.toString('hex'));
        var user = {
            userName: req.body.username,
            hashedPassword: derivedKey.toString('hex'),
            salt: salt.toString('hex')
        };
        // await redisClient.set(req.body.username, JSON.stringify(user) );
        // await redisClient.quit();
    })
    res.redirect('/login');
});

router.get("/home", function (req, res, next) {
    console.log('req.session;;', JSON.stringify(req.session));
    res.render("home", {
        session: JSON.stringify(req.session)
    })
})

module.exports = router