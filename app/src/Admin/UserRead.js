import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { activateAccount,deactivationAccount } from './adminAxios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UserRead = () => {
    const initialFormState = {
        id: '',
        userName: "",
        role: {
            role: '',
            desc: ''
        },
        active: "",
        userdetails: {
            firstName: '',
            lastName: '',
            height: '',
            weight: ''
        },
    }
    const [user, setUser] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fecthData = async () => {
            fetch(`/api/users/userID/${id}`, { credentials: "include" })
                .then(response => response.json())
                .then(data => setUser(data));
        }
        fecthData();


    }, [id, setUser]);

    const handleSubmit = (event) => {
        event.preventDefault();
        accountUpdate(user.id);
    }

    const accountUpdate = async (id) => {
        if (window.confirm("Are you sure ? ")) {

            if (user.active === 1) {
                await deactivationAccount(user.id)
                .then(() => {
                    setUser({ ...user, active: 0 })
                })

            } else {
                await activateAccount(user.id)
                .then(() => {
                    setUser({ ...user, active: 1 })
                })
            }
        }


    }

    const displayButton = () => {
        if (Number(user.active) === 1) {
            return (
                <FormGroup>
                    <Button size='sm' color='danger' type='submit'>Deactive Account</Button>
                </FormGroup>
            )
        } else {
            return (
                <FormGroup>

                    <Button size='sm' color='primary' type='submit'>Activate Account</Button>
                </FormGroup>
            )
        }
    }


    return (
        <div>
            <AppNavbar />
            <Container>
                <Form onSubmit={handleSubmit}>
                    {displayButton()}
                </Form>
            </Container>
        </div>
    )
};
export default UserRead;