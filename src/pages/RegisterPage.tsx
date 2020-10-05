import React, {useState} from "react";
import instagram_logo_text from "../instagram_logo_text.svg";
import {Input} from "../fragments/Input";
import {Button} from "../fragments/Button";
import PhotoPicker from "../fragments/PhotoPicker";
import {userActions} from "../actions/UserActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducers";
import { useHistory } from "react-router-dom";


export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [photo, setPhoto] = useState<Blob | undefined>(undefined)

    const users = useSelector((state: RootState) => state.users)
    const errorMessage = users.authorizationError
    const loading = users.authorizationStarted
    const dispatch = useDispatch()
    const history = useHistory()

    function performRegister() {
        if (firstName.trim().length === 0) {
            dispatch(userActions.authorizeError("First Name is invalid"))
            return
        }

        if (lastName.trim().length === 0) {
            dispatch(userActions.authorizeError("Last Name is invalid"))
            return
        }

        dispatch(userActions.createUserWithEmailAndPassword(email, password, `${firstName} ${lastName}`, photo))
    }

    return <div className="form register-form">
        <img src={instagram_logo_text} className="logo" alt="logo"/>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <PhotoPicker onPhotoChanged={setPhoto} disabled={loading}/>
        <Input hint={"First Name"} type={"text"} onChange={setFirstName}/>
        <Input hint={"Last Name"} type={"text"} onChange={setLastName}/>
        <Input hint={"Email"} type={"email"} onChange={setEmail}/>
        <Input hint={"Password"} type={"password"} onChange={setPassword}/>
        <Button text={loading ? "Please wait..." : "Create account"} disabled={loading} onClick={performRegister}/>
        <a onClick={() => {
            if(loading) return
            dispatch(userActions.authorizeRestart())
            history.push("/login")
        }} className="hint">
            Already have an account?
        </a>
    </div>
}