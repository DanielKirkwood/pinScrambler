import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import writeToCSV from "../../util/writeCSV"
import { RootStackParamList } from "../navigation/Navigation"
import {
  clearAllData,
  resetPin,
  signUserOut,
  swapLayout,
} from "../saveData/dataSlice"

type Props = NativeStackScreenProps<RootStackParamList, "Unlocked">

const UnlockedScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const layout = useSelector((state: RootState) => state.layout)
  const loggedInUser = useSelector((state: RootState) => state.uid)
  const currentPin = useSelector((state: RootState) => state.currentPin)
  const data = useSelector((state: RootState) => state.data)

  const renderButton = () => {
    const isNormal = layout === "normal"
    const buttonTitle = isNormal ? "Random" : "Normal"

    return (
      <View style={styles.buttonStyle}>
        <Button
          title={`Change Layout To ${buttonTitle}`}
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
          title="Download CSV"
          onPress={() => {
            writeToCSV("test", data)
          }}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonStyle}>
          <Button
            color="red"
            title="Delete All Data"
            onPress={() => {
              dispatch(clearAllData())
            }}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            color="red"
            title="Log Out"
            onPress={() => {
              dispatch(signUserOut())
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
