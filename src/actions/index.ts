import {FirebaseInstance} from "../Firebase";
import {RootState} from "../reducers";
import {DbPost} from "../Types";

export const FETCH_NEXT_POSTS = 'FETCH_NEXT_POSTS'
export const NEW_POSTS_ADDED = 'NEW_POSTS_ADDED'
export const ALL_FETCHED = 'ALL_FETCHED'
export const START_LOADING = 'START_LOADING'
export const INVALIDATE_POSTS = 'INVALIDATE_POSTS'
export const SUBSCRIBE_TO_NEW_POSTS = 'SUBSCRIBE_TO_NEW_POSTS'
export const SET_POST_LIKE = 'SET_POST_LIKE'
export const POST_DELETED = 'POST_DELETED'

export interface FetchNextPostsAction {
    type: typeof FETCH_NEXT_POSTS,
    posts: DbPost[],
    latestKey: string
}

export interface NewPostsAddedAction {
    type: typeof NEW_POSTS_ADDED,
    post: DbPost
}

export interface InvalidatePostsAction {
    type: typeof INVALIDATE_POSTS,
}

export interface AllFetchedAction {
    type: typeof ALL_FETCHED,
}

export interface StartLoadingAction {
    type: typeof START_LOADING,
}

export interface SetPostLikeAction {
    type: typeof SET_POST_LIKE,
    isLiked: boolean,
    postId: string
}

export interface PostDeletedAction {
    type: typeof POST_DELETED,
    postId: string
}

export interface SubscribeToNewPostsAction {
    type: typeof SUBSCRIBE_TO_NEW_POSTS,
}


export type PostActionTypes =
    FetchNextPostsAction
    | NewPostsAddedAction
    | AllFetchedAction
    | StartLoadingAction
    | InvalidatePostsAction
    | SubscribeToNewPostsAction
    | SetPostLikeAction
    | PostDeletedAction

export const postActions = {
    addPost: (photo: string, caption?: string): any => {
        // const ref = FirebaseInstance.database.ref().child('posts').push({
        //     "likedBy": [],
        //     "image": "https://miro.medium.com/max/2860/1*1XS8FoiyTOuxz5cdB-zxzQ.jpeg",
        //     "caption": Math.random() < 0.5 ? "Hello, this is caption!" : "",
        //     "postedBy": FirebaseInstance.auth.currentUser?.uid,
        //     "comments": [],
        //     "date": +new Date()
        // }).key
    },
    // TODO change any for dispatch
    deletePost: (postId: string): any => {
        return (dispatch: any) => {
            return FirebaseInstance.database.ref(`posts/${postId}`).remove().then(() => {
            })
        }
    },
    setPostLike: (postId: string, isLiked: boolean = true): any => {
        return (dispatch: any) => {
            const ref = FirebaseInstance.database.ref(`posts/${postId}/likedBy`)
            let action: any
            if (isLiked) {
                action = ref.push(FirebaseInstance.auth.currentUser?.uid || "")
            } else {
                action = ref.child(FirebaseInstance.auth.currentUser?.uid || "").remove()
            }
            return action.then(() => {
                dispatch({
                    type: SET_POST_LIKE,
                    isLiked,
                    postId
                })
            })
        }
    },
    invalidatePosts: (): InvalidatePostsAction => ({
        type: INVALIDATE_POSTS
    }),
    startLoading: (): StartLoadingAction => ({
        type: START_LOADING
    }),
    allFetched: (): AllFetchedAction => ({
        type: ALL_FETCHED
    }),
    newPostsAdded: (post: DbPost): NewPostsAddedAction => ({
        type: NEW_POSTS_ADDED,
        post: post
    }),
    subscribeToNewPosts: (): any => {
        return (dispatch: any, getState: () => RootState) => {
            const state = getState().posts
            if (state.subscribed) return
            dispatch({
                type: SUBSCRIBE_TO_NEW_POSTS
            })
            FirebaseInstance.database.ref().child("posts").on("child_removed", (snapshot) => {
                const key = snapshot.key
                dispatch({
                    type: POST_DELETED,
                    postId: key
                })
            })
            return FirebaseInstance.database.ref().child("posts").orderByChild('date').startAt(+new Date()).on("child_added", (snapshot) => {
                const post: DbPost = snapshot.val()
                post.likedBy = []
                post.id = snapshot.key!!
                // console.log("new", snapshot.val())
                dispatch(postActions.newPostsAdded(post))
                // isLoading = false
            })
        }
    },
    fetchNextPosts: (): any => {
        return (dispatch: any, getState: () => RootState) => {
            const state = getState().posts

            if (state.isLoading) return
            dispatch(postActions.startLoading())

            let ref = FirebaseInstance.database.ref().child("posts").orderByKey()
            if (state.latestKey != null) {
                ref = ref.endAt(state.latestKey)
            }
            return ref.limitToLast(10).once("value").then((snapshot) => {
                const val = snapshot.val()
                const posts: DbPost[] = Object.values(val)
                const keys = Object.keys(val)
                posts.forEach((post, i) => {
                    post.likedBy = []
                    post.id = keys[i]
                })
                if (state.latestKey != null) {
                    posts.pop()
                }
                if (posts.length === 0) {
                    dispatch(postActions.allFetched())
                    return
                }

                dispatch({
                    type: FETCH_NEXT_POSTS,
                    posts: posts.reverse(),
                    latestKey: keys[0]
                })
            })
        }
    },
}
