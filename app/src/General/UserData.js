import { getUserName, getRoleData } from "./Axios"

export const myData = () => {
    const username = getUserName();
    const myRole = getRoleData();
    const myData = {username, myRole}
    return myData
} 
