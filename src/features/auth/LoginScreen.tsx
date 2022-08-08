import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
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
      <Text style={styles.title}>Log in</Text>
      <View style={styles.inputView}>
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          placeholder="user ID"
          placeholderTextColor="#003f5c"
          onChangeText={(uid) => setUserID(Number(uid))}
        />
      </View>

      <Button
        title="LOGIN"
        onPress={() => {
          dispatch(setUser(userID))
        }}
        textColor="black"
        bgColor="transparent"
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
    marginBottom: 20,

    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    paddingBottom: 20,
  },
})

export default LoginScreen
