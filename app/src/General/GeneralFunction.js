import { saveAs } from "file-saver"
import { format } from "date-fns"
import { downloadPapersAPI } from "./DownloadAxios";


export const downloadFile = async (id) => {
    try {
        let response = await downloadPapersAPI(parseInt(id))
        const contentDispositionHeader = response.headers['content-disposition'];
        const filename = contentDispositionHeader.split(';')[1].trim().split('=')[1].replace(/"/g, '');

        const blob = new Blob([response.data], { type: "application/pdf" })
        saveAs(blob, filename)

    } catch (error) {
        alert("Unknown Error")
    }
}

export const dateFormat = (date) => {
    const dateType = new Date(date)

    return (format(dateType, "dd/MM/yyyy"))
}

export const fullName = (paper) => {
    return paper.paperInfo.authorID.firstName + " " + paper.paperInfo.authorID.lastName
}

export const fullNameDetails = (userdetails) => {
    return userdetails.firstName + " " + userdetails.lastName; 
}

export const displayErrorMessage = (error, navigate, link) => {
    if (error.response.status === 403) {
        alert(error.response.data.message)

    } else if (error.response.status === 500)
        alert(error.response.data)

    else if (error.response.status === 404)
        alert(error.response.data.message)


    if (link != null)
        navigate(link)
}