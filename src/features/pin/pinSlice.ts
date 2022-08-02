import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface PinState {
  pin: string
  status: string
}

const initialState: PinState = { pin: "", status: "NOT SET" }

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
      state.status = isMatching ? "SUCCESS" : "ERROR"
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    clearPin: (state) => {
      state.pin = ""
      state.status = "NOT SET"
    },
  },
})

export const { setPin, unlockPin, setStatus, clearPin } = pinSlice.actions
export default pinSlice.reducer
