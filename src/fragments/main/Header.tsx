import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import instagram_logo_text from "../../instagram_logo_text.svg";
import {FirebaseInstance} from "../../Firebase";
import React from "react";
import {connect} from "react-redux";
import {useAuthState} from "react-firebase-hooks/auth";

function Header() {
    const authState = useAuthState(FirebaseInstance.auth)

    return <header>
        <i className="add-post">
            <FontAwesomeIcon icon={faCamera}/>
        </i>
        <img src={instagram_logo_text} className="logo" alt="logo"/>
        <div className="profile">
            <span className="name">{authState[0]?.displayName}</span>
            <img src={authState[0]?.photoURL || ""} className="profile-image"/>
        </div>
        {/*<a onClick={_ => FirebaseInstance.auth.signOut()}>sign out</a>*/}
    </header>
}

export default connect()(Header)