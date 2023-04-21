// @flow strict

import * as React from 'react';
import { acceptPaperToPublishAPI, fetchAllReviewsByPaperIDAPI, rejectPaperToPublishAPI } from './Axios';
import { useNavigate, useParams } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';
import ConferenceSecurity from './ConferenceSecurity';
import AllReviewsForSpecifiedPaper from './Component/AllReviewsForSpecifiedPaper';
import { Container } from 'reactstrap';

function ConferenceAllReviewerBid() {
    const [paperList, SetPapersList] = React.useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchAllReviewsByPaperID = async (id) => {
            let response = await fetchAllReviewsByPaperIDAPI(parseInt(id));
            SetPapersList(response);
        }

        fetchAllReviewsByPaperID(id);

    }, [])

    const AcceptRejectPaper = async (action) => {
        if (window.confirm("Are you sure ? ")) {

            let response;
            if (action === "Accept") {
                response = await acceptPaperToPublishAPI(id);
            } else if (action === "Reject") {
                response = await rejectPaperToPublishAPI(id);
            }

            alert(response)
            navigate("/home")
        }

    }

    return (
        <div>
            <AppNavbar />
            <ConferenceSecurity />

            <Container fluid>

                <br />
                <AllReviewsForSpecifiedPaper reviewList={paperList} Action={AcceptRejectPaper} />

            </Container>

        </div>
    );
};

export default ConferenceAllReviewerBid;