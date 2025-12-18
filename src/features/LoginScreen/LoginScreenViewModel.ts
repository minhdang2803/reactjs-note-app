import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getAuth, signInWithEmailAndPassword, type User } from "firebase/auth"

interface LoginScreenState{
    email: string,
    password: string,

    //
    isLoading: boolean,
    isLoginSuccessfully :boolean
}


const initialState : LoginScreenState = {
    email: '',
    password: '',
    isLoading: false,
    isLoginSuccessfully: false
}
export interface LoginForm {
        email: string,
    password: string,
}

export const loginWithEmailAndPassword = createAsyncThunk<
    { uid: string; email: string | null; displayName: string | null } | undefined,
    LoginForm
>(
    'login/loginWithEmailAndPassword',
    async (arg, _) => {
        if (arg.email.length === 0 || arg.password.length === 0) {
            return;
        }
        try {
            const auth = getAuth();
            const user = await signInWithEmailAndPassword(auth, arg.email, arg.password);
            await new Promise(resolve => setTimeout(resolve, 2000));
            const { uid, email, displayName } = user.user;
            return { uid, email, displayName };
        } catch (error) {
            console.log(`LoginViewModel error: ${error}`);
            return;
        }
    }
);


const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setEmail: (state, action : PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action : PayloadAction<string>) => {
            state.password = action.payload
        },
        onDispose: (state) => {
            Object.assign(state, initialState)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
            if (action.payload != null) {
                localStorage.setItem('user',JSON.stringify(action.payload))
            }
            state.isLoading = false
            state.isLoginSuccessfully = true
        }).addCase(loginWithEmailAndPassword.pending, (state, _) => {
            state.isLoading = true
            state.isLoginSuccessfully = false
        })
        .addCase(loginWithEmailAndPassword.rejected, (state, _) => {
            state.isLoading = false
            state.isLoginSuccessfully = false
        })
    }
})

export const {setEmail, setPassword, onDispose} = loginSlice.actions

export default loginSlice.reducer