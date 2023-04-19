// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { getMyPapers, deletePapers} from './Axios';
import { saveAs } from "file-saver"
import { downloadPapersAPI } from '../General/DownloadAxios';
import { format } from "date-fns"
import AuthorSecurity from './AuthorSecurity';




function PaperList() {

    const [myPapers, setPapers] = React.useState([])

    const myID = sessionStorage.getItem("id")

    React.useEffect(() => {
        <AuthorSecurity/>

        const fetchData = async (myID) => {
            let response = await getMyPapers(myID)
            setPapers(response)
        }

        fetchData(myID);

    }, [])

    const dateFormat = (date) => {
        const dateType = new Date(date)

        return (format(dateType, "dd/MM/yyyy"))
    }

    const downloadFile = async (id) => {
        try{
            
            let response = await downloadPapersAPI(parseInt(id))
            const contentDispositionHeader = response.headers['content-disposition'];
            // const filename = contentDispositionHeader.split(';')[1].trim().split('=')[1];

            const blob = new Blob([response.data], { type: "application/pdf" })
            saveAs(blob)
            
        }catch(error){
            alert("Unknown Error")
        }
    }

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
                <td style={{ whiteSpace: "nowrap" }} > {dateFormat (paper.paperInfo.upload)}  </td>
                <td>
                    <ButtonGroup style={{ gap: "10px" }}>
                        <Button size="sm" color="info" tag={Link} to={"/author/papers/read/"+paper.paperID}>Read</Button>
                        <Button size="sm" color="primary" tag={Link} to={"/author/papers/form/"+paper.paperID}>Edit</Button>
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
                <Table className="mt-4">
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
            </Container>
        </div>
    );
};

export default PaperList;