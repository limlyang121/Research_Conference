import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { getUserByID, resetPasswordAPI } from './adminAxios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSecurity from './AdminSecurity';
import { displayErrorMessage } from '../General/GeneralFunction';

const UserRead = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [showPassowrdInputForm, setPasswordInputForm] = useState(false)
    const navigate = useNavigate()

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
            email: '',
            height: '',
            weight: ''
        },
    }
    const resetPasswordForm = {
        userID: id,
        password: ""
    }

    const [user, setUser] = useState(initialFormState);
    const [reset, setReset] = useState(resetPasswordForm)


    useEffect(() => {
        const fecthData = async () => {
            let response = await getUserByID(id)
            setUser(response)
        }
        fecthData();
        setLoading(false)

    }, [id, setUser]);


    if (loading) {
        return (
            <p>Loading Data...</p>
        )
    }


    const handleNewPasswordChange = (event) => {
        setReset({ ...reset, password: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response = await resetPasswordAPI(reset);
            alert(response);
        } catch (error) {
            displayErrorMessage(error, navigate, null);
        } finally {
            navigate("/admin/users")
        }

    }




    return (
        <div>
            <style>
                {`
                Input {
                    margin-bottom: 10px;
                }
                `}

            </style>
            <AppNavbar />
            <AdminSecurity />

            <Container>
                <Label for='fullname'>User Full Name : </Label>
                <Input disabled type='text' name='fullname' id='fullname' value={user.userdetails.firstName + user.userdetails.lastName}></Input>

                <Label for='weight'>User Weight : </Label>
                <Input disabled type='text' name='weight' id='weight' value={user.userdetails.weight}></Input>

                <Label for='height'>User Height : </Label>
                <Input disabled type='text' name='height' id='height' value={user.userdetails.height}></Input>

                <Label for='role'>Current Role : </Label>
                <Input disabled type='text' name='role' id='role' value={user.role.role}></Input>

                <Label for='email'>Email : </Label>
                <Input disabled type='text' name='email' id='email' value={user.userdetails.email}></Input>                <br />


                <Button style={{ marginBottom: "25px" }} size='sm' color='warning' onClick={() => setPasswordInputForm(true)} >Reset user password </Button>

                <br />

                {showPassowrdInputForm && (
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for='password'>New Password: </Label>
                            <Input type='password' name='password' id='password' value={reset.password} onChange={handleNewPasswordChange} required
                                minLength={6} placeholder='Mininum 6 Character'
                            />
                        </FormGroup>
                        <Button color='primary' type='submit'>Save</Button>
                        {' '}
                        <Button color='secondary' onClick={() => setPasswordInputForm(false)}>Cancel</Button>
                    </Form>
                )}
                <br />

            </Container>
        </div>
    )
};
export default UserRead;