// @flow strict

import * as React from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { AcceptBidAPI, cancelBidAPI, fetchPendingBidsAPI, RejectBidAPI } from './Axios';
import ConferenceSecurity from './ConferenceSecurity';

import { FaCheck, FaRegTimesCircle } from 'react-icons/fa';
import { MdRestore } from 'react-icons/md';


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

        // alert(JSON.stringify(bids))


    }, [status, changeBidsStatus])

    const fullNameBid = (bid) => {
        return bid.reviewerDTO.userdetails.firstName + " " + bid.reviewerDTO.userdetails.lastName;
    }

    const fullNamePaper = (bid) => {
        return bid.paperDTO.paperInfo.authorID.firstName + " " + bid.paperDTO.paperInfo.authorID.lastName;
    }

    const CancelAcceptRejectPaper = async (bid, stat) => {
        if (window.confirm("Are you sure ? ")) {
            let response;
            if (stat === "Accept") {
                response = await AcceptBidAPI(bid.bidID);
            } else if (stat === "Reject") {
                response = await RejectBidAPI(bid.bidID);
            } else {
                response = await cancelBidAPI(bid.bidID);
            }
            alert(response);
            let updatedBids = [...bids].filter(i => i.bidID !== bid.bidID)
            setBids(updatedBids)
        }
    }

    const BidActionSwitch = (bid) => {
        let showAction;
        switch (status) {
            case "Pending":
                showAction = pendingAction(bid);
                break;
            case "Completed":
                break;
            default:
                showAction = AcceptRejectAction(bid);
                break;

        }
        return showAction
    }


    const pendingAction = (bid) => {
        return (
            <ButtonGroup>
                <Button size="sm" color="primary" onClick={async () => CancelAcceptRejectPaper(bid, "Accept")} ><FaCheck /></Button>
                <Button size="sm" color="warning" onClick={async () => CancelAcceptRejectPaper(bid, "Reject")} ><FaRegTimesCircle />  </Button>


            </ButtonGroup>
        )
    }

    const AcceptRejectAction = (bid) => {
        return (
            <ButtonGroup>
                <Button size="sm" color="primary" onClick={async () => CancelAcceptRejectPaper(bid, "Pending")} > <MdRestore /></Button>


            </ButtonGroup>
        )
    }

    const bidsList = bids.map(bid => {
        return (
            <tr key={bid.bidID}>
                <td style={{ whiteSpace: 'nowrap' }}>{fullNamePaper(bid)}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{fullNameBid(bid)}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{bid.paperDTO.paperInfo.title}</td>
                {BidActionSwitch(bid)}

            </tr>
        )
    })



    return (
        <div>
            <AppNavbar />
            <ConferenceSecurity />
            <Container fluid>
                <h3>Reviewer Bid</h3>
                <ButtonGroup style={{ gap: "10px" }}>
                    <Button color='secondary' onClick={() => changeBidsStatus("Pending")} >Show Pending</Button>
                    <Button color='success' onClick={() => changeBidsStatus("Accept")}>Show Accept</Button>
                    <Button color='danger' onClick={() => changeBidsStatus("Reject")}>Show Reject</Button>
                    <Button color='info' onClick={() => changeBidsStatus("Completed")}>Show Completed</Button>
                </ButtonGroup>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="20%">Author Name</th>
                            <th width="20%">Reviewe Name</th>
                            <th width="20%">Title</th>
                            <th >Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bidsList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default ConferenceReviewerBid;