import {combineReducers, createStore} from "redux";
import authReducer from "./auth-reducer";
import lStorage from "./lStorage";


const rootReducer = combineReducers({
    auth:authReducer,
    lStorage,
})

type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

const store = createStore(rootReducer)

export default store