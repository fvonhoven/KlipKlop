import React, { useEffect, useContext, useState, useRef } from "react"
import { View, Text, FlatList, Dimensions } from "react-native"
import { PostSingle } from "../../components"
import { getFeed, getPostsByUserId } from "../../services/posts"
import { NavigationContext } from "../../navigation/context/provider"
import { userMaterialNavBarHeight } from "../../hooks/useMaterialNavBarHeight"
// TODO: get height of navbar from react navigation

export function FeedScreen({ route }) {
  const { updateCurrentVideoUserId, currentVideoUserId } = useContext(NavigationContext)
  const mediaRefs = useRef([])
  const [posts, setPosts] = useState([])
  const height = Dimensions.get("window").height

  // TODO: check that following is being added to users in firestore
  // TODO: fix no path firebase warning

  useEffect(() => {
    if (route?.params?.profile) {
      getPostsByUserId(route?.params?.creator).then(setPosts)
    } else {
      getFeed().then(feed => {
        setPosts(feed)
      })
    }
  }, [])

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach(element => {
      const cell = mediaRefs.current[element.key]
      if (cell) {
        if (element.isViewable) {
          if (!route?.params?.profile) {
            updateCurrentVideoUserId(element.item.creator)
          }
          cell.play()
        } else {
          cell.stop()
        }
      }
    })
  })

  const feedItemHeight = height - 114 // userMaterialNavBarHeight(profile)

  // TODO: add profile feed scren accessed by click on video thumbnail

  const renderItem = ({ item, index }) => {
    const backgroundColor = "black" // index % 2 === 0 ? "red" : "blue"
    return (
      <View style={[{ flex: 1, height: feedItemHeight, backgroundColor }]}>
        <PostSingle item={item} ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)} />
      </View>
    )
  }

  return (
    <FlatList
      data={posts}
      style={{ height: height }}
      windowSize={4}
      initialNumToRender={0}
      maxToRenderPerBatch={2}
      removeClippedSubviews
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100,
      }}
      renderItem={renderItem}
      pagingEnabled
      keyExtractor={item => item.id}
      decelerationRate={"normal"}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
  )
}
