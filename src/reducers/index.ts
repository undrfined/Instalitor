import {combineReducers} from "redux";
import posts, {PostsState} from "./posts";
import users, {UsersState} from "./users";

export type RootState = {
    posts: PostsState,
    users: UsersState
}

export default combineReducers({
    posts,
    users
})