import { useEffect, useState } from "react"
import { deleteTodo, getTodoByName } from "./security/api/TodoService"
import { useAuth } from './security/AuthContext'
import { useNavigate} from 'react-router-dom'



export default function ListTodoComponent() {

    const today = new Date()
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())


    const [todos, setTodos] = useState([])

    const [message, setMessage] = useState('')

    const authContext = useAuth()

    const navigate = useNavigate()

    useEffect(() => getAllTodos(), [])

    function getAllTodos() {
        getTodoByName(authContext.username)
            .then(res => setTodos(res.data))
    }

    function removeTodo(id) {
        deleteTodo(authContext.username, id)
            .then(() => {
                setMessage(`Task was successfully deleted`)
                getAllTodos()
                setTimeout(() => setMessage(''), 2000);
            })
    }


    function updateTodo(id) {
        navigate(`/updateTodo/${id}`)
    }

    function addNewTodo(id) {
        navigate(`/updateTodo/-1`)
    }



    return (
        <div className='container'>

            <h1> Things You Want To Do! </h1>
            {message && <div className="alert alert-warning">{message}</div>
            }


            <div>

                <table className='table'>

                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>target Date</th>
                            <th>Update</th>
                            <th>Delete</th>


                        </tr>
                    </thead>

                    <tbody>
                        {
                            todos.map(

                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.status}</td>
                                        <td>{todo.dueDate.toString()}</td>
                                        <td>{<button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Update</button>}</td>
                                        <td>{<button className="btn btn-warning" onClick={() => removeTodo(todo.id)}>Delete</button>}</td>

                                    </tr>
                                )

                            )
                        }


                    </tbody>

                </table>

                        <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>

            </div>

        </div>
    )
}
