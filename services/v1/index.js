// BUSINESS LOGICS
const dao = require('../../dao')
var jwt = require('jsonwebtoken');


/**
 * Create a new project and socket namespace.
 * @param {String} projectName
 * @param {String} eventName
 */
exports.createProject = (projectName, eventName) => {
    var { io } = require('../../config')

    return dao.getProject(projectName)
        .then((result) => {
             if(result.length) {
                 return {"error": "Project name already taken"}
             }
            return dao.createProject({ projectName, eventName })
                .then(() => {
                    var channel = io.of(projectName)
                    var token = jwt.sign({"projectName": projectName}, 'Inv091')
                    channel.on('connection', (client) => {
                        let event = eventName;
                        client.on(event, (data) => {
                            console.log(data)
                            client.emit(event, data)
                        })
                        client.emit('token', { token: client.id })
                    })
                    return {  "auth_token": token };

                })
        })

        .catch((err) => {
            console.error(err)
            throw err
        })

}



/**
 * Send messsage to specific namespace client with socketId.
 * @param {String} projectName
 * @param {String} user_id
 * @param {String} eventName
 * @param {any} data 
 */
exports.sendMessage = (projectName, user_id,eventName, data) => {
    var { io } = require('../../config')

     return  new Promise ((resolve, reject) => {

         var nsp = io.of(projectName)
          nsp.to(user_id).emit(eventName, data)

           resolve({})

       })
      
}

