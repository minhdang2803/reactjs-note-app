import { Spinner } from "@radix-ui/themes";

interface CustomButtonProps {
    label?: string
    onTap?: () => void
    isLoading?: boolean
    type?: "button" | "submit" | "reset"
}




export default function CustomButton({ label, onTap, isLoading = false, type = "submit" }: CustomButtonProps) {
    return (
        <div className='flex justify-center flex-row '>
            <button
                className={`w-full 
                ${isLoading ? "h-[74px] items-center" : "py-[24px]"}
                mx-[28px]
                bg-button-primary text-white rounded-[12px] font-nunito text-xl font-black tracking-[0.12em] leading-[130%] flex justify-center`}
                type={type}
                onClick={onTap}
                disabled={isLoading}
                aria-busy={isLoading}
                aria-live="polite"
            >
                {isLoading ? <Spinner size={"3"} /> : label}
            </button>
        </div>
    )
}