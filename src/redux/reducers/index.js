import { combineReducers } from "redux"
import { auth } from "./auth"
import { posts } from "./posts"
import { modal } from "./modal"
import { chats } from "./chats"

const Reducers = combineReducers({
  auth,
  posts,
  modal,
  chats,
})

export default Reducers
