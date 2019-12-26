const services = require('../../services/v1/')

exports.createProject = (request, response) => {


    let { eventName, projectName } = request.body

    services.createProject(projectName, eventName)
        .then((result) => {
            if(result.error) {
               return response.status(400).send({
                    "success": false,
                    "status": 400,
                    "data": {},
                    "message": result.error
                })
            }
            response.status(200).send({
                "success": true,
                "status": 200,
                "data": result,
                "message": "Project created successfully. Use auth_token to send and receive messages"
            })
        })
        .catch((error) => {
            console.error(error)
            response.status(500).send({
                "success": false,
                "status": 500,
                "data": {},
                "message": "Something went wrong !"
            })
        })


}


exports.sendMessage = (request, response) => {
    let  { projectName} = request.project
    let {user_id, eventName, data} = request.body

     services.sendMessage(projectName, user_id, eventName, data)
     .then((result) => {
         if(result){
            response.status(200).send({
                "success": true,
                "status": 200,
                "data": result,
                "message": "Message send successfully !"
            })
         }
     })
     .catch((err) => {
         console.log(err)
         response.status(500).send({
            "success": false,
            "status": 500,
            "data": {},
            "message": "Something went wrong !"
        })
     })

}