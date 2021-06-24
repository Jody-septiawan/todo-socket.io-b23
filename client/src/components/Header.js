import { useState } from 'react'

import AddTodo from './modals/AddTodo';

export default function Header({ addTodo, data, setData }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="card w-100 bg-blue-secondary" style={{borderRadius: '10px'}}>
            <div className="card-body d-flex">
                <div className="text-light d-flex align-items-center w-100">
                    Task: <span className="ms-2">{data.length}</span>
                </div>
                <button 
                    onClick={handleShow}
                    className="btn btn-sm px-4" 
                    style={{backgroundColor: '#FFC100'}}>
                    Add
                </button>
            </div>
            <AddTodo addTodo={addTodo} handleClose={handleClose} show={show} setData={setData} data={data} />
        </div>
    )
}
