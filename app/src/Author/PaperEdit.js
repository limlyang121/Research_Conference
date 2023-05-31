// @flow strict

import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';
import { Container, Input, Button, Form } from 'reactstrap';
import { addPapers } from './Axios';
import { getPaperByID, updatePaper } from './Axios';
import AuthorSecurity from './AuthorSecurity';
import { displayErrorMessage } from '../General/GeneralFunction';
import { CircularProgress } from "@material-ui/core";


function PaperEdit() {
    const paperFormState = {
        paperID: "",
        fileInfo: {
            fileDataId: null,
            fileType: ""
        },
        status: "",
        paperInfo: {
            title: "",
            filename: "",
            upload: "",
            authorID: {
                id: "",
                firstName: "",
                lastName: "",
                height: "",
                weight: ""
            },
            description: ""
        },

    }

    const [isLoading, setIsLoading] = React.useState(false);
    const [loading, setLoading] = React.useState();
    const [myFile, setFile] = React.useState(null);
    const [myPaper, setPaper] = React.useState(paperFormState)
    const { id } = useParams();
    const navigate = useNavigate()


    React.useEffect(() => {

        const loadData = async () => {
            //Get Data
            try {
                let response = await getPaperByID(id)
                setPaper(response)
            } catch (error) {
                displayErrorMessage(error, navigate, -1)
            }finally{
                setLoading(false)
            }


        }
        if (id !== 'new') {
            setLoading(true)
            loadData()
        }


    }, [id, navigate])

    const handleChange = (event) => {
        const { name, value } = event.target;
        const field = name.split(".")[0];
        const subfield = name.split(".")[1];


        if (subfield) {
            setPaper(prevState => ({
                ...prevState, [field]: { ...prevState[field], [subfield]: value }
            }));
        } else {
            setPaper({ ...myPaper, [name]: value });
        }
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setPaper((prevMyPaper) => ({
            ...prevMyPaper,
            paperInfo: {
                ...prevMyPaper.paperInfo,
                filename: file.name,
            },
        }));

        setFile(file)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (id !== "new") {
            let response = await updatePaper(myPaper);
            alert(response)

            navigate("/home")
        } else {
            const formData = new FormData()
            const json = JSON.stringify(myPaper)
            formData.append("file", myFile)
            formData.append("paperData", json)

            try {
                let response = await addPapers(formData)
                alert(response)

                navigate("/home")
            } catch (error) {
                alert(error)
                setIsLoading(false)
            }
        }


    }

    const title = <h2>{myPaper.paperID ? 'Edit Paper' : 'Add Paper'}</h2>;


    return (
        <div>
            <AppNavbar />
            <AuthorSecurity />

            <Container fluid>

                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        {title}

                        <hr />

                        <Form onSubmit={handleSubmit}>

                            <Input type={'hidden'} value={myPaper.paperID} name="paperID" />
                            <Input type={'hidden'} value={myPaper.status} name="status" />

                            <Input type={"text"} value={myPaper.paperInfo.title} placeholder="Title" required
                                onChange={handleChange} className="form-control" id='paperInfo.title' name='paperInfo.title'
                                style={{ height: "50px" }} />

                            <br />

                            <Input type={"text"} value={myPaper.paperInfo.filename} placeholder="filename" required
                                onChange={handleChange} className="form-control" readOnly
                                style={{ height: "50px" }} />

                            <br />

                            {id === "new" &&
                                <Input type='file' name='file' id='file' accept='application/pdf' onChange={handleFileUpload} />

                            }

                            <br /> <br />

                            <Input type='Date' name='upload' id='upload' hidden />



                            <Input type='textarea' placeholder='description ' style={{ height: "250px" }} name="paperInfo.description" id='paperInfo.description'
                                onChange={handleChange} value={myPaper.paperInfo.description} />

                            <br />

                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <Button type='submit' color='primary'>Submit</Button>
                            )}
                        </Form>

                    </div>

                )}
            </Container>

        </div>
    );
};

export default PaperEdit; 