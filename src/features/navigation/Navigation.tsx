import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import LoginScreen from "../auth/LoginScreen"
import PinScreen from "../pin/PinScreen"
import UnlockedScreen from "../pin/UnlockedScreen"

export type RootStackParamList = {
  Login: undefined
  Locked: undefined
  Unlocked: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigation = () => {
  const loggedInUser = useSelector((state: RootState) => state.uid)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {loggedInUser === null ? (
          // No user, ask to login
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // User is signed in
          <>
            <Stack.Screen name="Unlocked" component={UnlockedScreen} />
            <Stack.Screen name="Locked" component={PinScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
