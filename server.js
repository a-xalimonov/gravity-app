const express = require('express')
const WebSocketServer = require('ws');

const portHTTP = 5000
const portWS = 5001
const app = express()

const users = {}
const entityList = {}

const webSocketServer = new WebSocketServer.Server({
    port: portWS
});
webSocketServer.on('connection', function(socket) {
    socket.on('message', function(message) {
        const json = JSON.parse(message)
        const id = json.id
        const messageData = json.data
        const responseData = {}
        
        entityList[id] = messageData[id]
        if (users[id]) {
            // Если хост
            for (let key in messageData) {
                if (!(key in users)) entityList[key] = messageData[key]
            }
            for (let i in users) {
                if (i != id) responseData[i] = entityList[i]
            }
        }
        else { 
            // Если не хост
            for (let key in entityList) {
                if (key != id) responseData[key] = entityList[key]
            }
        }
        socket.send(JSON.stringify(responseData))
    })
})



app.use('/static', express.static('./static', {extensions: 'js'}));
app.get("/", (req, res) => {
    res.sendFile('/static/index.html', {root: __dirname})
})
app.get("/connect", (req, res) => {
    const id = Date.now()
   
    users[id] = !Boolean(Object.keys(users).length)
    console.log(`Connected user with id = ${id}`)
    res.json({
        host: users[id],
        id: id
    })
})
app.listen(portHTTP, () => {
    console.log(`Listening on port ${portHTTP}`)
})