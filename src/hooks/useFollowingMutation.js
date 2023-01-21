import firebase from "firebase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "./queryKeys"
import { changeFollowState } from "../services/user"

export const useFollowingMutation = (options = {}) => {
  const queryClient = useQueryClient()
  return useMutation(changeFollowState, {
    ...options,
    onMutate: variables => {
      console.log("onMutate", variables)
      queryClient.setQueryData(
        queryKeys.userFollowing(firebase.auth().currentUser.uid, variables.otherUserId),
        !variables.isFollowing,
      )
    },
  })
}
