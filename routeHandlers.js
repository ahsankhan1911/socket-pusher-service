
function handleGetRoutes (request, response) {
    let {url,body, path} = request
    console.log("CAME HERE >> ", body, path)

    switch(url) {
        case '/hello-world': 
          response.write("HELLO WORLD")
        break;

        default: 
        return;
    }

    response.end()
}

async function handlePostRoutes (request, response, io, dbPromise) {
    let {url,body} = request
    console.log(url)
    switch(url) {
        case '/subscribe-channel': 
        try {
console.log(body, io)
      

            const db = await dbPromise

            await db.run(`INSERT INTO project ('eventName','projectName') VALUES('${body.eventName}','${body.projectName}')`)
           
             response.write("Channel added successfully !")
        }

        catch(error) {
            console.error(error)
            return response.write("An error occured !!")
        }

       
        break;

        case '/send-message': 
          io.of('tark-backend').emit('event2', body)

          response.write("Message sent !")

        break;

        default: 
        return;
    }
    response.end()

}

module.exports = {
      handleGetRoutes,
      handlePostRoutes
}