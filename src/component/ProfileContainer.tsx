import React from 'react';
import {useParams,useHistory} from "react-router-dom";

import {Avatar} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getAuthorized, getPosts, getUsers} from "./select";
import Post from "./Post";
import {actionsAuth} from "../store/auth-reducer";
import Profile from "./Profile";

const ProfileContainer: React.FC = () => {
    interface ParamTypes {
        userId: string
    }
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector(getAuthorized)
    const users = useSelector(getUsers)
    let {userId} = useParams<ParamTypes>();
    if (!userId){
        if (user){
            userId = user.id
        }else {
            history.push('/')
            dispatch(actionsAuth.setModalLogin(true))
        }
    }
    let activeUser = users.find(el=>el.id === userId)

    const posts = useSelector(getPosts)
    if (!activeUser){
        return <div>404 | Пользователь не найден</div>
    }
    return <Profile activeUser={activeUser}/>;
}

export default ProfileContainer;