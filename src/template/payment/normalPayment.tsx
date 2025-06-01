import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function NormalPaymentFlutterwave({
    amount,
    id,
    setDisplay,
    user = { email: "", firstName: "", lastName: "", phone: "", id: "" }
}: {
    amount: number;
    setDisplay: any;
    id: string;
    user?: any
}) {


    const baseFlutterConfig = {
        public_key: "FLWPUBK-baf0cd9d1437e27f737ed807ed860971-X",
        tx_ref: Date.now().toString(),
        amount: amount,
        currency: "NGN",
        payment_options: "card,account,ussd",
        customer: {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            phone_number: user.phone,
        },
        customizations: {
            title: "ABN Narinohs Payment",
            description: `Payment by user ID: ${user.email}`,
            logo: "https://realvest-one.vercel.app/favicon.ico"
        },
        callback: function (response: any) {
            console.log("Payment callback:", response);
            setDisplay(false);
        },
        onclose: function () {
            console.log("Payment closed");
        },
    };


    const triggerFlutterPayment = useFlutterwave(baseFlutterConfig);

    useEffect(() => {
        triggerFlutterPayment({
            callback: (response: any) => {
                console.log("Payment callback:", response);
                setDisplay(false);
                closePaymentModal();
            },
            onClose: () => {
                console.log("Payment closed");
            },
        });
    }, [])
    return (
        <>
        </>
    )
}