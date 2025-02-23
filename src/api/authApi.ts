// src/api/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/store';

export interface AuthRequestRegister {
    name: string;
    email: string;
    password: string;
}

export interface AuthRequestLogin {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string; // updated to match your backend response
        name: string;
        email: string;
    };
}

export interface ProfileResponse {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        // If you're testing on an Android emulator, you may need to use 10.0.2.2 instead of localhost.
        baseUrl: 'http://192.168.1.5:3000',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, AuthRequestRegister>({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation<AuthResponse, AuthRequestLogin>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getProfile: builder.query<ProfileResponse, void>({
            query: () => '/auth/profile',
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useGetProfileQuery } = authApi;
