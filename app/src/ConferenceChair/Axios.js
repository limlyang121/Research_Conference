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

export const deletelBidAPI = async (id) => {
    let response = await api.delete(`bids/${id}`)
    return response.data;
}



export const fetchPendingPaperAPI = async () => {
    let response = await api.get(`papers/pending`)
    return response.data;
}

export const fetchCompletedPapersAPI = async () => {
    let response = await api.get(`papers/complete`)
    return response.data;
}

export const fetchAllReviewsByPaperIDAPI = async (paperID) => {
    let response = await api.get(`reviews/ready/${paperID}`)
    return response.data;
}

export const fetchAllBidsByPaperIDAPI = async (paperID) => {
    let response = await api.get(`bids/ready/${paperID}`)
    return response.data;
}

export const fetchReadytoBePublishOrRejectAPI = async () => {
    let response = await api.get(`publish/papers/final`)
    return response.data;
}


export const getPaperReviewsAPI = async (id) => {
    let response = await api.get(`papers/${id}/review`)
    return response.data;
}

export const closeBidToReadyPapersAPI = async (id) => {
    let response = await api.patch(`publish/ready/${id}`)
    return response.data;
}

export const acceptPaperToPublishAPI = async (id) => {
    let response = await api.patch(`publish/accept/${id}`)
    return response.data;
}

export const rejectPaperToPublishAPI = async (id) => {
    let response = await api.patch(`publish/reject/${id}`)
    return response.data;
}