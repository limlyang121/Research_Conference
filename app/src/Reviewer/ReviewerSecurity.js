// @flow strict

import * as React from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewerSecurity() {
    const navigate = useNavigate();

    React.useEffect (() => {
        const role = sessionStorage.getItem("myRole")
        if (role.toLowerCase() !== "reviewer"){
            navigate("/denied")
        }
    }, [navigate])
};


export default ReviewerSecurity;

