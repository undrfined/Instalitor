import {useDispatch} from "react-redux";
import {postActions} from "../../actions/PostActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartFilled, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import React, {useState} from "react";
import {DbPost} from "../../Types";
import {Input} from "../Input";
import {Button} from "../Button";
import Comment from "./Comment";
import {useSelf, useUser} from "../../Hooks";
import Avatar, {AvatarSize} from "../Avatar";

type PostProps = {
    post: DbPost
};

export function Post({post}: PostProps) {
    const dispatch = useDispatch()
    const [addingComment, setAddingComment] = useState(false)
    const [comment, setComment] = useState("")

    const [poster] = useUser(post.postedBy)
    const [user] = useSelf()
    const liked = Object.keys(post.likedBy).includes(user!!.uid)

    function like() {
        dispatch(postActions.setPostLike(post.id, !liked))
    }

    function remove() {
        dispatch(postActions.deletePost(post.id))
    }

    function sendComment() {
        dispatch(postActions.addComment(post.id, comment))
        onAddComment()
    }

    function onAddComment() {
        setAddingComment(!addingComment)
    }


    return <div className={`post ${liked ? "liked" : ""}`}>
        <div className="post-header">
            <Avatar size={AvatarSize.Medium} userId={post.postedBy}/>
            <span className="username">{poster?.displayName}</span>
            {post.postedBy === user!!.uid ?
                <div className="more" onClick={remove}><FontAwesomeIcon icon={faTrash}/></div> : ""}
        </div>
        <div className="image" style={{backgroundImage: `url(${post.image})`}} onDoubleClick={like}/>
        <div className="footer">
            <div className="like-wrapper">
                <div className={`like ${liked ? "liked" : ""}`} onClick={like}><FontAwesomeIcon
                    icon={liked ? faHeartFilled : faHeart}/></div>

                <span className="likes">{Object.values(post.likedBy).length} likes</span>
            </div>

            <span className="caption">{post.caption}</span>

            <div className="comments">
                {post.comments.map((comment, i) => {
                    return <Comment key={i} comment={comment}/>
                })}
            </div>

            {!addingComment ? <Button onClick={onAddComment} grey text="Add Comment"/> : <div className="comments-input">
                <Input hint="Comment" onChange={setComment}/>
                <Button text="Send" onClick={sendComment}/>
                <Button text="Cancel" grey onClick={onAddComment}/>
            </div>}
        </div>
    </div>
}
