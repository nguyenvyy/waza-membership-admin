import { combineReducers } from "redux";
import { authReducer } from "./authen-reducer";
import { comboReducer } from "./combo-reducer";
import { voucherxReducer } from "./voucherx-reducer";
import { policyReducer } from "./policy-reducer";
import { compaignReducer } from "./compaign-reducer";

export const rootReducer = combineReducers({
    user: authReducer,
    combo: comboReducer,
    voucherx: voucherxReducer,
    policy: policyReducer,
    compaign: compaignReducer
});