import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';

const SessionCheck = () => {
    const navigate = useNavigate();

    useEffect (() => {
        const session = sessionStorage.getItem("username")
        if (!session){
            navigate("/")
        }
    }, [navigate])

    return null;


}

export default SessionCheck;