// @flow strict

import * as React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSecurity() {
    const navigate = useNavigate();

    React.useEffect (() => {
        const role = sessionStorage.getItem("myRole")
        if (role.toLowerCase() !== "admin"){
            navigate("/denied")
        }
    }, [navigate])

};

export default AdminSecurity;