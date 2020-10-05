import React from "react";
import {useUser} from "../Hooks";

interface AvatarProps {
    userId: string
    size: AvatarSize
}

export enum AvatarSize {
    Inline,
    Medium,
    Big
}

export default function Avatar(
    {
        userId,
        size = AvatarSize.Medium
    }: AvatarProps
) {
    const [user, loaded] = useUser(userId)
    const styles = loaded ? {backgroundImage: `url(${user?.photoURL})`} : {backgroundColor: "#cccccc"}

    let sz = ""
    if(size === AvatarSize.Inline) {
        sz = "inline"
    } else if(size === AvatarSize.Medium) {
        sz = "medium"
    } else if(size === AvatarSize.Big) {
        sz = "big"
    }
    return <div className={`avatar ${sz}`} style={styles}/>
}