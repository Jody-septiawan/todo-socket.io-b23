import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { io } from 'socket.io-client'

import Header from '../components/Header'
import ListTodo from '../components/ListTodo'

// import dataTodo from '../fakeData/todo'

let socket

export default function Todo() {

    const [ data, setData ] = useState([])

    // Load
    const loadTodos = async () => {
        await socket.on('todos',(data)=>{
            setData(data)
        })
    }

    // Add
    const addTodo = (data) => {
        socket.emit('add todo',data)
    }

    // Delete
    const deleteTodo = (id) => {
        socket.emit('delete todo', id)
    }

    const updateTodo = (dataUpdate) => {
        console.log(dataUpdate)
        socket.emit('update todo', dataUpdate )
    }

    useEffect(()=>{
        socket = io('http://localhost:5000/todo', {
            auth: {
                token: 'iniToken:8a7sd897qebkqe'
            }
        })

        // client-side
        socket.on("connect_error", (err) => {
            alert(err.message)
        });

        return () =>{
            socket.disconnect()
        }
    },[])

    setInterval(()=>{
        loadTodos()
    },1000)
    

    return (
        <div className="todo bg-blue overflow-hidden">
            <Container>
                <Row className="d-flex justify-content-center" style={{height: '100vh'}}>
                    <Col sm="9" md="7" lg="5" className="px-0">
                        <div style={{height: '15vh'}} className="d-flex align-items-center px-4">
                            <Header addTodo={addTodo} data={data} setData={setData} />
                        </div>
                        <div 
                            style={{height: '85vh', borderRadius: '2em 2em 0 0'}} 
                            className="bg-light pt-5 pb-5">
                            <ListTodo updateTodo={updateTodo} deleteTodo={deleteTodo} data={data} setData={setData} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
