import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "./api/AuthenticationApiService";
import { apiClient } from "./api/ApiClient";


export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    // function login(usernamePassed, password){

    //     if (password === 'dummy') {
    //         setAuthenticated(true)
    //         setUsername(usernamePassed)
    //         return true
    //     } else {
    //         setAuthenticated(false)
    //         return false;
    //     }

    // }

    async function login(usernamePassed, password) {

        const baToken = 'Basic ' + window.btoa(usernamePassed + ":" + password)


        try {
            const response = await executeBasicAuthenticationService(baToken)
                

            if (response.status == 200) {
                setAuthenticated(true)
                setUsername(usernamePassed)
                setToken(baToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = baToken
                        return config
                    }
                )


                return true
            } else {
              logout()
                return false;
            }
        }
        catch (error) {
            logout()
            return false;
        }
    }

    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)


    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    )
}