import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import type { NoteData } from "../NoteScreen/NoteViewModel";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Spinner } from "@radix-ui/themes";
import type { NoteScreenProp } from "../NoteScreen/NoteScreen";
import { loadNotes, onDispose } from "./HomeViewModel";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";



export default function HomeScreen() {
    const state = useSelector((state: RootState) => state.home)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadNotes())
        return () => {
            dispatch(onDispose())
        }
    }, [])

    return (
        <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
            <AppBar />
            <div className="flex-1 min-h-0 flex flex-col">
                {
                    state.isLoading ?
                        <div className="flex flex-1 justify-center items-center">
                            <Spinner size={"3"} />
                        </div> : (state.notes.length === 0) ? <EmptyScreenContent /> :
                            <NoteMasonry items={state.notes} />
                }
            </div>
        </div>
    )
}

const AppBar = () => {
    return (
        <div className="flex justify-between mt-[65px] mx-[24px] content-center">
            <button className="w-[20px] h-[20px]">
                <img src="src/assets/ic_menu.png" alt="" className="object-cover" />
            </button>
            <div className="text-content-primary font-black font-nunito text-s"> All Notes</div>
            <button className="w-[20px] h-[20px]">
                <img src="src/assets/ic_search.png" alt="" className="object-cover" />
            </button>
        </div>
    )
}

const EmptyScreenContent = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col flex-1 w-full overflow-auto">
            <div className="flex flex-col flex-1 w-full content-center mt-[125px] px-[30px] mt ">
                <img src="src/assets/bg_home.png" alt="" className="object-cover px-[23px]" />
                <div className="flex justify-center mt-[39px] text-content-primary text-2xl font-black font-nunito">
                    Create Your First Note
                </div>
                <div className="flex justify-center mt-[12px] text-content-secondary text-s font-bold font-nunito text-center">
                    Add a note about anything (your thoughts on climate change, or your history essay) and share it witht the world.
                </div>
            </div>
            <div className="mt-[77px]">
                <CustomButton
                    label="Create A Note"
                    onTap={
                        async () => {
                            const param: NoteScreenProp = {
                                isCreated: true
                            }
                            navigate("/note", { state: param })
                        }
                    }
                />
            </div>
            <ImportNote />
        </div>
    )
}

interface MasonryProps {
    items: NoteData[]
}
const NoteMasonry = ({ items }: MasonryProps) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col flex-1 min-h-0 mt-[29px]">
            <div className="flex-1 min-h-0 overflow-auto">
                <div className="w-full px-[22px] py-2 columns-2 gap-x-[12px] gap-y-[8px]">
                    {items.map((note, index) => (
                        <div key={index} className="mb-[8px] break-inside-avoid">
                            <div className="flex flex-col bg-card-color p-4 rounded-[12px]">
                                <div className="text-base font-black font-nunito text-content-secondary">
                                    {note.title ?? ""}
                                </div>
                                <div className="mt-[4px] text-s font-bold font-nunito text-content-secondary leading-[1.3]">
                                    {note.content ?? ""}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-[30] mb-[29px]">
                <CustomButton
                    label="Create A Note"
                    onTap={
                        async () => {
                            const param: NoteScreenProp = {
                                isCreated: true
                            }
                            navigate("/note", { state: param })
                        }
                    }
                />
            </div>
        </div>
    );
}

const ImportNote = () => {
    return (
        <button className="mb-[39px] mt-[20px] text-button-primary flex justify-center font-nunito font-extrabold text-base">
            Import Notes
        </button>
    )
}

const SignOutButton = () => {
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            await signOut(getAuth());
            navigate('/login', { replace: true });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <button onClick={handleSignOut}>SIGN OUT</button>
        </div>
    );
}