import React from "react"
import { Text } from "react-native"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import Navigation from "./features/navigation/Navigation"

import { persistor, store } from "./redux/store"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  )
}

export default App
