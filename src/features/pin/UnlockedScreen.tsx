import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { RootStackParamList } from "../navigation/Navigation"
import { resetPin, signUserOut, swapLayout } from "../saveData/dataSlice"

type Props = NativeStackScreenProps<RootStackParamList, "Unlocked">

const UnlockedScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const layout = useSelector((state: RootState) => state.layout)
  const loggedInUser = useSelector((state: RootState) => state.uid)
  const currentPin = useSelector((state: RootState) => state.currentPin)

  const renderButton = () => {
    const isNormal = layout === "normal"
    const buttonTitle = isNormal ? "random" : "normal"

    return (
      <View style={styles.buttonStyle}>
        <Button
          title={`Set ordering to ${buttonTitle}`}
          onPress={() => {
            dispatch(swapLayout())
            navigation.navigate("Locked")
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
        {`Unlocked - (uid ${loggedInUser})`}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonStyle}>
          <Button
            title="Lock"
            onPress={() => {
              navigation.navigate("Locked")
            }}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            title={currentPin === "" ? "Set PIN" : "Change PIN"}
            onPress={() => {
              dispatch(resetPin())
              navigation.navigate("Locked")
            }}
          />
        </View>
      </View>
      {renderButton()}
      <View style={styles.buttonStyle}>
        <Button
          title="Go To Stats Page"
          onPress={() => {
            navigation.navigate("Stats")
          }}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          color="red"
          title="Log out"
          onPress={() => {
            dispatch(signUserOut())
          }}
        />
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
