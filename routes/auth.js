const express = require("express")
const passport = require('passport')
const LocalStrategy = require('')
const router = express.Router()

passport.use(new LocalStrategy(
    function(username, password, done) {
            return done(null,username)
    })
)

passport.serializeUser(function (user,done) {
    done(null,user)
})

passport.deserializeUser(function (user,done) {
    done(null,user)
})

router.post('/login',function(req,res,next){

})
