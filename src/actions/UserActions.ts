import {DbUser} from "../Types";
import {FirebaseInstance} from "../Firebase";
import {Dispatch} from "react";
import firebase from "firebase";
import {RootState} from "../reducers";

export const FETCH_USER = 'FETCH_USER'
export const START_FETCH_USER = 'START_FETCH_USER'
export const AUTHORIZE_STARTED = 'AUTHORIZE_STARTED'
export const AUTHORIZE_FINISHED = 'AUTHORIZE_FINISHED'
export const AUTHORIZE_ERROR = 'AUTHORIZE_ERROR'
export const AUTHORIZE_RESTART = 'AUTHORIZE_RESTART'
export const CHANGE_DISPLAY_NAME = 'CHANGE_DISPLAY_NAME'
export const CHANGE_PHOTO_URL = 'CHANGE_PHOTO_URL'
export const USER_INFO_CHANGE_STARTED = 'USER_INFO_CHANGE_STARTED'

export interface FetchUserAction {
    type: typeof FETCH_USER,
    user: DbUser
}

export interface StartFetchUserAction {
    type: typeof START_FETCH_USER,
    uid: string
}

export interface AuthorizeStartedAction {
    type: typeof AUTHORIZE_STARTED
}

export interface AuthorizeFinishedAction {
    type: typeof AUTHORIZE_FINISHED,
    user: DbUser
}

export interface AuthorizeErrorAction {
    type: typeof AUTHORIZE_ERROR,
    error: string
}

export interface AuthorizeRestartAction {
    type: typeof AUTHORIZE_RESTART
}

export interface ChangeDisplayNameAction {
    type: typeof CHANGE_DISPLAY_NAME,
    displayName: string
}

export interface ChangePhotoURLAction {
    type: typeof CHANGE_PHOTO_URL,
    photoURL: string
}

export interface UserInfoChangeStartedAction {
    type: typeof USER_INFO_CHANGE_STARTED,
}

export type AuthorizeActionTypes =
    AuthorizeStartedAction
    | AuthorizeFinishedAction
    | AuthorizeErrorAction
    | AuthorizeRestartAction
    | UserInfoChangeStartedAction

export type UserInfoChangeActionTypes = ChangeDisplayNameAction | ChangePhotoURLAction

export type UserActionTypes = FetchUserAction | StartFetchUserAction | AuthorizeActionTypes | UserInfoChangeActionTypes

export const userActions = {
    userInfoChangeStarted: (): UserInfoChangeStartedAction => ({
        type: USER_INFO_CHANGE_STARTED
    }),

    changePhotoURL: (photo: Blob) => (dispatch: Dispatch<UserInfoChangeStartedAction | ChangePhotoURLAction>) => {
        dispatch(userActions.userInfoChangeStarted())

        const user = FirebaseInstance.auth.currentUser!!

        const storageRef = FirebaseInstance.storage.ref(`${user.uid}/profilePicture/latest`)
        const task = storageRef.put(photo)
        task.then(async result => {
            const url = await result.ref.getDownloadURL()

            FirebaseInstance.database.ref(`users/${user.uid}/photoURL`).set(url).then(() => {
                dispatch({
                    type: CHANGE_PHOTO_URL,
                    photoURL: url
                })
            })
        })
    },

    changeDisplayName: (displayName: string) => (dispatch: Dispatch<UserInfoChangeStartedAction | ChangeDisplayNameAction>) => {
        dispatch(userActions.userInfoChangeStarted())

        const user = FirebaseInstance.auth.currentUser!!

        FirebaseInstance.database.ref(`users/${user.uid}/displayName`).set(displayName).then(() => {
            dispatch({
                type: CHANGE_DISPLAY_NAME,
                displayName
            })
        })
    },

    pushUser: (uid: string, photoUrl: string, displayName: string) => (dispatch: Dispatch<AuthorizeFinishedAction>) => {
        const dbUser: DbUser = {
            uid: uid,
            photoURL: photoUrl,
            displayName: displayName
        }

        FirebaseInstance.database.ref(`users/${uid}`).set(dbUser).then(() => {
            dispatch(userActions.authorizeFinished(dbUser))
        })
    },

    startFetchUser: (uid: string): StartFetchUserAction => ({
        type: START_FETCH_USER,
        uid: uid
    }),

    fetchUser: (uid: string, isSelf: boolean = false) => (dispatch: Dispatch<StartFetchUserAction | FetchUserAction | AuthorizeFinishedAction>, getState: () => RootState) => {
        const state = getState()
        if (state.users.requestingUserIds.includes(uid)) return

        dispatch(userActions.startFetchUser(uid))

        FirebaseInstance.database.ref(`users/${uid}`).once("value").then((snapshot) => {
            const dbUser: DbUser = snapshot.val()
            dispatch({
                type: FETCH_USER,
                user: dbUser
            })
            if (isSelf) {
                dispatch(userActions.authorizeFinished(dbUser))
            }
        })
    },

    signInWithPopup: (authProvider: firebase.auth.AuthProvider) => (dispatch: Dispatch<((dispatch: Dispatch<StartFetchUserAction | FetchUserAction | AuthorizeFinishedAction>, getState: () => RootState) => void) | AuthorizeActionTypes | ((dispatch: Dispatch<AuthorizeFinishedAction>) => void)>) => {
        dispatch(userActions.authorizeStarted())

        FirebaseInstance.auth.signInWithPopup(authProvider).then(result => {
            const user = result.user!!

            if (result.additionalUserInfo?.isNewUser) {
                dispatch(userActions.pushUser(user.uid, user.photoURL ?? "", user.displayName ?? ""))
            } else {
                dispatch(userActions.fetchUser(user.uid, true))
            }
        }).catch((error: Error) => {
            dispatch(userActions.authorizeError(error.message))
        })
    },

    signInWithEmailAndPassword: (email: string, password: string) => (dispatch: Dispatch<AuthorizeActionTypes | ((dispatch: Dispatch<StartFetchUserAction | FetchUserAction | AuthorizeFinishedAction>, getState: () => RootState) => void)>) => {
        dispatch(userActions.authorizeStarted())

        FirebaseInstance.auth.signInWithEmailAndPassword(email, password).then((result) => {
            dispatch(userActions.fetchUser(result.user!!.uid, true))
        }).catch((error: Error) => {
            dispatch(userActions.authorizeError(error.message))
        })
    },

    createUserWithEmailAndPassword: (email: string, password: string, displayName: string, photo?: Blob) => (dispatch: Dispatch<AuthorizeActionTypes | ((dispatch: Dispatch<AuthorizeFinishedAction>) => void)>) => {
        dispatch(userActions.authorizeStarted())

        FirebaseInstance.auth.createUserWithEmailAndPassword(email, password).then((result) => {
            const user = result.user!!

            if (photo != null) {
                const storageRef = FirebaseInstance.storage.ref(`${user.uid}/profilePicture/latest`)
                const task = storageRef.put(photo)
                task.then(async result => {
                    const url = await result.ref.getDownloadURL()
                    dispatch(userActions.pushUser(user.uid, url, displayName))
                })
            } else {
                dispatch(userActions.pushUser(user.uid, "", displayName))
            }
        }).catch((error: Error) => {
            dispatch(userActions.authorizeError(error.message))
        })
    },

    authorizeRestart: (): AuthorizeRestartAction => ({
        type: AUTHORIZE_RESTART
    }),
    authorizeStarted: (): AuthorizeStartedAction => ({
        type: AUTHORIZE_STARTED
    }),
    authorizeError: (error: string): AuthorizeErrorAction => ({
        type: AUTHORIZE_ERROR,
        error
    }),
    authorizeFinished: (user: DbUser): AuthorizeFinishedAction => ({
        type: AUTHORIZE_FINISHED,
        user
    }),
}