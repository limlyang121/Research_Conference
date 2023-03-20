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

export const getPendingPapers = async (id) => {
    let response = await api.get(`papers/bid/${id}`)
    return response.data;
}

export const getBanPapers = async (id) => {
    let response = await api.get(`papers/ban/${id}`)
    return response.data;
}

export const addToBlackListAPI = async (data) => {
    let response = await api.post(`blacklist`,data)
    return response.data;
}

export const DeleteFromBlackListAPI = async (data) => {
    let response = await api.delete(`blacklist`,{data})
    return response.data;
}



// Bid Part
export const addToBidAPI = async (data) => {
    let response = await api.post(`bids`,data)
    return response.data;
}

