import { Img } from "@chakra-ui/react";
import React from "react";

export default function NavContent() {

    return (
        <div className="cp_navi_main_wrapper index2_header_wrapper float_left">
            <div className="container-fluid">
                <div className="cp_logo_wrapper">
                    <Img display={["none", "none", "none", "flex"]} src="images/logo2.png" alt="logo" />
                    <Img display={["flex", "flex", "flex", "none"]} h="50px" src="images/logo4.png" alt="logo" />
                </div>
                <div className="top_header_right_wrapper top_phonecalls">
                    <div className="header_btn">
                        <ul>
                            <li>
                                <a href="register.html"> register </a>
                            </li>
                            <li>
                                <a href="login.html"> login </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>

    )
}