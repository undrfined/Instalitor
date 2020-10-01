export const SEND_MESSAGE = 'SEND_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

export interface SendMessageAction {
    type: typeof SEND_MESSAGE
    text: string
}

export interface DeleteMessageAction {
    type: typeof DELETE_MESSAGE
    meta: {
        timestamp: number
    }
}

export type ChatActionTypes = SendMessageAction | DeleteMessageAction

const todos = (state = [], action: ChatActionTypes) => {
    switch (action.type) {
        case SEND_MESSAGE:
            console.log("wow")
            return [
                ...state,
                {
                    text: action.text
                }
            ]
    //     case 'TOGGLE_TODO':
    //         return state.map(todo =>
    //             todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
    //         )
        default:
            return state
    }
}

export default todos