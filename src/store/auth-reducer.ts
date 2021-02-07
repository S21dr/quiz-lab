import {InferActionsTypes} from "./index";


let initialState = {
    modalLogin:false,
    modalNewPost:false,

};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "QL/auth/TOGGLE_MODAL_LOGIN":
            return {...state,modalLogin:action.payload}
        case "QL/auth/TOGGLE_MODAL_NEW_POST":
            return {...state,modalNewPost:action.payload}
        default:
            return state;
    }
}

export const actionsAuth = {
    setModalLogin:(modal:boolean)=>({
     type: 'QL/auth/TOGGLE_MODAL_LOGIN', payload:modal
    } as const),
    setModalNewPost:(modal:boolean)=>({
        type: 'QL/auth/TOGGLE_MODAL_NEW_POST', payload:modal
    } as const),
}

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actionsAuth>
