import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { NoteData } from "../NoteScreen/NoteViewModel";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import { getFirebaseApp } from "../../services/FirebaseServices";
import { getAuth } from "firebase/auth";
import {v4 as uuidv4} from 'uuid';



const firebaseApp = getFirebaseApp()
const db = getFirestore(firebaseApp)

export const addNote = createAsyncThunk<void, NoteData>(
    "home/addNote",
    async (arg, _) => {
        try {
            const auth = getAuth()
            const user = auth.currentUser
            if (user != null) {
                console.log("Add Note")
                const note : NoteData = {... arg, id:uuidv4()}
                await addDoc(collection(db, user.uid), note)
            }
        }
        catch (error) {
            console.log(`home/addNote - error: ${error}`)
        }
    }
)


export const loadNotes = createAsyncThunk<NoteData[], void>(
    "home/loadNotes",
    async () => {
        try {
            const auth = getAuth()
            const user = auth.currentUser
            if (user != null) {
                // Query notes ordered by createdAt descending
                const docRef = query(
                    collection(db, user.uid),  orderBy('createdAt', 'desc')
                )
                const docSnap = await getDocs(docRef)
                return docSnap.docs.map(doc => {
                    const note = {
                        ...doc.data(),
                        id: doc.id
                    } as NoteData
                    console.log(`get data:`, note)
                    return note
                }) as NoteData[]
            }
            return []
        }
        catch (error) {
            console.log(`home/addNote - error: ${error}`)
            return []
        }
    }
)

interface HomeState{
    notes: NoteData[]
    
    //
    isLoading: boolean
}

const initState : HomeState = {
    notes: [],
    isLoading : false,
}


const homeSlice = createSlice({
    name: "home",
    initialState: initState,
    reducers: {
        onDispose: (state) => {
            Object.assign(state, initState)
            window.history.replaceState({}, '')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadNotes.pending, (state, _) => {
            state.notes = []
            state.isLoading = true
        }).addCase(loadNotes.fulfilled, (state, action) => {
            if (action.payload.length !== 0) {
                state.notes = action.payload as NoteData[]
            }
            state.isLoading = false
        })
        
    }
    
})

export const {onDispose} = homeSlice.actions
export default homeSlice.reducer