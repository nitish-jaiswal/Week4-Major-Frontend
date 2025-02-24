// src/api/tasksApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/store';

export interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    category: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface UpdateTaskRequest {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export interface CreateTaskRequest {
    title: string;
    description: string;
    category: string;
}

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        // Update this to your system IP as needed
        baseUrl: 'http://192.168.1.5:3000',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], void>({
            query: () => '/tasks',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Tasks' as const, id: _id })),
                        { type: 'Tasks', id: 'LIST' },
                    ]
                    : [{ type: 'Tasks', id: 'LIST' }],
        }),
        createTask: builder.mutation<Task, CreateTaskRequest>({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Tasks', id: 'LIST' },
                { type: 'Tasks', id: `CATEGORY_${arg.category}` },
            ],
        }),

        updateTask: builder.mutation<Task, UpdateTaskRequest>({
            query: ({ id, ...patch }) => ({
                url: `/tasks/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Tasks', id }],
        }),
        deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Tasks', id }],
        }),

        getCompletedTasks: builder.query<Task[], void>({
            query: () => '/tasks/completed',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Tasks' as const, id: _id })),
                        { type: 'Tasks', id: 'COMPLETED' },
                    ]
                    : [{ type: 'Tasks', id: 'COMPLETED' }],
        }),

        // New endpoint to fetch tasks by category
        getTasksByCategory: builder.query<Task[], string>({
            query: (category) => `/tasks/by-category?category=${category}`,
            providesTags: (result, error, category) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Tasks' as const, id: _id })),
                        { type: 'Tasks', id: `CATEGORY_${category}` },
                    ]
                    : [{ type: 'Tasks', id: `CATEGORY_${category}` }],
        }),

        // New endpoint to fetch a single task by ID
        getTaskById: builder.query<Task, string>({
            query: (id) => `/tasks/${id}`,
            providesTags: (result, error, id) => [{ type: 'Tasks', id }],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useGetCompletedTasksQuery,
    useGetTasksByCategoryQuery,
    useGetTaskByIdQuery,
} = tasksApi;
