import useCustomToast from "@/hooks/useCustomToast";
import { userActive } from "@/url/api's/userProfile";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountGeneration from "./Account";
import WalletSelection from "./WalletSelection";

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
    const [select, setSelect] = useState(true)

    async function PaymentActivation() {
        showToast("Payment successful", "success")
        setDisplay(false);
        onClose()
        closePaymentModal();
    }

    return (
        <>
            {select ?
                <WalletSelection closingApi={() => setDisplay(false)} paymentApi={() => PaymentActivation()} data={{ ...user, amount: amount, name: user.lastName + "," + user.firstName }} setNext={setSelect} />
                :
                <AccountGeneration closingApi={() => setDisplay(false)} paymentApi={() => PaymentActivation()} data={{ ...user, amount: amount, name: user.lastName + "," + user.firstName }} />
            }
        </>
    )
}