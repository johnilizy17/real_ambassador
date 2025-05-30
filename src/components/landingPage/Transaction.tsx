import { cashFormat } from "@/utils/cashformat";
import React from "react";

export default function Transaction() {

    return (
        <div className="transaction_wrapper float_left">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">

                        <div
                            className="sv_heading_wraper heading_wrapper_dark dark_heading index2_heading index2_heading_center index3_heading ">
                            <h4>who we are</h4>
                            <h3>Our Latest Transaction</h3>
                            <div className="line_shape line_shape2"></div>

                        </div>
                        <div className="x_offer_tabs_wrapper index3_offer_tabs">
                            <ul className="nav nav-tabs">
                                <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#home">
                                    Last Month</a>
                                </li>
                                <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#menu2">This Month</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="tab-content">
                            <div id="home" className="tab-pane active">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="table_next_race index3_table_race league_table overflow-scroll">
                                            <table>
                                                <tr>
                                                    <th className="form_table_resp">name</th>
                                                    <th>date</th>
                                                    <th>amount</th>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem1.png" alt="img" /> <span>Olympia Ripple</span>
                                                    </td>

                                                    <td>April 24,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem4.png" alt="img" /> <span>Nancee Broom</span></td>

                                                    <td>April 04,2025</td>

                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem1.png" alt="img" /> <span>Broom Nancee</span></td>

                                                    <td>April 24,2025</td>

                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem2.png" alt="img" /> <span>Ripple Alison</span>
                                                    </td>

                                                    <td>April 24,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem3.png" alt="img" /> <span>Olympia Ripple</span>
                                                    </td>

                                                    <td>April 05,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem4.png" alt="img" /> <span>Alison Rittichier</span>
                                                    </td>

                                                    <td>April 28,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem5.png" alt="img" /> <span>Olympia Ripple</span>
                                                    </td>

                                                    <td>April 24,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem6.png" alt="img" /> <span>Emmett Stein </span>
                                                    </td>

                                                    <td>April 21,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>

                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="menu2" className="tab-pane fade">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="table_next_race index3_table_race league_table overflow-scroll">
                                            <table>
                                                <tr>
                                                    <th className="form_table_resp">name</th>
                                                    <th>date</th>
                                                    <th>amount</th>
                                                </tr>

                                                <tr>

                                                    <td><img src="images/mem4.png" alt="img" /> <span>Nancee Broom</span></td>

                                                    <td>May 04,2025</td>

                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem1.png" alt="img" /> <span>Olympia Ripple</span>
                                                    </td>

                                                    <td>May 24,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem2.png" alt="img" /> <span>Ripple Alison</span>
                                                    </td>

                                                    <td>May 24,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem6.png" alt="img" /> <span>Emmett Stein
                                                    </span></td>
                                                    <td>May 21,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem1.png" alt="img" /> <span>Broom Nancee</span></td>

                                                    <td>May 24,2025</td>

                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem4.png" alt="img" /> <span>Alison Rittichier</span>
                                                    </td>

                                                    <td>May 28,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem3.png" alt="img" /> <span>Olympia Ripple</span>
                                                    </td>

                                                    <td>May 05,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/mem5.png" alt="img" /> <span>Olympia Ripple</span>
                                                    </td>

                                                    <td>May 24,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>

                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}