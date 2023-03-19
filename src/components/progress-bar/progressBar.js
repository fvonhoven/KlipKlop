import React, { useEffect, useState, useRef } from "react"
import { Text, View, StyleSheet, Animated, Button } from "react-native"
import Constants from "expo-constants"

export const ProgressBar = ({ progress }) => {
  const counter = useRef(new Animated.Value(0)).current
  const countInterval = useRef(null)
  const [count, setCount] = useState(50)

  // useEffect(() => {
  //   countInterval.current = setInterval(() => setCount((old) => old + 5), 1000);
  //   return () => {
  //     clearInterval(countInterval);
  //   };
  // }, []);

  useEffect(() => {
    load(progress)
    // if (count >= 100) {
    // setCount(100)
    // clearInterval(countInterval)
    // }
  }, [progress])

  const load = count => {
    Animated.timing(counter, {
      toValue: count,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }

  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  })

  return (
    <View>
      <Text>Uploading....</Text>
      <View style={styles.progressBar}>
        <Animated.View style={([StyleSheet.absoluteFill], { backgroundColor: "#ff4040", width })}></Animated.View>
      </View>
      <Text style={styles.progressText}>{progress.toString()}%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    height: 20,
    flexDirection: "row",
    width: 200,
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
  progressText: {
    textAlign: "center",
  },
})
