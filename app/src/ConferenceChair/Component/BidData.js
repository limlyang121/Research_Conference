import React, { useState } from "react";
import { format } from "date-fns"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';


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
            {Array.isArray(paperList) && paperList.map((paper) => {
                return (
                    <tr key={paper.paper.paperID}>
                        <td style={{ whiteSpace: "nowrap" }} > {paper.paper.paperInfo.title}  </td>
                        <td style={{ whiteSpace: "nowrap" }} > {dateFormat(paper.paper.paperInfo.upload)}  </td>
                        <td style={{ whiteSpace: "nowrap" }} > {fullName(paper.paper)}  </td>
                        <td style={{ whiteSpace: "nowrap", textAlign: "center" }} > {paper.paper.reviewedTimes}  </td>
                        <td>
                            {paper.allReviewed &&
                                <Button color='primary'  > Yes</Button>}
                            {!paper.allReviewed &&
                                <Button color='primary'  > No</Button>}
                        </td>
                    </tr>
                )
            })}
        </>
    )

}

