// src/store/notificationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../types';

interface NotificationState {
    list: Notification[];
    unreadCount: number;
}

const initialState: NotificationState = {
    list: [],
    unreadCount: 0,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
            const notif = {
                ...action.payload,
                id: Date.now().toString(),
                timestamp: Date.now(),
            };
            state.list.unshift(notif);
            state.unreadCount += 1;
        },
        markAsRead: (state) => {
            state.unreadCount = 0;
        },
        clearAll: (state) => {
            state.list = [];
            state.unreadCount = 0;
        },
    },
});

export const { addNotification, markAsRead, clearAll } = notificationSlice.actions;
export default notificationSlice.reducer;
