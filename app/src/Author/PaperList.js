// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { getMyPapers, deletePapers } from './Axios';
import AuthorSecurity from './AuthorSecurity';
import { dateFormat, downloadFile } from '../General/GeneralFunction';
import { NoDataToDisplay } from '../General/GeneralDisplay';


function PaperList() {

    const [myPapers, setPapers] = React.useState([])


    React.useEffect(() => {
        <AuthorSecurity />

        const fetchData = async () => {
            let response = await getMyPapers()
            setPapers(response)
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
                // className={paper.status === "Accept" ? "green" : paper.status === "Reject" ? "red" : ""}
                > {paper.paperInfo.title}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {paper.paperInfo.filename}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {dateFormat(paper.paperInfo.upload)}  </td>
                <td>
                    <ButtonGroup style={{ gap: "10px" }}>
                        <Button size="sm" color="info" tag={Link} to={"/author/papers/read/" + paper.paperID}>Read</Button>
                        <Button size="sm" color="primary" tag={Link} to={"/author/papers/form/" + paper.paperID}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => remove(paper.paperID)}>Delete</Button>
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

                {myPapers.length === 0 ? (<NoDataToDisplay />) : (
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>Paper Title </th>
                                <th>Paper filename </th>
                                <th>Upload At </th>
                                <th colSpan={4}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPapersData}
                        </tbody>
                    </Table>
                )}

            </Container>
        </div>
    );
};

export default PaperList;