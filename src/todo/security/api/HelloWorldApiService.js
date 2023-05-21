import { apiClient } from "./ApiClient"

export function getTaskById(username, token){
    return  apiClient.get(`/users/${username}/tasks`,{
        headers: {
            Authorization: token
        }
    })

}




export const executeBasicAuthenticationService
    = (token) => apiClient.get(`/basicauth`, {
        headers: {
            Authorization: token
        }
    })