import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import shuffle from "../../util/shufflePins"

export interface PinState {
  pin: string
  status: string
  order: string[]
  layout: "random" | "normal"
}

const initialState: PinState = {
  pin: "",
  status: "NOT SET",
  order: ["1", "4", "7", "2", "5", "8", "3", "6", "9", "0"],
  layout: "normal",
}

export const pinSlice = createSlice({
  name: "pin",
  initialState,
  reducers: {
    setPin: (state, action: PayloadAction<string>) => {
      state.pin = action.payload
      state.status = "READY"
    },
    unlockPin: (state, action: PayloadAction<string>) => {
      const isMatching = action.payload === state.pin
      if (state.layout === "random" && !isMatching) {
        state.order = shuffle(state.order)
      }
      state.status = isMatching ? "SUCCESS" : "ERROR"
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    clearPin: (state) => {
      state.pin = ""
      state.status = "NOT SET"
    },
    changeLayout: (state) => {
      if (state.layout === "normal") {
        state.layout = "random"
      } else {
        state.layout = "normal"
      }
    },
    resetOrder: (state) => {
      state.order = ["1", "4", "7", "2", "5", "8", "3", "6", "9", "0"]
    },
    shuffleOrder: (state) => {
      state.order = shuffle(state.order)
    },
  },
})

export const {
  setPin,
  unlockPin,
  setStatus,
  clearPin,
  changeLayout,
  resetOrder,
  shuffleOrder,
} = pinSlice.actions
export default pinSlice.reducer
