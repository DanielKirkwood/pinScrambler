import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { Provider } from "react-redux"
import PinScreen from "./src/features/pin/PinScreen"
import UnlockedScreen from "./src/features/pin/UnlockedScreen"
import { store } from "./src/store/store"

const Stack = createNativeStackNavigator()

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Locked"
            component={PinScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Unlocked" component={UnlockedScreen} />
          <Stack.Screen
            name="Set Pin"
            component={PinScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
