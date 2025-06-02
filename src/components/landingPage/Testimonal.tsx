import React, { useEffect } from "react";
declare global {
    interface Window {
        $: any;
        jQuery: any;
    }
}

export default function Testimonial() {
    useEffect(() => {
        const initCarousel = () => {
            if (window?.$ && typeof window.$(".owl-carousel").owlCarousel === "function") {
                window.$(".owl-carousel").owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: true,
                    dots: true,
                    items: 1,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    autoplayHoverPause: true,
                });
            } else {
                setTimeout(initCarousel, 300);
            }
        };

        initCarousel();
    }, []);

    return (
        <div className="testimonial_wrapper slider_btn_min float_left">
            <div className="investment_overlay"></div>
            <div className="container">
                <div className="row">

                    <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                        <div
                            className="sv_heading_wraper heading_wrapper_dark index2_heading index2_heading_center index3_heading">
                            <h4>Ambassadors</h4>
                            <h3>What Our Ambassadors Say</h3>
                            <div className="line_shape line_shape2"></div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="saying_slider index3_saying_slider">
                            <div className="owl-carousel owl-theme">
                                <div className="item">
                                    <div className="saying_content_wrapper float_left">
                                        <div className="saying_img">
                                            <img src="images/cnt1.png" alt="Ambassador 1" />
                                        </div>
                                        <div className="saying_img_name">
                                            <h1><a href="#" style={{color:"#fff"}}>Amara Okoye</a></h1>
                                            <p>Lead Ambassador</p>
                                        </div>
                                        <p style={{color:"#fff"}}>
                                            “Joining the ABN Nariohs Ambassador Program has empowered me to connect with amazing people and make a real difference.”
                                        </p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="saying_content_wrapper float_left">
                                        <div className="saying_img">
                                            <img src="images/cnt2.png" alt="Ambassador 2" />
                                        </div>
                                        <div className="saying_img_name">
                                            <h1><a href="#" style={{color:"#fff"}}>Chinedu Eze</a></h1>
                                            <p>Community Ambassador</p>
                                        </div>
                                        <p style={{color:"#fff"}}>
                                            “Being part of this program gave me the platform to share my passion and grow my network globally.”
                                        </p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="saying_content_wrapper float_left">
                                        <div className="saying_img">
                                            <img src="images/cnt.png" alt="Ambassador 3" />
                                        </div>
                                        <div className="saying_img_name">
                                            <h1><a href="#" style={{color:"#fff"}}>Nkechi Nwosu</a></h1>
                                            <p>Social Media Ambassador</p>
                                        </div>
                                        <p style={{color:"#fff"}}>
                                            “The ABN Nariohs Ambassador Program has been a rewarding journey of learning, leadership, and impact.”
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
