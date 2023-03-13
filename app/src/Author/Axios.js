import axios from 'axios'


const api = axios.create({
    baseURL: "http://localhost:8080/api/",
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

export const getAllPapers = async () => {
    let response = await api.get("papers")
    return response.data;

}

export const getMyPapers = async (id) => {
    let response = await api.get(`papers/mypapers/${id}`)
    return response.data;
}

export const addPapers = async (data) => {
    let response = await api.post("papers", data)
    return response.data;
}

export const updateUser = async (data) => {
    let response = await api.put(`users/${data.id}`, data)
    return response.data
}
