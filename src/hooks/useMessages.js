import { useEffect, useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { createChat, messagesListener } from "../services/chats"

export const useMessages = (chatId, contactId) => {
  const currentUser = useSelector(state => state.auth.currentUser)
  const chats = useSelector(state => state.chats.list)
  const [chatIdInstance, setChatIdInstance] = useState(chatId)
  const [messages, setMessages] = useState([])

  const handleMessagesChange = useCallback(
    change => {
      const newMessages = change.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setMessages(newMessages)
    },
    [setMessages],
  )

  useEffect(() => {
    let listenerInstance
    if (!chatIdInstance) {
      let currentChat = chats.find(item => item.members.some(member => member === contactId))
      if (!currentChat) {
        createChat(contactId).then(res => setChatIdInstance(res.id))
      } else {
        setChatIdInstance(currentChat.id)
      }
    }
    if (currentUser != null && chatIdInstance) {
      listenerInstance = messagesListener(handleMessagesChange, chatIdInstance)
    }
    return () => listenerInstance && listenerInstance()
  }, [handleMessagesChange, currentUser, chatIdInstance])

  return { messages, chatIdInstance }
}
