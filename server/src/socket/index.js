const socketTodo = require('./todo')

const socketIO = (io) => {
    const todoNameSpace = io.of('/todo').on('connection', (socket)=> {
        socketTodo.respond(socket)
    })

    todoNameSpace.use((socket,next) => {
        if (socket.handshake.auth && socket.handshake.auth.token) {
            // Check Token Validation
            next();
        } else {
            next(new Error('invalid'));
        }
    })
}

module.exports = socketIO;