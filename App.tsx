import "dotenv/config"
import { StyleSheet, View } from "react-native"
import Pin from "./components/Pin"

export default function App() {
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

  let order: number[] = [1, 4, 7, 2, 5, 8, 3, 6, 9, 0]

  let RANDOMISE: boolean = process.env.RANDOMISE == "true" ? true : false

  console.log(RANDOMISE)

  if (RANDOMISE) {
    order = shuffle(order)
  }

  return (
    <View style={styles.container}>
      <Pin order={order} shuffleFn={shuffle} randomise={RANDOMISE} />
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
