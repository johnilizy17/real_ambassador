import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/store/store";
import { logout} from '@/redux/slices/auth/authSlice';
import ROUTES from "@/utils/ROUTES";

export default function useLogout() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    router.push(ROUTES.login);
  };

  return handleLogout;
}
