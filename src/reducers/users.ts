export type UsersState = {
    // posts: DbPost[],
    // isLoading: boolean,
    // isAllFetched: boolean,
    // latestKey?: string,
    // hasNewPosts: boolean,
    // subscribed: boolean
};

const usersInitialState: UsersState = {
    // posts: [],
    // isLoading: false,
    // isAllFetched: false,
    // hasNewPosts: false,
    // subscribed: false
}

export default (state: UsersState = usersInitialState, action: any) => {
    return state
    // console.log("action", action.type)
    // switch (action.type) {
    //     case FETCH_NEXT_POSTS:
    //         return {
    //             ...state,
    //             isLoading: false,
    //             latestKey: action.latestKey,
    //             posts: [...state.posts, ...action.posts]
    //         }
    //     case ALL_FETCHED:
    //         return {
    //             ...state,
    //             isAllFetched: true,
    //             isLoading: false
    //         }
    //     case INVALIDATE_POSTS:
    //
    //         return {
    //             ...state,
    //             hasNewPosts: false,
    //         }
    //     case SET_POST_LIKE:
    //         const arr = state.posts.find(post => post.id === action.postId)!!.likedBy
    //         if(action.isLiked) {
    //             arr.push(FirebaseInstance.auth.currentUser!!.uid)
    //         } else {
    //             arr.splice(arr.indexOf(FirebaseInstance.auth.currentUser!!.uid), 1)
    //         }
    //         return {
    //             ...state,
    //         }
    //     case NEW_POSTS_ADDED:
    //         return {
    //             ...state,
    //             hasNewPosts: true,
    //             subscribed: false
    //         }
    //     case SUBSCRIBE_TO_NEW_POSTS:
    //         return {
    //             ...state,
    //             subscribed: true
    //         }
    //     case START_LOADING:
    //         return {
    //             ...state,
    //             isLoading: true
    //         }
    //     default:
    //         return state
    // }
}
