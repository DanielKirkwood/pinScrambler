import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { Text } from "react-native"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import PinScreen from "./features/pin/PinScreen"
import StatsScreen from "./features/pin/StatsScreen"
import UnlockedScreen from "./features/pin/UnlockedScreen"
import { persistor, store } from "./redux/store"

export type RootStackParamList = {
  Locked: undefined
  Unlocked: undefined
  Stats: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Locked" component={PinScreen} />
            <Stack.Screen name="Unlocked" component={UnlockedScreen} />
            <Stack.Screen
              name="Stats"
              component={StatsScreen}
              options={{
                headerShown: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
