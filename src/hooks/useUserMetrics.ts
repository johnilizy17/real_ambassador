import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store/store";
import { getKeyUserMetrics } from "@/redux/slices/dashboardSlice";
import ROUTES from '@/utils/ROUTES';


export function useUserMetrics() {
    const { user } = useSelector((state: RootState) => state.auth ?? {});
    const userId = user?.user_id
    const { userMetrics, isLoading } = useSelector((state: RootState) => state.dashboard);
    const dispatch = useAppDispatch()
    useEffect(() => {
      if (userId) {
          dispatch(getKeyUserMetrics(userId));
      }
  }, [userId, dispatch])

  const cardData = [
    { amount: userMetrics?.claimedAddresses, title: "Claimed Address", color: "#2766AD", link:ROUTES.claimedAddress },
    { amount: userMetrics?.validatedAddresses, title: "Verified Address", color: "#7ED31F", link:ROUTES.verifiedAddress  },
    { amount: userMetrics?.addressRelatedActivities, title: "Address Related Activities", color: "#F58E18" },
    { amount: userMetrics?.tokenBalance, title: "Token Balance", color: "#93B3D6" },
];

    return {cardData, loading: isLoading };
}
