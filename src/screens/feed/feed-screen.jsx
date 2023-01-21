import React, { useEffect, useContext, useState, useRef } from "react"
import { View, Text, FlatList, Dimensions } from "react-native"
import { PostSingle } from "../../components"
import { getFeed, getPostsByUserId } from "../../services/posts"
import { NavigationContext } from "../../navigation/context/provider"
// TODO: get height of navbar from react navigation

export function FeedScreen({ route }) {
  const { updateCurrentVideoUserId, currentVideoUserId } = useContext(NavigationContext)
  console.log("updateCurrentVideoUserId", currentVideoUserId)
  const mediaRefs = useRef([])
  const [posts, setPosts] = useState([])
  const height = Dimensions.get("window").height

  useEffect(() => {
    if (route?.params?.profile) {
      getPostsByUserId(route.params.creator).then(setPosts)
    } else {
      getFeed().then(feed => {
        setPosts(feed)
      })
    }
  }, [])

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach(element => {
      console.log("onViewableItemsChanged", element)
      console.log("MEDIA REFS", mediaRefs.current)
      const cell = mediaRefs.current[element.key]
      if (cell) {
        // console.log("onViewableItemsChanged", element, element.isViewable)
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

  const renderItem = ({ item, index }) => {
    return (
      <View style={[{ flex: 1, height: height - 114 }]}>
        <PostSingle item={item} ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)} />
      </View>
    )
  }

  return (
    // <View style={{ backgroundColor: "green", flex: 1 }} />
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
