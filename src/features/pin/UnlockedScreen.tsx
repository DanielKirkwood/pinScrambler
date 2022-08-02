import React from "react"
import { Button, StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import { clearPin } from "./pinSlice"

const UnlockedScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonStyle}>
          <Button title="Lock" onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            title="Change PIN"
            onPress={() => {
              dispatch(clearPin())
              navigation.goBack()
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginTop: 5,
  },
})

export default UnlockedScreen
