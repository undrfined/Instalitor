export const SET_USER_DATA = 'SET_USER_DATA'

export interface SetUserDataAction {
    type: typeof SET_USER_DATA,
}

export type UserActionTypes = SetUserDataAction

export const userActions = {
    setUserData: (): any =>
        (dispatch: any) => {

        }
}