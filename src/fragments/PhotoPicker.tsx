import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {ChangeEvent, useState} from "react";

type PhotoPicker = {
    defaultPhoto?: string,
    onPhotoChanged?: (photo: string) => void,
    big?: boolean
}

export default function PhotoPicker(
    {
        defaultPhoto,
        onPhotoChanged,
        big = false
    }: PhotoPicker) {
    const [photo, setPhoto] = useState(defaultPhoto)

    function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files
        if (files !== null && files.length === 1) {
            const url = URL.createObjectURL(files[0])
            setPhoto(url)
            onPhotoChanged?.(url)
        }
    }

    return <div className={`photo-picker ${big ? "big" : ""}`} style={{
        backgroundImage: `url(${photo})`
    }}>
        <input type="file" name="myImage" onChange={selectPhoto} accept="image/png, image/jpeg"/>
        <FontAwesomeIcon icon={faPlus}/>
    </div>
}