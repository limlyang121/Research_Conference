// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { getMyPapers, deletePapers } from './Axios';
import AuthorSecurity from './AuthorSecurity';
import { dateFormat, downloadFile } from '../General/GeneralFunction';
import { NoDataToDisplay } from '../General/GeneralDisplay';
import { CircularProgress } from '@material-ui/core';


function PaperList() {
    const [myPapers, setPapers] = React.useState([])
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        <AuthorSecurity />

        const fetchData = async () => {
            let response = await getMyPapers()
            setPapers(response)
            setLoading(false)
        }
        fetchData();

    }, [])


    const remove = async (id) => {
        if (window.confirm("Delete? ")) {
            await deletePapers(parseInt(id))
                .then(() => {
                    let updatedGroups = [...myPapers].filter(i => i.paperID !== id);
                    setPapers(updatedGroups);
                });
        }
    }

    const myPapersData = myPapers.map(paper => {
        return (
            <tr key={paper.paperID}>
                <td style={{ whiteSpace: "nowrap" }}
                > {paper.paperInfo.title}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {paper.paperInfo.filename}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {dateFormat(paper.paperInfo.upload)}  </td>
                <td>
                    <ButtonGroup style={{ gap: "10px" }}>
                        <Button size="sm" color="info" tag={Link} to={"/author/papers/read/" + paper.paperID}>Read</Button>
                        <Button size="sm" color="primary" tag={Link} to={"/author/papers/form/" + paper.paperID}>Edit</Button>
                        {paper.status === "Pending" ? (
                            <Button size="sm" color="danger" onClick={() => remove(paper.paperID)}>Delete</Button>
                        ) : (
                            <Button size="sm" color="secondary" onClick={() => alert("Can't delete paper because Bidding is close")}>Delete</Button>
                        )}
                        <Button size="sm" color="primary" onClick={async () => downloadFile(paper.paperID)} >Download</Button>

                    </ButtonGroup>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <AppNavbar />
            <AuthorSecurity />

            <Container fluid>
                <div className='float-end'>
                    <Button color='success' tag={Link} to={"/author/papers/form/new"}>Add Paper</Button>
                </div>

                <h3>My Papers</h3>

                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        {myPapers.length === 0 ? (<NoDataToDisplay />) : (
                            <Table striped bordered hover className="mt-4">
                                <thead>
                                    <tr>
                                        <th width="20%" >Paper Title </th>
                                        <th width="20%"> Paper filename </th>
                                        <th width="20%">Upload At </th>
                                        <th width="40%" colSpan={4}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myPapersData}
                                </tbody>
                            </Table>
                        )}
                    </div>

                )}

            </Container>
        </div>
    );
};

export default PaperList;