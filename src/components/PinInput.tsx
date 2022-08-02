import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

type Props = {
  number: number
  updatePin: (n: number) => void
}

export default function PinInput({ number, updatePin }: Props) {
  return (
    <TouchableOpacity
      onPress={(e) => updatePin(number)}
      style={styles.circleButton}
    >
      <Text style={styles.number}>{number}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  circleButton: {
    margin: 10,
    height: 90,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 200,
    backgroundColor: "rgb(128,128,128)",
  },
  number: {
    color: "white",
    fontSize: 32,
  },
})
