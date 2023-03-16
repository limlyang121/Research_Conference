// @flow strict

import * as React from 'react';
import { getPendingPapers } from './Axios';
import { format } from "date-fns"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';

function ReviewerBid() {

    const [pendingPaper, setBidPapers] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            let response = await getPendingPapers();
            setBidPapers(response)
        }

        fetchData()

    }, [])

    const dateFormat = (date) => {
        const dateType = new Date(date)

        return (format(dateType, "dd/MM/yyyy"))
    }

    const fullName = (paper) =>{
        return paper.paperInfo.authorID.firstName + " " + paper.paperInfo.authorID.lastName
    }

    const displayBidPapers = pendingPaper.map(paper => {
        return (
            <tr key={paper.paperID} >
                <td style={{ whiteSpace: "nowrap" }} > {paper.paperInfo.title}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {dateFormat(paper.paperInfo.upload)}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {fullName(paper)}  </td>
                <td>
                    <ButtonGroup style={{ gap: "10px" }}>
                        <Button size="sm" color="info" tag={Link} to={"#"}>Download</Button>
                        <Button size="sm" color="primary" tag={Link} to={"#"}>Bid Papers</Button>
                        <Button size="sm" color="danger" tag={Link} to={"#"}>Hide</Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    })


    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <h3>Bid Papers</h3>

                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Paper Title </th>
                            <th>Paper Upload Date </th>
                            <th>Author Name </th>
                            <th colSpan={3}>Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        {displayBidPapers}

                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default ReviewerBid;