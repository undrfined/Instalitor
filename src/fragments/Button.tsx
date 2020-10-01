import React from "react";
import "../scss/Button.scss";

type ButtonProps = {
    text: string,
    disabled?: boolean,
    onClick?: () => void
}

export function Button(
    {
        text = "",
        disabled = false,
        onClick,
    }: ButtonProps) {
    return <button className={"button"} disabled={disabled} onClick={onClick}>{text}</button>
}