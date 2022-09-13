import { combineReducers } from "@reduxjs/toolkit"
import { elementsReducer } from "./slices/elements/reducer"


const rootReducer = combineReducers({
  elements: elementsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
