import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth, type User } from "firebase/auth";
import { createAsyncThunk } from '@reduxjs/toolkit';


interface RegisterState{
    fullName?: string,
    email?: string,
    password?: string,
    //
    isLoginSuccessfully: boolean
    isLoading: boolean,
    
}

const initialState : RegisterState = {
    fullName: '',
    email: '',
    password: '',

    //other states
    isLoginSuccessfully : false,
    isLoading : false,
}


export interface RegisterForm {
    fullName: string,
    email: string,
    password: string,
}

// Thunks
export const registerByEmailAndPassword = createAsyncThunk<User|undefined,RegisterForm>(
    'register/registerByEmailAndPassword',
    async (arg, _) => {
        if (arg.email == null || arg.password == null) {
            return;
        }
        try {
            const firebaseAuth = getAuth();
            const result = await createUserWithEmailAndPassword(firebaseAuth, arg.email, arg.password)
            return result.user
        } catch (error) {
            
            console.log(error)
        }
    }
)


const registerSlice = createSlice({
    name : "register",
    initialState: initialState,
    reducers: {
        setFullName: (state, action: PayloadAction<string>) => {
            state.fullName = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },

        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },

        onDispose: (state) => {
            Object.assign(state, initialState)
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(registerByEmailAndPassword.pending, (state) => {
            state.isLoading = false;
        }).addCase(registerByEmailAndPassword.fulfilled, (state, action) => {
            if (action.payload) {
                localStorage.setItem('user', JSON.stringify(action.payload));
            }
            state.isLoginSuccessfully = true
            state.isLoading = false
        }).addCase(registerByEmailAndPassword.rejected, (state, action) => { 
            state.isLoginSuccessfully = false
            state.isLoading = false
        })
        
    }
})


export const { setFullName, onDispose , setEmail, setPassword} = registerSlice.actions

export default registerSlice.reducer