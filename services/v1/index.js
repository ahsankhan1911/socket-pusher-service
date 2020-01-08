// BUSINESS LOGICS
const dao = require('../../dao')
var jwt = require('jsonwebtoken');
var Response = require('../../responceModel')


/**
 * Create a new project and socket namespace.
 * @param {String} projectName
 * @param {String} hostIp
 */
exports.createProject = (projectName, hostIp) => {
    var { io } = require('../../config')

    return dao.getProject(projectName)
        .then((result) => {
             if(result.length) {
                 return {"error": "Project name already taken"}
             }
            return dao.createProject({ projectName, hostIp })
                .then(() => {
                    var channel = io.of(projectName)
                    var token = jwt.sign({"projectName": projectName, "hostIp": hostIp}, process.env.JWT_SECRET_KEY)
                    channel.on('connection', (client) => {
                        // let event = eventName;
                        client.on("data", (data) => {
                            console.log(data)
                            let response = new Response(1, data, 'Notification Message !')
                            channel.emit("data", response)
                        })

                        client.on("notification", (data) => {
                            console.log(data)
                            let response = new Response(1, data, 'Data Message!')
                            channel.emit("notification", response)
                        })
                        client.on('user_id', (data) => {
                            console.log(data)
                            client.join(data.user_id)
                        })
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
         let response = new Response(1, data, 'Message Received !')
         
          nsp.to(user_id).emit(eventName, response)

           resolve({})

       })
      
}

