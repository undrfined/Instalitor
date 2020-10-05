import {
    AUTHORIZE_ERROR,
    AUTHORIZE_FINISHED,
    AUTHORIZE_RESTART,
    AUTHORIZE_STARTED,
    CHANGE_DISPLAY_NAME,
    CHANGE_PHOTO_URL,
    FETCH_USER,
    START_FETCH_USER,
    USER_INFO_CHANGE_STARTED,
    UserActionTypes
} from "../actions/UserActions";
import {DbUser} from "../Types";
import {FirebaseInstance} from "../Firebase";

export type UsersState = {
    users: DbUser[],
    requestingUserIds: string[],
    isAuthorized: boolean,
    authorizationStarted: boolean,
    authorizationError?: string,
    userInfoChangeStarted: boolean,
};

const usersInitialState: UsersState = {
    users: [],
    requestingUserIds: [],
    isAuthorized: false,
    authorizationStarted: false,
    userInfoChangeStarted: false
}

export default (state: UsersState = usersInitialState, action: UserActionTypes) => {
    switch (action.type) {
        case USER_INFO_CHANGE_STARTED:
            return {
                ...state,
                userInfoChangeStarted: true
            }
        case CHANGE_DISPLAY_NAME:
            return {
                ...state,
                users: [...state.users.map(user => user.uid !== FirebaseInstance.auth.currentUser!!.uid ? user : {
                    ...user,
                    displayName: action.displayName
                })],
                userInfoChangeStarted: false
            }
        case CHANGE_PHOTO_URL:
            return {
                ...state,
                users: [...state.users.map(user => user.uid !== FirebaseInstance.auth.currentUser!!.uid ? user : {
                    ...user,
                    photoURL: action.photoURL
                })],
                userInfoChangeStarted: false
            }
        case START_FETCH_USER:
            return {
                ...state,
                requestingUserIds: [...state.requestingUserIds, action.uid]
            }
        case FETCH_USER:
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case AUTHORIZE_STARTED:
            return {
                ...state,
                authorizationStarted: true
            }
        case AUTHORIZE_FINISHED:
            return {
                ...state,
                isAuthorized: true,
                authorizationStarted: false
            }
        case AUTHORIZE_ERROR:
            return {
                ...state,
                authorizationError: action.error,
                authorizationStarted: false
            }
        case AUTHORIZE_RESTART:
            return {
                ...state,
                authorizationError: undefined,
                authorizationStarted: false,
                isAuthorized: false
            }
        default:
            return state
    }

}
