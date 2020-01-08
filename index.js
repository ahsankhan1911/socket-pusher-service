require('dotenv').config()
const { server, io } = require('./config')
const fs = require('fs')
const dao = require('./dao.js')
const Response = require('./responceModel')

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
                                client.on("data", (data) => {
                                    console.log("Message came ", data)
                                    let response = new Response(1, data, 'Data Message !')
                                    channel.emit("data", response)
                                })

                                client.on("notification", (data) => {
                                    console.log("Message came ", data)
                                    let response = new Response(1, data, 'Notification Message !')
                                    channel.emit("notification", response)
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