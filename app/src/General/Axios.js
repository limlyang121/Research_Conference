import axios from 'axios'
import jwt_decode from "jwt-decode";

const api = axios.create({
    baseURL : "http://localhost:8080/api/auth/",
    headers:{
        "Content-Type": "application/json   "
    }


});

export const LoginUser = async (formData) => {
    let response = await api.post("login", formData)
    return response.data

}