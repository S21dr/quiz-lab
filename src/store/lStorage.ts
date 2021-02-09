import {InferActionsTypes} from "./index";

export interface IUser {
    id:string
    name:string
    followers:Array<string>
    sub:Array<string>
}
export interface IPost  {
    parentId:string
    content:string
    likeId:Array<string>
}
const lSUsers = localStorage.getItem('users')
const lSAuthorized = localStorage.getItem('authorized');
const lSPosts = localStorage.getItem('posts');

let posts:Array<IPost> =  [
    {
        parentId:"1",
        content: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto autem dolor explicabo\n" +
            "                    illo iusto mollitia quisquam similique temporibus. Alias distinctio esse hic ipsum, labore maxime\n" +
            "                    natus odio praesentium vitae?",
        likeId:["1","2","3"]
    },
    {
        parentId:"2",
        content: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto autem dolor explicabo\n" +
            "                    illo iusto mollitia quisquam similique temporibus. Alias distinctio esse hic ipsum, labore maxime\n" +
            "                    natus odio praesentium vitae?",
        likeId:["1","2"]
    },
    {
        parentId:"3",
        content: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto autem dolor explicabo\n" +
            "                    illo iusto mollitia quisquam similique temporibus. Alias distinctio esse hic ipsum, labore maxime\n" +
            "                    natus odio praesentium vitae?",
        likeId:["3"]
    }
]
let users: Array<IUser> = [
    {
        id:"1",
        name:"Dmitry",
        followers:["2"],
        sub:["2","3"]
    },
    {
        id:"2",
        name:"Yana",
        followers:["1"],
        sub:["1","3"]
    },
    {
        id:"3",
        name:"Slava",
        followers:["1"],
        sub:["1","3"]
    }
]
let authorized = null as IUser | null
if(lSPosts){
    posts = [...posts,...JSON.parse(lSPosts)]
}
if (lSUsers) {
    users = [...users,...JSON.parse(lSUsers)]
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
        case "QL/lStorage/SET_LIKE_POST":
            let updatePosts = state.posts
            updatePosts = updatePosts.map(el=>{
                if(el.parentId === action.payload.parentId){
                    el.likeId.push(action.payload.likeId)
                    return el
                }
                return el
            })
            return {...state,posts:updatePosts}
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
    setLikePost: (likeId: string,parentId:string) => ({
        type: 'QL/lStorage/SET_LIKE_POST', payload: {likeId,parentId}
    } as const),
}

export default lStorage;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actionsLStorage>
