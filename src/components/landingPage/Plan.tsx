import { cashFormat } from "@/utils/cashformat";
import { Box } from "@chakra-ui/react";
import React from "react";

export default function Plan() {

    return (
        <div id="plans" className="investment_plans index2_investment_plans index3_investment_plans float_left">

            <div className="container">
                <div className="row" style={{ justifyContent: "center" }}>

                    <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                        <div
                            className="sv_heading_wraper heading_wrapper_dark dark_heading index2_heading index2_heading_center index3_heading ">
                            <h4> our plans </h4>
                            <h3>our Package plans </h3>
                            <div className="line_shape line_shape2"></div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6 col-lg-6 col-sm-6 col-12">
                        <div
                            className="investment_box_wrapper index2_investment_box_Wraper index3_investment_box_Wraper float_left">
                            <img src="images/in1.png" alt="img" />
                            <div className="investment_icon_circle">
                                <i className="flaticon-bar-chart"></i>
                            </div>
                            <div className="investment_border_wrapper"></div>
                            <div className="investment_content_wrapper">
                                <h1><a href="/auth/login">Tier 1</a></h1>
                                <div className="line_shape line_shape2"></div>
                                <p>Up to 5% interest on any transaction the user makes
                                </p>
                                <Box w="full" textAlign={"start"}>
                                    <li>Price:{cashFormat(5000)}</li>
                                    <li>Refferal Earning: 15%</li>
                                    <li>Sub Earning: 15%</li>
                                    <li>Product Earning: 2.5%</li>
                                    <li>Refferal stages: 1</li>
                                </Box>
                            </div>
                            <div className="about_btn plans_btn index2_investment_btn">
                                <ul>
                                    <li>
                                        <a href="/auth/signup">Get Started</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6 col-lg-6 col-sm-6 col-12">
                        <div
                            className="investment_box_wrapper index2_investment_box_Wraper index3_investment_box_Wraper float_left">
                            <img src="images/in2.png" alt="img" />
                            <div className="investment_icon_circle red_info_circle">
                                <i className="flaticon-money"></i>
                            </div>
                            <div className="investment_border_wrapper red_border_wrapper"></div>
                            <div className="investment_content_wrapper red_content_wrapper">
                                <h1><a href="/auth/login">Tier 2</a></h1>
                                <div className="line_shape line_shape2"></div>
                                <p>Up to 10% interest on any transaction the user makes
                                </p>
                                <Box w="full" textAlign={"start"}>
                                    <li>Price:{cashFormat(15000)}</li>
                                    <li>Refferal Earning: 25%</li>
                                    <li>Sub Earning: 25%</li>
                                    <li>Product Earning: 5%</li>
                                    <li>Refferal stages: 2{"(30%, 15%)"}</li>
                                </Box>
                            </div>
                            <div className="about_btn plans_btn red_btn_plans index2_investment_btn">
                                <ul>
                                    <li>
                                        <a href="/auth/signup">Get Started</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6 col-lg-6 col-sm-6 col-12">
                        <div
                            className="investment_box_wrapper index2_investment_box_Wraper index3_investment_box_Wraper float_left height_box">
                            <img src="images/in3.png" alt="img" />
                            <div className="investment_icon_circle green_info_circle">
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                            <div className="investment_border_wrapper green_border_wrapper"></div>
                            <div className="investment_content_wrapper green_content_wrapper">
                                <h1><a href="/auth/login">Tier 3</a></h1>
                                <div className="line_shape line_shape2"></div>
                                <p>Up to 15% interest on any transaction the user makes
                                </p>
                                <Box w="full" textAlign={"start"}>
                                    <li>Price:{cashFormat(25000)}</li>
                                    <li>Refferal Earning: 40%</li>
                                    <li>Sub Earning: 40%</li>
                                    <li>Product Earning: 10%</li>
                                    <li>Refferal stages: 4{"(40%, 20%, 10%, 5%)"}</li>
                                </Box>
                            </div>
                            <div className="about_btn plans_btn green_plan_btn index2_investment_btn">
                                <ul>
                                    <li>
                                        <a href="/auth/signup">Get Started</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}