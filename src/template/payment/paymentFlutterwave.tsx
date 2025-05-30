import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PaymentFlutterwave({ amount, id, setDisplay }: { amount: number, setDisplay: any, id: string }) {

    const { user } = useSelector((state: any) => state.auth)

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
            title: "Real Vest Subscription",
            description: `${user.id} subscription`,
            logo: "https://novorealms.com/logo.png",
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