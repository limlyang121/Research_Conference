import axios from 'axios'
import { da } from 'date-fns/locale';


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

export const getMyReviewerDataAPI = async (id) => {
    let response = await api.get(`reviewer/${id}`)
    return response.data;
}

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

export const getBidByStatus = async (id,status) => {
    let response = await api.get(`bids/${id}/${status}`)
    return response.data;
}

export const deleteFromBidAPI = async (id) => {
    let response = await api.delete(`bids/${id}`)
    return response.data;
}


export const getAcceptedBidAPI = async (id) => {
    let response = await api.get(`bids/accepted/${id}`)
    return response.data;
}

export const SubmitReviewAPI = async (data) => {
    let response = await api.post(`reviews`, data)
    return response.data;
}

