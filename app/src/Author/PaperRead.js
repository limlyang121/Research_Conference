// @flow strict

import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardText, CardTitle, Container, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../Navbar/AppNavbar';
import { getPaperByID } from './Axios';
import { format } from "date-fns"
import './PaperRead.css'

import AuthorSecurity from './AuthorSecurity';

function PaperRead() {

    const [myPaper, setPaper] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const { id } = useParams()

    React.useEffect(() => {
        const fetchData = async (id) => {
            let response = await getPaperByID(id)
            setPaper(response)
            setLoading(false)
        }

        fetchData(id);


    }, [])

    const dateFormat = (date) => {
        const dateType = new Date(date)

        return (format(dateType, "dd/MM/yyyy"))
    }



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
                            Upload At : { dateFormat (myPaper?.paperInfo.upload)}
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
                            <Link to={"/author/papers/"+myPaper?.paperID+"/review"}>Get paper Review</Link>
                        </CardText>

                    </CardBody>
                    <br />
                </Card>


            </Container>

        </div>
    );
};

export default PaperRead;