// @flow strict

import * as React from 'react';
import { getMyPublishPapersAPI } from './Axios';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Input, Label, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import AuthorSecurity from './AuthorSecurity';
import { dateFormat, downloadFile } from '../General/GeneralFunction';
import { NoDataToDisplay } from '../General/GeneralDisplay';
import { fullNameDetails } from '../General/GeneralFunction';
import { CircularProgress } from "@material-ui/core";

function PaperPublishList() {

    const [myPapers, setPapers] = React.useState([])
    const [status, setStatus] = React.useState("All");
    const [dateLimit, setDateLimit] = React.useState(0);
    const [loading, setLoading] = React.useState(true);



    const changeDateLimit = (num) => {
        setDateLimit(parseInt(num))
    }

    React.useEffect(() => {
        const fetchData = async () => {
            let response = await getMyPublishPapersAPI()
            setPapers(response)
            setLoading(false)
        }

        setLoading(true)
        fetchData();

        // alert(JSON.stringify(myPapers))

    }, [])

    const changeList = ((stat) => {
        setStatus(stat)
    })

    const getDayDifferent = (paper) => {
        const currentDate = new Date();

        const diffTime = Math.abs(currentDate - new Date(paper.paperInfo.upload).getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return (diffDays)
    }



    const myPapersData = myPapers.map(paper => {
        return (
            <tr key={paper.paperID}>
                {(getDayDifferent(paper) <= dateLimit || dateLimit === 0) && (paper.status === status || status === "All") && (
                    <>
                        <td style={{ whiteSpace: "nowrap" }}> {paper.paperInfo.title} </td>
                        <td style={{ whiteSpace: "nowrap" }}> {fullNameDetails(paper.paperInfo.authorID)} </td>
                        <td style={{ whiteSpace: "nowrap" }}> {dateFormat(paper.paperInfo.upload)} </td>
                        <td style={{ whiteSpace: "nowrap", color: paper.status === "Accept" ? "green" : "red" }}>
                            {paper.status}
                        </td>
                        <td>
                            <ButtonGroup style={{ gap: "10px" }}>
                                <Button color='warning' tag={Link} to={`/author/papers/${paper.paperID}/review`} > Check Review </Button>
                                <Button color='primary' onClick={async () => downloadFile(paper.paperID)} > Download Papers </Button>
                                {/* <Button size="sm" color="primary" onClick={async () => downloadFile(paper.paperID)} >Download</Button> */}

                            </ButtonGroup>
                        </td>
                    </>
                )}
            </tr>
        )
    })

    return (
        <div>
            <AppNavbar />
            <AuthorSecurity />

            <Container fluid>

                <h3 style={{ marginBottom: "20px", marginTop: "20px" }}> Publish Papers</h3>

                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        <ButtonGroup style={{ gap: "10px", marginBottom: "10px" }}>
                            <Button color='primary' onClick={() => changeList("All")}    > Show All</Button>
                            <Button color='success' onClick={() => changeList("Accept")} > Show Accept</Button>
                            <Button color='danger' onClick={() => changeList("Reject")} > Show Reject</Button>
                        </ButtonGroup>

                        {myPapers.length === 0 ? (<NoDataToDisplay />) : (
                            <div>


                                <br />
                                <Label style={{ marginBottom: "10px" }} >  <h6> Filter </h6>  </Label>
                                <Input type='select' value={dateLimit} onChange={(e) => changeDateLimit(e.target.value)}>
                                    <option value={0}>Show All</option>
                                    <option value={30}>Last Month</option>
                                    <option value={90}>Last 3 Months</option>
                                    <option value={365}>Last Year</option>
                                </Input>

                                <Table striped bordered hover className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>Paper Title </th>
                                            <th>Author Name </th>
                                            <th>Upload At </th>
                                            <th>Status</th>
                                            <th colSpan={4}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myPapersData}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </div>
                )}



            </Container>
        </div>
    );
};

export default PaperPublishList;