import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import Button from "../button/Button"

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

const downloadCSV = (success: boolean, message: string) => {
  return Alert.alert(success ? "Success" : "Error", message)
}

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
      <Button
        title={`Change Layout To ${buttonTitle}`}
        onPress={() => {
          dispatch(swapLayout())
          navigation.navigate("Locked")
        }}
        textColor="blue"
        bgColor="transparent"
      />
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
        <Button
          title="Lock"
          onPress={() => {
            navigation.navigate("Locked")
          }}
          textColor="blue"
          bgColor="transparent"
        />

        <Button
          title={currentPin === "" ? "Set PIN" : "Change PIN"}
          onPress={() => {
            dispatch(resetPin())
            navigation.navigate("Locked")
          }}
          textColor="blue"
          bgColor="transparent"
        />
      </View>
      {renderButton()}

      <Button
        title="Download CSV"
        onPress={async () => {
          const response = await writeToCSV("PinScrambler_Data", data)

          downloadCSV(response.success, response.payload)
        }}
        textColor="blue"
        bgColor="transparent"
      />

      <View style={{ flexDirection: "row" }}>
        <Button
          title="Delete All Data"
          onPress={() => {
            dispatch(clearAllData())
          }}
          textColor="red"
          bgColor="transparent"
        />

        <Button
          title="Log Out"
          onPress={() => {
            dispatch(signUserOut())
          }}
          textColor="red"
          bgColor="transparent"
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
})

export default UnlockedScreen
