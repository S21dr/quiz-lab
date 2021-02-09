import React from 'react';
import {Avatar} from "antd";
import {IUser} from "../store/lStorage";
import {useSelector} from "react-redux";
import {getPosts, getUsers} from "./select";
import Post from "./Post";

interface IProps {
    activeUser: IUser
}

const Profile: React.FC<IProps> = ({activeUser}) => {
    let posts = useSelector(getPosts).filter(el=>el.parentId === activeUser.id)

    let userPosts = posts.map((el,i)=><Post key={i} {...el}/>)
    console.log(posts)
    return (
        <div>
            <Avatar style={{backgroundColor: "#f56a00", verticalAlign: 'middle'}} size="large">
                {activeUser.name}
            </Avatar>
            <h2>{activeUser.name}</h2>
            <div>Подписки: {activeUser.sub.length}</div>
            <div>Подписчиков: {activeUser.followers.length}</div>
            <div>{posts.map((el,i)=><Post key={i} {...el} />)}</div>
        </div>
    );
}

export default Profile;