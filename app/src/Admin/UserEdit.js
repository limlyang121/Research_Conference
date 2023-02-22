import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';


const UserEdit = () => {
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
    const [myRole, setRole] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fecthData = async () => {
            if (id !== 'new') {
                fetch(`/api/users/userID/${id}`, { credentials: "include" })
                    .then(response => response.json())
                    .then(data => setUser(data));
            }

            fetch("/api/roles")
                .then(response => response.json())
                .then(roleData => setRole(roleData));
        }
        fecthData();

    }, [id, setUser]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        const field = name.split(".")[0];
        const subfield = name.split(".")[1];


        if (subfield) {
            setUser(prevState => ({
                ...prevState, [field]: { ...prevState[field], [subfield]: value }
            }));
        } else {
            setUser({ ...user, [name]: value });
        }
    }

    const displayPassword = () => {
        if (id === 'new') {
            return (
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="text" name="password" id="password"
                        onChange={handleChange} autoComplete="password" />
                </FormGroup>

            );
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/api/users`, {
            credentials: "include",
            method: (user.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        setUser(initialFormState);
        navigate('/users');
    }

    const title = <h2>{user.id ? 'Edit User' : 'Add User'}</h2>;

    return (
        <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>

                    <FormGroup>
                        <Label for="id"></Label>
                        <Input type="hidden" name="id" id="id" value={user.id}
                            onChange={handleChange} autoComplete="id" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="userName">User Name</Label>
                        <Input type="text" name="userName" id="userName" value={user.userName}
                            onChange={handleChange} autoComplete="userName" />
                    </FormGroup>

                    {displayPassword()}


                    <FormGroup>
                        <Label for="role">Role</Label>
                        <Input type="select" name="role.role" id="role.role" value={user.role.role} onChange={handleChange}>
                            {myRole.map((role) => (
                                <option key={role.role} value={role.role}>
                                    {role.role}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>


                    <FormGroup hidden>
                        <Label for="active"></Label>
                        <Input type="text" name="active" id="active"
                            onChange={handleChange} autoComplete="active" value={user.active}
                            defaultValue={1} />
                    </FormGroup>


                    <FormGroup>
                        <Label for="userdetails.firstName">First Name</Label>
                        <Input type="text" name="userdetails.firstName" id="userdetails.firstName" value={user.userdetails.firstName}
                            onChange={handleChange} autoComplete="userdetails.firstName" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="userdetails.lastName">Last Name</Label>
                        <Input type="text" name="userdetails.lastName" id="userdetails.lastName" value={user.userdetails.lastName}
                            onChange={handleChange} autoComplete="userdetails.lastName" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="userdetails.height">Height</Label>
                        <Input type="text" name="userdetails.height" id="userdetails.height" value={user.userdetails.height}
                            onChange={handleChange} autoComplete="userdetails.height" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="userdetails.weight">Weight </Label>
                        <Input type="text" name="userdetails.weight" id="userdetails.weight" value={user.userdetails.weight}
                            onChange={handleChange} autoComplete="userdetails.weight" />
                    </FormGroup>


                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/users">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default UserEdit;