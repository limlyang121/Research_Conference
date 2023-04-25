// @flow strict

import * as React from 'react';
import { fetchAllReviewsByPaperIDAPI } from './Axios';
import { useParams } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';
import ConferenceSecurity from './ConferenceSecurity';
import AllReviewsForSpecifiedPaper from './Component/AllReviewsForSpecifiedPaper';
import { Container } from 'reactstrap';

function ConferenceAllReviewerReviews() {
    const [paperList, SetPapersList] = React.useState([]);
    const [paperStatus, SetPaperStatus] = React.useState("");
    const { status } = useParams();
    const { id } = useParams();


    React.useEffect(() => {
        const fetchAllReviewsByPaperID = async (id) => {
            let response = await fetchAllReviewsByPaperIDAPI(parseInt(id));
            SetPapersList(response);
        }

        if (status === "Ready"){
            SetPaperStatus("Ready");
        }else if (status === "Complete"){
            SetPaperStatus("Complete")
        }
        else {
            SetPaperStatus("Unknown")
        }

        fetchAllReviewsByPaperID(id);

    }, [id, status])



    return (
        <div>
            <AppNavbar />
            <ConferenceSecurity />

            <Container fluid>

                <br />
                <AllReviewsForSpecifiedPaper reviewList={paperList} paperID={id} status={paperStatus} />

            </Container>

        </div>
    );
};

export default ConferenceAllReviewerReviews;