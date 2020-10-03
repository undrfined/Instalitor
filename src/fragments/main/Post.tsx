import {useDispatch} from "react-redux";
import {postActions} from "../../actions";
import {FirebaseInstance} from "../../Firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartFilled, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import {DbPost} from "../../Types";

type PostProps = {
    post: DbPost
};
export function Post({post}: PostProps) {
    const dispatch = useDispatch()
    const user = FirebaseInstance.auth.currentUser!!

    function like() {
        dispatch(postActions.setPostLike(post.id, true))
    }

    function remove() {
        dispatch(postActions.deletePost(post.id))

    }


    const liked = post.likedBy.includes(user.uid)

    return <div className={`post ${liked ? "liked" : ""}`}>
        <div className="post-header">
            <img src="https://miro.medium.com/max/2860/1*1XS8FoiyTOuxz5cdB-zxzQ.jpeg" alt="" className="avatar"/>
            <span className="username">{post.caption}</span>
            {post.postedBy === user.uid ? <div className="more" onClick={remove}><FontAwesomeIcon icon={faTrash}/></div> : ""}
        </div>
        <img src={post.image} alt="shrek" onDoubleClick={like}/>
        <div className="footer">
            <div className={`like ${liked ? "liked" : ""}`} onClick={like}><FontAwesomeIcon
                icon={liked ? faHeartFilled : faHeart}/></div>

            <span>109 likes</span>
        </div>
    </div>
}
