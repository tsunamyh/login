const express = require("express")
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const router = require('./routes/auth')
const passport = require('passport')
const redis = require('redis')
const RedisStore = require("connect-redis")(session)
const redisClient = redis.createClient({ legacyMode: true })
redisClient.connect().catch(console.error)
const redisStore = new RedisStore({ client: redisClient })

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ');
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

app.set('view engine', "ejs")
app.set('views', path.join(__dirname, 'views'))

let sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 1000 * 20 },
    store: redisStore,
}

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    console.log("req.session: ", req.session);
    console.log('req.sessionID: ', req.sessionID);
    console.log('req.cookies: ', req.cookies);
    next();
}, session(sess), function (req, res, next) {
    // res.locals.user =  (!!req.session.passport.username) ? req.session.passport.username : "Not Logged In" ,
    res.locals.user = "testing"
    console.log('req.url;;', req.url);
    console.log('req.session2;;', req.session);
    next()
})

app.use(passport.initialize())
app.use(passport.session()) // 

app.use('/', router)

module.exports = app 