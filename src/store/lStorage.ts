import {InferActionsTypes} from "./index";

export interface IUser {
    id: string
    name: string
    followers: Array<string>
    sub: Array<string>
}

export interface IPost {
    idPost:string
    parentId: string
    content: string
    likeId: Array<string>
}

const lSUsers = localStorage.getItem('users')
const lSAuthorized = localStorage.getItem('authorized');
const lSPosts = localStorage.getItem('posts');

let posts: Array<IPost> = [
    {
        idPost:"1",
        parentId: "1",
        content: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto autem dolor explicabo\n" +
            "                    illo iusto mollitia quisquam similique temporibus. Alias distinctio esse hic ipsum, labore maxime\n" +
            "                    natus odio praesentium vitae?",
        likeId: ["1", "2", "3"]
    },
    {
        idPost:"2",
        parentId: "2",
        content: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto autem dolor explicabo\n" +
            "                    illo iusto mollitia quisquam similique temporibus. Alias distinctio esse hic ipsum, labore maxime\n" +
            "                    natus odio praesentium vitae?",
        likeId: ["1", "2"]
    },
    {
        idPost:"3",
        parentId: "3",
        content: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto autem dolor explicabo\n" +
            "                    illo iusto mollitia quisquam similique temporibus. Alias distinctio esse hic ipsum, labore maxime\n" +
            "                    natus odio praesentium vitae?",
        likeId: ["3"]
    }
]
let users: Array<IUser> = [
    {
        id: "1",
        name: "Dmitry",
        followers: ["2"],
        sub: ["2", "3"]
    },
    {
        id: "2",
        name: "Yana",
        followers: ["1"],
        sub: ["1", "3"]
    },
    {
        id: "3",
        name: "Slava",
        followers: ["1"],
        sub: ["1", "3"]
    }
]
let authorized: string = ''
if (lSPosts) {
    let items = JSON.parse(lSPosts) as Array<IPost>
    if (items)
        posts = items
}
if (lSUsers) {
    users = [...JSON.parse(lSUsers)]
}
if (lSAuthorized) {
    authorized = JSON.parse(lSAuthorized)
}

let initialState = {
    users,
    authorized,
    posts
};

const lStorage = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "QL/lStorage/SET_AUTHORIZED":
            return {...state, authorized: action.payload}
        case "QL/lStorage/SET_USER":
            return {...state, users: [...action.payload]}
        case "QL/lStorage/SET_POST":
            return {...state, posts: [...state.posts, action.payload]}
        case "QL/lStorage/DELETE_POST":
            return {...state, posts: [...state.posts.filter(el=>el.idPost !== action.payload)]}
        case "QL/lStorage/EDIT_NAME":
            let newUsersEditNAme = state.users.map(el => {
                if (el.id === action.payload.userId) {
                    let name = state.users.find(nameEl => nameEl.name === action.payload.name)
                    if (!name && action.payload.name !== '') {
                        el.name = action.payload.name
                    }
                    return el
                }
                return el
            })
            return {...state, users: newUsersEditNAme}
        case "QL/lStorage/TOGGLE_FOLLOW_UNFOLLOW":
            let users = state.users.map(el => {
                if (el.id === action.payload.parentId) {
                    if (el.followers.find(e => e === action.payload.userId)) {
                        el.followers = el.followers.filter(f => f !== action.payload.userId)
                        return el
                    } else {
                        el.followers.push(action.payload.userId)
                        return el
                    }
                }else if (el.id === action.payload.userId){
                    if (el.sub.find(e=>e === action.payload.parentId)){
                        el.sub = el.sub.filter(f=>f!== action.payload.parentId)
                        return el
                    }else {
                        el.sub.push(action.payload.parentId)
                        return el
                    }
                }
                return el
            })

            return {...state, users}
        case "QL/lStorage/SET_LIKE_POST":
            let updatePosts = state.posts
            updatePosts = updatePosts.map(el => {
                if (el.idPost === action.payload.postId) {
                    if (el.likeId.find(el => el === action.payload.likeId)) {
                        el.likeId = el.likeId.filter(e => e !== action.payload.likeId)
                        return el
                    }
                    el.likeId.push(action.payload.likeId)
                    return el
                }
                return el
            })
            return {...state, posts: updatePosts}
        default:
            return state;
    }
}

export const actionsLStorage = {
    setAuthorized: (user: typeof authorized) => ({
        type: 'QL/lStorage/SET_AUTHORIZED', payload: user
    } as const),
    setUser: (user: Array<IUser>) => ({
        type: 'QL/lStorage/SET_USER', payload: user
    } as const),
    setPost: (post: IPost) => ({
        type: 'QL/lStorage/SET_POST', payload: post
    } as const),
    setLikePost: (likeId: string, postId: string) => ({
        type: 'QL/lStorage/SET_LIKE_POST', payload: {likeId, postId}
    } as const),
    setToggleFollowUnfollow: (userId: string, parentId: string) => ({
        type: 'QL/lStorage/TOGGLE_FOLLOW_UNFOLLOW', payload: {userId, parentId}
    } as const),
    setEditName: (userId: string, name: string) => ({
        type: 'QL/lStorage/EDIT_NAME', payload: {userId, name}
    } as const),
    deletePost: (idPost: string, ) => ({
        type: 'QL/lStorage/DELETE_POST', payload: idPost
    } as const),
}

export default lStorage;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actionsLStorage>
