import { useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from './security/AuthContext'




export default function LoginComponent() {

    const [username, setUsername] = useState('msnoh')
    const [password, setPassword] = useState('')



    const [showErrorMessage, setShowSErrorMessage] = useState(false)

    const navigate = useNavigate();

    const authContext = useAuth()




    function handleUserNameChange(event) {
        setUsername(event.target.value)
    }

    function handleUserPassword(event) {
        setPassword(event.target.value)
    }

   async function handleSubmit() {
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`)

        } else {
            setShowSErrorMessage(true)

            setTimeout( ()=> setShowSErrorMessage(false), 2000)
        }
    }

    return (
        <div className='Login'>

            <h1>Please Login With Your Credentials </h1>
            {showErrorMessage && <div className="errorMessage">Authenicated Failed. Please check your credentials.</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUserNameChange} />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleUserPassword} />
                </div>
            </div>

            <div>
                <button type="button" name="login" onClick={handleSubmit}>Log</button>
            </div>

        </div>
    )
}

