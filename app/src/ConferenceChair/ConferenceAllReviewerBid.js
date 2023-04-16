// @flow strict

import * as React from 'react';
import { fetchAllBidsByPaperIDAPI } from './Axios';
import { id } from 'date-fns/locale';
import { useParams } from 'react-router-dom';

function ConferenceAllReviewerBid() {
    const [bidList, setBidList] = React.useState([]);
    const {id} = useParams();


    React.useEffect(() => {
        const fetchAllBidsByPaperID = async(id) => {
            let response = await fetchAllBidsByPaperIDAPI(parseInt (id));
            setBidList(response);
        }

        fetchAllBidsByPaperID(id);

        alert(JSON.stringify(bidList))
        alert(bidList.length)

    }, [])

    return (
        <div>
            Some reviewer bid and something
        </div>
    );
};

export default ConferenceAllReviewerBid;