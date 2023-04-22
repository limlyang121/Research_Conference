// @flow strict

import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardText, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../Navbar/AppNavbar';
import { getPaperByID } from './Axios';
import './PaperRead.css'

import AuthorSecurity from './AuthorSecurity';
import { dateFormat, displayErrorMessage } from '../General/GeneralFunction';

function PaperRead() {

    const [myPaper, setPaper] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const { id } = useParams()
    const navigate = useNavigate();

    React.useEffect(() => {

        const fetchData = async (id) => {
            try {
                let response = await getPaperByID(id)
                setPaper(response)
                setLoading(false)
            } catch (error) {
                displayErrorMessage(error, navigate, "/author/papers")
            }

        }

        fetchData(id);


    }, [navigate, id])


    if (loading) {
        return <p>Loading</p>
    }


    return (
        <div>
            <AppNavbar />
            <AuthorSecurity />
            <Container>
                <br />
                <Card>
                    <CardHeader tag={"h3"} >Status</CardHeader>
                    <CardBody>
                        <CardText tag={"h6"} className={myPaper?.status === "Accept" ? "green" : myPaper?.status === "Reject" ? "red" : ""}>
                            {myPaper.status}
                        </CardText>

                    </CardBody>
                    <br />
                </Card>
                <br />
                <Card>

                    <CardHeader tag={"h3"}>Paper Details</CardHeader>
                    <CardBody>
                        <CardText tag={"h6"}>
                            Title: {myPaper?.paperInfo.title}
                        </CardText>

                        <CardText tag={"h6"}>
                            FileName : {myPaper?.paperInfo.filename}
                        </CardText>

                        <CardText tag={"h6"}>
                            {/* Upload At : { format(myPaper.paperInfo.upload, "dd/MM/yyyy")} */}
                            Upload At : {dateFormat(myPaper?.paperInfo.upload)}
                        </CardText>

                        <CardText tag={"h6"}>
                            description : {myPaper?.paperInfo.description}
                        </CardText>

                    </CardBody>

                </Card>
                <br />

                <Card>
                    <CardHeader tag={"h3"}>Review</CardHeader>
                    <CardBody>
                        <CardText tag={"h6"}>
                            <Link to={"/author/papers/" + myPaper?.paperID + "/review"}>Get paper Review</Link>
                        </CardText>

                    </CardBody>
                    <br />
                </Card>


            </Container>

        </div>
    );
};

export default PaperRead;