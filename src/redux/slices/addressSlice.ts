import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest, userRequest } from '@/utils/axios';
import { AxiosResponse } from 'axios';

const initialState: AddressState = {
  isLoading: false,
  isError: false,
  claimedAddresses: [],
  coordinates: [
    {
      lat:9.0820,
      long:8.6753,
      digital_address:""
    }
  ],
  addressData: null,
  lookUpData: null,
  verifiedAddressData: null,
};

export const getClaimedAddresses = createAsyncThunk(
  'address/claimedAddresses',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(
        `/user/${userId}/claimed-addresses`
      );
 

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error fetching metrics');
    }
  }
);

export const getCoordinates = createAsyncThunk(
  'address/coordinates',
  async (addresses: string[], { rejectWithValue }) => {
 
    try {
      const results = await Promise.all(
        addresses.map(async (digital_address) => {
          try {
            const response = await userRequest.post(
              `/address/lookup/${digital_address}`
            );
            const { lat, long } = response.data.data.Coordinates;
            return { lat, long, digital_address };
          } catch (err) {
            console.error('Error getting coordinates:', err);
            return null;
          }
        })
      );

      return results.filter((result) => result !== null);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error fetching coordinates'
      );
    }
  }
);
export const getAddressData = createAsyncThunk(
  'address/getAddressData',
  async (payload: locationDto, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(
        `address/claim/full/${payload.lat}/${payload.lng}`
      );

      return response.data.data;
    } catch (error) {
      console.error('Error fetching address data:', error);
      return rejectWithValue('Failed to fetch address data');
    }
  }
);

export const createAddressData = createAsyncThunk(
  'address/createAddressData',
  async (payload: locationAddressDto, { rejectWithValue }) => {

    try {
      const response = await userRequest.post(
        `user/${payload.user_id}/address/claim/${payload.address}`,
        payload.data
      );

      return response.data.data;
    } catch (error) {
      console.error('Error creating address data:', error);
      return rejectWithValue('Failed to create address data');
    }
  }
);

export const fetchLookUpData = createAsyncThunk(
  'address/fetchLookUpData',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await publicRequest.post(
        `/address/lookup/${payload.name}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching look up data:', error);
      return rejectWithValue('Failed to fetch look up data');
    }
  }
);

export const fetchVerifiedAddressData = createAsyncThunk(
  'address/fetchVerifyAddressData',
  async (userId:string, { rejectWithValue }) => {

    try {
      const response = await userRequest.get(`user/${userId}/address-validation`);
    
      return response.data;
    } catch (error) {
      console.error('Error fetching verification data:', error);
      return rejectWithValue('Failed to fetch verification data');
    }
  }
);

export const verifyAddressData = createAsyncThunk(
  'address/verifyAddressData',
  async (payload: verifyAddressDto, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(
        `user/${payload.user_id}/address-validation`,
        payload.data
      );
      return response.data;
    } catch (error) {
      console.error('Error verifying address data:', error);
      return rejectWithValue('Failed to verify address data');
    }
  }
);

export const deleteAddressData = createAsyncThunk(
  'address/deleteAddressData',
  async (payload: verifyAddressDto, { rejectWithValue }) => {

    try {
      const response = await userRequest.delete(
        `user/${payload.user_id}/address/${payload.address}`
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting address data:', error);
      return rejectWithValue('Failed to delete address data');
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClaimedAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClaimedAddresses.fulfilled, (state, action) => {
        state.claimedAddresses = action.payload;
        state.isLoading = false;
      })
      .addCase(getClaimedAddresses.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCoordinates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoordinates.fulfilled, (state, action) => {
        state.coordinates = action.payload;
        state.isLoading = false;
      })
      .addCase(getCoordinates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAddressData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddressData.fulfilled, (state, action) => {
        state.addressData = action.payload;
        state.isLoading = false;
      })
      .addCase(getAddressData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createAddressData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddressData.fulfilled, (state, action) => {
        state.addressData = action.payload;
        state.isLoading = false;
      })
      .addCase(createAddressData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchLookUpData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLookUpData.fulfilled, (state, action) => {
        state.lookUpData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLookUpData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchVerifiedAddressData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVerifiedAddressData.fulfilled, (state, action) => {
        state.verifiedAddressData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchVerifiedAddressData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(verifyAddressData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAddressData.fulfilled, (state, action) => {
        state.verifiedAddressData = action.payload;
        state.isLoading = false;
      })
      .addCase(verifyAddressData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

interface AddressState {
  isLoading: boolean;
  isError: boolean;
  claimedAddresses: any;
  coordinates: any;
  addressData: any;
  lookUpData: any;
  verifiedAddressData: any;
}

interface locationDto {
  lat: any;
  lng: any;
}
interface locationAddressDto {
  user_id: string;
  data: any;
  address: string;
}
interface verifyAddressDto {
  user_id: string;
  data?: any;
  address?: string;
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

export default addressSlice.reducer;
