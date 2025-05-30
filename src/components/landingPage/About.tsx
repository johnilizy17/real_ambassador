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
                                <p>Are you passionate about making an impact, connecting with your community, and representing a bold, forward-thinking brand? The ABN Nariohs Ambassador Program is your chance to be part of something bigger — and be rewarded for it. </p>
                                <p>
                                    For every person you refer who signs up or makes a purchase,
                                    <br />
                                    ➡️ You earn 50% of the money from their registration or first transaction.
                                    <br />
                                    There’s no limit to how many people you can refer — the more you share, the more you earn.
                                    <br />
                                    Example:
                                    <br />
                                    If your referral signs up and pays ₦10,000 — you get ₦5,000 straight to your wallet.


                                </p>

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