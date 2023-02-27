import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { activateAccount, deactivationAccount, getUserByID } from './adminAxios';
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
            let response = await getUserByID(id)
            setUser(response)
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
                await deactivationAccount(id)
                    .then(() => {
                        setUser({ ...user, active: 0 })
                    })

            } else {
                await activateAccount(id)
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
                <Label for='fullname'>User Full Name : </Label>
                <Input disabled type='text' name='fullname' id='fullname' value={user.userdetails.firstName + user.userdetails.lastName}></Input>

                <Label for='weight'>User Weight : </Label>
                <Input disabled type='text' name='weight' id='weight' value={user.userdetails.weight}></Input>

                <Label for='height'>User Height : </Label>
                <Input disabled type='text' name='height' id='height' value={user.userdetails.height}></Input>

                <Label for='role'>Current Role : </Label>
                <Input disabled type='text' name='role' id='role' value={user.role.role}></Input>

                <br />
                <Form>
                    <FormGroup>
                        <Button size='sm' color='warning' type='submit'>Reset user password (not implement) </Button>
                    </FormGroup>
                </Form>

                <br />




                <Form onSubmit={handleSubmit}>
                    {displayButton()}
                </Form>
            </Container>
        </div>
    )
};
export default UserRead;