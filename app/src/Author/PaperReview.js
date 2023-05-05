// @flow strict

import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader, Container } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import AuthorSecurity from './AuthorSecurity';
import { getPaperReviewsAPI } from './Axios';
import { displayErrorMessage } from '../General/GeneralFunction';
import { CircularProgress } from "@material-ui/core";


function PaperReview() {
    const [loading, setLoading] = React.useState(true);
    const [paperReview, setPaperReviews] = React.useState([]);
    const { id } = useParams();

    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchReview = async (id) => {
            try {
                let response = await getPaperReviewsAPI(id);
                setPaperReviews(response);
            } catch (error) {
                displayErrorMessage(error, navigate, -1)
            } finally {
                setLoading(false)
            }
        }

        setLoading(true)

        fetchReview(id)


    }, [id, navigate])

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
                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        {displayReview()}
                    </div>

                )}

            </Container>
        </div>
    );
};

export default PaperReview;