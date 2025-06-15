import useCustomToast from "@/hooks/useCustomToast";
import { userActive } from "@/url/api's/userProfile";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AccountGeneration from "./Account";

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

    async function PaymentActivation() {
        // const status = amount === 5100 ? 2 : amount === 15350 ? 3 : 4
        // await userActive({ email: user.email, payment: status, amount: amount })
        showToast("Subscription successful", "success")
        setDisplay(false);
        router.push("/auth/login")
    }

    return (
        <AccountGeneration closingApi={() => setDisplay(false)} paymentApi={() => PaymentActivation()} data={{ ...user, amount: amount, name: user.lastName + "," + user.firstName }} />
    )
}