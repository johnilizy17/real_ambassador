import useCustomToast from "@/hooks/useCustomToast";
import { userActive } from "@/url/api's/userProfile";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountGeneration from "./Account";

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
    const [select, setSelect] = useState(false)

    async function PaymentActivation() {
        showToast("Subscription successful", "success")
        setDisplay(false);
        onClose()
        closePaymentModal();
    }

    return (
        <AccountGeneration closingApi={() => setDisplay(false)} paymentApi={() => PaymentActivation()} data={{ ...user, amount: amount, name: user.lastName + "," + user.firstName }} />
    )
}