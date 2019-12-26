require('dotenv').config()
const {server, io} = require('./config')
const fs = require('fs')
const dao = require('./dao.js')

if (!fs.existsSync(('database.sqlite'))) {
    fs.writeFileSync('database.sqlite', '')

}


server.listen(3000)
    .on('listening', () => {
        console.log("Socket server listening on 3000")
        return dao.createProjecTable()
        .then((result) => {
            return dao.getAllProjects()
            .then((projects) => {
                console.log("Project created so far: ", projects)
                for (var i in projects) {
                    var channel = io.of(projects[i].projectName)

                    channel.on('connection', (client) => {
                        let event = projects[i].eventName;
                        client.on(event, (data) => {
                            console.log(data)
                            client.emit(event, data)
                        })
                        client.on('user_id', (data) => {
                            console.log(data)
                            client.join(data.user_id)
                        })
                    })
                }
                return;
            })

        })
            .catch((error) => {
                console.error(error)
                throw error
            })

    })