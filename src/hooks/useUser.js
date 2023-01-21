import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getUserById } from "../services/user"

export const useUser = (userId, options = {}) => {
  return useQuery(queryKeys.user(userId), () => getUserById(userId), options)
}
