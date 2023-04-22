import React from "react";
import { format } from "date-fns"
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from "react-router-dom";


export default function BidData({ paperList }) {
    const fullName = (paper) => {
        return paper.paperInfo.authorID.firstName + " " + paper.paperInfo.authorID.lastName
    }

    const dateFormat = (date) => {
        const dateType = new Date(date)

        return (format(dateType, "dd/MM/yyyy"))
    }


    return (
        <>
            {Array.isArray(paperList) && paperList.length > 0 && (
                paperList.map((paper) => {
                    return (
                        <tr key={paper.paper.paperID}>
                            <td style={{ whiteSpace: "nowrap" }} > {paper.paper.paperInfo.title}  </td>
                            <td style={{ whiteSpace: "nowrap" }} > {dateFormat(paper.paper.paperInfo.upload)}  </td>
                            <td style={{ whiteSpace: "nowrap" }} > {fullName(paper.paper)}  </td>
                            <td>
                                <ButtonGroup style={{ gap: "10px" }}>
                                    <Button color='warning' tag={Link} to={`/conference/papers/` + paper.paper.paperID + `/bids`} > Bid Status</Button>
                                    {paper.allReviewed &&
                                        <Button color='primary' tag={Link} to={`/conference/papers/` + paper.paper.paperID + `/reviews`} > Accept/Reject</Button>
                                    }
                                    {!paper.allReviewed &&
                                        <Button color='secondary' disabled > Accept/Reject</Button>
                                    }
                                </ButtonGroup>
                            </td>
                        </tr>
                    )
                })
            )}
            {paperList.length === 0 && (
                <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}> <h4> No Paper </h4>  </td>
                </tr>
            )}
        </>
    );

}

