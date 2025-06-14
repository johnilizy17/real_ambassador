import { Box, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { COLORS } from "../utils/theme";

export default function Banner() {

    const router = useRouter();

    return (
        <Box bg={COLORS.black} className="slider-area slider_index2_wrapper slider_index3_wrapper  float_left">
            {/* <Box className="bg-animation">
                <Img mt="-50%" className="zoom-fade" src="images/pattern.png" alt="img" h={["130vh", "130vh", "100%"]} />
            </Box> */}
            <Box className="index2_sliderbg index3_sliderbg">
                <img src="images/shape1.png" alt="img" className="img-responsive" />
            </Box>

            <Box id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                <Box className="carousel-inner" role="listbox">
                    <Box className="carousel-item active">
                        <Box className="carousel-captions caption-1">
                            <Box className="container">
                                <Box className="row">
                                    <Box className="col-xl-6 col-lg-10 col-md-12 col-sm-12 col-12">
                                        <Box className="content">

                                            <h2 data-animation="animated bounceInUp">Earn with ease</h2>

                                            <h3 data-animation="animated bounceInUp">Leverage on <br />
                                                your <span>Marketing Skills</span></h3>

                                            <p data-animation="animated bounceInUp">In today’s fast-paced digital world, your marketing skills are more powerful than ever. Whether you're an entrepreneur, freelancer, or career professional, knowing how to promote, position, and persuade can give you a serious competitive edge.</p>

                                            <Box className="slider_btn index2_sliderbtn index3_sliderbtn float_left">
                                                <ul>
                                                    <li data-animation="animated bounceInLeft">
                                                        <Box onClick={() => router.push("/auth/login")}>
                                                            <a>
                                                                start now
                                                            </a>
                                                        </Box>
                                                    </li>
                                                    <li data-animation="animated bounceInLeft">
                                                        <a href="#plans">view plans</a>
                                                    </li>
                                                </ul>
                                            </Box>
                                            <Box data-animation="animated bounceInLeft"
                                                className="social_link_foter slider_btm_icon_links">

                                                <ul>
                                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>

                                                </ul>
                                            </Box>
                                            <Box className="clear"></Box>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="carousel-item">
                        <Box className="carousel-captions caption-2">
                            <Box className="container">
                                <Box className="row">
                                    <Box className="col-xl-6 col-lg-10 col-md-12 col-sm-12 col-12">
                                        <Box className="content">

                                            <h2 data-animation="animated bounceInUp">Often Have Small</h2>

                                            <h3 data-animation="animated bounceInUp"> Build Personal  <br />
                                                Business <span>Brands</span></h3>
                                            <p data-animation="animated bounceInUp">Your ability to tell a story, create content, and engage audiences is the foundation of a strong brand. With effective marketing, you can grow visibility, credibility, and trust — fast.</p>

                                            <Box className="slider_btn index2_sliderbtn index3_sliderbtn float_left">
                                                <ul>
                                                    <li data-animation="animated bounceInLeft">
                                                        <Box onClick={() => router.push("/auth/login")}>
                                                            <a>
                                                                start now
                                                            </a>
                                                        </Box>
                                                    </li>
                                                    <li data-animation="animated bounceInLeft">
                                                        <a href="#plans">view plans</a>
                                                    </li>
                                                </ul>
                                            </Box>
                                            <Box data-animation="animated bounceInLeft"
                                                className="social_link_foter slider_btm_icon_links">

                                                <ul>
                                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>

                                                </ul>
                                            </Box>
                                            <Box className="clear"></Box>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="carousel-item">
                        <Box className="carousel-captions caption-3">
                            <Box className="container">
                                <Box className="row">
                                    <Box className="col-xl-6 col-lg-10 col-md-12 col-sm-12 col-12">
                                        <Box className="content">

                                            <h2 data-animation="animated bounceInUp">Build your network</h2>

                                            <h3 data-animation="animated bounceInUp">Network with <br />
                                                <span>Purpose</span></h3>

                                            <p data-animation="animated bounceInUp">Marketing is not just about ads — it's also about people. Leverage your communication and persuasion skills to build valuable relationships and strategic partnerships.</p>

                                            <Box className="slider_btn index2_sliderbtn index3_sliderbtn float_left">
                                                <ul>
                                                    <li data-animation="animated bounceInLeft">
                                                        <Box onClick={() => router.push("/auth/login")}>
                                                            <a>
                                                                start now
                                                            </a>
                                                        </Box>
                                                    </li>
                                                    <li data-animation="animated bounceInLeft">
                                                        <a href="#plans">view plans</a>
                                                    </li>
                                                </ul>
                                            </Box>
                                            <Box data-animation="animated bounceInLeft"
                                                className="social_link_foter slider_btm_icon_links">

                                                <ul>
                                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>

                                                </ul>
                                            </Box>
                                            <Box className="clear"></Box>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <ol className="carousel-indicators">

                        <li data-target="#carousel-example-generic" data-slide-to="0" className="active"><span
                            className="number">01</span>
                        </li>
                        <li data-target="#carousel-example-generic" data-slide-to="1" className=""><span
                            className="number">02</span>
                        </li>
                        <li data-target="#carousel-example-generic" data-slide-to="2" className=""><span
                            className="number">03</span>
                        </li>
                    </ol>
                    <Box className="carousel-nevigation">
                        <a className="prev" href="#carousel-example-generic" role="button" data-slide="prev"> <span></span> <i
                            className="flaticon-left-arrow"></i>
                        </a>
                        <a className="next" href="#carousel-example-generic" role="button" data-slide="next"> <span></span> <i
                            className="flaticon-arrow-pointing-to-right"></i>
                        </a>
                    </Box>
                </Box>
            </Box>

        </Box>

    )
}