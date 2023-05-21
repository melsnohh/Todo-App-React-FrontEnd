import { apiClient } from "./ApiClient"

export function getTask() {
    return apiClient.get("users/tasks")

}


export const getTodoByName = (name) => apiClient.get(`/users/${name}/tasks`)

export const getTodoById = (id) => apiClient.get(`/users/tasks/${id}`)

export const updateTodo = (username, id, todo) => apiClient.put(`/users/${username}/tasks/${id}`, todo)

export const addNewTodo = (username, todo) => apiClient.post(`/users/${username}/tasks/task`, todo)


export const deleteTodo = (name, id) => apiClient.delete(`/users/${name}/tasks/${id}`)