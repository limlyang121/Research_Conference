import axios from 'axios'

const myAPILink =   "https://safe-fjord-90688.herokuapp.com/api/"
// const myAPILink = "http://localhost:8080/api/";

const api = axios.create({
    baseURL: myAPILink,
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


