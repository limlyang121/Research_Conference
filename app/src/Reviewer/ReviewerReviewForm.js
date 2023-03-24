// @flow strict

import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import ReviewerSecurity from './ReviewerSecurity';
import { getOneReviewsAPI, SubmitReviewAPI } from './Axios';

function ReviewerReviewForm() {
    const reviewsForm = {
        reviewID: "",
        bid:{
            bidID:"",
        },
        rate: "",
        comment: "",
        review_date: ""
    }

    const { id } = useParams();
    const { status } = useParams()
    const [reviews, setReviews] = React.useState(reviewsForm)
    const navigate = useNavigate()


    React.useEffect(() => {
        const fetchData = async (id) => {
            let response = await getOneReviewsAPI(id);
            setReviews(response)
        }

        if (status === "new"){
            reviews.bid.bidID = id
        }else{
            fetchData(id)
        }
    }, [])

    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ];

    const title = <h2>{status ? 'Edit Review' : 'Add Review'}</h2>;



    const handleChange = (event) => {
        const { name, value } = event.target;
        const field = name.split(".")[0];
        const subfield = name.split(".")[1];


        if (subfield) {
            setReviews(prevState => ({
                ...prevState, [field]: { ...prevState[field], [subfield]: value }
            }));
        } else {
            setReviews({ ...reviews, [name]: value });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            if (status === 'new') {
                await SubmitReviewAPI(reviews).then((response) => {
                    alert (response)
                })
            } else {
                // await updateUser(user)

            }

            navigate('/home');
        }catch{
            alert("Username existed")
        }
    }

    


    return (
        <div>
            <AppNavbar />
            <ReviewerSecurity />

            <Container fluid>
                {title}
                <hr />
                <Form onSubmit={handleSubmit}>
                    <Input type='hidden' name='reviewID' id='reviewID' value={reviews.reviewID}></Input>
                    <Input type='hidden' name='bid.bidID' id='bid.bidID' value={reviews.bid.bidID}></Input>

                    <FormGroup>
                        <Label for="rate">Rating</Label>
                        <Input type='select' name='rate' id='rate' value={reviews.rate} onChange={handleChange}>
                            {options.map((optionChoice) => (
                                <option key={optionChoice.value} value={optionChoice.label} >
                                    {optionChoice.label}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>


                    <br />

                    <FormGroup>
                        <Label for="comment">Comment</Label>
                        <Input type="textarea" value={reviews.comment} name="comment" id='comment' onChange={handleChange} />
                    </FormGroup>

                    <br />

                    <Button type='submit' color='primary'>Submit Review  </Button>




                </Form>
            </Container>
        </div>
    );
};

export default ReviewerReviewForm;