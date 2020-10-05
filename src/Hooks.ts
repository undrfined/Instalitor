import {DbUser} from "./Types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./reducers";
import {useEffect} from "react";
import {userActions} from "./actions/UserActions";
import {FirebaseInstance} from "./Firebase";

export function useUser(userId?: string): [DbUser | undefined, boolean] {
    const users = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch()

    const user = users.users.find(user => {
        return user.uid === userId
    })

    useEffect(() => {
        if(user == null && userId != null && !users.authorizationStarted) {
            dispatch(userActions.fetchUser(userId))
        }
    })

    return [user, user != null]
}

export function useSelf(): [DbUser | undefined, boolean] {
    return useUser(FirebaseInstance.auth.currentUser?.uid)
}