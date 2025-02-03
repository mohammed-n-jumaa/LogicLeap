import React from 'react';

const SubscriptionTable = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Latest subscriptions</h5>
                <div className="table-responsive">
                    <table className="table text-nowrap align-middle mb-0">
                        <thead>
                            <tr className="border-2 border-bottom border-primary border-0">
                                <th scope="col" className="ps-0">Name</th>
                                <th scope="col">Program</th>
                                <th scope="col" className="text-center">Phone number</th>
                                <th scope="col" className="text-center">Contacted</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            <tr>
                                <th scope="row" className="ps-0 fw-medium">
                                    <span className="table-link1 text-truncate d-block">Ahmad</span>
                                </th>
                                <td>
                                    <a href="javascript:void(0)" className="link-primary text-dark fw-medium d-block">HTML</a>
                                </td>
                                <td className="text-center fw-medium">0781617814</td>
                                <td className="text-center">
                                    <input type="checkbox" id="contactedAhmad" name="contactedAhmad" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="ps-0 fw-medium">
                                    <span className="table-link1 text-truncate d-block">Mohammad</span>
                                </th>
                                <td>
                                    <a href="javascript:void(0)" className="link-primary text-dark fw-medium d-block">CSS</a>
                                </td>
                                <td className="text-center fw-medium">0772827918</td>
                                <td className="text-center">
                                    <input type="checkbox" id="contactedMohammad" name="contactedMohammad" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="ps-0 fw-medium">
                                    <span className="table-link1 text-truncate d-block">Mohammad</span>
                                </th>
                                <td>
                                    <a href="javascript:void(0)" className="link-primary text-dark fw-medium d-block">CSS</a>
                                </td>
                                <td className="text-center fw-medium">0772827918</td>
                                <td className="text-center">
                                    <input type="checkbox" id="contactedMohammad" name="contactedMohammad" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="ps-0 fw-medium">
                                    <span className="table-link1 text-truncate d-block">Mohammad</span>
                                </th>
                                <td>
                                    <a href="javascript:void(0)" className="link-primary text-dark fw-medium d-block">CSS</a>
                                </td>
                                <td className="text-center fw-medium">0772827918</td>
                                <td className="text-center">
                                    <input type="checkbox" id="contactedMohammad" name="contactedMohammad" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="ps-0 fw-medium">
                                    <span className="table-link1 text-truncate d-block">Mohammad</span>
                                </th>
                                <td>
                                    <a href="javascript:void(0)" className="link-primary text-dark fw-medium d-block">CSS</a>
                                </td>
                                <td className="text-center fw-medium">0772827918</td>
                                <td className="text-center">
                                    <input type="checkbox" id="contactedMohammad" name="contactedMohammad" />
                                </td>
                            </tr>
                                                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionTable;