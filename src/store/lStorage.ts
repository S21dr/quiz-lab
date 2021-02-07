import {InferActionsTypes} from "./index";

export interface IUser {
    id:number
    name:string
}
export interface IPost  {
    parentId:number
    name:string
    content:string
    likeId:Array<IUser>
}
const lSUsers = localStorage.getItem('users')
const lSAuthorized = localStorage.getItem('authorized');
const lSPosts = localStorage.getItem('posts');

let posts:Array<IPost> =  [
    {
        parentId:1,
        name: "Dima",
        content: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto autem dolor explicabo\n" +
            "                    illo iusto mollitia quisquam similique temporibus. Alias distinctio esse hic ipsum, labore maxime\n" +
            "                    natus odio praesentium vitae?",
        likeId:[]
    },
    {
        parentId:2,
        name: "Dima2",
        content: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto autem dolor explicabo\n" +
            "                    illo iusto mollitia quisquam similique temporibus. Alias distinctio esse hic ipsum, labore maxime\n" +
            "                    natus odio praesentium vitae?",
        likeId:[]
    },
    {
        parentId:3,
        name: "Dima3",
        content: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto autem dolor explicabo\n" +
            "                    illo iusto mollitia quisquam similique temporibus. Alias distinctio esse hic ipsum, labore maxime\n" +
            "                    natus odio praesentium vitae?",
        likeId:[]
    }
]
let users: Array<IUser> = []
let authorized = null as IUser | null
if(lSPosts){
    posts = [...posts,...JSON.parse(lSPosts)]
}
if (lSUsers) {
    users = JSON.parse(lSUsers)
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
            return {...state,users:[...state.users,...action.payload]}
        case "QL/lStorage/SET_POST":
            return {...state,posts:[...state.posts,action.payload]}
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
}

export default lStorage;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actionsLStorage>
