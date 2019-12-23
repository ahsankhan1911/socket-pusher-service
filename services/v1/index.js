// BUSINESS LOGICS
const dao = require('../../dao')
const {io} = require('../../config/')


/**
 * Create a new project and socket namespace.
 * @param {String} projectName
 * @param {String} eventName
 */
const createProject = (projectName, eventName) => {

    return dao.createProject({projectName, eventName})
    .then(() => {
        var channel = io.of(projectName)
          
        channel.on('connection',  (client) => {
            let event = eventName;
            client.on(event, (data) => {
                console.log(data)
                client.emit(event, data)
            })
            client.emit('token', {token: client.id})
        })
        return;

    })
    .catch((err) => {
        console.error(err)
         throw err
    })

}

module.exports = {
    createProject
}

