import {FirebaseInstance} from "../Firebase";
import {RootState} from "../reducers";
import {DbComment, DbPost} from "../Types";
import {Dispatch} from "react";
import firebase from "firebase";
import {nanoid} from "nanoid";

export const FETCH_NEXT_POSTS = 'FETCH_NEXT_POSTS'
export const NEW_POSTS_ADDED = 'NEW_POSTS_ADDED'
export const ALL_FETCHED = 'ALL_FETCHED'
export const START_LOADING = 'START_LOADING'
export const INVALIDATE_POSTS = 'INVALIDATE_POSTS'
export const SUBSCRIBE_TO_NEW_POSTS = 'SUBSCRIBE_TO_NEW_POSTS'
export const SET_POST_LIKE = 'SET_POST_LIKE'
export const POST_DELETED = 'POST_DELETED'
export const POST_CHANGED = 'POST_CHANGED'
export const ADDED_COMMENT = 'ADDED_COMMENT'
export const ADD_POST_STARTED = 'ADD_POST_STARTED'
export const ADD_POST = 'ADD_POST'
export const ADD_POST_ERROR = 'ADD_POST_ERROR'
export const RESET_POST_ERROR = 'RESET_POST_ERROR'

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

export interface PostChangedAction {
    type: typeof POST_CHANGED,
    postId: string,
    post: DbPost
}

export interface AddedCommentAction {
    type: typeof ADDED_COMMENT,
    postId: string,
    comment: DbComment
}

export interface AddPostAction {
    type: typeof ADD_POST,
}

export interface AddPostErrorAction {
    type: typeof ADD_POST_ERROR,
    error: string
}

export interface ResetPostErrorAction {
    type: typeof RESET_POST_ERROR
}

export interface AddPostStartedAction {
    type: typeof ADD_POST_STARTED
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
    | PostChangedAction
    | AddedCommentAction
    | AddPostAction
    | AddPostErrorAction
    | ResetPostErrorAction
    | AddPostStartedAction


function fixPost(post: DbPost, id: string) {
    if (!post.likedBy) post.likedBy = []
    if (!post.comments) post.comments = []
    else post.comments = Object.values(post.comments)

    post.id = id
}

function getPost(dataSnapshot: firebase.database.DataSnapshot): DbPost {
    const post: DbPost = dataSnapshot.val()
    const key = dataSnapshot.key!!

    fixPost(post, key)
    return post
}

function getPosts(dataSnapshot: firebase.database.DataSnapshot): DbPost[] {
    const val = dataSnapshot.val()

    const posts: DbPost[] = val ? Object.values(val) : []
    const keys = val ? Object.keys(val) : []
    posts.forEach((post, i) => fixPost(post, keys[i]))

    return posts
}

const limit = 10

export const postActions = {
    addPost: (photo: Blob, caption?: string) => (dispatch: Dispatch<AddPostStartedAction | AddPostAction | AddPostErrorAction>) => {
        dispatch(postActions.addPostStarted())
        const storageRef = FirebaseInstance.storage.ref(`post/${nanoid()}`)
        const task = storageRef.put(photo)
        task.then(async result => {
            const url = await result.ref.getDownloadURL()
            const post: DbPost = {
                likedBy: [],
                image: url,
                caption: caption,
                postedBy: FirebaseInstance.auth.currentUser!!.uid!!,
                comments: [],
                date: +new Date(),
                id: ""
            }
            FirebaseInstance.database.ref().child('posts').push(post).then(() => {
                dispatch({
                    type: ADD_POST,
                })
            }).catch((error: Error) => {
                dispatch(postActions.addPostError(error.message))
            })

        })
    },

    addPostStarted: (): AddPostStartedAction => ({
        type: ADD_POST_STARTED
    }),

    addPostError: (error: string): AddPostErrorAction => ({
        type: ADD_POST_ERROR,
        error
    }),

    resetPostError: (): ResetPostErrorAction => ({
        type: RESET_POST_ERROR
    }),


    addComment: (postId: string, comment: string) => (dispatch: Dispatch<AddedCommentAction>) => {
        const dbComment: DbComment = {
            postedBy: FirebaseInstance.auth.currentUser!!.uid,
            text: comment
        }

        FirebaseInstance.database.ref(`posts/${postId}/comments`).push(dbComment).then(() => {
            dispatch({
                type: ADDED_COMMENT,
                postId: postId,
                comment: dbComment
            })
        })
    },

    deletePost: (postId: string) => () => {
        FirebaseInstance.database.ref(`posts/${postId}`).remove().then(() => {
        })
    },

    setPostLike: (postId: string, isLiked: boolean = true) => (dispatch: Dispatch<SetPostLikeAction>) => {
        const ref = FirebaseInstance.database.ref(`posts/${postId}/likedBy`)
        const uid = FirebaseInstance.auth.currentUser!!.uid

        let action: any
        if (isLiked) {
            action = ref.child(uid).set(true)
        } else {
            action = ref.child(uid).remove()
        }

        return action.then(() => {
            dispatch({
                type: SET_POST_LIKE,
                isLiked,
                postId
            })
        })
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

    subscribeToPostUpdates: () => (dispatch: Dispatch<SubscribeToNewPostsAction | PostChangedAction | PostDeletedAction | NewPostsAddedAction>, getState: () => RootState) => {
        const state = getState().posts

        if (state.subscribed) return

        dispatch({
            type: SUBSCRIBE_TO_NEW_POSTS
        })

        FirebaseInstance.database.ref().child("posts").on("child_changed", (snapshot) => {
            const post = getPost(snapshot)

            dispatch({
                type: POST_CHANGED,
                postId: post.id,
                post
            })
        })

        FirebaseInstance.database.ref().child("posts").on("child_removed", (snapshot) => {
            const key = snapshot.key!!
            dispatch({
                type: POST_DELETED,
                postId: key
            })
        })

        FirebaseInstance.database.ref().child("posts").orderByChild('date').startAt(+new Date()).on("child_added", (snapshot) => {
            dispatch(postActions.newPostsAdded(getPost(snapshot)))
        })
    },

    fetchNextPosts: () => (dispatch: Dispatch<FetchNextPostsAction | StartLoadingAction | AllFetchedAction>, getState: () => RootState) => {
        const state = getState().posts

        if (state.isLoading) return
        dispatch(postActions.startLoading())

        let ref = FirebaseInstance.database.ref().child("posts").orderByKey()
        if (state.latestKey != null) {
            ref = ref.endAt(state.latestKey)
        }

        ref.limitToLast(limit).once("value").then((snapshot) => {
            const posts = getPosts(snapshot)

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
                latestKey: posts[0].id
            })

            if (posts.length < limit) {
                dispatch(postActions.allFetched())
                return
            }
        })
    },
}
