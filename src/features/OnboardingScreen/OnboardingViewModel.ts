import { createSlice } from '@reduxjs/toolkit';


const initialState = {}

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    onTapGetStarted: () => {
      // UI handles navigation via useNavigate
    },
    onTapAlreadyHasAccount: () => {
      // UI handles navigation via useNavigate
    },
  }
})

export const { onTapGetStarted, onTapAlreadyHasAccount } = onboardingSlice.actions
export default onboardingSlice.reducer