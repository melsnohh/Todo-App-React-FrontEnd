
import { useParams, Link } from 'react-router-dom'
import { getTask, getTaskById} from './security/api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'


export default function WelcomeComponent() {

    const { username } = useParams()
    const authContext = useAuth()

    const token = authContext.token

    function callHelloWorldApi(){


         getTaskById(username,token)
         .then(resp => successfulResponse(resp))
         .catch(error => errorResponse(error))
         .finally(()=> console.log("cleanup"))
    }

    function successfulResponse(resp){
        console.log(resp)
    }

    function errorResponse(error){
        console.log(error)
    }


    return (

        <div className='WelcomeComponent'>
            <h1>Welcome {username}</h1>
            <div >
                Manage Your todos -  <Link to="/todos">Go Here</Link>
            </div>

            <div className="btn btn-success m-5" onClick={callHelloWorldApi}>Call Hello World</div>
        </div>

    )
}