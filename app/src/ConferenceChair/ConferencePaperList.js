// @flow strict

import * as React from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { closeBidToReadyPapersAPI, fetchCompletedPapersAPI, fetchPendingPaperAPI, fetchReadytoBePublishOrRejectAPI } from './Axios';
import ConferenceSecurity from './ConferenceSecurity';
import BidData from './Component/BidData';
import PaperData from './Component/PaperData';
import { NoDataToDisplay } from '../General/GeneralDisplay';
import HistoryData from './Component/HistoryData';
import { CircularProgress } from "@material-ui/core";


function ConferencePaperList() {
    const [paperList, setPaperList] = React.useState([]);
    const [bidList, setBidList] = React.useState([]);
    const [status, setStatus] = React.useState("Pending");
    const [loading, setLoading] = React.useState(true);


    const changeStatus = React.useCallback((stat) => {
        setStatus(stat)
    }, [setStatus])

    React.useEffect(() => {
        const fetchPendingData = async () => {
            let response = await fetchPendingPaperAPI()
            setPaperList(response);
            setLoading(false)
            setBidList([]);
        }

        const fetchReadytoBePublishOrReject = async () => {
            let response = await fetchReadytoBePublishOrRejectAPI();
            setBidList(response);
            setLoading(false)
            setPaperList([]);
        }

        const fetchCompletedPapers = async () => {
            let response = await fetchCompletedPapersAPI();
            setPaperList(response)
            setLoading(false)
            setBidList([]);

        }
        setLoading(true)

        if (status === "Pending") {
            fetchPendingData();
        } else if (status === "Ready") {
            fetchReadytoBePublishOrReject();
        }
        else {
            fetchCompletedPapers();
        }


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
                <h3>Publish Papers</h3>
                <br />

                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        <ButtonGroup style={{ gap: "10px" }}>
                            <Button color='secondary' onClick={() => changeStatus("Pending")} >Show Pending</Button>
                            <Button color='primary' onClick={() => changeStatus("Ready")} >Show Ready</Button>
                            <Button color='success' onClick={() => changeStatus("History")} >History</Button>
                        </ButtonGroup>

                        {status === "Pending" && paperList.length === 0 ? <NoDataToDisplay /> : null}
                        {status === "Ready" && bidList.length === 0 ? <NoDataToDisplay /> : null}
                        {status === "History" && paperList.length === 0 ? <NoDataToDisplay /> : null}

                        {(paperList.length !== 0 || bidList.length !== 0) &&
                            <Table striped bordered hover className="mt-4">
                                <thead>
                                    <tr>
                                        <th style={{ width: "20%" }} > Paper Title </th>
                                        <th style={{ width: "20%" }} > Paper Upload Date </th>
                                        <th style={{ width: "20%" }} > Author Name </th>
                                        {status === "Pending" &&
                                            <th style={{ width: "20%" }} > Reviewed times </th>
                                        }
                                        {status === "History" &&
                                            <th style={{ width: "10%" }} > Status </th>
                                        }
                                        <th colSpan={3} >Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {status === "Pending" && <PaperData paperList={paperList} closeBidding={closeBidding} />}
                                    {status === "Ready" && <BidData paperList={bidList} />}
                                    {status === "History" && <HistoryData paperList={paperList} />}

                                </tbody>

                            </Table>
                        }

                    </div>

                )}


            </Container>



        </div>
    );
};

export default ConferencePaperList;