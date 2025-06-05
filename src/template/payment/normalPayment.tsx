import useCustomToast from "@/hooks/useCustomToast";
import { userActive } from "@/url/api's/userProfile";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/router";
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

    const router = useRouter()
    const showToast = useCustomToast();
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
            setDisplay(false);
        },
    };

    async function PaymentActivation() {
        const status = amount === 5000 ? 2 : amount === 15000 ? 3 : 4
        await userActive({ email: user.email, payment: status })
        showToast("Subscription successful", "success")
        setDisplay(false);
        router.push("auth/login")

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