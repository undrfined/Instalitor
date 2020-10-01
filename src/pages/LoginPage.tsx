import React, {useState} from "react";
import instagram_logo_text from "../instagram_logo_text.svg";
import {Input} from "../fragments/Input";
import {Button} from "../fragments/Button";
import {FirebaseInstance} from "../Firebase";
import firebase from "firebase";

type LoginPageProps = {
    onSwitchLogin?: () => void
}

export default function LoginPage(
    {
        onSwitchLogin
    }: LoginPageProps) {
    const [errorMessage, setErrorMessage] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    function performLoginGoogle() {
        setLoading(true)

        FirebaseInstance.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
            console.log(result.user?.toJSON?.())
        }).catch(error => {
            setErrorMessage(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    function performLoginFacebook() {
        setLoading(true)

        FirebaseInstance.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(result => {
            console.log(result.user?.toJSON?.())
        }).catch(error => {
            setErrorMessage(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    function performLogin() {
        setLoading(true)

        FirebaseInstance.auth.signInWithEmailAndPassword(email, password).then(result => {
            console.log(result.user?.toJSON?.())
        }).catch(error => {
            setErrorMessage(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return <div className="form login-form">
        <img src={instagram_logo_text} className="logo" alt="logo"/>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <Input hint={"Email"} type={"email"} onChange={setEmail}/>
        <Input hint={"Password"} type={"password"} onChange={setPassword}/>
        <Button text={loading ? "Please wait..." : "Log In"} disabled={loading} onClick={performLogin}/>
        <div className="hr"/>
        <Button text={"Log In With Google"} disabled={loading} onClick={performLoginGoogle}/>
        <Button text={"Log In With Facebook"} disabled={loading} onClick={performLoginFacebook}/>
        <span className="hint" onClick={onSwitchLogin}>
            New to Instagram?
        </span>
    </div>
}