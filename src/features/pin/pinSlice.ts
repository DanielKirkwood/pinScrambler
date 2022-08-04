import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import shuffle from "../../util/shufflePins"

export interface PinState {
  pin: string
  status: string
  order: string[]
  layout: "random" | "normal"
  numErrors: number
  numRandomLayoutErrors: number
  numNormalLayoutErrors: number
  numSuccess: number
  numNormalLayoutSuccess: number
  numRandomLayoutSuccess: number
  pinList: string[]
  totalTimeTaken: number
  timeTakenRandom: number
  timeTakenNormal: number
}

const initialState: PinState = {
  pin: "",
  status: "NOT SET",
  order: ["1", "4", "7", "2", "5", "8", "3", "6", "9", "0"],
  layout: "normal",
  numErrors: 0,
  numRandomLayoutErrors: 0,
  numNormalLayoutErrors: 0,
  numSuccess: 0,
  numNormalLayoutSuccess: 0,
  numRandomLayoutSuccess: 0,
  pinList: [],
  totalTimeTaken: 0,
  timeTakenRandom: 0,
  timeTakenNormal: 0,
}

export const pinSlice = createSlice({
  name: "pin",
  initialState,
  reducers: {
    setPin: (state, action: PayloadAction<string>) => {
      // add to pin history
      state.pinList.push(action.payload)

      state.pin = action.payload
      state.status = "READY"
    },
    unlockPin: (state, action: PayloadAction<string>) => {
      // check PIN entered by user against the saved PIN
      const isMatching = action.payload === state.pin

      // update status based on matching result
      state.status = isMatching ? "SUCCESS" : "ERROR"

      // if user entered wrong PIN, increase total errors
      if (!isMatching) {
        state.numErrors += 1

        // check layout and increase desired metric
        if (state.layout === "random") {
          state.numRandomLayoutErrors += 1

          // shuffle PIN order if error made on random layout to change PIN screen order
          state.order = shuffle(state.order)
        }

        if (state.layout === "normal") {
          state.numNormalLayoutErrors += 1
        }
      } else {
        // successful sign in
        state.numSuccess += 1

        // check layout and increase desired metric
        if (state.layout === "random") {
          state.numRandomLayoutSuccess += 1
        }

        if (state.layout === "normal") {
          state.numNormalLayoutSuccess += 1
        }
      }
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
    resetErrorStats: (state) => {
      state.numErrors = 0
      state.numNormalLayoutErrors = 0
      state.numRandomLayoutErrors = 0
    },
    resetSuccessStats: (state) => {
      state.numSuccess = 0
      state.numNormalLayoutSuccess = 0
      state.numRandomLayoutSuccess = 0
    },
    resetPinHistory: (state) => {
      state.pinList = []
    },
    addTime: (state, action: PayloadAction<number>) => {
      state.totalTimeTaken += action.payload

      if (state.layout === "random") {
        state.timeTakenRandom += action.payload
      } else {
        state.timeTakenNormal += action.payload
      }
    },
    resetTime: (state) => {
      state.totalTimeTaken = 0

      state.timeTakenRandom = 0

      state.timeTakenNormal = 0
    },
    resetAllStats: (state) => {
      state.pin = ""
      state.status = "NOT SET"
      state.order = ["1", "4", "7", "2", "5", "8", "3", "6", "9", "0"]
      state.layout = "normal"
      state.numErrors = 0
      state.numRandomLayoutErrors = 0
      state.numNormalLayoutErrors = 0
      state.numSuccess = 0
      state.numNormalLayoutSuccess = 0
      state.numRandomLayoutSuccess = 0
      state.pinList = []
      state.totalTimeTaken = 0
      state.timeTakenRandom = 0
      state.timeTakenNormal = 0
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
  resetErrorStats,
  resetSuccessStats,
  resetPinHistory,
  addTime,
  resetTime,
  resetAllStats,
} = pinSlice.actions
export default pinSlice.reducer
