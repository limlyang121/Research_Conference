// @flow strict

import * as React from 'react';
import { useNavigate } from 'react-router-dom';

function ConferenceSecurity() {
    const navigate = useNavigate();

    React.useEffect (() => {
        const role = sessionStorage.getItem("myRole")
        if (role.toLowerCase() !== "conference"){
            navigate("/denied")
        }
    }, [navigate])
};


export default ConferenceSecurity;