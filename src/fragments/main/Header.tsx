import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import instagram_logo_text from "../../instagram_logo_text.svg";
import {FirebaseInstance} from "../../Firebase";
import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link} from "react-router-dom";

export default function Header() {
    const authState = useAuthState(FirebaseInstance.auth)

    return <div className="header">
        <Link to="/add" className="add-post">
            <FontAwesomeIcon icon={faCamera}/>
        </Link>
        <Link to="/" className="logo-wrapper">
            <img src={instagram_logo_text} className="logo" alt="logo"/>
        </Link>
        <Link to="/profile" className="profile">
            <span className="name">{authState[0]?.displayName}</span>
            <img src={authState[0]?.photoURL || ""} className="profile-image"/>
        </Link>
    </div>
}