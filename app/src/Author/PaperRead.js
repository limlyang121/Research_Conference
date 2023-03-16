// @flow strict

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardText, CardTitle, Container, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../Navbar/AppNavbar';
import { getPaperByID } from './Axios';

function PaperRead() {

    const [myPaper, setPaper] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const { id } = useParams()

    React.useEffect(() => {
        const fetchData = async (id) => {
            let response = await getPaperByID(id)

            setPaper(response)
        }

        fetchData(id);
        setLoading(false)


    }, [])


    if (loading) {
        return <p>Loading</p>
    }


    return (
        <div>
            <AppNavbar />
            <Container>
                <br />
                <Card>
                    <CardHeader tag={"h3"}>Status</CardHeader>
                    <CardBody>
                        <CardText tag={"h6"}>
                            {myPaper?.status}
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
                            Upload At : {myPaper?.paperInfo.upload}
                        </CardText>

                        <CardText tag={"h6"}>
                            description : {myPaper?.paperInfo.description}
                        </CardText>

                    </CardBody>

                    <CardBody>

                    </CardBody>
                </Card>

                <Card>
                    <CardHeader tag={"h3"}>Review</CardHeader>
                    <CardBody>
                        <CardText tag={"h6"}>
                            {myPaper?.status}
                        </CardText>

                    </CardBody>
                    <br />
                </Card>


            </Container>

        </div>
    );
};

export default PaperRead;