import { useQuery } from "@tanstack/react-query"
import { USER_KEY } from "./queryKey"
import { getUserById } from "../services/user"

export const useUser = (userId, options = {}) => {
  return useQuery([USER_KEY, userId], () => getUserById(userId), options)
}
