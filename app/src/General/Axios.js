import axios from 'axios'
import jwt_decode from "jwt-decode";
import { getAxiosLink } from '../AxiosUrl';


const api = axios.create({
    baseURL : getAxiosLink()  +  "/auth"  ,
    headers:{
        "Content-Type": "application/json   "
    }
});



export const storeTokenData = (tokenString) => {
    const token = JSON.stringify(tokenString)
    const decode = jwt_decode(tokenString.jwt)
    const username = decode.sub;
    const id = decode.id
    const role = (decode.role.map((role) => role.role))

    sessionStorage.setItem("token", token)
    sessionStorage.setItem("username", username)
    sessionStorage.setItem("myRole", role)
    sessionStorage.setItem("id", id)

}

export const LoginUser = async (formData) => {
    let response = await api.post("login", formData)
    return response.data
}

export const logout = async () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("myRole")
    let response = await api.post("logout");
    return response.data;
}


