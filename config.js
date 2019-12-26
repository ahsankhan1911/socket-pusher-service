const express = require('express') 
const app = express()
const server = require('http').createServer(app);
const bodyParser = require('body-parser')
const v1APIs = require('./routes/v1/')
var io = require('socket.io')(server, {transports: ['polling','websocket']});
var jwtAuth = require('socketio-jwt-auth');
var dao = require('./dao')

io.use(jwtAuth.authenticate({
  secret: 'Inv091',    // required, used to verify the token's signature
  algorithm: 'HS256'        // optional, default to be HS256
}, function(payload, done) {
     return dao.getProject(payload.projectName).then((result) => {
             if(result.length) {
              return done(null, 'Connection success !');
             }

            return done(null,false, 'No project found. please contact server admin');

     })
}));

//CORS congif
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    
    if (req.method === "OPTIONS") {
      return res.status(200).end();
     }
  
    next();
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Version APIs: 
app.use('/v1',  v1APIs)

module.exports = {
  server: server,
  io: io
}