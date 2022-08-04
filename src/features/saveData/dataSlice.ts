import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface SavedData {
  uid: number | null
  pin: string
  layout: "normal" | "random"
  timeToUnlock: number
  numErrors: number
}

export interface InformationData {
  uid: number | null
  currentPin: string
  layout: "normal" | "random"
  data: SavedData[]
}

const initialState: InformationData = {
  uid: null,
  currentPin: "",
  layout: "normal",
  data: [],
}

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // set the given user in state
    setUser: (state, action: PayloadAction<number | null>) => {
      // TODO: clear all data when new user signed in
      state.uid = action.payload
    },
    // set the given pin in state
    setCurrentPin: (state, action: PayloadAction<string>) => {
      state.currentPin = action.payload
    },
    // add to data list using currently signed in user, current pin and the given metrics
    addData: (
      state,
      action: PayloadAction<Pick<SavedData, "timeToUnlock" | "numErrors">>,
    ) => {
      const dataToAdd: SavedData = {
        uid: state.uid,
        pin: state.currentPin,
        layout: state.layout,
        timeToUnlock: action.payload.timeToUnlock,
        numErrors: action.payload.numErrors,
      }

      state.data.push(dataToAdd)
    },
    // clear current signed in user data
    signUserOut: (state) => {
      state.uid = null
      state.currentPin = ""
      state.layout = "normal"
    },
    // clear all stored data
    clearAllData: (state) => {
      state.uid = null
      state.currentPin = ""
      state.data = []
    },
  },
})

export const { setUser, setCurrentPin, addData, signUserOut, clearAllData } =
  dataSlice.actions
export default dataSlice.reducer
