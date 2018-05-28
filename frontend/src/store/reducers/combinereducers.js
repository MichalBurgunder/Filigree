
import { combineReducers } from "redux"
import reducer from "./index.js"
import BatchReducer from "./fetchBatchesReducer.js"
import TextReducer from "./fetchTextsReducer.js"
import HistoryReducer from "./fetchHistoryReducer.js"
import AccountReducer from "./accountReducer"

export const reducers = combineReducers({
    reducer,
    BatchReducer,
    TextReducer,
    HistoryReducer,
    AccountReducer,
})
