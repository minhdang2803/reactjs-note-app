import React from "react"

interface TextFieldProps {
    title?: string
    hintText?: string
    inputType?: string
    name?: string
    value?: string
    defaultValue?: string
    errorText?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export default function TextField({
    title,
    hintText = "Your hint text here",
    inputType = "text",
    name,
    value,
    defaultValue,
    errorText,
    onChange,
    onBlur,
}: TextFieldProps) {
    return (
        <div className="flex flex-col justify-start">
            {title && (
                <div className="text-xs font-nunito font-bold text-content-primary leading-[130%] tracking-[0.04em]">
                    {title}
                </div>
            )}
            <div>
                <input
                    name={name}
                    type={inputType}
                    className=" mt-[8px] bg-[#FFFDFA] px-[16px] w-full border-[1px] h-[59px] rounded-[12px] border-border-color textfield-custom-hinttext textfield-text-style "
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={hintText}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
            {errorText && (
                <div className="text-red-600 text-xs font-nunito mt-[10px] font-bold leading-[0.04em]">{errorText}</div>
            )}
        </div>
    )
}