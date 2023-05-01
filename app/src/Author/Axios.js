import axios from 'axios'

// const myAPILink = "http://18.181.186.213:8080/api/";
const myAPILink = "http://localhost:8080/api/";

const api = axios.create({
    baseURL: myAPILink,
    headers: {
        "Content-type": "application/json",
    }
});

const upload = axios.create({
    baseURL: myAPILink,
    headers: {
        "Content-type": "multipart/form-data",
    }
});

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

upload.interceptors.request.use(interceptor);
api.interceptors.request.use(interceptor);
download.interceptors.request.use(interceptor);

export const getAllPapers = async () => {
    let response = await api.get("papers")
    return response.data;

}

export const getMyPapers = async () => {
    let response = await api.get(`papers/myPapers`)
    return response.data;
}

export const getMyPublishPapersAPI = async (status) => {
    let response = await api.get(`papers/myPapers/publish/${status}`)
    return response.data;
}


export const getPaperByID = async (id) => {
    let response = await api.get(`papers/${id}`)
    return response.data;
}


export const addPapers = async (data) => {
    let response = await upload.post("papers", data)
    return response.data;
}

export const updatePaper = async (data) => {
    let response = await api.put(`papers/${ data.paperID}`, data)
    return response.data
}

export const deletePapers = async (paperid) => {
    let response = await api.delete(`papers/delete/${paperid}`)
    return response.data
}

export const downloadPapers = async (paperid) => {
    let response = await download.get(`papers/download/${paperid}`)
    return response
}

export const getPaperReviewsAPI = async (paperid) => {
    let response = await api.get(`reviews/${paperid}/show`)
    return response.data;
}

export const addPapersTest = async (data) => {
    let response = await upload.post("papers/testOnly", data)
    return response.data;
}


export const addPapersTestDownload = async () => {
    let response = await download.get("papers/testOnly/Download")
    return response;
}


