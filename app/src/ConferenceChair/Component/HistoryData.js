// @flow strict

import * as React from 'react';
import { dateFormat, fullName } from '../../General/GeneralFunction';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function HistoryData({ paperList }) {
    return (
        <>
            {Array.isArray(paperList) && paperList.length > 0 ? (
                paperList.map((paper) => {
                    return (
                        <tr key={paper.paperID}>
                            <td style={{ whiteSpace: "nowrap" }} > {paper.paperInfo.title}  </td>
                            <td style={{ whiteSpace: "nowrap" }} > {dateFormat(paper.paperInfo.upload)}  </td>
                            <td style={{ whiteSpace: "nowrap" }} > {fullName(paper)}  </td>

                            <td style={{ whiteSpace: "nowrap"}}>
                                <span className={paper.status === "Accept" ? "text-success" : "text-danger"}>
                                    {paper.status}
                                </span>
                            </td>
                            <td>
                                <Button color='primary' tag={Link} to={`/conference/papers/${paper.paperID}/reviews/Complete`} > See Reviewed</Button>
                            </td>
                        </tr>
                    )
                })
            ) : (
                <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}> <h4> No Paper </h4>  </td>
                </tr>
            )}
        </>
    );
};
