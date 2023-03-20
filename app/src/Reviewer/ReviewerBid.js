// @flow strict

import * as React from 'react';
import { getPendingPapers, addToBlackListAPI, getBanPapers, DeleteFromBlackListAPI, addToBidAPI } from './Axios';
import { format } from "date-fns"
import { Button, ButtonGroup, Container, Table, Label, FormGroup, Form, Input } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';

function ReviewerBid() {

    const [displayPapers, setDisplayPaper] = React.useState([])
    const { id } = useParams();
    const [status, setStatus] = React.useState();


    React.useEffect(() => {
        const fetchData = async (id) => {
            let response = await getPendingPapers(id);
            setDisplayPaper(response)
        }

        fetchData(id)
        setStatus("bid")

    }, [setDisplayPaper])

    const addToBlackList = async (event) => {
        if (window.confirm("Hide the paper?")) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const blacklist = {
                reviewer: {
                    reviewerID: formData.get('reviewer.reviewerID')
                },
                paper: {
                    paperID: formData.get('paper.paperID')
                }
            };
            await addToBlackListAPI(blacklist).then(() => {
                let updatedPapers = [...displayPapers].filter(i => parseInt(i.paperID) !== parseInt(blacklist.paper.paperID));
                setDisplayPaper(updatedPapers)
            })
        }
    }

    const DeleteFromBlackList = async (event) => {
        if (window.confirm("Unhide?")) {

            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const blacklist = {
                reviewer: {
                    reviewerID: formData.get('reviewer.reviewerID')
                },
                paper: {
                    paperID: formData.get('paper.paperID')
                }
            };

            await DeleteFromBlackListAPI(blacklist)
                .then(() => {
                    let updatedPapers = [...displayPapers].filter(i => parseInt(i.paperID) !== parseInt(blacklist.paper.paperID));
                    setDisplayPaper(updatedPapers)
                });
        }

    }

    const addToBid = async (event) => {
        if (window.confirm("Hide the paper?")) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const bid = {
                paper: {
                    paperID: formData.get('paper.paperID')
                },
                reviewer: {
                    reviewerID: formData.get('reviewer.reviewerID'),
                },
                status: ""
            }

            await addToBidAPI(bid).then(() => {
                let updatedPapers = [...displayPapers].filter(i => parseInt (i.paperID) !== parseInt (bid.paper.paperID));
                setDisplayPaper(updatedPapers)
            })
        }
    }




    const dateFormat = (date) => {
        const dateType = new Date(date)

        return (format(dateType, "dd/MM/yyyy"))
    }

    const fullName = (paper) => {
        return paper.paperInfo.authorID.firstName + " " + paper.paperInfo.authorID.lastName
    }

    const BidButtonDsiplay = (paper) => {
        return (

            <ButtonGroup style={{ gap: "10px" }}>
                <Button size="sm" color="info" tag={Link} to={"#"}>Download</Button>
                <Form onSubmit={addToBid}>
                    <Input name="reviewer.reviewerID" id="reviewer.reviewerID" value={id} type="hidden" />
                    <Input name="paper.paperID" id="paper.paperID" value={paper.paperID} type="hidden" />
                    <Button size="sm" color="primary" type='submit'>Bid Papers</Button>

                </Form>
                <Form onSubmit={addToBlackList} >
                    <Input name="reviewer.reviewerID" id="reviewer.reviewerID" value={id} type="hidden" />
                    <Input name="paper.paperID" id="paper.paperID" value={paper.paperID} type="hidden" />

                    <Button type='submit' size="sm" color="danger" > Hide</Button>
                </Form>
            </ButtonGroup>

        )
    }

    const BanButtonDsiplay = (paper) => {
        return (
            <ButtonGroup style={{ gap: "10px" }}>
                <Form onSubmit={DeleteFromBlackList} >
                    <Input name="reviewer.reviewerID" id="reviewer.reviewerID" value={id} type="hidden" />
                    <Input name="paper.paperID" id="paper.paperID" value={paper.paperID} type="hidden" />

                    <Button type='submit' size="sm" color="primary" >Show</Button>
                </Form>
            </ButtonGroup>

        )
    }

    const displayBidPapers = displayPapers.map(paper => {
        return (
            <tr key={paper.paperID} >
                <td style={{ whiteSpace: "nowrap" }} > {paper.paperInfo.title}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {dateFormat(paper.paperInfo.upload)}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {fullName(paper)}  </td>
                <td>
                    {status === "bid" && (<>
                        {BidButtonDsiplay(paper)}
                    </>)}

                    {status === "hide" && (<>
                        {BanButtonDsiplay(paper)}
                    </>)}
                </td>
            </tr>
        )
    })

    const BidBanSwitch = async (stat) => {
        if (stat === "bid") {
            let response = await getPendingPapers(id);
            setDisplayPaper(response)
            setStatus("bid")
        } else if (stat === 'ban') {
            let response = await getBanPapers(id)
            setDisplayPaper(response)
            setStatus("hide")

        }
    }


    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <h3>Bid Papers</h3>
                <Button color='primary' onClick={async () => BidBanSwitch("bid")} >Show Bid</Button>
                <Button color='danger' onClick={async () => BidBanSwitch("ban")} >Show Hide</Button>
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
                        {displayBidPapers}

                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default ReviewerBid;