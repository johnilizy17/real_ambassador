import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest, userFileUpload } from '@/utils/axios';
import { AxiosResponse } from 'axios';
import { STORAGE } from '@/utils/storage';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';

const initialState: assetState = {
  investment: [],
  rent: [],
  airbnb: { asset: [], count: 0 },
  airbnb_cart: STORAGE.get(LOCAL_STORAGE_KEYS.ORDER) || [],
  purchase: [],
  cart: STORAGE.get(LOCAL_STORAGE_KEYS.CART) || {},
  cart_stored: [],
  asset: [],
  account: {},
  sub: STORAGE.get(LOCAL_STORAGE_KEYS.SUB) || []
};

export const getAsset = createAsyncThunk(
  'asset',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/asset?page=${payload.page}&type=${payload.type}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Password change failed');
    }
  }
)

export const getUserAsset = createAsyncThunk(
  'asset/userAsset',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/userAsset?page=${payload.page}&type=${payload.type}`);
      return response.data.data.asset;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'failed');
    }
  }
)


export const createRealSub = createAsyncThunk(
  'asset/sub',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`sub/create`, payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'failed');
    }
  }
)

export const getSub = createAsyncThunk(
  'asset/sub/get',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/sub`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'failed');
    }
  }
)

export const getAirbnbOrder = createAsyncThunk(
  'asset/airbnb/orders/fetch',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/airbnbOrder`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'failed');
    }
  }
)


export const getAssetAirbnb = createAsyncThunk(
  'asset/airbnb',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/airbnb/user?page=${payload.page}&state=${payload.state}&lt=${payload.lt}&gt=${payload.gt}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Password change failed');
    }
  }
)


export const getAssetAll = createAsyncThunk(
  'asset/all',
  async (payload: any, { rejectWithValue }) => {
    try {
      const investment = await userRequest.get(`/asset?page=1&type=2`);
      const rent = await userRequest.get(`/asset?page=1&type=3`);
      const purchase = await userRequest.get(`/asset?page=1&type=1`);
      return {
        investment: investment.data.data.asset,
        rent: rent.data.data.asset,
        purchase: purchase.data.data.asset
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Password change failed');
    }
  }
)

export const addCart = createAsyncThunk(
  'asset/cart',
  async (payload: any, { rejectWithValue }) => {
    try {
      STORAGE.set(LOCAL_STORAGE_KEYS.CART, payload);
      return payload
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Password change failed');
    }
  }
)

export const createInvestment = createAsyncThunk(
  'cart/invest',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await userRequest.post("/order/invest", payload)
      if (payload.paymentType === 2) {
        return { asset: result.data.data.asset, order: result.data.data.order, account: result.data.data.account }
      } else {
        return { asset: result.data.data.asset, order: result.data.data.order, account: {} }
      }
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response?.data.message || 'inspection fee failed');
    }
  }
)

export const verifyInvestment = createAsyncThunk(
  'cart/invest/verification',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await userRequest.post("/order/invest/verify", payload)
      return { asset: result.data.data.asset, order: result.data.data.order, account: {} }
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || 'inspection fee failed');
    }
  }
)

export const inspectionFeePayment = createAsyncThunk(
  'cart/order',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await userRequest.post("/order", payload)
      if (payload.paymentType === 2) {
        return { data: result.data.data.pending, account: result.data.data.account }
      } else {
        return { data: result.data.data, account: {} }
      }
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response?.data.message || 'inspection fee failed');
    }
  }
)

export const fullPayment = createAsyncThunk(
  'cart/payment',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await userRequest.post("/order/payment", payload)
      if (payload.paymentType === 2) {
        return { asset: result.data.data.asset, order: result.data.data.order, account: result.data.data.account }
      } else {
        return { asset: result.data.data.asset, order: result.data.data.order, account: {} }
      }
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response?.data.message || 'inspection fee failed');
    }
  }
)

export const verifyPayment = createAsyncThunk(
  'cart/payment/verification',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await userRequest.post("/order/payment/verify", payload)
      return { asset: result.data.data.asset, order: result.data.data.order, account: {} }
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || 'inspection fee failed');
    }
  }
)

export const verifyOrderAirbnb = createAsyncThunk(
  'cart/payment/airbnb/verify',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await userRequest.post("/airbnbOrder", payload)
      return result.data.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || 'inspection fee failed');
    }
  }
)

export const inspectionFeeVerification = createAsyncThunk(
  'cart/order/verify',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await userRequest.put("/order/verify", payload)

      return { data: result.data.data, account: {} }

    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response?.data.message || 'inspection fee failed');
    }
  }
)

export const getOrders = createAsyncThunk(
  'cart/get/orders',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await userRequest.get("/order")

      return { data: result.data.data, account: {} }

    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response?.data.message || 'inspection fee failed');
    }
  }
)

const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAsset.fulfilled, (state, action) => {
      state.asset = action.payload;
    })
      .addCase(getAssetAll.fulfilled, (state, action) => {
        state.investment = action.payload.investment;
        state.rent = action.payload.rent;
        state.purchase = action.payload.purchase;
        state.account = {}
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.cart = action.payload
      })
      .addCase(inspectionFeePayment.fulfilled, (state, action) => {
        state.cart_stored = action.payload.data
        state.account = action.payload.account
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.cart_stored = action.payload.data
        state.account = action.payload.account
      })
      .addCase(inspectionFeeVerification.fulfilled, (state, action) => {
        state.cart_stored = action.payload.data
        state.account = action.payload.account
      })
      .addCase(createInvestment.fulfilled, (state, action) => {
        state.cart_stored = action.payload.order
        state.asset = action.payload.asset
        state.account = action.payload.account
      })
      .addCase(fullPayment.fulfilled, (state, action) => {
        state.cart_stored = action.payload.order
        state.asset = action.payload.asset
        state.account = action.payload.account
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.cart_stored = action.payload.order
        state.asset = action.payload.asset
        state.account = action.payload.account
      })
      .addCase(getAssetAirbnb.fulfilled, (state, action) => {
        state.airbnb = action.payload
      })
      .addCase(verifyOrderAirbnb.fulfilled, (state, action) => {
        STORAGE.set(LOCAL_STORAGE_KEYS.ORDER, action.payload);
        state.airbnb_cart = action.payload
      })
      .addCase(getAirbnbOrder.fulfilled, (state, action) => {
        STORAGE.set(LOCAL_STORAGE_KEYS.ORDER, action.payload);
        state.airbnb_cart = action.payload
      })
      .addCase(createRealSub.fulfilled, (state, action) => {
        STORAGE.set(LOCAL_STORAGE_KEYS.SUB, action.payload);
        state.sub = action.payload
      })
      .addCase(getSub.fulfilled, (state, action) => {
        STORAGE.set(LOCAL_STORAGE_KEYS.SUB, action.payload);
        state.sub = action.payload
      })
  },
});

interface assetState {
  investment: any;
  rent: any;
  purchase: any;
  airbnb: any;
  airbnb_cart: any;
  cart: any;
  cart_stored: any;
  account: any;
  asset: any;
  sub: any;
}

export default assetSlice.reducer;
