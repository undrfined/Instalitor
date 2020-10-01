import {SEND_MESSAGE, SendMessageAction} from "../reducers/Todos";

export const addMessage = (text: string): SendMessageAction => ({
    type: SEND_MESSAGE,
    text
})
