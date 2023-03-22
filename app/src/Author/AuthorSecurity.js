import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthorSecurity() {
    const navigate = useNavigate();

    useEffect (() => {
        const role = sessionStorage.getItem("myRole")
        if (role.toLowerCase() !== "author"){
            navigate("/denied")
        }
    }, [navigate])

    return null;
};

export default AuthorSecurity;