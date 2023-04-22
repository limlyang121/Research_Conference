// @flow strict

import * as React from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { closeBidToReadyPapersAPI, fetchPendingPaperAPI, fetchReadytoBePublishOrRejectAPI } from './Axios';
import ConferenceSecurity from './ConferenceSecurity';
import BidData from './Component/BidData';
import PaperData from './Component/PaperData';
import { NoDataToDisplay } from '../General/GeneralDisplay';


function ConferencePaperList() {
    const [paperList, setPaperList] = React.useState([]);
    const [bidList, setBidList] = React.useState([]);
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
            setBidList(response);
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
                let updatedPapaers = [...paperList].filter(i => i.paperID !== paperID);
                setPaperList(updatedPapaers)
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
                    <Button color='success' onClick={() => changeStatus("History")} >History</Button>
                </ButtonGroup>

                {status === "Pending" && paperList.length === 0 ? <NoDataToDisplay /> : null}
                {status === "Ready" && bidList.length === 0 ? <NoDataToDisplay /> : null}

                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }} > Paper Title </th>
                            <th style={{ width: "20%" }} > Paper Upload Date </th>
                            <th style={{ width: "20%" }} > Author Name </th>
                            {status === "Pending" &&
                                <th style={{ width: "20%" }} > Reviewed times </th>
                            }
                            <th colSpan={3} >Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {status === "Pending" && <PaperData paperList={paperList} closeBidding={closeBidding} />}
                        {status === "Ready" && <BidData paperList={bidList} />}
                    </tbody>

                </Table>

            </Container>



        </div>
    );
};

export default ConferencePaperList;