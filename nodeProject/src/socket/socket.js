const axios = require('axios')

const socket = (io) => {

    io.on('connection', socket => {

        let username;
        const URIUsers = 'http://localhost:8000/users/'
        //const URIUsers = 'https://swishgames.herokuapp.com/api/users/'

        socket.on('conected', (name) => {
            username = name
            axios.put(URIUsers + "connection/" + username, {
                online: true
            })
            io.emit('messages');
        })
    
        socket.on('message', () => io.emit('messages'))
    
        socket.on('disconnect', () => {
            axios.put(URIUsers + "connection/" + username, {
                online: false
            })
            io.emit('messages');
        })
    })
}

module.exports = socket