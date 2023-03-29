// @flow strict

import * as React from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { fetchPendingPaperAPI } from './Axios';
import ConferenceSecurity from './ConferenceSecurity';

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

        const fetchAcceptRejectData = async () => {

        }

        if (status === "Pending") {
            fetchPendingData();
        } else
            fetchAcceptRejectData();



    }, [status, changeStatus])

    const displayListData = paperList.map((paper) => {
        return (

            <tr key={paper.paperID} >
                <td style={{ whiteSpace: "nowrap" }} > {paper.paperID}  </td>

            </tr>
        )
    })

    return (
        <div>
            <AppNavbar />
            <ConferenceSecurity />

            <Container fluid>

                <h3>Paper Publish Place</h3>
                <ButtonGroup style={{ gap: "10px" }}>
                    <Button color='primary' onClick={() => changeStatus("Pending")} >Show Ready</Button>
                    <Button color='danger' onClick={() => changeStatus("Accept")} >Show Accept</Button>
                    <Button color='danger' onClick={() => changeStatus("Reject")} >Show Reject</Button>

                </ButtonGroup>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }} >Paper Title </th>
                            <th style={{ width: "20%" }}>Paper Upload Date </th>
                            <th style={{ width: "20%" }}>Author Name </th>
                            <th colSpan={3}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayListData}

                    </tbody>
                </Table>

            </Container>



        </div>
    );
};

export default ConferencePaperList;