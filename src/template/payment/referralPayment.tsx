import useCustomToast from "@/hooks/useCustomToast";
import { userActive } from "@/url/api's/userProfile";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ReferralPaymentFlutterwave({
    amount,
    id,
    setDisplay,
    onClose,
    user = { email: "", firstName: "", lastName: "", phone: "", id: "" }
}: {
    amount: number;
    onClose: any;
    setDisplay: any;
    id: string;
    user?: any
}) {

    const router = useRouter()
    const showToast = useCustomToast();
    const baseFlutterConfig = {
        public_key: "FLWPUBK-b63ca273dbde270802f38c5b6f57a5bf-X",
        tx_ref: Date.now().toString(),
        amount: amount,
        currency: "NGN",
        payment_options: "account,card",
        customer: {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            phone_number: user.phone,
        },
        customizations: {
            title: "ABN Narinohs Payment",
            description: `Payment by user ID: ${user.email}`,
            logo: "https://www.abn.com.ng/favicon.ico"
        },
        callback: function (response: any) {
            console.log("Payment callback:", response);
            setDisplay(false);
        },
        onclose: function () {
            setDisplay(false);
        },
    };

    async function PaymentActivation() {
        const status = amount === 5100 ? 2 : amount === 15350 ? 3 : 4
        await userActive({ email: user.email, payment: status, amount: amount })
        showToast("Subscription successful", "success")
        setDisplay(false);
        onClose()
    }

    const triggerFlutterPayment = useFlutterwave(baseFlutterConfig);

    useEffect(() => {

        triggerFlutterPayment({
            callback: (response: any) => {
                setDisplay(false);
                PaymentActivation()
                closePaymentModal();
            },
            onClose: () => {
                setDisplay(false);
            },
        });
    }, [])
    return (
        <>
        </>
    )
}