import React, { useState } from "react";
import { format } from "date-fns"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';


export default function AllReviewerBidStatus({ bidList }) {

    const fullName = (paper) => {
        return paper.paperInfo.authorID.firstName + " " + paper.paperInfo.authorID.lastName
    }

    const dateFormat = (date) => {
        const dateType = new Date(date)

        return (format(dateType, "dd/MM/yyyy"))
    }


    return (
        <>
            {bidList.map((bid) => {
                return (
                    
                    <tr key={paper.paper.paperID}>
                        <td style={{ whiteSpace: "nowrap" }} > {paper.paper.paperInfo.title}  </td>
                        <td style={{ whiteSpace: "nowrap" }} > {dateFormat(paper.paper.paperInfo.upload)}  </td>
                        <td style={{ whiteSpace: "nowrap" }} > {fullName(paper.paper)}  </td>
                        <td>
                            <ButtonGroup style={{ gap: "10px" }}>
                                <Button color='warning'  > See all Reviewer Process</Button>
                                {paper.allReviewed &&
                                    <Button color='primary'  > Accept/Reject</Button>
                                }
                                {!paper.allReviewed &&
                                    <Button color='secondary' disabled > Accept/Reject</Button>
                                }
                            </ButtonGroup>
                        </td>
                    </tr>
                )
            }
            )}
        </>
    )

}

