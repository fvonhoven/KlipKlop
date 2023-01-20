import React, { useEffect } from "react"
import { View, Text, FlatList, Dimensions } from "react-native"
import { PostSingle } from "../../components"
import { getFeed } from "../../services/posts"
// TODO: get height of navbar from react navigation

export function FeedScreen() {
  const mediaRefs = React.useRef([])
  const [posts, setPosts] = React.useState([])
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const height = Dimensions.get("window").height

  useEffect(() => {
    getFeed().then(feed => {
      setPosts(feed)
    })
  }, [])

  const onViewableItemsChanged = React.useRef(({ changed }) => {
    changed.forEach(element => {
      const cell = mediaRefs.current[element.key]
      if (cell) {
        // console.log("onViewableItemsChanged", element, element.isViewable)
        if (element.isViewable) {
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
        <PostSingle item={item} ref={PostSingleRef => (mediaRefs.current[item.posts] = PostSingleRef)} />
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
