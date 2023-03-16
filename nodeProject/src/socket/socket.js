const axios = require('axios')

const socket = (io) => {

    io.on('connection', socket => {

        let username;
        const URIUsers = 'http://localhost:8080/users/'
        //const URIUsers = 'http://100.25.37.72/api/users/'

        socket.on('connected', (name) => {
            username = name
            /*axios.put(URIUsers + "connection/" + username, {
                online: true
            })*/
            io.emit('messages');
        })
    
        socket.on('message', () => io.emit('messages'))
    
        socket.on('disconnect', () => {
            /*axios.put(URIUsers + "connection/" + username, {
                online: false
            })*/
            io.emit('messages');
        })

        socket.on('tablesUpdated', () => io.emit('updateTables'));

    })
}

module.exports = socket