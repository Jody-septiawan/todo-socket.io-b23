import { useEffect, useState } from 'react'

export default function ListTodo({ updateTodo, deleteTodo, data, setData }) {

    const [todo, setTodo] = useState([])
    const [done, setDone] = useState([])

    useEffect(()=>{
        let newTodo = data.filter((item)=> {return item.isdone === false })
        let newDone = data.filter((item)=> {return item.isdone === true })

        setTodo(newTodo)
        setDone(newDone)
    },[data])

    const onDelete = (id) => {
        // let newdata = data.filter((item)=> {return item.id !== id })
        // setData(newdata)
        deleteTodo(id)
    }

    const onUpdate = (id) => {
        let dataUpdate = data.find((item)=> item.id === id)

        dataUpdate = {
            ...dataUpdate,
            isdone: true
        }

        updateTodo(dataUpdate)
    }

    return (
        <div 
            className="px-3 overflow-auto pb-2"
            style={{maxHeight: '80vh'}}>
            {data.length === 0 && <h3 className="text-center">No Data</h3>}

            {todo.length !== 0 &&
                <>
                    <div className="text-secondary mb-1">Todo</div>
                    {todo.map((item)=> (
                        <div key={item} style={{backgroundColor: '#e9ecef'}} className="mb-2 py-2 px-2 rounded d-flex">
                            <div className="w-100 d-flex align-items-center">
                                {item.text}
                            </div>
                            <div className="d-flex">
                                <button onClick={()=>onUpdate(item.id)} className="btn btn-sm text-light py-0 px-1 btn-done me-1">DONE</button>
                                <button onClick={()=>onDelete(item.id)} className="btn btn-sm text-light py-0 px-1 btn-delete">
                                    X
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            }

            {done.length !== 0 &&
            <>
                <div className="text-secondary mb-1 mt-3">Done</div>
                {done.map((item)=> (
                    <div key={item} style={{backgroundColor: '#e9ecef'}} className="mb-2 py-2 px-2 rounded d-flex">
                        <div className="w-100 d-flex align-items-center text-success">
                            {item.text}
                        </div>
                        <div className="d-flex">
                            <button onClick={()=>onDelete(item.id)} className="btn btn-sm text-light py-0 px-1 btn-delete">X</button>
                        </div>
                    </div>
                ))}
            </>
            }
        </div>
    )
}
