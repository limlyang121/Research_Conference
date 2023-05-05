import React from "react";
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import { acceptPaperToPublishAPI, rejectPaperToPublishAPI } from "../Axios";
import { useNavigate } from "react-router-dom";


export default function AllReviewsForSpecifiedPaper({ reviewList, paperID, status }) {
    const navigate = useNavigate();


    const AcceptRejectPaper = async (action) => {
        if (window.confirm("Are you sure ? ")) {

            let response;
            if (action === "Accept") {
                response = await acceptPaperToPublishAPI(paperID);
            } else if (action === "Reject") {
                response = await rejectPaperToPublishAPI(paperID);
            }

            alert(response)
            navigate("/home")
        }
    }

    const sum = reviewList.reduce((ave, reviewList) => ave += reviewList.rate, 0);
    const ave = (sum / reviewList.length).toFixed(2);

    const fullName = (reviewer) => {
        return reviewer.userdetails.firstName + " " + reviewer.userdetails.lastName
    }


    return (
        <div>
            {status !== "Unknown" ? (
                <div>
                    {Array.isArray(reviewList) && reviewList.map((review) => {
                        return (
                            <div key={review.reviewID}>
                                <Card>
                                    <CardHeader>
                                        Reviewer Name: {fullName(review.bid.reviewer)}
                                    </CardHeader>
                                    <CardBody>
                                        Comment: {review.comment}
                                    </CardBody>
                                    <CardFooter>
                                        Rating: {review.rate}
                                    </CardFooter>
                                </Card>
                                <br />
                            </div>
                        );
                    })}
                    <h4> Average Rating: {ave} </h4>
                    {status === "Ready" && (
                        <ButtonGroup style={{ gap: "10px" }}>
                            <Button color="primary" onClick={async () => AcceptRejectPaper("Accept")}> Accept</Button>
                            <Button color="danger" onClick={async () => AcceptRejectPaper("Reject")}> Reject</Button>
                        </ButtonGroup>
                    )}
                </div>
            ) : (
                null
            )}

            <br style={{marginBottom:"10px"}} />

        </div >
    )

}

