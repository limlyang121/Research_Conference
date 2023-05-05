// @flow strict

import * as React from 'react';
import { fetchAllReviewsByPaperIDAPI } from './Axios';
import { useNavigate, useParams } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';
import ConferenceSecurity from './ConferenceSecurity';
import AllReviewsForSpecifiedPaper from './Component/AllReviewsForSpecifiedPaper';
import { Container } from 'reactstrap';
import { CircularProgress } from "@material-ui/core";

function ConferenceAllReviewerReviews() {
    const navigate = useNavigate();
    const [paperList, SetPapersList] = React.useState([]);
    const [paperStatus, SetPaperStatus] = React.useState("");
    const { status } = useParams();
    const { id } = useParams();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchAllReviewsByPaperID = async (id) => {
            let response = await fetchAllReviewsByPaperIDAPI(parseInt(id));
            SetPapersList(response);
            setLoading(false)
        }

        //The Set Paper status is to prevent Eve to get any data from modify Parameter
        if (status === "Ready") {
            SetPaperStatus("Ready");
        } else if (status === "Complete") {
            SetPaperStatus("Complete")
        }
        else {
            alert("illegal Modify of parameters")
            navigate(-1);
            return null;
        }

        setLoading(true)

        fetchAllReviewsByPaperID(id);

    }, [id, status])

    return (
        <div>
            <AppNavbar />
            <ConferenceSecurity />

            <Container fluid>

                <br />

                {loading ? (
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <div>
                        <AllReviewsForSpecifiedPaper reviewList={paperList} paperID={id} status={paperStatus} />

                    </div>

                )}

            </Container>

        </div>
    );
};

export default ConferenceAllReviewerReviews;