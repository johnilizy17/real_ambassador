
import { LOCAL_STORAGE_KEYS } from './constants';
import { STORAGE } from './storage';

export async function checkRequiredData(): Promise < boolean > {
  try {
    // Check Access Token
    const accessToken = await STORAGE.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if (!accessToken) {
      console.error("Access token is missing");
      return false;
    }

    // Check Refresh Token
    const refreshToken = await STORAGE.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      console.error("Refresh token is missing");
      return false;
    }

    // Check User Data
    const userData = STORAGE.get(LOCAL_STORAGE_KEYS.USER);
    if (!userData) {
      console.error("User data is missing");
      return false;
    }

    // All checks passed
    return true;
  } catch (error) {
    console.error("Error checking required data:", error);
    return false;
  }
}
