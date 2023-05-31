import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyProfile, updateMyProfile } from './AxiosGeneral';
import { displayErrorMessage } from './GeneralFunction';
import AppNavbar from '../Navbar/AppNavbar';
import { Button, Container, Form, Input, Label } from 'reactstrap';
import { CircularProgress, FormGroup } from "@material-ui/core";


function ProfileUpdate() {
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
            email: '',
            height: '',
            weight: ''
        },
    }

    const [user, setUser] = React.useState(initialFormState);
    const [loading, setLoading] = React.useState(true)
    const [loadingAnimation, setLoadingAnimation] = React.useState(false)
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchMyData = async () => {
            try {
                let response = await getMyProfile();
                setUser(response);

            } catch (error) {
                displayErrorMessage(error, navigate, -1)
            } finally {
                setLoading(false)
            }
        }

        fetchMyData();


    }, [navigate])

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoadingAnimation(true)
        try {
            await updateMyProfile(user).then((report) => {
                alert(report)
                navigate("/home")
            })

        } catch (error) {
            displayErrorMessage(error, navigate, null)
        }
        finally {
            setLoadingAnimation(false)
        }
    }

    return (
        <div>
            <AppNavbar />
            <Container>
                <br />
                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>

                ) : (
                    <Form onSubmit={handleSubmit} style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <FormGroup>
                            <Label for="userName">Username</Label>
                            <Input type="text" name="userName" id="userName" value={user.userName} size="lg"
                                onChange={handleChange} autoComplete="userName" required minLength={5}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="userdetails.firstName">First Name</Label>
                            <Input type="text" name="userdetails.firstName" id="userdetails.firstName" value={user.userdetails.firstName}
                                onChange={handleChange} autoComplete="userdetails.firstName" size="lg" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="userdetails.lastName">Last Name</Label>
                            <Input type="text" name="userdetails.lastName" id="userdetails.lastName" value={user.userdetails.lastName}
                                onChange={handleChange} autoComplete="userdetails.lastName" size="lg" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="userdetails.email">Email</Label>
                            <Input type="text" name="userdetails.email" id="userdetails.email" value={user.userdetails.email}
                                onChange={handleChange} autoComplete="userdetails.email"
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                title='Please enter valid Email' size="lg"
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="userdetails.height">Height</Label>
                            <Input type="text" name="userdetails.height" id="userdetails.height" value={user.userdetails.height}
                                onChange={handleChange} autoComplete="userdetails.height"
                                pattern="[0-9]+" title="Please enter only numbers" size="lg"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="userdetails.weight">Weight </Label>
                            <Input type="text" name="userdetails.weight" id="userdetails.weight" value={user.userdetails.weight}
                                onChange={handleChange} autoComplete="userdetails.weight"
                                pattern="[0-9]+" title="Please enter only numbers" size="lg"
                            />
                        </FormGroup>

                        <br />


                        <FormGroup>
                            {loadingAnimation ? (
                                <CircularProgress />
                            ) : (
                                <div>
                                    <Button color="primary" type="submit">Save</Button>{' '}
                                    <Button color="secondary" tag={Link} to="/admin/users">Cancel</Button>
                                </div>
                            )}
                        </FormGroup>
                    </Form>
                )}

            </Container>
        </div>
    );
};

export default ProfileUpdate;