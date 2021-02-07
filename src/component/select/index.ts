import {AppStateType} from "../../store";

export const getModalLogin = (state: AppStateType) => {
    return state.auth.modalLogin;
}
export const getModalNewPost = (state: AppStateType) => {
    return state.auth.modalNewPost;
}
export const getAuthorized = (state: AppStateType) => {
    return state.lStorage.authorized;
}
export const getUsers = (state: AppStateType) => {
    return state.lStorage.users;
}
export const getPosts = (state: AppStateType) => {
    return state.lStorage.posts;
}