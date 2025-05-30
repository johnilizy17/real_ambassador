import { Img } from "@chakra-ui/react";
import React from "react";
import { COLORS } from "../utils/theme";

export default function About() {

    return (
        <div className="about_us_wrapper index2_about_us_wrapper index3_about_us float_left">
            <div className="container">
                <div className="row">

                    <div className="col-xl-6 col-md-12 col-lg-12 col-sm-12 col-12">
                        <div className="about_content_wrapper">
                            <div className="sv_heading_wraper index2_heading index3_heading index3_headung2">
                                <h4>who we are</h4>
                                <h3>Welcome to AB NARIONHS</h3>
                                <div className="line_shape line_shape2"></div>
                            </div>
                            <div style={{ color: COLORS.light_gray }} className="welcone_savehiyp float_left">
                                <p>Put your investing ideas into action with full range of investments. Duis auteir ure
                                    dolor in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Enjoy real
                                    benefits and rewards on your accrue investing. </p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Ut enim ad an minim
                                    veniam Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis auteirure dolor in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur.</p>
                                <div className="welcome_save_inpvate_wrapper index3_welcome_checkbox">
                                    <ul>
                                        <li className="purple_inovate"><a href="#"><i className="flaticon-check-box"></i> We
                                            Innovate </a></li>
                                        <li className="blue_inovate"><a href="#"><i className="flaticon-check-box"></i> Licenced &
                                            Certified </a></li>
                                        <li className="green_inovate"><a href="#"><i className="flaticon-check-box"></i>We build </a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-md-12 col-lg-12 col-sm-12 col-12">
                        <div className="index3_about_img_wrapper">

                            <Img src="images/shape2.png" alt="About" className="img-responsive" />

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}