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

export const removeUser = async () => {
    let response = await api.delete("users")
    return response.data;
}