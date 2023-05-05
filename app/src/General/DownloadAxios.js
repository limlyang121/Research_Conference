import axios from 'axios'

const myAPILink =   "https://safe-fjord-90688.herokuapp.com/api/"
// const myAPILink = "http://localhost:8080/api/";

const download = axios.create({
    baseURL: myAPILink,
    responseType: "blob",
});

const interceptor = async (config) => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString);
    if (token) {
        config.headers.Authorization = `Bearer ${token.jwt}`
    }
    return config
}

download.interceptors.request.use(interceptor);

export const downloadPapersAPI = async (id) => {
    let response = await download.get(`papers/download/${id}`)
    return response
}