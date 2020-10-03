import {DbPost} from "../Types";
import {
    ALL_FETCHED,
    FETCH_NEXT_POSTS,
    INVALIDATE_POSTS,
    NEW_POSTS_ADDED, POST_DELETED,
    PostActionTypes,
    SET_POST_LIKE, START_LOADING, SUBSCRIBE_TO_NEW_POSTS
} from "../actions";
import {FirebaseInstance} from "../Firebase";

export type PostsState = {
    posts: DbPost[],
    isLoading: boolean,
    isAllFetched: boolean,
    latestKey?: string,
    hasNewPosts: boolean,
    newPosts: DbPost[],
    subscribed: boolean
};

const postsInitialState: PostsState = {
    posts: [],
    isLoading: false,
    isAllFetched: false,
    hasNewPosts: false,
    subscribed: false,
    newPosts: []
}

export default (state: PostsState = postsInitialState, action: PostActionTypes): PostsState => {
    switch (action.type) {
        case FETCH_NEXT_POSTS:
            return {
                ...state,
                isLoading: false,
                latestKey: action.latestKey,
                posts: [...state.posts, ...action.posts]
            }
        case ALL_FETCHED:
            return {
                ...state,
                isAllFetched: true,
                isLoading: false
            }
        case POST_DELETED:
            return {
                ...state,
                newPosts: state.newPosts.filter(post => post.id !== action.postId),
                posts: state.posts.filter(post => post.id !== action.postId),
            }
        case INVALIDATE_POSTS:
            return {
                ...state,
                posts: [...state.newPosts, ...state.posts],
                newPosts: [],
                hasNewPosts: false,
            }
        case SET_POST_LIKE:
            const arr = state.posts.find(post => post.id === action.postId)!!.likedBy
            if(action.isLiked) {
                arr.push(FirebaseInstance.auth.currentUser!!.uid)
            } else {
                arr.splice(arr.indexOf(FirebaseInstance.auth.currentUser!!.uid), 1)
            }
            return {
                ...state,
            }
        case NEW_POSTS_ADDED:
            return {
                ...state,
                newPosts: [action.post, ...state.newPosts],
                hasNewPosts: true
            }
        case SUBSCRIBE_TO_NEW_POSTS:
            return {
                ...state,
                subscribed: true
            }
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}
