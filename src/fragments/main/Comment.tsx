import {DbComment} from "../../Types";
import React from "react";
import {useUser} from "../../Hooks";
import Avatar, {AvatarSize} from "../Avatar";

type CommentProps = {
    comment: DbComment
}
export default function Comment(
    {
        comment
    }: CommentProps) {
    const [poster] = useUser(comment.postedBy)

    return <div className="comment">
        <Avatar userId={comment.postedBy} size={AvatarSize.Inline}/>
        <span className="sender">{poster?.displayName}</span>
        {comment.text}
    </div>
}