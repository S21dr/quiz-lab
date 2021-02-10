import React from 'react';
import {actionsLStorage, IPost} from "../store/lStorage";
import {useDispatch, useSelector} from "react-redux";
import {getAuthorized, getPosts, getUsers} from "./select";
import {Link} from 'react-router-dom';
import {HeartTwoTone, DeleteOutlined} from "@ant-design/icons";

const Post: React.FC<IPost> = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(getAuthorized)
    const users = useSelector(getUsers)
    let name = users.find(el => el.id === props.parentId)
    let liked = props.likeId.map(e => {
        return users.find(el => el.id === e)
    })
    const posts = useSelector(getPosts)
    const like = () => {
        if (user) {
            dispatch(actionsLStorage.setLikePost(user, props.idPost))
            localStorage.setItem('posts', JSON.stringify(posts))
        }
    }
    return (
        <div className={'post'}>
            <div className={'title'}>
                <h2>{name ? <Link to={`/profile/${name.id}`}>{name.name}</Link> : null}</h2>
                <div className={'actionPost'}>
                    {
                        user ? <HeartTwoTone className={props.likeId.find(el => el === user) ? 'activeLike' : ''}
                                             onClick={like}/> : null
                    }
                    {
                        user === props.parentId ?
                            <div className={'delete'} onClick={() => {
                                dispatch(actionsLStorage.deletePost(props.idPost))
                                localStorage.setItem('posts', JSON.stringify(posts.filter(el=>el.idPost !== props.idPost)))
                            }}>
                                <DeleteOutlined/>
                            </div>
                            : null
                    }
                </div>
            </div>
            <p>{props.content}</p>
            <div>
                    <span className={'liked'}>Понравилось: {props.likeId.length ?
                        liked.map((el, i) => {
                            if (el)
                                return <Link to={`/profile/${el.id}`} key={i}>{el.name}</Link>
                        }) : '0'
                    }</span>
            </div>
        </div>
    );
}

export default Post;