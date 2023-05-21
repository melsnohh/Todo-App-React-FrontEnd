import { Link } from 'react-router-dom'
import { AuthContext, useAuth } from './security/AuthContext'
import { useContext } from 'react'


export default function HeaderComponent() {
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated
    const logout = authContext.logout

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5"><Link className="nav-link" to="/welcome/Melvin">Home</Link></li>
                                <li className="nav-item fs-5"><Link className="nav-link" to="/todos">Todos</Link></li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            {!isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>
                            }
                            {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" onClick={()=>logout()} to="/logout">Logout</Link></li>
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
