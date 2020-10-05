import React from "react";

type ButtonProps = {
    text: string,
    disabled?: boolean,
    onClick?: () => void,
    grey?: boolean
}

export function Button(
    {
        text = "",
        grey = false,
        disabled = false,
        onClick,
    }: ButtonProps) {
    return <button className={`button ${grey ? "grey" : ""}`} disabled={disabled} onClick={onClick}>{text}</button>
}