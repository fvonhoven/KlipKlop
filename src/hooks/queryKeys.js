export const queryKeys = {
  user: user => ["users", user],
  userFollowing: (userId, otherUserId) => ["following", userId + otherUserId],
}
