import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './../slices/auth/authSlice';
import portfolioReducer from './../slices/driverSlice';
import userReducer from './../slices/userSlice';
import dashboardReducer from './../slices/dashboardSlice'
import addressReducer from './../slices/addressSlice';
import assetRouter from '../slices/assetSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  portfolio: portfolioReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  asset:assetRouter
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
