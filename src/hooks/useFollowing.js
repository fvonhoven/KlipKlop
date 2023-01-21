import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { getIsFollowing } from "../services/user"

export const useFollowing = (userId, otherUserId, options = {}) => {
  return useQuery(queryKeys.userFollowing(userId, otherUserId), () => getIsFollowing(userId, otherUserId), options)
}
