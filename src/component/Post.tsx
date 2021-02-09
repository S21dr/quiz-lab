import React from 'react';
import {actionsLStorage, IPost} from "../store/lStorage";
import {useDispatch, useSelector} from "react-redux";
import {getAuthorized, getUsers} from "./select";
import {Link} from 'react-router-dom';
import {HeartTwoTone} from "@ant-design/icons";
import {actionsAuth} from "../store/auth-reducer";

const Post: React.FC<IPost> = (props) => {
    const dispatch =useDispatch()
    const user = useSelector(getAuthorized)
    const users = useSelector(getUsers)
    let name = users.find(el => el.id === props.parentId)
    let liked = props.likeId.map(e => {
        return users.find(el => el.id === e)
    })
    const like = () =>{
        if (user)
        dispatch(actionsLStorage.setLikePost(user.id,props.parentId))
    }
    return (
        <div>
            <h2>{name ? name.name : null}</h2>
            <p>{props.content}</p>
            {
                props.likeId.length ? <div>
                    <span>Понравилось: {
                        liked.map((el, i) => {
                            if (el)
                                return <Link to={`/profile/${el.id}`} key={i}>{el.name}</Link>
                        })
                    }</span>
                </div> : null
            }
            {
               user? <HeartTwoTone onClick={like}/>:null
            }

        </div>
    );
}

export default Post;