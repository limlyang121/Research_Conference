// @flow strict

import * as React from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { fetchPendingBidsAPI } from './Axios';
import ConferenceSecurity from './ConferenceSecurity';

function ConferenceReviewerBid() {


    const [bids, setBids] = React.useState([])
    const [status, setStatus] = React.useState("Pending")

    const changeBidsStatus = React.useCallback((stat) => {
        setStatus(stat)
    }, [setStatus])


    React.useEffect(() => {
        const fetchBidsByStatus = async (stat) => {
            let response = await fetchPendingBidsAPI(stat);
            setBids(response)
        }

        fetchBidsByStatus(status);
    }, [status, changeBidsStatus])

    return (
        <div>
            <AppNavbar />
            <ConferenceSecurity />
            <Container fluid>
                <h3>My Users</h3>
                <ButtonGroup style={{gap:"10px"}}>
                    <Button color='secondary' onClick={() => changeBidsStatus("Pending")} >Show Pending</Button>
                    <Button color='success' onClick={() => changeBidsStatus("Accept")}>Show Accept</Button>
                    <Button color='danger' onClick={() => changeBidsStatus("Reject")}>Show Reject</Button>
                    <Button color='info' onClick={() => changeBidsStatus("Completed")}>Show Completed</Button>
                </ButtonGroup>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="20%">First Name</th>
                            <th width="20%">Last  Name</th>
                            <th width="20%">UserName</th>
                            <th width="10%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default ConferenceReviewerBid;