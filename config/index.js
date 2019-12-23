const express = require('express') 
const app = express()
const server = require('http').createServer(app);
const bodyParser = require('body-parser')
const v1APIs = require('../routes/v1/')
const io = require('socket.io')(server, {transports: ['polling','websocket']});


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
app.use(bodyParser.json())

//Version APIs: 
app.use('/v1',  v1APIs)


module.exports = {server, io}