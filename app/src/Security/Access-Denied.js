// @flow strict

import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import Home from '../Home';

function AccessDenied() {
    const navigate = useNavigate()
    return (
        <div>
            <h1> You are not allowed to View These Page </h1>
            <hr/>
            <div style={{textAlign:"center"}}>
                <Button color='info' onClick={() => navigate("/home")}>
                    Click here to go back to Home Page
                </Button>
            </div>
        </div>
    );
};

export default AccessDenied;
