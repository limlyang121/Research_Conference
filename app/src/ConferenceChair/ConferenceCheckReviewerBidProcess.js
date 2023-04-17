// @flow strict

import * as React from 'react';
import AppNavbar from '../Navbar/AppNavbar';
import ConferenceSecurity from './ConferenceSecurity';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { fetchAllBidsByPaperIDAPI } from './Axios';
import { useParams } from 'react-router-dom';
import { format } from "date-fns"
import { deleteFromBidAPI } from '../Reviewer/Axios';


function ConferenceCheckReviewerBidProcess() {
    const [bidList, setBidsList] = React.useState([]);
    const { id } = useParams()

    const fullName = (reviewer) => {
        return reviewer.userdetails.firstName + " " + reviewer.userdetails.lastName
    }

    const dateFormat = (date) => {
        const dateType = new Date(date)

        return (format(dateType, "dd/MM/yyyy"))
    }

    React.useEffect(() => {
        const fetchAllBidsByPaperID = async (id) => {
            let response = await fetchAllBidsByPaperIDAPI(id);
            setBidsList(response);
        }

        fetchAllBidsByPaperID(id);




    }, [])

    const deleteBid = async (bidID) => {
        if (window.confirm("Delete this Bid? ")) {
            await deleteFromBidAPI(bidID).then((response) => {
                alert(response);
                let updatedBids = [...bidList].filter(i => i.bidID !== bidID);
                setBidsList(updatedBids);
            })
        }
    }

    return (
        <div>
            <AppNavbar />
            <ConferenceSecurity />

            <Container fluid>

                <br />

                <h3>Bid Status </h3>

                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }} > Reviewer Name </th>
                            <th style={{ width: "20%" }} > Paper Upload Date </th>
                            <th style={{ width: "20%" }} > Bid Date </th>
                            <th style={{ width: "20%" }} > Status </th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bidList.map((bid) => {
                            return (
                                <tr key={bid.bidID}>
                                    <td> {fullName(bid.reviewer)}</td>
                                    <td> {dateFormat(bid.paper.paperInfo.upload)} </td>
                                    <td> {dateFormat(bid.bidDate)} </td>
                                    {bid.status === "Complete" ? (
                                        <React.Fragment>
                                            <td style={{ color: "green" }} > {bid.status} </td>
                                            <td> <Button color='secondary' disabled> Unbid </Button>  </td>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <td style={{ color: "red" }}> {bid.status} </td>
                                            <td> <Button color='warning' onClick={async () => deleteBid(bid.bidID)}> Unbid </Button>  </td>
                                        </React.Fragment>
                                    )}
                                </tr>
                            )
                        })}


                    </tbody>

                </Table>

            </Container>
        </div>
    );
};

export default ConferenceCheckReviewerBidProcess;