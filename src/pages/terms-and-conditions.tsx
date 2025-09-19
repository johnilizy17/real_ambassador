import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { Box } from "@chakra-ui/react";
import NoAuthLayer from "@/contants/Rapper/NoAuthLayer";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { COLORS } from "@/utils/Theme";
import { cashFormat } from "@/utils/cashformat";

export default function Terms() {
    return (
        <NoAuthLayer seoTitle="Terms and Conditions">
            <Box color={COLORS.white} bg={COLORS.black}>
                <Header text={false} logo={true} />
                <Box className="fade-slide bottom" p={["20px", "20px", "20px", "120px"]} pt="0px">
                    <Box h={["100px", "100px", "100px", "0px"]} />

                    <Box fontWeight={"800"} fontSize={"28px"}>
                        ABN LAND-DEY TERMS AND CONDITIONS
                    </Box>

                    <Box fontWeight={"500"} fontSize={"14px"} mb="20px">
                        This Agreement governs the participation of clients in ABN Land-Dey ("Company").
                        By subscribing or making payment, the Client ("You") agrees to be bound by these
                        Terms and Conditions.
                    </Box>

                    {/* Subscription Packages */}
                    <section className="sm-container mt-lg fade-slide bottom">
                        <Box fontWeight={"700"} fontSize={"20px"}>SUBSCRIPTION PACKAGES</Box>
                    </section>
                    <section style={{ marginBottom: 20 }} className="fade-slide bottom">
                        <blockquote>
                            <p>Clients can subscribe to any of the following packages based on budget and duration:</p>
                            <ul>
                                <li><strong>Asa:</strong> a) ₦800 for 365 days, b) ₦600 for 548 days, c) ₦500 for 730 days</li>
                                <li><strong>Sky:</strong> a) ₦900 for 365 days, b) ₦750 for 548 days, c) ₦650 for 730 days</li>
                                <li><strong>Ami:</strong> a) ₦1,200 for 365 days, b) ₦1,000 for 548 days, c) ₦900 for 730 days</li>
                                <li><strong>Slay:</strong> a) ₦2,000 for 365 days, b) ₦1,600 for 548 days, c) ₦1,500 for 730 days</li>
                                <li><strong>Race:</strong> a) ₦5,000 for 365 days, b) ₦4,500 for 548 days, c) ₦3,500 for 730 days</li>
                                <li><strong>Combo:</strong> a) ₦7,000 for 365 days, b) ₦6,000 for 548 days, c) ₦5,000 for 730 days</li>
                                <li><strong>Lamb:</strong> a) ₦10,000 for 365 days, b) ₦8,000 for 548 days, c) ₦7,000 for 730 days</li>
                            </ul>
                        </blockquote>
                    </section>

                    {/* Payment Terms */}
                    <section className="sm-container mt-lg fade-slide bottom">
                        <Box fontWeight={"700"} fontSize={"20px"}>PAYMENT TERMS</Box>
                    </section>
                    <section style={{ marginBottom: 20 }} className="fade-slide bottom">
                        <blockquote>
                            <li>Payments can be made daily, weekly, or monthly depending on the Client’s plan.</li>
                            <li>All payments must be made through ABN’s approved payment channels only.</li>
                            <li>Receipts/digital confirmations must be kept for every transaction.</li>
                            <li>Missed or delayed payments may affect land allocation and documentation timelines.</li>
                        </blockquote>
                    </section>

                    {/* Land Allocation */}
                    <section className="sm-container mt-lg fade-slide bottom">
                        <Box fontWeight={"700"} fontSize={"20px"}>LAND ALLOCATION</Box>
                    </section>
                    <section style={{ marginBottom: 20 }} className="fade-slide bottom">
                        <blockquote>
                            <li>Allocation will only be processed after full subscription payment is completed.</li>
                            <li>Location is determined by the Client’s subscribed package and availability.</li>
                            <li>ABN reserves the right to adjust location allocation based on development priorities.</li>
                        </blockquote>
                    </section>

                    {/* Default & Cancellation */}
                    <section className="sm-container mt-lg fade-slide bottom">
                        <Box fontWeight={"700"} fontSize={"20px"}>DEFAULT & CANCELLATION</Box>
                    </section>
                    <section style={{ marginBottom: 20 }} className="fade-slide bottom">
                        <blockquote>
                            <li>Clients who fail to make payments for 90 consecutive days may be marked inactive.</li>
                            <li>After 180 days of non-payment without notification, subscription may be voided.</li>
                            <li>Subscriptions are non-refundable but may be transferred to another party with a ₦5,000 administrative fee.</li>
                        </blockquote>
                    </section>

                    {/* Documentation */}
                    <section className="sm-container mt-lg fade-slide bottom">
                        <Box fontWeight={"700"} fontSize={"20px"}>DOCUMENTATION</Box>
                    </section>
                    <section style={{ marginBottom: 20 }} className="fade-slide bottom">
                        <blockquote>
                            <li>Upon completion of payments, Clients will receive: Deed of Assignment, Survey Plan, and Allocation Certificate.</li>
                            <li>Documentation processing may take 30–90 working days depending on land location and legal approvals.</li>
                        </blockquote>
                    </section>

                    {/* Referral Program */}
                    <section className="sm-container mt-lg fade-slide bottom">
                        <Box fontWeight={"700"} fontSize={"20px"}>REFERRAL PROGRAM</Box>
                    </section>
                    <section style={{ marginBottom: 20 }} className="fade-slide bottom">
                        <blockquote>
                            <li>Clients may refer others and earn commissions based on ABN’s referral policy.</li>
                            <li>Referral earnings are calculated based on actual payments made by referred clients.</li>
                        </blockquote>
                    </section>

                    {/* Liability */}
                    <section className="sm-container mt-lg fade-slide bottom">
                        <Box fontWeight={"700"} fontSize={"20px"}>LIABILITY & DISPUTES</Box>
                    </section>
                    <section style={{ marginBottom: 20 }} className="fade-slide bottom">
                        <blockquote>
                            <li>ABN is not responsible for disputes caused by unauthorized resale or misuse of land.</li>
                            <li>All disputes must first go through internal ABN mediation before external legal action.</li>
                        </blockquote>
                    </section>
                    {/* Liability */}
                    <section className="sm-container mt-lg fade-slide bottom">
                        <Box fontWeight={"700"} fontSize={"20px"}>Refund Terms and Condition</Box>
                    </section>
                    <section style={{ marginBottom: 20 }} className="fade-slide bottom">
                        <blockquote>
                            <li>In the case of a refund, the customer must wait until the subscription term has ended. The refund will exclude registration or subscription fees and will be subject to a 15% deduction.</li>
                            <li>If the customer agrees to an expedited option, they may transfer their subscription to another person after receiving payment from the transferee.(15% deduction is not appilcable)</li>
                        </blockquote>
                    </section>
                    <section className="sm-container mt-lg fade-slide bottom">
                        <Box fontWeight={"700"} fontSize={"20px"}>Expedit Option</Box>
                    </section>
                    <section style={{ marginBottom: 20 }} className="fade-slide bottom">
                        <blockquote>
                            <li>The customer must pay a change of ownership fee of {cashFormat(5000)} once the transfer request has been approved in order to complete the ownership change.</li>
                            <li>A written request for the transfer is required before the subscription can be processed for ownership change.</li>
                            <li>After the transfer letter has been approved, an account number will be issued to the customer, granting access to the change of ownership page.</li>
                        </blockquote>
                    </section>

                    {/* Agreement */}
                    <section className="sm-container mt-lg fade-slide bottom">
                        <Box fontWeight={"700"} fontSize={"20px"}>AGREEMENT</Box>
                    </section>
                    <section style={{ marginBottom: 20 }} className="fade-slide bottom">
                        <blockquote>
                            By subscribing to Land-Dey, you confirm that you have read, understood,
                            and agreed to abide by these Terms and Conditions.
                            <br /><br />
                            <strong>I AGREE TO THE TERMS AND CONDITIONS OF ABN LAND-DEY.</strong>
                        </blockquote>
                    </section>
                </Box>
                <Footer />
            </Box>
        </NoAuthLayer>
    );
}
