import { Img } from "@chakra-ui/react";
import React from "react";

export default function Banner() {

    return (
        <div className="slider-area slider_index2_wrapper slider_index3_wrapper  float_left">
            <div className="bg-animation">
                <Img h={["100vh","100vh","100vh"]} className="zoom-fade" src="images/pattern.png" alt="img" />
            </div>
            <div className="index2_sliderbg index3_sliderbg">
                <img src="images/shape1.png" alt="img" className="img-responsive" />
            </div>

            <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                        <div className="carousel-captions caption-1">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-10 col-md-12 col-sm-12 col-12">
                                        <div className="content">

                                            <h2 data-animation="animated bounceInUp">Earn with ease</h2>

                                            <h3 data-animation="animated bounceInUp">Leverage on <br />
                                                your <span>Marketing Skills</span></h3>

                                            <p data-animation="animated bounceInUp">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit, sed do Ut enim ad minim veniam Quis nostrud exercitation
                                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute an irure
                                                dolor in voluptate velit.</p>

                                            <div className="slider_btn index2_sliderbtn index3_sliderbtn float_left">
                                                <ul>
                                                    <li data-animation="animated bounceInLeft">
                                                        <a href="#">start now</a>
                                                    </li>
                                                    <li data-animation="animated bounceInLeft">
                                                        <a href="#plans">view plans</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div data-animation="animated bounceInLeft"
                                                className="social_link_foter slider_btm_icon_links">

                                                <ul>
                                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>

                                                </ul>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="carousel-captions caption-2">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-10 col-md-12 col-sm-12 col-12">
                                        <div className="content">

                                            <h2 data-animation="animated bounceInUp">Often Have Small</h2>

                                            <h3 data-animation="animated bounceInUp">Invest Your Money <br />
                                                For <span>Future</span></h3>

                                            <p data-animation="animated bounceInUp">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit, sed do Ut enim ad minim veniam Quis nostrud exercitation
                                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute an irure
                                                dolor in voluptate velit.</p>

                                            <div className="slider_btn index2_sliderbtn index3_sliderbtn float_left">
                                                <ul>
                                                    <li data-animation="animated bounceInLeft">
                                                        <a href="#">start now</a>
                                                    </li>
                                                    <li data-animation="animated bounceInLeft">
                                                        <a href="#">view plans</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div data-animation="animated bounceInLeft"
                                                className="social_link_foter slider_btm_icon_links">

                                                <ul>
                                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>

                                                </ul>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="carousel-captions caption-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-10 col-md-12 col-sm-12 col-12">
                                        <div className="content">

                                            <h2 data-animation="animated bounceInUp">Often Have Small</h2>

                                            <h3 data-animation="animated bounceInUp">Invest Your Money <br />
                                                For <span>Future</span></h3>

                                            <p data-animation="animated bounceInUp">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit, sed do Ut enim ad minim veniam Quis nostrud exercitation
                                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute an irure
                                                dolor in voluptate velit.</p>

                                            <div className="slider_btn index2_sliderbtn index3_sliderbtn float_left">
                                                <ul>
                                                    <li data-animation="animated bounceInLeft">
                                                        <a href="#">start now</a>
                                                    </li>
                                                    <li data-animation="animated bounceInLeft">
                                                        <a href="#">view plans</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div data-animation="animated bounceInLeft"
                                                className="social_link_foter slider_btm_icon_links">

                                                <ul>
                                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                                    <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>

                                                </ul>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

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
                    <div className="carousel-nevigation">
                        <a className="prev" href="#carousel-example-generic" role="button" data-slide="prev"> <span></span> <i
                            className="flaticon-left-arrow"></i>
                        </a>
                        <a className="next" href="#carousel-example-generic" role="button" data-slide="next"> <span></span> <i
                            className="flaticon-arrow-pointing-to-right"></i>
                        </a>
                    </div>
                </div>
            </div>

        </div>

    )
}