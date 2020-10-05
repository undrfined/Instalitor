import React, {useState} from "react";
import {FirebaseInstance} from "../Firebase";
import PhotoPicker from "../fragments/PhotoPicker";
import {Button} from "../fragments/Button";
import {Input} from "../fragments/Input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducers";
import {userActions} from "../actions/UserActions";
import {useSelf} from "../Hooks";

export default function ProfilePage() {
    const [user] = useSelf()
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(user!!.displayName)

    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.users)
    const loading = users.userInfoChangeStarted

    async function changePhoto(photo: Blob) {
        dispatch(userActions.changePhotoURL(photo))
    }

    function changeName() {
        dispatch(userActions.changeDisplayName(name))
    }

    return <div className="content profile-page">
        <PhotoPicker disabled={loading} defaultPhoto={user!!.photoURL} onPhotoChanged={changePhoto}/>

        <div className="left">
            <div className="top">
                {editing ? <Input hint="Name" disabled={loading} defaultValue={name} onChange={setName}/> : <span className="display-name">{name}</span>}
                <FontAwesomeIcon icon={editing ? faCheck : faEdit} onClick={() => {
                    if(loading) return
                    if(editing) {
                        changeName()
                    }
                    setEditing(!editing)
                }}/>
            </div>

            <Button text="Sign out" disabled={loading} onClick={() => FirebaseInstance.auth.signOut()}/>
        </div>
    </div>
}