import axios from 'axios'


const api = axios.create({
    baseURL: "http://localhost:8080/api/",
    headers: {
        "Content-type": "application/json",
    }
});

const upload = axios.create({
    baseURL: "http://localhost:8080/api/",
    headers: {
        "Content-type": "multipart/form-data",
    }
});

const download = axios.create({
    baseURL: "http://localhost:8080/api/",
    responseType: "arraybuffer",
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

export const getMyPapers = async (id) => {
    let response = await api.get(`papers/mypapers/${id}`)
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

export const deletePapers = async (id) => {
    let response = await api.delete(`papers/delete/${id}`)
    return response.data
}

export const downloadPapers = async (id) => {
    let response = await download.get(`papers/download/${id}`)
    return response.data
}

