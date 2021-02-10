import React, {useState} from 'react';
import {Avatar, Button, Input, Modal} from "antd";
import {actionsLStorage, IUser} from "../store/lStorage";
import {useDispatch, useSelector} from "react-redux";
import {getAuthorized, getPosts, getUsers} from "./select";
import Post from "./Post";
import {Link, useLocation} from 'react-router-dom';
import {PlusOutlined,EditOutlined} from "@ant-design/icons";
import {actionsAuth} from "../store/auth-reducer";


interface IProps {
    activeUser: IUser
}

const Profile: React.FC<IProps> = ({activeUser}) => {
    let posts = useSelector(getPosts).filter(el => el.parentId === activeUser.id)
    const dispatch = useDispatch()
    const auth = useSelector(getAuthorized)
    const users = useSelector(getUsers)
    let userPosts = posts.map((el, i) => <Post key={i} {...el}/>)
    const followUnfollow = () => {
        if (auth) {
            dispatch(actionsLStorage.setToggleFollowUnfollow(auth, activeUser.id))
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    const [editName, setEditName] = useState(false)
    const changeName = (e: any) => {
        dispatch(actionsLStorage.setEditName(auth, e.target.value))
        localStorage.setItem('users', JSON.stringify(users));
    }
    const [modalFollow, setModalFollow] = useState(false)
    const closeModalFollow = () =>{
        setModalFollow(false)
    }
    const [modalSub, setModalSub] = useState(false)
    const closeModalSub = () =>{
        setModalSub(false)
    }
    return (
        <div>
            <div className={'profile'}>
                <div className={'profileInfo'}>
                    <Avatar style={{backgroundColor: "#f56a00", verticalAlign: 'middle'}} >
                        {activeUser.name}
                    </Avatar>
                    <div>
                        {
                            editName && auth === activeUser.id ? <Input
                                    maxLength={12}
                                    defaultValue={activeUser.name}
                                    autoFocus={true}
                                    onBlur={(e) => {
                                        changeName(e)
                                        setEditName(false)
                                    }}/>
                                : <h2
                                    className={auth === activeUser.id?'editName':''}
                                    onClick={() => {
                                        if (auth === activeUser.id) {
                                            setEditName(true)
                                        }
                                    }}>
                                    {activeUser.name}
                                    {
                                        auth === activeUser.id?   <EditOutlined />:null
                                    }
                                </h2>
                        }
                        <div className={'link'} onClick={()=>{setModalSub(true)}}>Подписки: {activeUser.sub.length}</div>
                        <div className={'link'} onClick={()=>{setModalFollow(true)}}>Подписчиков: {activeUser.followers.length}</div>
                    </div>
                    {
                        auth && auth !== activeUser.id ?
                            <div><Button type={'primary'} onClick={followUnfollow}>
                                {activeUser.followers.find(el=>el === auth)?'Отписаться':'Подписаться'}
                            </Button></div> : null
                    }
                </div>

                <div className={'title'}>
                    <h2>Все посты</h2>
                    {
                        auth === activeUser.id?<Button icon={<PlusOutlined />}
                                           type={'primary'}
                                           onClick={()=>{dispatch(actionsAuth.setModalNewPost(true))}}>
                            Содать пост</Button>:''
                    }
                </div>

            </div>
            <div>{posts.map((el, i) => <Post key={i} {...el} />).reverse()}</div>
            <Modal visible={modalFollow} onCancel={closeModalFollow} footer={false}>
                <h2 >Подписчики:</h2>
                {
                    activeUser.followers.map((el,i)=>{
                        let item = users.find(e=>e.id === el)
                        if (item){
                            return <div key={i} onClick={()=>{setModalFollow(false)}}><Link to={`/profile/${item.id}`}>{item.name}</Link></div>
                        }
                    })
                }
            </Modal>
            <Modal visible={modalSub} onCancel={closeModalSub} footer={false}>
                <h2 >Подписки:</h2>
                {
                    activeUser.sub.map((el,i)=>{
                        let item = users.find(e=>e.id === el)
                        if (item){
                            return <div key={i} onClick={()=>{setModalSub(false)}}><Link to={`/profile/${item.id}`}>{item.name}</Link></div>
                        }
                    })
                }
            </Modal>

        </div>
    );
}

export default Profile;