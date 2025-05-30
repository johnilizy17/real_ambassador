import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {  userRequest } from '@/utils/axios';
import { AxiosResponse } from 'axios';


const initialState: DashboardState = {
  userMetrics:  {
    claimedAddresses: 0,
    validatedAddresses: 0,
    addressRelatedActivities: 34,
    tokenBalance: 50000.90,
},
  isLoading : false,
  isError : false,
  adminMetrics: {
    totalUsers: 0,
    totalVerifiedAddresses: 0,
    totalOrganizations: 0,
    totalVerificationOfficers: 0,
},
notifications: [],

};


export const getKeyUserMetrics = createAsyncThunk(
  'dashboard/userMetrics',
  async (userId: string, { rejectWithValue }) => {
 
    try {
      const response = await userRequest.get(`/user/metrics/${userId}`);


      return response.data

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error fetching metrics'
      );
    }
  }
);
export const getKeyAdminMetrics = createAsyncThunk(
  'dashboard/admminMetrics',
  async (_, { rejectWithValue }) => {

    try {
      const response = await userRequest.get(`/admin/dash`);
  

      return response.data

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error fetching metrics'
      );
    }
  }
);

export const getNotifications = createAsyncThunk(
  'dashboard/notifications',
  async (userId: string, { rejectWithValue }) => {
 
    try {
      const response = await userRequest.get(`/order`);
     
      return response.data.data

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error fetching notifications'
      );
    }
  }
);

export const getSingleNotifications = createAsyncThunk(
  'dashboard/Single/notifications',
  async ({Id, setDisplay}:{Id: any, setDisplay:any}, { rejectWithValue }) => {
 
    try {
      const response = await userRequest.get(`/asset/single/${Id}`);
     
      setDisplay(response.data.data)

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error fetching notifications'
      );
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'dashboard/markAsread',
  async (payload: any, { rejectWithValue }) => {
 
    try {
      const response = await userRequest.put(`/user/${payload.userId}/notifications/${payload.id}`, {});

      return response.data

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error updating notifications'
      );
    }
  }
);
export const deleteNotification = createAsyncThunk(
  'delete/notification',
  async (payload: any, { rejectWithValue }) => {
 
    try {
      const response = await userRequest.delete(`/user/${payload.userId}/notifications/${payload.id}`);

      return response.data

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error deleting notification'
      );
    }
  }
);
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(getKeyUserMetrics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getKeyUserMetrics.fulfilled, (state, action) => {
        state.userMetrics = action.payload;
        state.isLoading = false;
      })
      .addCase(getKeyUserMetrics.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getKeyAdminMetrics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getKeyAdminMetrics.fulfilled, (state, action) => {
        state.adminMetrics = action.payload;
        state.isLoading = false;
      })
      .addCase(getKeyAdminMetrics.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.isLoading = false;
      })
      .addCase(getNotifications.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      
     
  },
});

interface DashboardState {
  userMetrics: any;
  isLoading: boolean;
  isError: boolean;
  adminMetrics: any;
  notifications: Notification[];

}

interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type: string;
  timestamp: string;
  read: boolean;
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

export default dashboardSlice.reducer;
