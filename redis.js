// redis = require('redis')

// var buf = Buffer.from('Doe');
// console.log(buf.toJSON());
// var obj = {
//     name: 'john',
//     lastName: buf
// }
// console.log(obj);
// var stringObject = JSON.stringify(obj)
// // console.log((stringObject));
// var parseObject = JSON.parse(stringObject)
// console.log(parseObject.lastName.data);
// // let buferrArray = parseObject.lastName.data
// let bufferArray = [123,34,105,100,34,58,53,48,57,51,44,34,112,97,114,101,110,116,95,105,100,34,58,48,44,34,115,116,97,116,117,115,34,58,34,112,114,111,99,101,115,115,105,110,103,34,44,34,99,117,114,114,101,110,99,121,34,58,34,71,66,80,34,44,34,118,101,114,115,105,111,110]

// let str = ""
// bufferArray.forEach(function (element) {
//     str += String.fromCharCode(element)
// })
// console.log(bufferArray.map(c => String.fromCharCode(c)).join(''))

// String.fromCharCode(parseObject.lastName.data[i])
// console.log(JSON.parse(buf)); // به جای Doe باید یک آبجکت باشد تا ارور ندهد
// const encodedJsonObject = Buffer.from(JSON.stringify(obj)).toString('base64');  //jwt
// console.log('encodedJsonObject;;', encodedJsonObject)                        //jwt
// const decodedJsonObject = Buffer.from('eyJzYXJhIjoiRmF0aHBvdXIifQ', 'base64').toString(); //jwt
//  console.log('decodedJsonObject;;', JSON.parse(decodedJsonObject))                               //jwt
// string += String.fromCharCode(buffer[i])
// var string = "[123,34,105,100,34,58,53,48,57,51,44,34,112,97,114,101,110,116,95,105,100,34,58,48,44,34,115,116,97,116,117,115,34,58,34,112,114,111,99,101,115,115,105,110,103,34,44,34,99,117,114,114,101,110,99,121,34,58,34,71,66,80,34,44,34,118,101,114,115,105,111,110]";
// var b= Buffer.from([123,34,105,100,34,58,53,48,57,51,44,34,112,97,114,101,110,116,95,105,100,34,58,48,44,34,115,116,97,116,117,115,34,58,34,112,114,111,99,101,115,115,105,110,103,34,44,34,99,117,114,114,101,110,99,121,34,58,34,71,66,80,34,44,34,118,101,114,115,105,111,110],"base64")
// // Encode the String
// var encodedString = btoa(string);
// console.log(b.toString('base64'))
// console.log(encodedString);
// var decodedString = atob(encodedString);
// console.log(decodedString);
// var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
// var encodedStrin = Base64.encode(string);
// console.log(encodedStrin); // Outputs: "SGVsbG8gV29ybGQh"
// function isObject(obj){
//     const type = typeof obj;
//     return  type === 'object' && !!obj && !Array.isArray(obj);
// }
// var obj = {firstName: 'John', lastName: 'Doe'};
// console.log(obj.length); // undefined
// console.log(isObject(obj)); // true

const express = require('express');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);
const RedisStore = connectRedis(session)
//Configure redis client
const redisClient = redis.createClient({ legacyMode: true })
redisClient.connect().catch(console.error)
// redisClient.connect().then(() => {
//     console.log('Redis client connected');
// })
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ');
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
app.use(morgan('dev'));
//Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60  // session max age in miliseconds
    }
}))
app.get("/", (req, res) => {
    const sess = req.session;
    if (sess.username && sess.password) {
        if (sess.username) {
            res.write(`<h1>Welcome ${sess.username} </h1><br>`)
            res.write(
                `<h3>This is the Home page</h3>`
            );
            res.end('<a href=' + '/logout' + '>Click here to log out</a >')
        }
    } else {
        res.sendFile(__dirname + "/login.html")
    }
});
app.post("/login", (req, res) => {
    const sess = req.session;
    const { username, password } = req.body
    sess.username = username
    sess.password = password
    // add username and password validation logic here if you want.If user is authenticated send the response as success
    res.end("success")
});
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/")
    });
});
app.listen(3000, () => {
    console.log("Server started at port 3000");
} )  // listen on port 3000, IP defaults to

