import React, {ChangeEvent, useState} from "react";
import instagram_logo_text from "../instagram_logo_text.svg";
import {Input} from "../fragments/Input";
import {Button} from "../fragments/Button";
import {FirebaseInstance} from "../Firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera, faPlus} from "@fortawesome/free-solid-svg-icons";

type RegisterPageProps = {
    onSwitchLogin?: () => void
}
export default function RegisterPage(
    {
        onSwitchLogin
    }: RegisterPageProps) {
    const [errorMessage, setErrorMessage] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [photo, setPhoto] = useState("")
    const [loading, setLoading] = useState(false)

    function performRegister() {
        setLoading(true)

        if (firstName.trim().length === 0) {
            setErrorMessage("First Name is invalid")
            setLoading(false)
            return
        }

        if (lastName.trim().length === 0) {
            setErrorMessage("Last Name is invalid")
            setLoading(false)
            return
        }

        FirebaseInstance.auth.createUserWithEmailAndPassword(email, password).then(async () => {
            if(photo !== "") {
                let user = FirebaseInstance.auth.currentUser;
                const storageRef = FirebaseInstance.storage.ref(`${user?.uid}/profilePicture/latest`)
                const task = storageRef.put(await fetch(photo).then(r => r.blob()))
                task.then(async result => {
                    const url = await result.ref.getDownloadURL()
                    user?.updateProfile({
                        photoURL: url,
                        displayName: `${firstName} ${lastName}`
                    }).then(() => {
                        // TODO should update image
                    })
                })
            }
        }).catch(error => {
            setErrorMessage(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
        console.log(event.target.files);
        const files = event.target.files
        if (files !== null && files.length === 1) {
            setPhoto(URL.createObjectURL(files[0]))
        }
    }

    return <div className="form register-form">
        <img src={instagram_logo_text} className="logo" alt="logo"/>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="add-photo" style={{
            backgroundImage: `url(${photo})`
        }}>
            <input type="file" name="myImage" onChange={selectPhoto} accept="image/png, image/jpeg"/>
            <FontAwesomeIcon icon={faPlus}/>
        </div>
        <Input hint={"First Name"} type={"text"} onChange={setFirstName}/>
        <Input hint={"Last Name"} type={"text"} onChange={setLastName}/>
        <Input hint={"Email"} type={"email"} onChange={setEmail}/>
        <Input hint={"Password"} type={"password"} onChange={setPassword}/>
        <Button text={loading ? "Please wait..." : "Create account"} disabled={loading} onClick={performRegister}/>
        <span className="hint" onClick={onSwitchLogin}>
            Already have an account?
        </span>
    </div>
}