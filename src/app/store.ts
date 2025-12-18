import { configureStore } from '@reduxjs/toolkit';
import onboardingSlice from '../features/OnboardingScreen/OnboardingViewModel';
import registerSlice from '../features/RegisterScreen/RegisterViewModel';
import loginSlice from '../features/LoginScreen/LoginScreenViewModel';
import noteSlice from '../features/NoteScreen/NoteViewModel';
import homeSlice from '../features/HomeScreen/HomeViewModel';
export const store = configureStore({
  reducer: {
    onboarding: onboardingSlice, // Đăng ký slice counter vào đây
    register: registerSlice,
    login: loginSlice,
    home : homeSlice,
    note: noteSlice,
  },
});

// Setup Types cho TypeScript (Copy y nguyên dùng cho mọi dự án)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;