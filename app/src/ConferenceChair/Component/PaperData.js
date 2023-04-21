import React from "react";
import { Button } from 'reactstrap';
import { dateFormat, fullName } from "../../General/GeneralFunction";


export default function PaperData({ paperList, closeBidding }) {
    return (
        <>
            {Array.isArray(paperList)  && paperList.length > 0 ? (
                paperList.map((paper) => {
                    return (
                        <tr key={paper.paperID}>
                            <td style={{ whiteSpace: "nowrap" }} > {paper.paperInfo.title}  </td>
                            <td style={{ whiteSpace: "nowrap" }} > {dateFormat(paper.paperInfo.upload)}  </td>
                            <td style={{ whiteSpace: "nowrap" }} > {fullName(paper)}  </td>
                            <td style={{ whiteSpace: "nowrap", textAlign: "center" }} > {paper.reviewedTimes}  </td>
                            <td>
                                <Button color='primary' onClick={async () => closeBidding(paper.paperID)}  > Close Bidding</Button>
                            </td>
                        </tr>
                    )
                })
            ) : (
                <tr>
                    <td colSpan="5" style={{textAlign: "center"}}> <h4> No Paper </h4>  </td>
                </tr>
            )}
        </>
    )

}