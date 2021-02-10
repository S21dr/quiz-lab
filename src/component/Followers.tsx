import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAuthorized, getUsers} from "./select";
import {Link, useHistory,} from 'react-router-dom';
import {actionsAuth} from "../store/auth-reducer";
import {Button} from "antd";
import {actionsLStorage} from "../store/lStorage";

const Followers: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const users = useSelector(getUsers)
    const auth = useSelector(getAuthorized)
    let authUser = users.find(el => el.id === auth)
    if (!authUser){
        history.push('/')
        dispatch(actionsAuth.setModalLogin(true))
    }
    const followUnfollow = (activeUser:string)=>() => {
        if (auth) {
            dispatch(actionsLStorage.setToggleFollowUnfollow(auth, activeUser))
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    return (
        <div className={'followers'}>
            {
                authUser?.followers.length ? authUser.followers.map((el, i) => {
                    let item = users.find(e => e.id === el)
                    if (item) {
                        return <div className={'item'} key={i}>
                            <Link to={`/profile/${item.id}`}>{item.name}</Link>
                            <Button type={'primary'} onClick={followUnfollow(item.id)}>
                                {item.followers.find(el=>el === auth)?'Отписаться':'Подписаться'}
                            </Button>
                        </div>
                    }
                }) : <h2>У вас пока что нет подписчиков</h2>
            }
        </div>
    );
}

export default Followers;