import { useLocation, useNavigate } from "react-router-dom"
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { onDispose, setContent, setCreateAt, setEditAt, setNote, setTitle, type NoteData } from "./NoteViewModel";
import { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { addNote } from "../HomeScreen/HomeViewModel";
export default function NoteView() {
    const navigate = useNavigate()
    //
    const location = useLocation()
    const { existNote, isCreated }: NoteScreenProp = location.state ?? {}
    const note = useSelector((state: RootState) => state.note.note)
    //
    const dispatch = useAppDispatch()
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const handleBack = () => {
        if (isCreated) dispatch(setCreateAt());
        else dispatch(setEditAt());
        setShouldNavigate(true);
    };

    useEffect(() => {
        if (shouldNavigate) {
            dispatch(addNote(note))
            navigate(-1);
        }
    }, [shouldNavigate, note]);

    useEffect(() => {
        console.log(`NoteScreen - existNote: ${existNote}, isCreated: ${isCreated}`)
        if (existNote != null) {
            dispatch(setNote(existNote))
        }

        return () => {
            dispatch(onDispose())
        }
    }, [])
    return (
        <div className="flex flex-col min-h-screen">
            <AppBar />
            <NoteTitle />
            <NoteContent />
            <div className="mb-[39px]"> <CustomButton
                label="Create A Note"
                onTap={handleBack}
            /></div>

        </div >
    )

}


export interface NoteScreenProp {
    existNote?: NoteData,
    isCreated: boolean
}

const AppBar = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between mt-[65px] mx-[24px] content-center">
            <button className="w-[20px] h-[20px]">
                <img src="src/assets/ic_back.png" alt=""
                    className="object-cover"
                    onClick={() => navigate(-1)}
                />
            </button>
            <div className="text-content-primary font-black font-nunito text-s"> All Notes</div>
            <button className="w-[20px] h-[20px]">
                <img src="src/assets/ic_option.png" alt="" className="object-cover" />
            </button>
        </div>
    )
}

const NoteTitle = () => {
    const dispatch = useAppDispatch()
    return (
        <input
            className="w-full h-[33px] mt-[33px] px-[24px] bg-transparent 
                note-textfield-text-style 
                note-textfield-hint-style
                focus:border-transparent
                focus:outline-none
                "
            placeholder="Title"
            onChange={(payload) => { dispatch(setTitle(payload.target.value)) }}
            type="text" />
    )
}

const NoteContent = () => {
    const dispatch = useAppDispatch()
    return (
        <div className=" flex flex-1 w-full">
            <textarea
                className="
                mt-[7px] mx-[24px] mb-[41px] 
                flex flex-1 w-full 
                bg-transparent 
                focus:border-transparent
                focus:outline-none
                note-textfield-content-text-style
                note-textfield-content-hint-style
                "
                onChange={(payload) => { dispatch(setContent(payload.target.value)) }}
                placeholder="Your thoughts"
            />
        </div>

    )
}