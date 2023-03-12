import { getUserName, getRoleData } from "./Axios"

export const myData = async () => {
    const username = await getUserName();
    const myRole = await getRoleData();
    const myData = {username, myRole}
    return myData
} 
