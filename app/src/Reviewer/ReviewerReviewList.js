// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { getAcceptedBidAPI } from './Axios';
import ReviewerSecurity from './ReviewerSecurity';

function ReviewerReviewList() {


    const [status, setStatus] = React.useState()
    const [bids, setBids] = React.useState([])
    const  id  = sessionStorage.getItem("id")
    

    React.useEffect(() => {
        const fetchData =  async (id) => {
            let response = await getAcceptedBidAPI(id)
            setBids(response)
        }

        fetchData(id);


    },[])

    const displayBidStatus = bids.map(bid => {
        return (
            <tr key={bid.bidID} >
                <td style={{ whiteSpace: "nowrap" }} > {bid.status}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {bid.paperDTO.paperInfo.title}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {bid.paperDTO.paperInfo.filename}  </td>
                <td>
                    <ButtonGroup style={{gap:"10px"}} >
                        <Button color='primary'  tag={Link} to={"/reviewer/review/"+bid.bidID+"/new"}> Review!</Button>
                        <Button color="warning"  > </Button>
                    </ButtonGroup>
                </td>
            </tr>
        )   
    })


    return (
        <div>
            <AppNavbar />
            <ReviewerSecurity />
            <Container fluid>
                <h3>Bid Status</h3>
                <ButtonGroup style={{ gap: "10px" }} >
                    <Button color='secondary'  > Show Pending</Button>
                    <Button color='primary'   > Show Accept</Button>
                    <Button color='danger'    > Show Reject</Button>

                </ButtonGroup>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }} > Bid Status </th>
                            <th style={{ width: "20%" }} > Paper Title </th>
                            <th style={{ width: "20%" }} > FileName </th>
                            <th colSpan={3}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayBidStatus}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default ReviewerReviewList;