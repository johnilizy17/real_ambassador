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

                                                    <td><img src="images/meme1.jpg" className="circle-image" alt="img" /> <span>Jones Shola</span>
                                                    </td>

                                                    <td>April 24,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/meme4.jpg" className="circle-image" alt="img" /> <span>Akinola Danial</span></td>

                                                    <td>April 04,2025</td>

                                                    <td>{cashFormat(44000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/meme2.jpg" className="circle-image" alt="img" /> <span>Ripple David</span>
                                                    </td>

                                                    <td>April 24,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/meme3.jpg" className="circle-image" alt="img" /> <span>Oluseyin Akin</span>
                                                    </td>

                                                    <td>April 05,2025</td>
                                                    <td>{cashFormat(35600)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/meme5.jpg" className="circle-image" alt="img" /> <span> Ola Precious</span>
                                                    </td>

                                                    <td>April 24,2025</td>
                                                    <td>{cashFormat(15500)}</td>
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

                                                    <td><img src="images/meme7.jpg" className="circle-image" alt="img" /> <span>Nancee Broom</span></td>

                                                    <td>May 04,2025</td>

                                                    <td>{cashFormat(27700)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/meme8.jpg" className="circle-image" alt="img" /> <span>Olympia Ripple</span>
                                                    </td>

                                                    <td>May 24,2025</td>
                                                    <td>{cashFormat(20000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/meme9.jpg" className="circle-image" alt="img" /> <span>Ripple Alison</span>
                                                    </td>

                                                    <td>May 24,2025</td>
                                                    <td>{cashFormat(17000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/meme10.jpg" className="circle-image" alt="img" /> <span>Emmett Stein
                                                    </span></td>
                                                    <td>May 21,2025</td>
                                                    <td>{cashFormat(67000)}</td>
                                                </tr>
                                                <tr>

                                                    <td><img src="images/meme11.jpg" className="circle-image" alt="img" /> <span>Broom Nancee</span></td>

                                                    <td>May 24,2025</td>

                                                    <td>{cashFormat(25000)}</td>
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