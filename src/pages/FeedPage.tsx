import {Post} from "../fragments/main/Post";
import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducers";
import {postActions} from "../actions/PostActions";
import {Link} from "react-router-dom";

export default function FeedPage() {
    const posts = useSelector((state: RootState) => state.posts)
    const dispatch = useDispatch()
    const scrollableRef = useRef<HTMLDivElement>(null)

    function fetchNextPage() {
        dispatch(postActions.fetchNextPosts())
    }

    function showNewPosts() {
        dispatch(postActions.invalidatePosts())
        scrollableRef.current!!.scrollTo({
            behavior: "smooth",
            top: 0
        })
    }

    function onScroll(event: React.UIEvent<HTMLDivElement>) {
        const [scrollTop, scrollHeight, clientHeight] = [event.currentTarget.scrollTop, event.currentTarget.scrollHeight, event.currentTarget.clientHeight]
        if (scrollHeight - scrollTop - clientHeight <= 800) {
            fetchNextPage()
        }
    }

    return <div className="content feed" ref={scrollableRef} onScroll={posts.isAllFetched ? undefined : onScroll}>
        <div className={`new-posts ${posts.hasNewPosts ? "" : "hidden"}`} onClick={showNewPosts}>New posts</div>
        {posts.posts.map(post => {
            return <Post key={post.id} post={post}/>
        })}
        <span className="loading">{!posts.isAllFetched ? "Loading more posts..." : <Link to="/add">
            Add Post
        </Link>}</span>
    </div>
}