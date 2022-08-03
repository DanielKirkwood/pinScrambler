import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { RootStackParamList } from "../../App"
import { RootState } from "../../store/store"
import { changeLayout, clearPin, resetOrder, shuffleOrder } from "./pinSlice"

type Props = NativeStackScreenProps<RootStackParamList, "Unlocked">

const UnlockedScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const layout = useSelector((state: RootState) => state.pin.layout)

  const renderButton = () => {
    const buttonTitle = layout === "normal" ? "random" : "normal"

    return (
      <View style={styles.buttonStyle}>
        <Button
          title={`Set ordering to ${buttonTitle}`}
          onPress={() => {
            dispatch(changeLayout())
            if (buttonTitle === "random") {
              dispatch(shuffleOrder())
            } else {
              dispatch(resetOrder())
            }
            navigation.goBack()
          }}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          padding: 20,
        }}
      >
        Unlocked
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonStyle}>
          <Button
            title="Lock"
            onPress={() => {
              if (layout === "random") {
                dispatch(shuffleOrder())
              }
              navigation.goBack()
            }}
          />
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
      {renderButton()}
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
