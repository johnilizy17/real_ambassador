import { LOCAL_STORAGE_KEYS } from "./constants";


// export const setSecureCookie = (key: string, value: string, expires: string) => {
//   document.cookie = `${key}=${value}; expires=${new Date(expires).toUTCString()}; path=/; Secure; HttpOnly`;
// };

// export const getCookie = (name: string): string | null => {
//   if (typeof window === "undefined") return null;
//   const cookies = document.cookie.split("; ");
//   const cookie = cookies.find((row) => row.startsWith(`${name}=`));
//   return cookie ? cookie.split("=")[1] : null;
// };

export const STORAGE = {
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key: string) => {
    if (typeof window === "undefined") return null;
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};


export const saveTokens = ({
  accessToken,
  refreshToken,
  expiresIn,
}: {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}) => {
  const expireTime = Date.now() + parseFloat(expiresIn) * 24 * 60 * 60 * 1000;

  STORAGE.set(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  STORAGE.set(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  STORAGE.set(LOCAL_STORAGE_KEYS.TOKEN_EXPIRE_TIME, expireTime);
};

export const getAccessToken = () => STORAGE.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN,);
export const getRefreshToken = () => STORAGE.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
export const getTokenExpireTime = () => STORAGE.get(LOCAL_STORAGE_KEYS.TOKEN_EXPIRE_TIME);

export const clearTokens = () => {
  STORAGE.remove(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  STORAGE.remove(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  STORAGE.remove(LOCAL_STORAGE_KEYS.USER);
  STORAGE.remove(LOCAL_STORAGE_KEYS.TOKEN_EXPIRE_TIME);
  localStorage.clear()
};


