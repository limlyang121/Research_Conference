// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { getAcceptedBidAPI, getMyReviewsAPI } from './Axios';
import ReviewerSecurity from './ReviewerSecurity';
import { format } from "date-fns"


function ReviewerReviewList() {

    const [status, setStatus] = React.useState("Pending")
    const [bids, setBids] = React.useState([])
    const [reviews, setReviews] = React.useState([])

    const id = sessionStorage.getItem("id")

    const changeList = React.useCallback((stat) => {
        setStatus(stat);
    }, [setStatus])

    React.useEffect(() => {
        const fetchAcceptedData = async (id) => {
            let response = await getAcceptedBidAPI(id)
            setBids(response)
        }

        const fetchCompletedData = async (id) => {
            let response = await getMyReviewsAPI(id)
            setReviews(response)
        }

        fetchAcceptedData(id);
        fetchCompletedData(id);

    }, [])

    const dateFormat = (date) => {
        const dateType = new Date(date)

        return (format(dateType, "dd/MM/yyyy"))
    }

    const displayBidStatusHeader = () => {
        return (
            <tr>
                <th style={{ width: "10%" }} > Bid Status </th>
                <th style={{ width: "20%" }} > Paper Title </th>
                <th style={{ width: "20%" }} > FileName </th>
                <th colSpan={3}>Action</th>
            </tr>
        )
    }

    const displayReviewStatusHeader = () => {
        return (
            <tr>
                <th style={{ width: "10%" }} > My Rating </th>
                <th style={{ width: "20%" }} > Review Date </th>
                <th style={{ width: "20%" }} > Paper Title </th>
                <th colSpan={3}>Action</th>
            </tr>
        )
    }



    const displayBidStatus = () => {
        if (bids.length === 0) {
            return (
                <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                        No bids to display
                    </td>
                </tr>
            );
        }

        return bids.map((bid) => (
            <tr key={bid.bidID} >
                <td style={{ whiteSpace: "nowrap" }} > {bid.status}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {bid.paperDTO.paperInfo.title}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {bid.paperDTO.paperInfo.filename}  </td>
                <td>
                    <ButtonGroup style={{ gap: "10px" }} >
                        <Button color='primary' tag={Link} to={"/reviewer/review/" + bid.bidID + "/new"}> Review!</Button>
                        <Button color="warning"  > </Button>
                    </ButtonGroup>
                </td>
            </tr>
        ));
    }

    const displayReviewStatus = () => {
        if (reviews.length === 0) {
            return (
                <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                        No Reviews to display
                    </td>
                </tr>
            );
        }

        return reviews.map((reviews) => (
            <tr key={reviews.reviewID} >
                <td style={{ whiteSpace: "nowrap" }} > {reviews.rate} out of 5  </td>
                <td style={{ whiteSpace: "nowrap" }} > {dateFormat(reviews.reviewDate)}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {reviews.bidDTO.paperDTO.paperInfo.filename}  </td>
                <td>
                    <ButtonGroup style={{ gap: "10px" }} >
                        <Button color='info' tag={Link} to={"/reviewer/review/" + reviews.reviewID + "/edit"}> Edit Review</Button>
                    </ButtonGroup>
                </td>
            </tr>
        ))
    }


    return (
        <div>
            <AppNavbar />
            <ReviewerSecurity />
            <Container fluid>
                <h3>Bid Status</h3>
                <ButtonGroup style={{ gap: "10px" }} >
                    <Button color='secondary' onClick={() => changeList("Pending")} > Show Pending</Button>
                    <Button color='primary' onClick={() => changeList("Complete")}> Show Reviewed</Button>

                </ButtonGroup>
                <Table className="mt-4">
                    <thead>
                        {status === "Pending" && displayBidStatusHeader()}
                        {status === "Complete" && displayReviewStatusHeader()}
                    </thead>
                    <tbody>
                        {status === "Pending" && displayBidStatus()}
                        {status === "Complete" && displayReviewStatus()}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default ReviewerReviewList;