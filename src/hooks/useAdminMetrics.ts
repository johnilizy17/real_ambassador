import { useEffect, useState } from "react";
// import { metrics as adminMetrics } from "@/url/api's/admin";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store/store";
import { getKeyAdminMetrics } from "@/redux/slices/dashboardSlice";



export function useAdminMetrics() {

  const { adminMetrics, isLoading } = useSelector((state: RootState) => state.dashboard);
    const dispatch = useAppDispatch()
    useEffect(() => {
   
          dispatch(getKeyAdminMetrics());

  }, [ dispatch])
   
  const cardData = [
    { amount: adminMetrics?.totalUsers, title: "Total Users", color: "#2766AD" },
    { amount: adminMetrics?.totalVerifiedAddresses, title: "Verified Address", color: "#7ED31F" },
    { amount: adminMetrics?.totalOrganizations, title: "Registered Organizations", color: "#93B3D6" },
    { amount: adminMetrics?.totalVerificationOfficers, title: "Verification Officers", color: "#F58E18" },
];

    return {  loading: isLoading, cardData };
}
