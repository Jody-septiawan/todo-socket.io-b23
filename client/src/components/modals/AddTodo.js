import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default function AddTodo({ addTodo, show, handleClose, data, setData }) {
    
    const [ message, setMessage ] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        let task = document.getElementById('task')

        if(task.value){
            // let newData = [
            //     ...data,
            //     {
            //         id: Math.random(),
            //         text: task.value,
            //         isdone: false
            //     }
            // ]
            // setData(newData)
            addTodo({
                    text: task.value,
                    isdone: false
                })
            task.value = ''
            handleClose()
            setMessage('')
        }else{
            setMessage('Task masih kosong')
        }
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Add task</Form.Label>
                        <Form.Control id="task" type="text" placeholder="Enter task" />
                        {message && 
                            <Form.Text className="text-danger">
                                {message}
                            </Form.Text>
                        }
                    </Form.Group>
                    <div className="d-grid gap-2 pt-3">
                        <Button variant="primary" type="submit" size="sm">
                            Add 
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
