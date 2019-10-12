import { combineReducers } from "redux";
import { authReducer } from "./authen-reducer";

export const rootReducer = combineReducers({
    user: authReducer
});