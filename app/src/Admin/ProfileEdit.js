// @flow strict

import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Container, FormGroup, Input, Label, Button } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { addRole, getRoleByName } from './adminAxios';

function ProfileEdit() {

    const roleInitialState = {
        role: {
            role: "",
            desc: ""
        }
    }

    const [role, setRole] = React.useState(roleInitialState);
    const { name } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchData = async (name) => {
            let response = await getRoleByName(name);
            setRole(response)
        }

        if (name !== "new") {
            fetchData(name)
        }


    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        const field = name.split(".")[0];
        const subfield = name.split(".")[1];


        if (subfield) {
            setRole(prevState => ({
                ...prevState, [field]: { ...prevState[field], [subfield]: value }
            }));
        } else {
            setRole({ ...role, [name]: value });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            if (name === 'new') {
                let reponse = await addRole(role)
                alert(reponse)

            } else {
                // await updateUser(user)

            }

            navigate('/admin/roles');
        }catch{
            alert("Rolename Must be unique")
        }



    }


    const title = <h2>{name === "new" ? 'Add Role' : 'Edit Role'}</h2>;

    return (
        <div>
            <AppNavbar />
            <Container>
                {title}

                <Form onSubmit={handleSubmit} method="post"   >
                    <FormGroup>
                        <Label for="role">Role:</Label>
                        {name === "new" && <Input name="role" id='role' onChange={handleChange} />}
                        {name !== "new" && <Input name="role" id='role' onChange={handleChange} value={role.role} disabled />}

                    </FormGroup>

                    <FormGroup>
                        <Label for="desc">Descritpion</Label>
                        <Input type='textarea' name="desc" id='desc' onChange={handleChange} value={role.desc} />

                    </FormGroup>

                    <br/>

                    <Button type='submit' color='primary'>Submit</Button>
                </Form>

            </Container>
        </div>
    );
};

export default ProfileEdit;