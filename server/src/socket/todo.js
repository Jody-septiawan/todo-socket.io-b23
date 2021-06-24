const { todo } = require('../../models')

const getTodos = async (socket) => {
    try {
        let data = await todo.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        data = JSON.parse(JSON.stringify(data))

        socket.emit('todos', data)

    } catch (error) {
        console.log(error)
    }
}

module.exports.respond = (socket) => {
    console.log('a user connect')

    setInterval(() => {
        getTodos(socket)
    },3000)

    socket.on('add todo', async (data) => {
        try {
            await todo.create(data)
            getTodos(socket)
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('delete todo', async (id) => {
        try {
            await todo.destroy({ 
                where: { 
                    id 
                }
            })
            getTodos(socket)
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('update todo', async (data) => {
        try {
            const id = data.id

            data = {
                text: data.text,
                isdone: data.isdone
            }

            await todo.update(data, {
                where: {
                    id
                }
            })
            getTodos(socket)
        } catch (error) {
            console.log(error)
        }
    })

    socket.emit('token', socket.handshake.auth.token )
}