import * as React from 'react';
import { getPendingPapers, addToBlackListAPI, getBanPapers, DeleteFromBlackListAPI, addToBidAPI } from './Axios';
import { Button, ButtonGroup, Container, Table, Form, Input } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import ReviewerSecurity from './ReviewerSecurity';
import { dateFormat, downloadFile, fullName } from '../General/GeneralFunction';
import { NoDataToDisplay } from '../General/GeneralDisplay';

function ReviewerBid() {

    const [displayPapers, setDisplayPaper] = React.useState([])
    const [status, setStatus] = React.useState("bid");
    const id = sessionStorage.getItem("id")

    const changeStatus = React.useCallback((stat) => {
        setStatus(stat)
    }, [setStatus])


    React.useEffect(() => {
        const fetchBidData = async () => {
            let response = await getPendingPapers();
            setDisplayPaper(response)
        }
        const fetchBanData = async () => {
            let response = await getBanPapers();
            setDisplayPaper(response)
        }

        if (status === "bid") {
            fetchBidData()
        } else {
            fetchBanData()
        }


    }, [status, changeStatus])

    const addToBlackList = async (event) => {
        event.preventDefault();

        if (window.confirm("Hide the paper?")) {
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
        event.preventDefault();

        if (window.confirm("Unhide?")) {

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
        event.preventDefault();

        if (window.confirm("Bid the papers?")) {
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

            await addToBidAPI(bid).then((response) => {
                alert(response)
                let updatedPapers = [...displayPapers].filter(i => parseInt(i.paperID) !== parseInt(bid.paper.paperID));
                setDisplayPaper(updatedPapers)
            })
        }
    }

    const BidButtonDsiplay = (paper) => {
        return (

            <ButtonGroup style={{ gap: "10px" }}>
                <Button size="sm" color="info" onClick={async () => downloadFile(paper.paperID)} >Download</Button>
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

    const displayBidPapers = (displayPapers.map(paper => (
        <tr key={paper.paperID}>
            <td style={{ whiteSpace: "nowrap" }}>{paper.paperInfo.title}</td>
            <td style={{ whiteSpace: "nowrap" }}>{dateFormat(paper.paperInfo.upload)}</td>
            <td style={{ whiteSpace: "nowrap" }}>{fullName(paper)}</td>
            <td>
                {status === "bid" && (
                    <>
                        {BidButtonDsiplay(paper)}
                    </>
                )}

                {status === "hide" && (
                    <>
                        {BanButtonDsiplay(paper)}
                    </>
                )}
            </td>
        </tr>
    ))
    );




    return (
        <div>
            <AppNavbar />
            <ReviewerSecurity />
            <Container fluid>
                <h3>Bid Papers</h3>
                <ButtonGroup style={{ gap: "10px" }}>
                    <Button color='primary' onClick={() => changeStatus("bid")} >Show Bid</Button>
                    <Button color='danger' onClick={() => changeStatus("hide")} >Show Hide</Button>
                </ButtonGroup>

                {displayPapers.length === 0 &&
                    <NoDataToDisplay />
                }

                {displayPapers.length !== 0 && (

                    <Table striped bordered hover className="mt-4">
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
                )}

            </Container>
        </div>
    );
};

export default ReviewerBid;