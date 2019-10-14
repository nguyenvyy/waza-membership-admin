import { combineReducers } from "redux";
import { authReducer } from "./authen-reducer";
import { comboReducer } from "./combo-reducer";

export const rootReducer = combineReducers({
    user: authReducer,
    combo: comboReducer
});