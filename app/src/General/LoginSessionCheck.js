// @flow strict

import * as React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginSessionCheck() {
    const navigate = useNavigate();

    React.useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token !== null){
            navigate("/home")
        }
    },[navigate])
};

export default LoginSessionCheck;