export const AUTH_USER = 'AUTH_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export interface AuthUserAction {
    type: typeof AUTH_USER
    text: string
}

export interface LogoutUserAction {
    type: typeof LOGOUT_USER
}

export type UserActionTypes = AuthUserAction | LogoutUserAction

const user = (state = {}, action: UserActionTypes) => {
    switch (action.type) {
        case AUTH_USER:

            return {
                ...state,
                auth: true
            }
        case LOGOUT_USER:

            return state
        default:
            return state
    }
}

export default user