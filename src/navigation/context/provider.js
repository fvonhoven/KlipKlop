import React, { createContext } from "react"
import { reducer } from "./reducer"
import { initialState, actions } from "./actions"

export const NavigationContext = createContext()

export const NavigationContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const value = {
    currentVideoUserId: state.currentVideoUserId,
    updateCurrentVideoUserId: userId => {
      dispatch({ type: actions.UPDATE_USER_ID, userId })
    },
    clearCurrentVideoUserId: () => {
      dispatch({ type: actions.CLEAR_USER_ID })
    },
  }

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}
