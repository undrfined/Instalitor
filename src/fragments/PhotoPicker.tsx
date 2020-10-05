import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {ChangeEvent, useState} from "react";

type PhotoPicker = {
    defaultPhoto?: string,
    onPhotoChanged?: (photo: Blob) => void,
    big?: boolean,
    disabled?: boolean
}

export default function PhotoPicker(
    {
        defaultPhoto,
        onPhotoChanged,
        disabled = false,
        big = false
    }: PhotoPicker) {
    const [photo, setPhoto] = useState(defaultPhoto)

    function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files
        if (files !== null && files.length === 1) {
            const blob = files[0]
            const url = URL.createObjectURL(blob)
            setPhoto(url)
            onPhotoChanged?.(blob)
        }
    }

    return <div className={`photo-picker ${big ? "big" : ""}`} style={{
        backgroundImage: `url(${photo})`
    }}>
        <input disabled={disabled} type="file" name="myImage" onChange={selectPhoto} accept="image/png, image/jpeg"/>
        <FontAwesomeIcon icon={faPlus}/>
    </div>
}