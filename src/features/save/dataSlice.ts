import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface Data {
  uid: number | null
  pin: string
  layout: "normal" | "random"
  timeToUnlock: number
  numErrors: number
}

export interface UserData {
  uid: number | null
  currentPin: string
  data: Data[]
}

const initialState: UserData = {
  uid: null,
  currentPin: "",
  data: [],
}

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<number>) => {
      state.uid = action.payload
    },
    setCurrentPin: (state, action: PayloadAction<string>) => {
      state.currentPin = action.payload
    },
    addData: (
      state,
      action: PayloadAction<
        Pick<Data, "layout" | "timeToUnlock" | "numErrors">
      >,
    ) => {
      const dataToAdd: Data = {
        uid: state.uid,
        pin: state.currentPin,
        layout: action.payload.layout,
        timeToUnlock: action.payload.timeToUnlock,
        numErrors: action.payload.numErrors,
      }

      state.data.push(dataToAdd)
    },
  },
})

export const { setUser, setCurrentPin } = dataSlice.actions
export default dataSlice.reducer
