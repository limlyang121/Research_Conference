// @flow strict

import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Container, Form, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { getPaperReviewsAPI } from './Axios';
import ConferenceSecurity from './ConferenceSecurity';

function ConferencePaperReview() {

    const [paperReview, setPaperReviews] = React.useState([]);
    const [average, setAverage] = React.useState(0);
    const { id } = useParams();

    React.useEffect(() => {
        const fetchReview = async (id) => {
            let response = await getPaperReviewsAPI(id);
            setPaperReviews(response);

            const sum = response.reduce((acc, review) => acc + review.rate, 0);
            setAverage(sum / response.length);
        }

        fetchReview(id)

    }, [])

    const getFullName = (review) => {
        return (
            review.bidDTO.reviewerDTO.userdetails.firstName + " " + review.bidDTO.reviewerDTO.userdetails.lastName
        )
    }

    const displayReview = () => {
        if (paperReview.length === 0) {
            return (
                <h2 style={{ textAlign: 'center' }}>Currently no review Yet</h2>
            )
        }

        return paperReview.map((review, index) => (
            <div key={index}>
                <Card>
                    <CardHeader>
                        Review {index + 1}
                    </CardHeader>

                    <CardBody>
                        Comment: {review.comment}
                    </CardBody>
                    <CardFooter>
                        {getFullName(review)}, Rating : {review.rate}
                    </CardFooter>
                </Card>

                <br /> <br />
            </div>
        ));
    }


    return (
        <div>
            <AppNavbar />
            <ConferenceSecurity />
            <Container fluid>
                <br />

                {displayReview()}

                Average is : {average}

                <Form>
                    <ButtonGroup style={{gap:"10px"}}>
                        <Button color='primary' >Accept</Button>
                        <Button color='danger' >Reject</Button>
                    </ButtonGroup>
                </Form>



            </Container>
        </div>
    );
};

export default ConferencePaperReview;