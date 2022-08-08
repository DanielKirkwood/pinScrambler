import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { useDispatch } from "react-redux"
import Button from "../button/Button"
import { RootStackParamList } from "../navigation/Navigation"
import { setUser } from "../saveData/dataSlice"

type Props = NativeStackScreenProps<RootStackParamList, "Login">

function LoginScreen({ navigation }: Props) {
  const [userID, setUserID] = useState<number | null>(null)
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          autoFocus={true}
          keyboardType="numeric"
          style={styles.TextInput}
          placeholder="Type user ID here"
          onChangeText={(uid) => setUserID(Number(uid))}
        />
      </View>

      <Button
        title="Click to login"
        onPress={() => {
          dispatch(setUser(userID))
        }}
        textColor="black"
        bgColor="white"
      />
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
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 50,

    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
})

export default LoginScreen
