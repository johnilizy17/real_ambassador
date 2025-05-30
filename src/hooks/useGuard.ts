import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "@/redux/store/store";
import ROUTES from "@/utils/ROUTES";
import { useSelector } from "react-redux";
import { logoutUser } from "@/redux/slices/auth/authSlice";
import { checkRequiredData } from "@/utils/checkData";


export default function useGuard() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Prevent SSR execution

    async function checkAccess() {
      try {
  
        const hasRequiredData = await checkRequiredData();
        if (!hasRequiredData) {
          await dispatch(logoutUser());
          router.push(ROUTES.login);
        }
      } catch (error) {
        await dispatch(logoutUser());
        router.push(ROUTES.login);
      }
    }

    checkAccess();
  }, [isClient, dispatch, router]);

  return isClient;
}
