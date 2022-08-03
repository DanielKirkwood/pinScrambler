import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { Provider } from "react-redux"
import PinScreen from "./src/features/pin/PinScreen"
import UnlockedScreen from "./src/features/pin/UnlockedScreen"
import { store } from "./src/store/store"

export type RootStackParamList = {
  Locked: undefined
  Unlocked: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Locked" component={PinScreen} />
          <Stack.Screen name="Unlocked" component={UnlockedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
