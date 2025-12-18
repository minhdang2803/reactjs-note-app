import  { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface NoteScreenState {
    note: NoteData,
    hasChanged: boolean,
    
    //
    isLoading : boolean
}

const initialData: NoteScreenState = {
    hasChanged: false,
    isLoading: true,
    note: {
        content : '',
        title : '',
        createdAt : '',
        editAt : ''
    }
}


export interface NoteData  {
    id?: string
    title?: string,
    content?: string,
    createdAt?: string,
    editAt?: string,
}

const noteSlice = createSlice({
    name: 'note',
    initialState: initialData,
    reducers: {
        setNote: (state, action: PayloadAction<NoteData>) => {
            state.isLoading = true
            state.note = action.payload
            state.isLoading = false
        },

        setTitle: (state, action: PayloadAction<string>) => {
            state.note.title = action.payload
            state.hasChanged = true
        },
        setContent: (state, action: PayloadAction<string>) => {
            state.note.content = action.payload
            state.hasChanged = true
        },
        setCreateAt: (state) => {
            state.note.createdAt = Date.now().toFixed()
        },
        setEditAt: (state) => {
            if (state.hasChanged) {
                state.note.editAt = Date.now().toFixed()
            }
            
        },
        onDispose: (state) => {
            Object.assign(state, initialData)
        }
    }
})

export const {setTitle, setContent, setCreateAt, setEditAt, onDispose, setNote} = noteSlice.actions
export default noteSlice.reducer
