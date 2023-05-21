import { useNavigate, useParams } from 'react-router-dom'
import { addNewTodo, getTodoById, updateTodo } from './security/api/TodoService'
import { useAuth } from './security/AuthContext'
import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import moment from 'moment'


export default function TodoComponent() {
    const { id } = useParams()

    const authContext = useAuth()

    const [todo, setTodo] = useState([])


    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate()



    function getTodoApi() {
        if(id!= -1){
        getTodoById(id)
            .then(res => {
                setDescription(res.data.description)
                setTargetDate(res.data.dueDate)
                setUsername(res.data.name)
            })

        }
    }

    function onSubmit(values) {
        const todo = {
            id: id,
            name: authContext.username,
            description: values.description,
            dueDate: values.targetDate,
        }
        if(id == -1){
            addNewTodo(authContext.username, todo)
            .then(res => {
                navigate('/todos')
            })
        }else{
            updateTodo(authContext.username, id, todo)
            .then(res => {
                navigate('/todos')}
                )
        }
       
    }

    function validate(values) {

        let errors = {
            // description: "Enter a valid description",
            // targetDate: "Enter a valid targetDate"

        }

        if (values.description.length < 5) {
            errors.description = "Enter atleast 5 characters"
        }

        if (values.targetDate.length == null || values.targetDate == '' || !moment(values.targetDate.isValid)) {
            errors.description = "Enter a target date"
        }

        return errors
    }

    useEffect(() => {
        getTodoApi()
    }, [id])

    return (
        <div className="container">

           { id != -1 && <h1>Update Todo Details</h1>}
           { id == -1 && <h1>Add Todo Details</h1>}


            <div>


            </div>

            <Formik initialValues={{ description, targetDate }}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}>

                {

                    (props) => (
                        <Form>
                            <ErrorMessage
                                name='description'
                                component="div"
                                className='alert alert-warning'


                            />

                            <ErrorMessage
                                name='targetDate'
                                component="div"
                                className='alert alert-warning'

                            />
                            <fieldset className='form-group'>
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>

                            <fieldset className='form-group'>
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate" />
                            </fieldset>
                            <div>
                                <button className='btn btn-success m-3' type='submit'>Save</button>
                            </div>
                        </Form>
                    )

                }

            </Formik>

        </div>
    )
}