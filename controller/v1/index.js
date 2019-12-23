const services = require('../../services/v1/')

exports.createProject = (request, response) => {

    let { eventName, projectName } = request.body

    services.createProject(projectName, eventName)
        .then((result) => {
            response.status(200).send({
                "success": true,
                "status": 200,
                "data": {},
                "message": "Project created successfully !"
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