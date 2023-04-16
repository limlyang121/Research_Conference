import React, { useState } from "react";
import { format } from "date-fns"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';


export default function PaperData({ paperList, closeBidding }) {
    const fullName = (paper) => {
        return paper.paperInfo.authorID.firstName + " " + paper.paperInfo.authorID.lastName
    }

    const dateFormat = (date) => {
        const dateType = new Date(date)

        return (format(dateType, "dd/MM/yyyy"))
    }


    return (
        <>
            {Array.isArray(paperList)  && paperList.length > 0  && paperList.map((paper) => {
                return (
                    <tr key={paper.paperID}>
                        <td style={{ whiteSpace: "nowrap" }} > {paper.paperInfo.title}  </td>
                        <td style={{ whiteSpace: "nowrap" }} > {dateFormat(paper.paperInfo.upload)}  </td>
                        <td style={{ whiteSpace: "nowrap" }} > {fullName(paper)}  </td>
                        <td style={{ whiteSpace: "nowrap", textAlign: "center" }} > {paper.reviewedTimes}  </td>
                        <td>
                            <Button color='primary' onClick={async () => closeBidding(paper.paperID)}  > Close Bidding</Button>
                            {/* <Button color='primary' tag={Link} to={"/conference/papers/" + paper.paperID+ "/reviews"} > Check Reviewer review</Button> */}
                        </td>
                    </tr>
                )
            })}
        </>
    )

}