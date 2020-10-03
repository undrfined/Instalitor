import React, {ChangeEvent, useState} from "react";

type InputProps = {
    hint?: string,
    defaultValue?: string,
    type?: string,
    onChange?: (value: string) => void
}

export function Input(
    {
        hint = "",
        defaultValue = "",
        type = "text",
        onChange
    }: InputProps) {
    const [value, setValue] = useState(defaultValue)

    function onInput(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
        onChange?.(event.target.value)
    }

    return <label className="label">
        <input type={type} value={value} placeholder={hint} onInput={onInput}/>
    </label>
}