import { SET_CHATS } from "../constants"

export const setChats = data => dispatch => {
  dispatch({ data, type: SET_CHATS })
}
