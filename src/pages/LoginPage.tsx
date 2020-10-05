import React, {useState} from "react";
import instagram_logo_text from "../instagram_logo_text.svg";
import {Input} from "../fragments/Input";
import {Button} from "../fragments/Button";
import firebase from "firebase";
import {userActions} from "../actions/UserActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducers";
import { useHistory } from "react-router-dom";


export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const users = useSelector((state: RootState) => state.users)
    const loading = users.authorizationStarted
    const errorMessage = users.authorizationError
    const dispatch = useDispatch()
    const history = useHistory()


    function performLoginGoogle() {
        dispatch(userActions.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
    }

    function performLoginFacebook() {
        dispatch(userActions.signInWithPopup(new firebase.auth.FacebookAuthProvider()))
    }

    function performLogin() {
        dispatch(userActions.signInWithEmailAndPassword(email, password))
    }

    return <div className="form login-form">
        <img src={instagram_logo_text} className="logo" alt="logo"/>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <Input hint={"Email"} disabled={loading} type={"email"} onChange={setEmail}/>
        <Input hint={"Password"} disabled={loading} type={"password"} onChange={setPassword}/>
        <Button text={loading ? "Please wait..." : "Log In"} disabled={loading} onClick={performLogin}/>
        <div className="hr"/>
        <Button text={"Log In With Google"} disabled={loading} onClick={performLoginGoogle}/>
        <Button text={"Log In With Facebook"} disabled={loading} onClick={performLoginFacebook}/>
        <a onClick={() => {
            if(loading) return
            dispatch(userActions.authorizeRestart())
            history.push("/register")
        }}  className="hint">
            New to Instagram?
        </a>
    </div>
}