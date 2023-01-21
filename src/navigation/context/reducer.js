//Reducer to Handle Actions
import { actions } from "./actions"

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_USER_ID:
      return { ...state, currentVideoUserId: action.userId }
    case actions.CLEAR_USER_ID: {
      return { ...state, currentVideoUserId: null }
    }
    default:
      return state
  }
}
