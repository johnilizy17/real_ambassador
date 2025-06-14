import { Box } from "@chakra-ui/react";
import React from "react";

export default function Footer() {

    return (
        <Box className="footer_main_wrapper index2_footer_wrapper float_left">

            <Box className="container">

                <Box justifyContent={"space-between"} className="row">

                    <Box className="col-lg-4 col-md-6 col-12 col-sm-12">
                        <Box className="wrapper_second_about">
                            <Box className="wrapper_first_image">
                                <a style={{color:"#fff"}} href="index.html"><img src="/logo/logo_white.png" className="img-responsive" alt="logo" /></a>
                            </Box>
                            <p>Gateway to better life and with future sustainance.</p>
                        </Box>
                    </Box>

                    <Box className="col-lg-4 col-md-6 col-12 col-sm-12">
                        <Box className="wrapper_second_useful wrapper_second_useful_2">
                            <h4>contact us</h4>

                            <ul>
                                <li>
                                    <h1>08034477786</h1>
                                </li>
                                <li><a style={{color:"#fff"}} href="mailto:info@narinohs.com"><i className="flaticon-mail"></i>info@narinohs.com</a>
                                </li>
                                <li><a style={{color:"#fff"}} href="www.abn.com.ng"><i className="flaticon-language"></i>www.abn.com.ng</a>
                                </li>

                                <li><a style={{color:"#fff"}} href="#"><i className="flaticon-placeholder"></i>Ashley place mall Orchid roadm Lekki peninsula 2 Lagos State</a>
                                </li>
                            </ul>
                        </Box>
                    </Box>

                    <Box className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <Box className="copyright_wrapper float_left">
                            <Box className="copyright">
                                <p>Copyright <i className="far fa-copyright"></i> 2025 <a style={{color:"#fff"}} href="index.html"> AB Narinohs</a>
                                </p>
                            </Box>
                            <Box className="social_link_foter">

                                <ul>
                                    <li><a style={{color:"#fff"}} href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a style={{color:"#fff"}} href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a style={{color:"#fff"}} href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                    <li><a style={{color:"#fff"}} href="#"><i className="fab fa-google-plus-g"></i></a></li>

                                </ul>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}