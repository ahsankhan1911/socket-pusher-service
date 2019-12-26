const express = require('express')
const v1Controller = require('../../controller/v1/')
const v1Router = express.Router()
const middleware = require('../../middlewares')

v1Router.route('/create-project').post(v1Controller.createProject)
v1Router.route('/send-message').post([middleware.authenticateToken],v1Controller.sendMessage)


module.exports = v1Router