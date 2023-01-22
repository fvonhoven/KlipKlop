import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setChats } from "../redux/actions/chats"
import { chatsListener } from "../services/chats"

export const useChats = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.currentUser)

  const handleChatsChange = useCallback(
    change => {
      dispatch(setChats(change.docs.map(doc => ({ id: doc.id, ...doc.data() }))))
    },
    [dispatch],
  )

  useEffect(() => {
    let listenerInstance
    if (currentUser != null) {
      listenerInstance = chatsListener(handleChatsChange)
    }
    return () => listenerInstance && listenerInstance()
  }, [currentUser])
}
