import React from "react";

export default function FAQ() {

    return (
        <>
            <div className="faq_wrapper float_left">
                <div className="investment_overlay faq_overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-12">

                            <div
                                className="sv_heading_wraper heading_wrapper_dark index2_heading index2_heading_center index3_heading">
                                <h4>FAQ section</h4>
                                <h3>Frequently Asked Questions</h3>
                                <div className="line_shape line_shape2"></div>
                            </div>
                        </div>
                    </div>
                    <div id="accordion" role="tablist">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">

                                <div className="card index3_card">
                                    <div className="card_pagee" role="tab" id="headingOne">
                                        <h5 className="h5-md">
                                            <a data-toggle="collapse" href="#collapseOne" role="button" aria-expanded="true"
                                                aria-controls="collapseOne">
                                                50% Commission on Subscriptions?
                                            </a>
                                        </h5>
                                    </div>
                                    <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne"
                                        data-parent="#accordion" >
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>Get 50% of the subscription fee every time someone subscribes through your referral link.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card index3_card">

                                    <div className="card_pagee" role="tab" id="headingTwo">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapseTwo" role="button"
                                                aria-expanded="false" aria-controls="collapseTwo">
                                                Lifetime Earnings on Referrals?
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo"
                                        data-parent="#accordion" >
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>Earn a percentage of every payment made by your referred users — not just the first one!.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card index3_card">

                                    <div className="card_pagee" role="tab" id="headingThree">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapseThree" role="button"
                                                aria-expanded="false" aria-controls="collapseThree">
                                                Instant Withdrawals
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree"
                                        data-parent="#accordion">
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>Your earnings are available for withdrawal at any time, with no minimum limits or waiting periods.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card index3_card">

                                    <div className="card_pagee" role="tab" id="heading4">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapse41" role="button"
                                                aria-expanded="false" aria-controls="collapse41">
                                                Unlimited Referrals
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapse41" className="collapse" role="tabpanel" aria-labelledby="heading4"
                                        data-parent="#accordion">
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>There’s no cap on how many people you can register — grow your network without limits.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card index3_card">

                                    <div className="card_pagee" role="tab" id="heading7">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapseT" role="button"
                                                aria-expanded="false" aria-controls="collapseT">
                                                Package Upgrades
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapseT" className="collapse" role="tabpanel" aria-labelledby="heading7"
                                        data-parent="#accordion">
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>You and your referrals can upgrade your packages anytime to unlock more features and benefits.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">

                                <div className="card index3_card">
                                    <div className="card_pagee" role="tab" id="headingfour">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapse1" role="button"
                                                aria-expanded="false" aria-controls="collapse1">
                                                Referral & Downline System
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapse1" className="collapse" role="tabpanel" aria-labelledby="headingfour"
                                        data-parent="#accordion" >
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>Use our referral system to build a team. Earn from direct and indirect referrals through your downline.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card index3_card">

                                    <div className="card_pagee" role="tab" id="headingfive">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapse2" role="button"
                                                aria-expanded="false" aria-controls="collapse2">
                                                How do I become an ABN Narinohs ambassador?
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapse2" className="collapse" role="tabpanel" aria-labelledby="headingfive"
                                        data-parent="#accordion" >
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>Just sign up through our website and access your referral dashboard. You’ll get a unique link to start referring right away.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card index3_card">

                                    <div className="card_pagee" role="tab" id="headingfive1">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapse2u" role="button"
                                                aria-expanded="false" aria-controls="collapse2u">
                                                How can I withdraw my earnings?
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapse2u" className="collapse" role="tabpanel" aria-labelledby="headingfive1"
                                        data-parent="#accordion" >
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>Log into your dashboard and click on “Withdraw”. There’s no limit or waiting period — withdraw any amount, anytime.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card index3_card">

                                    <div className="card_pagee" role="tab" id="headingnine">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapse02" role="button"
                                                aria-expanded="false" aria-controls="collapse02">
                                                Is there a limit to how many people I can refer?
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapse02" className="collapse" role="tabpanel" aria-labelledby="headingnine"
                                        data-parent="#accordion" >
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>No, there’s no limit. You can refer as many people as you want and grow your network as wide as possible.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card index3_card">

                                    <div className="card_pagee" role="tab" id="headingten">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapse092" role="button"
                                                aria-expanded="false" aria-controls="collapse092">
                                                Can I upgrade my Partner package?
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapse092" className="collapse" role="tabpanel" aria-labelledby="headingten"
                                        data-parent="#accordion" >
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>Yes, you can upgrade your package anytime to gain access to more tools, increased commissions, or advanced tracking features.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card index3_card">

                                    <div className="card_pagee" role="tab" id="headingsiz">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapse3" role="button"
                                                aria-expanded="false" aria-controls="collapse3">
                                                How does the downline system work?
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapse3" className="collapse" role="tabpanel" aria-labelledby="headingsiz"
                                        data-parent="#accordion">
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>When your referrals bring in others, they become part of your downline. You earn not just from your direct referrals but also from people under them (multi-level).</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card index3_card">

                                    <div className="card_pagee" role="tab" id="headingseven">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapse31" role="button"
                                                aria-expanded="false" aria-controls="collapse31">
                                                What does “earn a percentage of every payment” mean?
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapse31" className="collapse" role="tabpanel" aria-labelledby="headingseven"
                                        data-parent="#accordion">
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>In addition to the initial 50%, you’ll also earn a percentage every time your referral makes any future payment, including renewals or upgrades.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card index3_card">

                                    <div className="card_pagee" role="tab" id="headingeight">
                                        <h5 className="h5-md">
                                            <a className="collapsed" data-toggle="collapse" href="#collapse32" role="button"
                                                aria-expanded="false" aria-controls="collapse32">
                                                How does the 50% commission work?
                                            </a>
                                        </h5>
                                    </div>

                                    <div id="collapse32" className="collapse" role="tabpanel" aria-labelledby="headingeight"
                                        data-parent="#accordion">
                                        <div className="card-body">

                                            <div className="card_cntnt">
                                                <p>Whenever someone subscribes through your referral link, you immediately earn 50% of their subscription fee.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}