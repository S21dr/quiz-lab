import React from 'react';
import {Button, Tabs} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getAuthorized, getPosts, getUsers} from "./select";
import Post from "./Post";
import {actionsAuth} from "../store/auth-reducer";
import NewPost from "./NewPost";
import {PlusOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;

const News: React.FC = () => {
    const dispatch = useDispatch()
    const authorized = useSelector(getAuthorized)
    const users = useSelector(getUsers)
    const openNewPost = () =>{
        dispatch(actionsAuth.setModalNewPost(true))
    }
    const authUser =  users.find(el=>el.id === authorized)
    const posts = useSelector(getPosts)
    const subPosts = posts.filter(el=>el.parentId === authorized || authUser?.sub.find(e=>e === el.parentId) )
    return (
        <div className={'tabWrap'}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Все посты" key="1">
                    {posts.map((el,i)=><Post key={i} {...el} />).reverse()}
                </TabPane>
                <TabPane tab="Подписки" key="2" disabled={!authorized}>
                    {subPosts?subPosts.map((el,i)=><Post key={i} {...el} />).reverse():<h2>Здесь пока что пусто</h2>}
                </TabPane>
            </Tabs>
            {
                authorized?<Button icon={<PlusOutlined />} className={'addPost'} onClick={openNewPost}>Содать пост</Button>:''
            }
        </div>
    );
}

export default News;