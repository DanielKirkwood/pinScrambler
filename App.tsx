import { StyleSheet, View } from "react-native"
import Pin from "./components/Pin"

// shuffles array using Fisher-Yates (aka Knuth) shuffle
function shuffle(array: number[]) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export default function App() {
  let order: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

  order = shuffle(order)

  return (
    <View style={styles.container}>
      <Pin order={order} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(99,102,106, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
})
