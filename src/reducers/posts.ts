import {DbPost} from "../Types";
import {
    ADD_POST,
    ADD_POST_ERROR,
    ADD_POST_STARTED,
    ADDED_COMMENT,
    ALL_FETCHED,
    FETCH_NEXT_POSTS,
    INVALIDATE_POSTS,
    NEW_POSTS_ADDED,
    POST_CHANGED,
    POST_DELETED,
    PostActionTypes,
    RESET_POST_ERROR,
    SET_POST_LIKE,
    START_LOADING,
    SUBSCRIBE_TO_NEW_POSTS
} from "../actions/PostActions";
import {FirebaseInstance} from "../Firebase";

export type PostsState = {
    posts: DbPost[],
    isLoading: boolean,
    isAllFetched: boolean,
    latestKey?: string,
    hasNewPosts: boolean,
    newPosts: DbPost[],
    subscribed: boolean,
    postAdded: boolean,
    postAddStarted: boolean,
    postAddError?: string
};

const postsInitialState: PostsState = {
    posts: [],
    isLoading: false,
    isAllFetched: false,
    hasNewPosts: false,
    subscribed: false,
    newPosts: [],
    postAdded: false,
    postAddStarted: false
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
        case ADD_POST_STARTED:
            return {
                ...state,
                postAddStarted: true
            }
        case ADD_POST:
            return {
                ...state,
                postAdded: true,
                postAddError: undefined
            }
        case ADD_POST_ERROR:
            return {
                ...state,
                postAdded: false,
                postAddError: action.error
            }
        case RESET_POST_ERROR:
            return {
                ...state,
                postAdded: false,
                postAddStarted: false,
                postAddError: undefined
            }
        case POST_DELETED:
            return {
                ...state,
                newPosts: state.newPosts.filter(post => post.id !== action.postId),
                posts: state.posts.filter(post => post.id !== action.postId),
            }
        case ADDED_COMMENT:
            return {
                ...state,
                newPosts: state.newPosts.map(post => post.id !== action.postId ? post : {
                    ...post,
                    comments: [...post.comments, action.comment]
                }),
                posts: state.posts.filter(post => post.id !== action.postId ? post : {
                    ...post,
                    comments: [...post.comments, action.comment]
                }),
            }
        case INVALIDATE_POSTS:
            return {
                ...state,
                posts: [...state.newPosts, ...state.posts],
                newPosts: [],
                hasNewPosts: false,
            }
        case SET_POST_LIKE:
            const arr: any = state.posts.find(post => post.id === action.postId)!!.likedBy
            if(action.isLiked) {
                arr[FirebaseInstance.auth.currentUser!!.uid] = true
            } else {
                delete arr[FirebaseInstance.auth.currentUser!!.uid]
            }
            return {
                ...state,
            }
        case POST_CHANGED:

            return {
                ...state,
                posts: [...state.posts.map(post => post.id !== action.postId ? post : action.post)],
                newPosts: [...state.newPosts.map(post => post.id !== action.postId ? post : action.post)],
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
