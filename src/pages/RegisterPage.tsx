import React, {useState} from "react";
import instagram_logo_text from "../instagram_logo_text.svg";
import {Input} from "../fragments/Input";
import {Button} from "../fragments/Button";
import {FirebaseInstance} from "../Firebase";
import {Link} from "react-router-dom";
import PhotoPicker from "../fragments/PhotoPicker";


export default function RegisterPage() {
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

    return <div className="form register-form">
        <img src={instagram_logo_text} className="logo" alt="logo"/>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <PhotoPicker onPhotoChanged={setPhoto}/>
        <Input hint={"First Name"} type={"text"} onChange={setFirstName}/>
        <Input hint={"Last Name"} type={"text"} onChange={setLastName}/>
        <Input hint={"Email"} type={"email"} onChange={setEmail}/>
        <Input hint={"Password"} type={"password"} onChange={setPassword}/>
        <Button text={loading ? "Please wait..." : "Create account"} disabled={loading} onClick={performRegister}/>
        <Link to={"/login"} className="hint">
            Already have an account?
        </Link>
    </div>
}