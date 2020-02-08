# Socket Pusher Service
Real time communication platform for applications

## Introduction

This project is created for application developers who want to implement real time communication between two ends of the application.
The current service is ideal for those who want to create real time dashboards or looking to implement push notification in their projects.
By just providing your project name and origin (server ip or domain) you will be able to send and receive messages across your application in real time.

## Getting Started

The app is currently deployed on heroku free dyno:  
https://socket-pusher-beta.herokuapp.com/

These are the ways to get yourself up and running:

### Create a new project and socket namespace.

you can submit your project by visiting the url above.

### Connect to the registered channel from client-side:

The client of your applications should use  [Socket.IO Client API](https://socket.io/docs/client-api/) to connect to the project which is available in almost all the platforms like Android, IOS Swift, React Native and JavaScript Web Frameworks.

**Some important configuration on client:** 
*   Client should provide the **auth_token** query parametre along with the connection string which was provided during the project creation to be able to connect to server.
*   Client should emit an event  **user_id** after connecting to the server. This event data argument should be provided with the user id or any random key like this: **{user_id: 'your id/key here'}**. This key/id will be used by your server to send messages only to that client. 
*   Client can receive errors thrown by server by listening to **error** event.

### Send server-side message through API:

The server of your application should be using this API to send message to its client:

**PATH**: /v1/send-message  
**METHOD**: POST  
**PARAMETERS (request body)**:  

**user_id**: type: String , desc: the id/key provided by the client of your app.  
**eventName**: type: String , desc: the event name registered with project.  
**data**: type: any , desc: the data you want to send to client.  

## Installing

However not recommended but if you wanna set up your own socket server you can clone this repo and start customizing after running these commands

```
npm install 
```

and then

```
npm start
```

***Note***: NodeJs (10.16.0 or higher) and NPM (6.9.2 or higher) should be installed on your machine to be able to run this app.


## Built With

* [NodeJs](https://nodejs.org/en/) - Server-side JavaScript Runtime 
* [NPM](https://www.npmjs.com/) - Node Package Manager
* [Express](https://expressjs.com/) - Node Web Framework
* [Socket.IO](https://socket.io/) - Socket Framework
* [SQLITE](https://www.sqlite.org/index.html) - Lightweight SQL DB

## Contributing

The project is under beta testing lots of cases and scenarios are needed to be tested. So we are open to any suggestions or PR from you. Please make an issue and discuss the suggestion there.

## Authors

* **Ahsan Ali Khan** - *Initial work* - [ahsankhan1911](https://github.com/ahsankhan1911)

See also the list of [contributors](https://github.com/ahsankhan1911/socket-pusher-service/graphs/contributors) who participated in this project.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details

## Acknowledgments

Thanks to [Bilal Ahmed Siddiqui](https://github.com/bilahdsid) for providing expert suggestions and ideas for this project.

## Donation

if you are looking to donate to this project please do email me at: ahsankhan1911@gmail.com


