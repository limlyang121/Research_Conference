// @flow strict

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { deleteFromBidAPI, getBidByStatus } from './Axios';

function ReviewerBidStatus() {

    const [myBid, setBids] = React.useState([]);
    const [status, setStatus] = React.useState("Pending");
    const { id } = useParams()

    const changeList = React.useCallback((stat) => {
        setStatus(stat);
    })

    React.useEffect(() => {
        const fetchPendingData = async (id) => {
            let response = await getBidByStatus(id, "Pending")
            setBids(response)
        }

        const fetchAcceptData = async(id) =>{

        }

        const fetchRejectData = async(id) =>{
            
        }

        if (status === "Pending"){
            fetchPendingData(id)
        }


    }, [])

    const deleteFromBid = async (id) => {
        if (window.confirm("Unbid the paper?")){
            let response = deleteFromBidAPI(id).then(() => {
                alert(response)
                let updatedGroups = [...myBid].filter(i => parseInt(i.bidID) !== parseInt(id))
                setBids(updatedGroups)
            })
        }
    }

    const displayBidStatus = myBid.map(bid => {
        return (
            <tr key={bid.bidID} >
                <td style={{ whiteSpace: "nowrap" }} > {bid.status}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {bid.paperDTO.paperInfo.title}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {bid.paperDTO.paperInfo.filename}  </td>
                <td>
                    <ButtonGroup style={{gap:"10px"}} >
                        <Button color='primary'> Download</Button>
                        <Button color="warning" onClick={async() => deleteFromBid(bid.bidID)} > Unbid</Button>
                    </ButtonGroup>
                </td>
            </tr>
        )   
    })

    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <h3>Bid Status</h3>
                <ButtonGroup style={{ gap: "10px" }} >
                    <Button color='primary'   >Show Pending</Button>
                    <Button color='danger'    >Show Accept/Reject</Button>

                </ButtonGroup>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }} >Bid Status </th>
                            <th style={{ width: "20%" }} >Paper Title </th>
                            <th style={{ width: "20%" }} >FileName </th>
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

export default ReviewerBidStatus;