import axios from 'axios'
import { getAxiosLink } from '../AxiosUrl';


const api = axios.create({
    baseURL: getAxiosLink(),
    headers: {
        "Content-type": "application/json",
    }
});

api.interceptors.request.use(async (config) => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString)
    if (token) {
        config.headers.Authorization = `Bearer ${token.jwt}`
    }
    return config
})

export const getUserByID = async (id) => {
    let response = await api.get(`users/userID/${id}`)
    return response.data
}

export const updateMyProfile = async(data) =>{
    let response = await api.post(`profile`, data)
    return response.data;
}

export const getMyProfile = async() =>{
    let response = await api.get(`profile`)
    return response.data;
}