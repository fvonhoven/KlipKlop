import { SET_CHATS } from "../constants"

const initialState = {
  list: [],
}

export const chats = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHATS:
      return {
        ...state,
        list: action.data,
      }
    default:
      return state
  }
}
