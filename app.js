const express = require("express")
const path = require('path')
const passport = require('passport')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const auth = require('./routes/auth')
app.set('view engine', "ejs")
app.set('views', path.join(__dirname, 'views'))

let sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true , maxAge: 60 *60 *1000 }
}

app.use(logger("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())

app.use('/',auth)