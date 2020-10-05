import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import instagram_logo_text from "../../instagram_logo_text.svg";
import React from "react";
import {Link} from "react-router-dom";
import {useSelf} from "../../Hooks";
import Avatar, {AvatarSize} from "../Avatar";

export default function Header() {
    const [user] = useSelf()

    return <div className="header">
        <Link to="/add" className="add-post">
            <FontAwesomeIcon icon={faCamera}/>
        </Link>
        <Link to="/" className="logo-wrapper">
            <img src={instagram_logo_text} className="logo" alt="logo"/>
        </Link>
        <Link to="/profile" className="profile">
            <span className="name">{user?.displayName}</span>
            <Avatar userId={user!!.uid} size={AvatarSize.Medium}/>
        </Link>
    </div>
}