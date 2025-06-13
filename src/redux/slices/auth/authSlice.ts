import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest, userRequest } from '@/utils/axios';
import { AxiosResponse } from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  getTokenExpireTime,
  saveTokens,
  clearTokens,
  STORAGE,
} from '@/utils/storage';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';

const initialState: AuthState = {
  token: getAccessToken(),
  refreshToken: getRefreshToken(),
  isLoading: false,
  wallet: STORAGE.get(LOCAL_STORAGE_KEYS.WALLET) || {},
  user: STORAGE.get(LOCAL_STORAGE_KEYS.USER) || null,
  isError: false,
};

// Refresh Token Function
export const refreshToken = async (): Promise<string> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('Refresh token not found');

    // Check expiration
    const expireTime = getTokenExpireTime();
    if (Date.now() > expireTime) throw new Error('Refresh token expired');

    const response: AxiosResponse<{ data: RefreshTokenResponse }> =
      await userRequest.post('/auth/refresh-tokens', {
        refresh_token: refreshToken,
      });

    const newTokens = response.data.data;
    const access = {
      accessToken: newTokens.token,
      refreshToken: newTokens.refreshToken,
      expiresIn: newTokens.expires,
    }
    saveTokens(access);

    return access.accessToken;
  } catch (error: any) {
    console.error(
      'Error refreshing token:',
      error.response?.data || error.message
    );
    throw new Error('Token refresh failed');
  }
};

// Logout Thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_: any, { rejectWithValue }) => {
    try {
      // await userRequest.post('/auth/logout', {});
      clearTokens();
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Logout failed');
    }
  }
);

// Register User
export const authRegister = createAsyncThunk(
  'auth/register',
  async (payload: RegisterDto, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ data: RegisterResponse }> =
        await publicRequest.post('/auth/signup/ambassador', payload);
      const userData = response.data.data;
      return userData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

// Email Verification
export const emailVerification = createAsyncThunk(
  'auth/emailVerification',
  async (token: string, { rejectWithValue }) => {
    try {
      await userRequest.get(`/auth/verify-email?token=${token}`);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Email verification failed'
      );
    }
  }
);
//
export const emailVerificationOTP = createAsyncThunk(
  'auth/verify-otp',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await userRequest.post(`/auth/verify-otp`, payload);
      console.log(result, "result")
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Email verification failed'
      );
    }
  }
);

// Login User
export const authLogin = createAsyncThunk(
  'auth/login',
  async (data: LoginDto, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<RegisterResponse> =
        await publicRequest.post('/auth/login', data);


      saveTokens({
        accessToken: response.data.data.token,
        refreshToken: response.data.data.refreshToken,
        expiresIn: response.data.data.expires,
      });

      STORAGE.set(LOCAL_STORAGE_KEYS.USER, response.data.data.profile);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const authForgottenPassword = createAsyncThunk(
  'auth/verify-otp',
  async (payload: EmailDto, { rejectWithValue }) => {
    try {
      const response = await publicRequest.post(
        `auth/verify-otp`,
        payload
      );
      saveTokens({
        accessToken: response.data.data.token,
        refreshToken: response.data.data.refreshToken,
        expiresIn: response.data.data.expires,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error during authForgottenPassword:', error.response?.data.message);
      return rejectWithValue(
        error.response?.data.message || 'Failed to send password reset email'
      );
    }
  }
);

export const CompleteKYC = createAsyncThunk(
  'wallet',
  async (payload: EmailDto, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(
        `wallet`,
        payload
      );
      return response.data;
    } catch (error: any) {
      console.error('Error during authForgottenPassword:', error.response?.data.message);
      return rejectWithValue(
        error.response?.data.message || 'Failed to send password reset email'
      );
    }
  }
);

export const authVerifyPhone = createAsyncThunk(
  'auth/verifyPhone',
  async (payload: PhoneDto, { rejectWithValue }) => {
    try {
      const { data } = await userRequest.post(`auth/send-otp`, payload);
      return data;
    } catch (error: any) {
      console.error('Error during authVerifyPhone:', error);
      return rejectWithValue(
        error.response?.data || 'Failed to send phone verification OTP'
      );
    }
  }
);


export const authChangePage = createAsyncThunk(
  'auth/change-password',
  async (payload: changePasswordDto, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(
        `auth/change-password`,
        payload
      );
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || 'Failed to send password reset email'
      );
    }
  }
);


export const authVerifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (payload: EmailDto, { rejectWithValue }) => {
    try {
      const { data } = await userRequest.post(
        `auth/send-verification-email`,
        payload
      );
      return data;
    } catch (error: any) {
      console.error('Error during authVerifyEmail:', error);
      return rejectWithValue(
        error.response?.data || 'Failed to send email verification'
      );
    }
  }
);
export const getUserProfile = createAsyncThunk(
  '/profile',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/profile`);

      STORAGE.set(LOCAL_STORAGE_KEYS.USER, response.data.user);
      return response.data

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Email verification failed'
      );
    }
  }
);

export const UpdateProfile = createAsyncThunk(
  'update/profile',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await userRequest.put(`/profile`, payload);
      const profile = await userRequest.get(`/profile`, payload);

      STORAGE.set(LOCAL_STORAGE_KEYS.USER, payload);
      return { data: profile.data.data, message: response.data.message }

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Email verification failed'
      );
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      clearTokens();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(CompleteKYC.fulfilled, (state, action) => {
        state.wallet = action.payload;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(authRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(authRegister.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(authLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
        state.refreshToken = action.payload.data.refreshToken;
        state.user = action.payload.data.profile;
        state.isLoading = false;
      })
      .addCase(authLogin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  user: any;
  wallet: any;
  isError: boolean;
}

interface RefreshTokenResponse {
  token: string,
  expires: string,
  refreshToken: string;
}
interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  data: {
    profile: {
      user_id: string,
      first_name: string,
      last_name: string,
      email_address: string,
      phone_number: string,
      email_verified: number,
      role_id: string,
    },
    token: string,
    expires: string,
    refreshToken: string
  };
}

interface LoginDto {
  email: string;
  password: string;
}

interface EmailDto {
  email: string;
}
interface PhoneDto {
  phone_number: string;
}
interface changePasswordDto {
  password: string;
  confirm_password: string;
}

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
