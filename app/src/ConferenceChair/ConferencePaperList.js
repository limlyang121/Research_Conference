// @flow strict

import * as React from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { closeBidToReadyPapersAPI, fetchReadyPapersAPI, fetchPendingPaperAPI, fetchReadyToPublishOrRejectAPI, fetchReadytoBePublishOrRejectAPI } from './Axios';
import ConferenceSecurity from './ConferenceSecurity';
import { format } from "date-fns"
import { Link } from 'react-router-dom';
import BidData from './Component/BidData';
import PaperData from './Component/PaperData';


function ConferencePaperList() {
    const [paperList, setPaperList] = React.useState([]);
    const [status, setStatus] = React.useState("Pending");


    const changeStatus = React.useCallback((stat) => {
        setStatus(stat)
    }, [setStatus])

    React.useEffect(() => {
        const fetchPendingData = async () => {
            let response = await fetchPendingPaperAPI()
            setPaperList(response);
        }

        const fetchReadytoBePublishOrReject = async () => {
            let response = await fetchReadytoBePublishOrRejectAPI();
            setPaperList(response);
        }

        if (status === "Pending") {
            fetchPendingData();
        } else
            fetchReadytoBePublishOrReject();



    }, [status, changeStatus])


    const closeBidding = async (paperID) => {
        if (window.confirm("Close the bidding for this paper? "))
            await closeBidToReadyPapersAPI(paperID).then((response) => {
                alert(response);
            })
    }


    return (
        <div>
            <AppNavbar />
            <ConferenceSecurity />

            <Container fluid>

                <br />

                <ButtonGroup style={{ gap: "10px" }}>
                    <Button color='secondary' onClick={() => changeStatus("Pending")} >Show Pending</Button>
                    <Button color='primary' onClick={() => changeStatus("Ready")} >Show Ready</Button>
                    <Button color='danger' onClick={() => changeStatus("Reject")} >Show Reject</Button>

                </ButtonGroup>

                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }} > Paper Title </th>
                            <th style={{ width: "20%" }} > Paper Upload Date </th>
                            <th style={{ width: "20%" }} > Author Name </th>
                            <th style={{ width: "20%" }} > Reviewed times </th>
                            <th colSpan={3}>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {status === "Pending" && <PaperData paperList={paperList} closeBidding={closeBidding} />}
                        {status === "Ready" && <BidData paperList={paperList} />}
                    </tbody>

                </Table>

            </Container>



        </div>
    );
};

export default ConferencePaperList;