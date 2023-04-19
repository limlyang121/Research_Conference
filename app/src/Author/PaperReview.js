// @flow strict

import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import AuthorSecurity from './AuthorSecurity';
import { getPaperReviewsAPI } from './Axios';

function PaperReview() {

    const [paperReview, setPaperReviews] = React.useState([]);
    const { id } = useParams();

    React.useEffect(() => {
        const fetchReview = async (id) => {
            let response = await getPaperReviewsAPI(id);
            setPaperReviews(response);
        }

        fetchReview(id)

    }, [])

    const getFullName = (review) => {
        return (
            review.bid.reviewer.userdetails.firstName + " " + review.bid.reviewer.userdetails.lastName
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
            <AuthorSecurity />
            <Container fluid>
                <br />

                {displayReview()}
                
            </Container>
        </div>
    );
};

export default PaperReview;