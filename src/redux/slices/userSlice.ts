import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest, userFileUpload } from '@/utils/axios';
import { AxiosResponse } from 'axios';
import { STORAGE } from '@/utils/storage';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { store } from '../store/store';
import { logout } from './auth/authSlice';

const initialState: UserState = {
  isLoading: false,
  isError: false,
  kycData: null,
  history: [],
  investment: [],
  banner: [],
  wallet: { amount: 0 }
};



export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (password: any, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`/auth/reset-password`, password);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Password change failed');
    }
  }
)
export const uploadKYC = createAsyncThunk(
  'user/kyc',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await userFileUpload.post(`/user/${payload.userId}/upload`, payload.formData);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Password change failed');
    }
  }
)
export const getKYC = createAsyncThunk(
  'user/getKyc',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/wallet`);
      return response.data.data;
    } catch (error: any) {
      store.dispatch(logout())
      return rejectWithValue(error.response?.data || 'Password change failed');
    }
  }
)

export const getBanner = createAsyncThunk(
  'user/banner',
  async (setData: any, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`banner`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Password change failed');
    }
  }
)


export const getSavings = createAsyncThunk(
  'user/savings',
  async (setData: any, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`investment`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Password change failed');
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getKYC.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getKYC.fulfilled, (state, action) => {
        state.isLoading = true;
        state.kycData = action.payload;
      })
      .addCase(getKYC.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getBanner.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.isLoading = true;
        state.banner = action.payload;
      })
      .addCase(getSavings.fulfilled, (state, action) => {
        state.investment = action.payload;
      })

  },
});

interface UserState {

  isLoading: boolean;
  isError: boolean;
  kycData: any;
  banner: any;
  investment: any;
  history: any;
  wallet: {
    amount: number;
  };
}


interface RegisterResponse {

  user: {
    user_id: string;
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    email_verified: number;
    role_id: string;
  };

}

export default userSlice.reducer;
