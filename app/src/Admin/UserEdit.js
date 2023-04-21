import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { updateUser, addUser, getUserByID, getAllRoles } from './adminAxios';
import AdminSecurity from './AdminSecurity';
import { displayErrorMessage } from '../General/GeneralFunction';


const UserEdit = () => {
    const initialFormState = {
        id: '',
        userName: "",
        role: {
            role: "Admin",
            desc: ''
        },
        active: "",
        userdetails: {
            firstName: '',
            lastName: '',
            email:'',
            height: '',
            weight: ''
        },
    }


    const [user, setUser] = useState(initialFormState);
    const [myRole, setRole] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fecthData = async() => {
            try{
                if (id !== 'new') {
                    let response =  await getUserByID(id)
                    setUser(response)
                }
                
                let data =  await getAllRoles()
                setRole(data)

            } catch (error) {
                console.error(error)
            }finally{
                setLoading(true)
            }
        }
        setLoading(false)
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
                    <Input type="password" name="password" id="password"
                        onChange={handleChange} autoComplete="password" 
                        minLength={6} title=' Minimal length is 6'
                        />
                </FormGroup>

            );
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            if (id === 'new') {
                await addUser(user)

            } else {
                await updateUser(user)
            }

            setUser(initialFormState);
            navigate('/admin/users');
        }catch(error){
            displayErrorMessage(error, navigate, null)
        }
    }

    if (!loading){
        return (
            <p>Loading...</p>
        )
    }

    const title = <h2>{user.id ? 'Edit User' : 'Add User'}</h2>;


    return (
        <div>
            <AppNavbar />
            <AdminSecurity />

            <Container>
                {title}
                <Form onSubmit={handleSubmit}>

                    <FormGroup>
                        <Label for="id"></Label>
                        <Input type="hidden" name="id" id="id" value={user.id}
                            onChange={handleChange} autoComplete="id" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="userName">Username</Label>
                        <Input type="text" name="userName" id="userName" value={user.userName}
                            onChange={handleChange} autoComplete="userName" required minLength={5}
                             />
                    </FormGroup>

                    {displayPassword()}

                    <FormGroup>
                        <Label for="role">Role</Label>
                        <Input type="select" name="role.role" value={user.role.role} id="role.role" onChange={handleChange} >
                            {myRole.map((role, index) => (
                                <option key={index} value={role.role}>
                                    {role.role}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>

                    <FormGroup hidden>
                        <Label for="active"></Label>
                        <Input type="text" name="active" id="active"
                            onChange={handleChange} autoComplete="active" value={user.active} />
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
                        <Label for="userdetails.email">Email</Label>
                        <Input type="text" name="userdetails.email" id="userdetails.email" value={user.userdetails.email}
                            onChange={handleChange} autoComplete="userdetails.email"
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" 
                            title='Please enter valid Email'
                            required
                            />
                    </FormGroup>

                    <FormGroup>
                        <Label for="userdetails.height">Height</Label>
                        <Input type="text" name="userdetails.height" id="userdetails.height" value={user.userdetails.height}
                            onChange={handleChange} autoComplete="userdetails.height" 
                            pattern="[0-9]+" title="Please enter only numbers"
                            />
                    </FormGroup>

                    <FormGroup>
                        <Label for="userdetails.weight">Weight </Label>
                        <Input type="text" name="userdetails.weight" id="userdetails.weight" value={user.userdetails.weight}
                            onChange={handleChange} autoComplete="userdetails.weight" 
                            pattern="[0-9]+" title="Please enter only numbers"
                            />
                    </FormGroup>

                    <br/>


                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/admin/users">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default UserEdit;