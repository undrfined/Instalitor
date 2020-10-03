import React, {useState} from "react";
import {FirebaseInstance} from "../Firebase";
import PhotoPicker from "../fragments/PhotoPicker";
import {Button} from "../fragments/Button";
import {Input} from "../fragments/Input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit} from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
    const user = FirebaseInstance.auth.currentUser!!
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(user.displayName!!)

    async function changePhoto(photo: string) {
        const storageRef = FirebaseInstance.storage.ref(`${user?.uid}/profilePicture/latest`)
        const task = storageRef.put(await fetch(photo).then(r => r.blob()))
        task.then(async result => {
            const url = await result.ref.getDownloadURL()
            user?.updateProfile({
                photoURL: url
            }).then(() => {
                // TODO should update image
            })
        })
    }

    function changeName() {
        user?.updateProfile({
            displayName: name
        }).then(() => {

        })
    }

    // TODO update in header

    return <div className="content profile-page">
        <PhotoPicker defaultPhoto={user.photoURL!!} onPhotoChanged={changePhoto}/>

        <div className="left">
            <div className="top">
                {editing ? <Input hint="Name" defaultValue={name} onChange={setName}/> : <span className="display-name">{name}</span>}
                <FontAwesomeIcon icon={editing ? faCheck : faEdit} onClick={() => {
                    if(editing) {
                        changeName()
                    }
                    setEditing(!editing)
                }}/>
            </div>

            <Button text="Sign out" onClick={() => FirebaseInstance.auth.signOut()}/>
        </div>
    </div>
}