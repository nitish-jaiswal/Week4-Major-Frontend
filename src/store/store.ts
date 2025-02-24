// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { tasksApi } from '../api/tasksApi';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
