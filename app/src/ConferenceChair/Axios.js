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

export const fetchPendingBidsAPI = async (status) => {
    let response = await api.get(`bids/${status}`)
    return response.data;
}

export const AcceptBidAPI = async (id) => {
    let response = await api.patch(`bids/accept/${id}`)
    return response.data;
}

export const RejectBidAPI = async (id) => {
    let response = await api.patch(`bids/reject/${id}`)
    return response.data;
}

export const cancelBidAPI = async (id) => {
    let response = await api.patch(`bids/cancel/${id}`)
    return response.data;
}