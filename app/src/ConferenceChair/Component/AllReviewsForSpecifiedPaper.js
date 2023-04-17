import React, { useState } from "react";
import { format } from "date-fns"
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Container, Table } from 'reactstrap';


export default function AllReviewsForSpecifiedPaper({ reviewList, Action }) {
    const sum = reviewList.reduce((ave, reviewList) => ave += reviewList.rate, 0);
    const ave = sum / reviewList.length;

    const fullName = (reviewer) => {
        return reviewer.userdetails.firstName + " " + reviewer.userdetails.lastName
    }

    const dateFormat = (date) => {
        const dateType = new Date(date)

        return (format(dateType, "dd/MM/yyyy"))
    }

    return (
        <div>
            {Array.isArray(reviewList) && reviewList.map((review) => {
                return (
                    <div key={review.reviewID}>
                        <Card>
                            <CardHeader>
                                Reviewer Name : {fullName(review.bid.reviewer)}
                            </CardHeader>

                            <CardBody>
                                Comment: {review.comment}
                            </CardBody>
                            <CardFooter>
                                Rating : {review.rate}
                            </CardFooter>

                        </Card>
                        <br />
                    </div>

                )
            })}

            <h4> Average Rating : {ave} </h4>

            <ButtonGroup style={{gap:"10px"}}>
                <Button color="primary" onClick={async() => Action("Accept")}> Accept</Button>
                <Button color="danger" onClick={async() => Action("Reject")} > Reject</Button>
            </ButtonGroup>


        </div>
    )

}

