import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:8080/api/",
    headers: {
        "Content-type": "application/json"
      }

});

export const getAllUsers = async () => {
    let response =  await api.get("users")
    return response.data;
}

export const removeUser = async (id) => {
    let response = await api.delete(`users/${id}`)
    return response.data;
}

export const addUser = async (data) => {
    let response = await api.post("users", data)
    return response.data;
}

export const updateUser = async (data) => {
    let response = await api.put(`users/${data.id}`, data)
    return response.data
}

export const getUserByID = async (id) => {
    return (await api.get(`users/userID/${id}`)).data
}

export const getAllRoles = async () => {
    return (await api.get(`roles`)).data
}

export const activateAccount = async (id) => {
    return (await api.patch(`users/activation/${id}`)).data
}

export const deactivationAccount = async (id) => {
    return (await api.patch(`users/deactivation/${id}`)).data
}