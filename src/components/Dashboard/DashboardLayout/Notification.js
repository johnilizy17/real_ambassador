import { COLORS } from "@/layout/Theme";
import React, { useState, useEffect } from "react";

export default function NotificationVendDisplay({ item, id }) {
    const [reading, setReading] = useState(0);
    const [alert, setAlert] = useState(false);
    const [clicked, setclicked] = useState(false);
    const [disable, setDisable] = useState(false);
    const [tracker, setTracker] = useState();
    const [refresh, setRefresh] = useState(true);

    const scrollingId = id * 150;
    useEffect(() => {
        if (item.status == "read") {
            setclicked(true);
        }
        if (id == tracker) {
        } else {
            setReading(0);
            setAlert(false);
        }
        if (id !== tracker) {
            setReading(0);
            setAlert(false);
        }
    }, [tracker]);

    function toggleAlert() {
        setTracker(id);
        setAlert(!alert); // Toggle the alert state directly
        setDisable(!alert); // Toggle disable state accordingly

        if (alert) {
            setAlert(false);
            setDisable(false);
        } else {
            setAlert(true);
            setDisable(true);
        }
    }

    function collaspe() {
        setclicked(true);

        setTracker(id);
        const add = reading + 1;
        if (reading < 1) {
            setReading(add);
        } else {
            setReading(0);
        }
    }

    function DeletedData() {
        toggleAlert();

    }


    const ActivateButton = () => {
        // console.log("hello")
    };

    return (
        <div className="CardPosition">
            {alert && (
                <div className="AlertNotifcation">
                    <div className="AlertChoose"> 
                        <button className="AlertChooseButton"  
                            onClick={() => {
                                if (!clicked) {
                                    setclicked(true);
                                    //toggleAlert();
                                }
                            }}
                            style={clicked ? { color: "#006E72" } : { color: "#000000" }}
                        >
                            Mark as read
                        </button>
                        <button className="AlertChooseButton"  color="red"> {/* Added color to style */}
                            Delete
                        </button>
                    </div>
                </div>
            )}

            <div className="NotificationCard"
                key={item.id}
                style={
                    clicked && reading < 1
                        ? {
                            background: "#0f4cd978",
                            border: "2px solid transparent",
                            height: 0,
                        }
                        : clicked
                            ? {
                                background: "#0f4cd978",
                                border: "2px solid transparent",
                                borderRadius: 8,
                            }
                            : reading < 1
                                ? { minheight: 10, border: "2px solid transparent" }
                                : { borderRadius: 8, border: "2px solid transparent" }
                }
            >
                {reading > 0 && (
                    <div
                        onClick={() => {
                            if (!disable) {
                                toggleAlert();
                            }
                        }}
                        style={{ marginLeft: "5%", marginTop: -2 }}
                    >
                        <svg width="6" height="23" viewBox="0 0 6 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.10003 22.0108C4.25982 22.0108 5.20001 21.1421 5.20001 20.0704C5.20001 18.9987 4.25982 18.1299 3.10003 18.1299C1.94024 18.1299 1 18.9987 1 20.0704C1 21.1421 1.94024 22.0108 3.10003 22.0108Z" fill="#007575" stroke="#007575" strokeWidth="0.264603" strokeMiterlimit="22.9256" />
                            <path d="M3.10003 13.5089C4.25982 13.5089 5.20001 12.6401 5.20001 11.5684C5.20001 10.4967 4.25982 9.62793 3.10003 9.62793C1.94024 9.62793 1 10.4967 1 11.5684C1 12.6401 1.94024 13.5089 3.10003 13.5089Z" fill="#007575" stroke="#007575" strokeWidth="0.264603" strokeMiterlimit="22.9256" />
                            <path d="M3.10003 5.00792C4.25982 5.00792 5.20001 4.13914 5.20001 3.06744C5.20001 1.99574 4.25982 1.12695 3.10003 1.12695C1.94024 1.12695 1 1.99574 1 3.06744C1 4.13914 1.94024 5.00792 3.10003 5.00792Z" fill="#007575" stroke="#007575" strokeWidth="0.264603" strokeMiterlimit="22.9256" />
                        </svg>

                        {/* <Menu /> */}
                    </div>
                )}

                {/*  */}
                <div className="NotificationCardContainer">
                    <div
                        onClick={() => {
                            if (!disable) {
                                collaspe();
                            }
                        }}
                    >
                        <img src="/assets/images/logo-icon.png" alt="logo"
                            style={{ width: 40 }} />
                    </div>
                    {reading < 1 && (
                        <div
                            style={{ right: 10, top: 7, position: "absolute" }}
                            onClick={() => {
                                if (!disable) {
                                    toggleAlert();
                                }
                            }}
                        >
                            <svg width="6" height="23" viewBox="0 0 6 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.10003 22.0108C4.25982 22.0108 5.20001 21.1421 5.20001 20.0704C5.20001 18.9987 4.25982 18.1299 3.10003 18.1299C1.94024 18.1299 1 18.9987 1 20.0704C1 21.1421 1.94024 22.0108 3.10003 22.0108Z" fill="#2766AD" stroke="#2766AD" strokeWidth="0.264603" strokeMiterlimit="22.9256" />
                                <path d="M3.10003 13.5089C4.25982 13.5089 5.20001 12.6401 5.20001 11.5684C5.20001 10.4967 4.25982 9.62793 3.10003 9.62793C1.94024 9.62793 1 10.4967 1 11.5684C1 12.6401 1.94024 13.5089 3.10003 13.5089Z" fill="#2766AD" stroke="#2766AD" strokeWidth="0.264603" strokeMiterlimit="22.9256" />
                                <path d="M3.10003 5.00792C4.25982 5.00792 5.20001 4.13914 5.20001 3.06744C5.20001 1.99574 4.25982 1.12695 3.10003 1.12695C1.94024 1.12695 1 1.99574 1 3.06744C1 4.13914 1.94024 5.00792 3.10003 5.00792Z" fill="#2766AD" stroke="#2766AD" strokeWidth="0.264603" strokeMiterlimit="22.9256" />
                            </svg>

                        </div>
                    )}
                    <div className="CardContent">
                        <div className="CardContentHeader"
                            onClick={() => {
                                if (!disable) {
                                    collaspe();
                                }
                            }}
                        >
                            <h4>{item.title}</h4>
                            {reading > 0 && (
                                <div
                                    style={{
                                        width: "50px",
                                        borderBottom: "1px solid #006E72",
                                        marginBottom: 18,
                                    }}
                                ></div>
                            )}
                        </div>
                        <div className="CardContentBody">
                            <div className="CardContentBodyParagraph"
                                onClick={() => {
                                    if (!disable) {
                                        collaspe();
                                    }
                                }}
                                style={
                                    reading < 1
                                        ? { WebkitLineClamp: 1 }
                                        : reading < 2
                                            ? { WebkitLineClamp: 3, color: COLORS.white }
                                            : { WebkitLineClamp: 20, color: COLORS.white }
                                }
                            >
                                {item.body}
                            </div>
                            {reading > 0 && (
                                <div className="CardContentOptions"
                                    onClick={() => {
                                        if (!disable) {
                                            if (reading < 2) {
                                                setReading(2);
                                            } else {
                                                setReading(1);
                                            }
                                        }
                                    }}
                                >
                                    {reading < 2 ? (
                                        <div
                                            style={{
                                                display: "flex",
                                                marginLeft: 4,
                                                flexDirection: "row",
                                                color: "#fff"
                                            }}
                                        >
                                            Read more{" "}
                                            {/* <Dropdown style={{ marginLeft: 10, marginTop: 6 }} /> */}
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                display: "flex",
                                                marginLeft: 4,
                                                flexDirection: "row",
                                                color: "#fff"
                                            }}
                                        >
                                            Show less{" "}
                                            {/* <UpArrow style={{ marginLeft: 10, marginTop: 6 }} /> */}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="CardContentTimeStampContainer"
                    onClick={() => {
                        if (!disable) {
                            collaspe();
                        }
                    }}
                >
                    <p
                        style={
                            reading < 1
                                ? { marginTop: -15, fontWeight: "800", color: "#000" }
                                : { color: "#000", fontWeight: "800", marginTop: 15 }
                        }
                    >
                        {item.timestamp}
                    </p>
                </div>
            </div>
        </div>
    );
}