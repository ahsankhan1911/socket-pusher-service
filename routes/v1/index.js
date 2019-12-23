const express = require('express')
const v1Controller = require('../../controller/v1/')
const v1Router = express.Router()


v1Router.route('/create-project').post(v1Controller.createProject)

module.exports = v1Router